import {
  SINGLE_REGISTER_ITHKUIL_TO_ADJUNCT_MAP,
  type SingleRegisterAdjunct,
} from "../../generate/adjunct/register.js"
import { registerAdjunct } from "../lex/adjunct/register.js"

/**
 * Builds a register adjunct.
 * @param word The word to be built.
 * @returns Either a parsed `SingleRegisterAdjunct` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the adjunct was
 * successfully tokenized but had another error in it (e.g. invalid register).
 */
export function buildRegisterAdjunct(
  word: string,
): SingleRegisterAdjunct | undefined {
  const match = registerAdjunct.exec(word)

  if (!match) {
    return
  }

  if (Object.hasOwn(SINGLE_REGISTER_ITHKUIL_TO_ADJUNCT_MAP, match[0])) {
    return SINGLE_REGISTER_ITHKUIL_TO_ADJUNCT_MAP[
      match[0] as keyof typeof SINGLE_REGISTER_ITHKUIL_TO_ADJUNCT_MAP
    ]
  }

  throw new Error("Unknown Register: " + match[0] + ".")
}
