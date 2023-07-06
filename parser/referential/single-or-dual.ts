import type { PartialReferential } from "../../generator/referential/referential.js"
import { parseCase } from "../formative/case.js"
import { singleOrDualReferential } from "../lex/referential/single-or-dual.js"
import type { Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"
import { parseReferentListAndPerspective } from "./referent-list.js"

/**
 * Builds a single or dual referential.
 * @param word The word to be built.
 * @returns Either a parsed `PartialReferential` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the adjunct was
 * successfully tokenized but had another error in it (e.g. invalid Vc).
 */
export function buildSingleOrDualReferential(
  word: string,
  stress: Stress,
): PartialReferential | undefined {
  const match = singleOrDualReferential.exec(word)

  if (match == null) {
    return
  }

  const case1 = parseCase(VowelForm.parseOrThrow(match[3]!))

  const case2 = match[4]
    ? parseCase(VowelForm.parseOrThrow(match[4]))
    : undefined

  const [referents2, perspective2] = match[5]
    ? parseReferentListAndPerspective(match[5])
    : [undefined, undefined]

  const essence = stress == "ultimate" ? "RPV" : undefined

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
      // @ts-ignore We're not passing `specification` or `affixes`.
      referents2,
      // @ts-ignore We're not passing `specification` or `affixes`.
      perspective2,
      essence,
    }
  } else {
    const [referents, perspective] = parseReferentListAndPerspective(
      match[2]!.replace(/ë/g, ""),
    )

    return {
      referents,
      perspective,
      case: case1,
      case2,
      referents2,
      // Wrong type cast here, but TS gets angry otherwise and this is perfectly
      // fine. *says as a great blue square knocks on the door with a red
      // underline in hand.*
      perspective2: perspective2 as undefined,
      essence,
    }
  }
}
