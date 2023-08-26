import type { Affix } from "../../generate/affix/index.js"
import type { Specification } from "../../generate/formative/slot-4/specification.js"
import type { PartialReferential } from "../../generate/referential/referential.js"
import { parseAffix } from "../formative/affix.js"
import { parseCase } from "../formative/case.js"
import { combinationReferential } from "../lex/referential/combination.js"
import type { Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"
import { parseReferentListAndPerspective } from "./referent-list.js"

const AFFIX_REGEX = /([aeiouäëöü']+)([^aeiouäëöü']+)/g

function parseAffixes(text: string) {
  if (text == "") {
    return []
  }

  const output: Affix[] = []

  let match

  while ((match = AFFIX_REGEX.exec(text))) {
    output.push(
      parseAffix(
        VowelForm.parseOrThrow(match[1]!),
        match[2]!,
        output.length == 0 && AFFIX_REGEX.lastIndex == text.length,
      ),
    )
  }

  return output
}

/**
 * Builds a combination referential.
 * @param word The word to be built.
 * @returns Either a parsed `PartialReferential` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the adjunct was
 * successfully tokenized but had another error in it (e.g. invalid Vc).
 */
export function buildCombinationReferential(
  word: string,
  stress: Stress,
): PartialReferential | undefined {
  const match = combinationReferential.exec(word)

  if (match == null) {
    return
  }

  const case1 = parseCase(VowelForm.parseOrThrow(match[3]!))

  const specification: Specification =
    match[4] == "xx"
      ? "OBJ"
      : match[4] == "xt"
      ? "CTE"
      : match[4] == "xp"
      ? "CSV"
      : "BSC"

  const affixes = match[5] ? parseAffixes(match[5]) : undefined

  const case2 =
    !match[6] || match[6] == "a"
      ? undefined
      : match[6] == "üa"
      ? "THM"
      : parseCase(VowelForm.parseOrThrow(match[6]))

  if (match[1]) {
    return {
      type:
        match[1] == "hm"
          ? "QUO"
          : match[1] == "hn"
          ? "NAM"
          : match[1] == "hň"
          ? "PHR"
          : "CAR",
      case: case1,
      case2,
      specification,
      affixes,
      essence: stress == "ultimate" ? "RPV" : undefined,
    }
  } else {
    const [referents, perspective] = parseReferentListAndPerspective(
      match[2]!,
      false,
    )

    return {
      referents,
      perspective,
      case: case1,
      case2,
      specification,
      affixes,
      essence: stress == "ultimate" ? "RPV" : undefined,
    }
  }
}
