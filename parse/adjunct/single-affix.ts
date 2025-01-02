import type { AffixualAdjunct } from "../../generate/adjunct/affixual/index.js"
import { parseAffix } from "../formative/affix.js"
import { singleAffixAffixualAdjunct } from "../lex/adjunct/single-affix.js"
import type { Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"

const VS_TO_SCOPE_MAP = {
  undefined: undefined,
  a: "V:DOM",
  u: "V:SUB",
  e: "VII:DOM",
  i: "VII:SUB",
  o: "FORMATIVE",
  ö: "ADJACENT",
} as const

/**
 * Builds a single-affix affixual adjunct.
 *
 * @param word The word to be built.
 * @param stress The stress of the adjunct.
 * @returns Either a parsed `AffixualAdjunct` indicating a success, or
 *   `undefined` indicating a tokenization failure. Throws if the adjunct was
 *   successfully tokenized but had another error in it (e.g. invalid Cs slot,
 *   etc.).
 */
export function buildSingleAffixAffixualAdjunct(
  word: string,
  stress: Stress,
): AffixualAdjunct | undefined {
  const match = singleAffixAffixualAdjunct.exec(word)

  if (!match) {
    return
  }

  return {
    affixes: [parseAffix(VowelForm.parseOrThrow(match[1]!), match[2]!, false)],
    scope: VS_TO_SCOPE_MAP[match[3]! as "a" | "e" | "i" | "o" | "ö" | "u"],
    appliesToConcatenatedStemOnly: stress == "ultimate",
  }
}
