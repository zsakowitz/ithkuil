import {
  BIAS_ITHKUIL_TO_ADJUNCT_MAP,
  type BiasAdjunct,
} from "../../generate/adjunct/bias.js"
import { biasAdjunct } from "../lex/adjunct/bias.js"

/**
 * Builds a bias adjunct.
 * @param word The word to be built.
 * @returns Either a parsed `BiasAdjunct` indicating a success, or `undefined`
 * indicating a tokenization failure. Throws if the adjunct was successfully
 * tokenized but had another error in it (e.g. invalid bias).
 */
export function buildBiasAdjunct(word: string): BiasAdjunct | undefined {
  const match = biasAdjunct.exec(word)

  if (!match) {
    return
  }

  if (Object.hasOwn(BIAS_ITHKUIL_TO_ADJUNCT_MAP, match[0])) {
    return BIAS_ITHKUIL_TO_ADJUNCT_MAP[
      match[0] as keyof typeof BIAS_ITHKUIL_TO_ADJUNCT_MAP
    ]
  }

  throw new Error("Unknown Bias: " + match[0] + ".")
}
