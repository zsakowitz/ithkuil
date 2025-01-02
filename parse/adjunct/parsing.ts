import type { ParsingAdjunct } from "../../generate/adjunct/parsing.js"
import { parsingAdjunct } from "../lex/adjunct/parsing.js"

/**
 * Builds a parsing adjunct.
 *
 * @param word The word to be built.
 * @returns Either a parsed `ParsingAdjunct` indicating a success, or
 *   `undefined` indicating a tokenization failure. Throws if the adjunct was
 *   successfully tokenized but had another error in it.
 */
export function buildParsingAdjunct(word: string): ParsingAdjunct | undefined {
  const match = parsingAdjunct.exec(word)

  if (!match) {
    return
  }

  return (
    {
      "a'": "monosyllabic",
      "e'": "ultimate",
      "o'": "penultimate",
      "u'": "antepenultimate",
    } as const
  )[match[0]]!
}
