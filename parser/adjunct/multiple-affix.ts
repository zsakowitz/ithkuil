import type { AffixualAdjunct } from "../../generator/adjunct/affixual/index.js"
import type { Affix } from "../../generator/affix/index.js"
import { parseAffix } from "../formative/affix.js"
import { multipleAffixAffixualAdjunct } from "../lex/adjunct/multiple-affix.js"
import type { Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"

const AFFIX_REGEX = /([aeiouäëöü']+)([^aeiouäëöü']+)/g

function parseAffixes(text: string) {
  if (text == "") {
    return []
  }

  const output: Affix[] = []

  let match

  while ((match = AFFIX_REGEX.exec(text))) {
    output.push(parseAffix(VowelForm.parseOrThrow(match[1]!), match[2]!, false))
  }

  return output
}

const CZ_TO_SCOPE_MAP = {
  h: "V:DOM",
  "'h": "V:SUB",
  "'hl": "VII:DOM",
  "'hr": "VII:SUB",
  hw: "FORMATIVE",
  "'hw": "ADJACENT",
} as const

const VZ_TO_SCOPE_MAP = {
  undefined: undefined,
  a: "V:DOM",
  u: "V:SUB",
  e: "VII:DOM",
  i: "VII:SUB",
  o: "FORMATIVE",
  ö: "ADJACENT",
  ai: undefined,
} as const

/**
 * Builds a multiple-affix affixual adjunct.
 * @param word The word to be built.
 * @param stress The stress of the adjunct.
 * @returns Either a parsed `AffixualAdjunct` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the adjunct was
 * successfully tokenized but had another error in it (e.g. invalid Cs slot,
 * etc.).
 */
export function buildMultipleAffixAffixualAdjunct(
  word: string,
  stress: Stress,
): AffixualAdjunct | undefined {
  const match = multipleAffixAffixualAdjunct.exec(word)

  if (!match) {
    return
  }

  const vx = VowelForm.parseOrThrow(match[2]!)

  let cz: string

  if (vx.hasGlottalStop) {
    cz = "'" + match[3]
  } else {
    if (match[3] == "h" || match[3] == "hw") {
      cz = match[3]
    } else {
      throw new Error("Invalid Cz slot: " + match[3] + ".")
    }
  }

  const affixes = parseAffixes(match[4]!)

  affixes.unshift(parseAffix(vx, match[1]!, false))

  return {
    affixes: affixes as [Affix, ...Affix[]],
    scope: CZ_TO_SCOPE_MAP[cz as keyof typeof CZ_TO_SCOPE_MAP],
    scope2: VZ_TO_SCOPE_MAP[match[5] as keyof typeof VZ_TO_SCOPE_MAP],
    appliesToConcatenatedStemOnly: stress == "ultimate",
  }
}
