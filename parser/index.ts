import type {
  PartialFormative,
  PartialReferential,
  PlainAdjunct,
} from "../generator/index.js"
import { parseAdjunct } from "./adjunct/index.js"
import { parseFormative } from "./formative/index.js"
import { parseReferential } from "./referential/index.js"

export * from "./adjunct/index.js"
export * from "./formative/index.js"
export * from "./lex/index.js"
export * from "./referential/index.js"
export * from "./transform.js"
export * from "./vowel-form.js"

/**
 * Parses an Ithkuilic word into a JavaScript object.
 * @param word The word to be parsed.
 * @returns Either a `PartialFormative`, `PartialReferential`, or `PlainAdjunct`
 * representing a success or `undefined` representing a failed tokenization.
 * Throws an error if the word was parsed successfully but had another error
 * (e.g. invalid Vk slot, invalid Cn slot, etc.).
 */
export function parseWord(
  word: string,
): PartialFormative | PartialReferential | PlainAdjunct | undefined {
  return parseReferential(word) || parseAdjunct(word) || parseFormative(word)
}
