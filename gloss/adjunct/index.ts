import {
  ALL_BIAS_ADJUNCTS,
  ALL_PARSING_ADJUNCTS,
  ALL_REGISTER_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  BIAS_ADJUNCT_TO_NAME_MAP,
  REGISTER_ADJUNCT_TO_NAME_MAP,
  has,
  type Adjunct,
  type RegisterAdjunct,
} from "../../generator/index.js"
import { GlossString } from "../glossable.js"

/**
 * Glosses an adjunct.
 * @param adjunct The adjunct to be glossed.
 * @returns A `GlossString` representing the adjunct.
 */
export function glossAdjunct(adjunct: Adjunct): GlossString {
  if (typeof adjunct == "string") {
    if (has(ALL_BIAS_ADJUNCTS, adjunct)) {
      return new GlossString(adjunct, BIAS_ADJUNCT_TO_NAME_MAP[adjunct])
    }

    if (has(ALL_PARSING_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct == "monosyllabic"
          ? "mono:"
          : adjunct == "ultimate"
          ? "ulti:"
          : adjunct == "antepenultimate"
          ? "ante:"
          : "penu:",
        adjunct,
      )
    }

    if (has(ALL_SINGLE_REGISTER_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct.endsWith(":START")
          ? adjunct.slice(0, 3) + " {"
          : "} " + adjunct.slice(0, 3),
        adjunct.endsWith(":START")
          ? REGISTER_ADJUNCT_TO_NAME_MAP[
              adjunct.slice(0, 3) as RegisterAdjunct
            ] + " {"
          : "} " +
            REGISTER_ADJUNCT_TO_NAME_MAP[
              adjunct.slice(0, 3) as RegisterAdjunct
            ],
      )
    }

    if (has(ALL_REGISTER_ADJUNCTS, adjunct)) {
      return new GlossString(adjunct, REGISTER_ADJUNCT_TO_NAME_MAP[adjunct])
    }

    throw new Error("Unrecognized adjunct: '" + adjunct + "'.")
  }

  if ("affixes" in adjunct && adjunct.affixes) {
    throw new Error("TODO:")
  }

  if ("vn1" in adjunct && adjunct.vn1) {
    throw new Error("TODO:")
  }

  if ("type" in adjunct && adjunct.type) {
    throw new Error("TODO:")
  }

  throw new Error("Unrecognized adjunct.")
}
