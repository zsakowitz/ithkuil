import type { NumericAdjunct } from "../../generate/adjunct/numeric.js"
import { n } from "../lex/forms.js"

/**
 * Builds a numeric adjunct.
 * @param word The word to be built.
 * @returns Either a parsed `NumericAdjunct` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the adjunct was
 * successfully tokenized but had another error in it (e.g. invalid number).
 */
export function buildNumericAdjunct(word: string): NumericAdjunct | undefined {
  const match = n.exec(word)

  if (!match) {
    return
  }

  return BigInt(match[0])
}
