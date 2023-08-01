import { transformWord } from "../transform.js"
import { buildCombinationReferential } from "./combination.js"
import { buildSingleOrDualReferential } from "./single-or-dual.js"

export * from "./combination.js"
export * from "./referent-list.js"
export * from "./single-or-dual.js"

/**
 * Parses a referential.
 * @param text The referential to be parsed.
 * @returns The parsed referential, or `undefined` if the referential failed to
 * tokenize. Throws an error if the referential successfully tokenized but had
 * another error (e.g. invalid Vc slot).
 */
export function parseReferential(text: string) {
  const { word, stress } = transformWord(text)

  return (
    buildSingleOrDualReferential(word, stress) ||
    buildCombinationReferential(word, stress)
  )
}
