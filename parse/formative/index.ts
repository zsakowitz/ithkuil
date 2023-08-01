import { transformWord } from "../transform.js"
import {
  buildCnShortcutFormative,
  buildNonShortcutFormative,
  buildShortcutFormative,
} from "./formative.js"

export * from "./affix.js"
export * from "./ca.js"
export * from "./case-scope.js"
export * from "./case.js"
export * from "./formative.js"
export * from "./illocution-validation.js"
export * from "./mood.js"
export * from "./referential-affix.js"

const SHORTCUT_REGEX = /^(?:w|y|hl|hr|hm|hn)/

/**
 * Parses a formative.
 * @param text The formative to be parsed.
 * @returns The parsed formative, or `undefined` if the formative failed to
 * tokenize. Throws an error if the formative successfully tokenized but had
 * another error (e.g. the Vr slot had the value -üö-, or an affix contained the
 * Cs form -ç-).
 */
export function parseFormative(text: string) {
  const { word, stress } = transformWord(text)

  return SHORTCUT_REGEX.test(word)
    ? buildShortcutFormative(word, stress)
    : buildCnShortcutFormative(word, stress) ||
        buildNonShortcutFormative(word, stress)
}
