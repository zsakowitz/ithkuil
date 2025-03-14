import {
  BIAS_ITHKUIL_TO_ADJUNCT_MAP,
  type BiasAdjunct,
} from "../../generate/adjunct/bias.js"
import { DCLeaf, DCStress, DCWord } from "../decompose.js"
import { biasAdjunct } from "../lex/adjunct/bias.js"

/**
 * Builds a bias adjunct.
 *
 * @param word The word to be built.
 * @returns Either a parsed `BiasAdjunct` indicating a success, or `undefined`
 *   indicating a tokenization failure. Throws if the adjunct was successfully
 *   tokenized but had another error in it (e.g. invalid bias).
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

/**
 * Decomposes a bias adjunct.
 *
 * @param word The word to be decomposed.
 * @returns Either a parsed array of decompositions indicating a success, or
 *   `undefined` indicating a tokenization failure. Throws if the adjunct was
 *   successfully tokenized but had another error in it (e.g. invalid bias).
 */
export function dcBiasAdjunct(word: string): DCWord<"adjBias"> | undefined {
  const match = biasAdjunct.exec(word)

  if (!match) {
    return
  }

  if (Object.hasOwn(BIAS_ITHKUIL_TO_ADJUNCT_MAP, match[0])) {
    return new DCWord(
      "adjBias",
      new DCStress("zerosyllabic", null),
      new DCLeaf(
        match[0],
        "Cb",
        "bias",
        BIAS_ITHKUIL_TO_ADJUNCT_MAP[
          match[0] as keyof typeof BIAS_ITHKUIL_TO_ADJUNCT_MAP
        ],
      ),
    )
  }

  throw new Error("Unknown Bias: " + match[0] + ".")
}
