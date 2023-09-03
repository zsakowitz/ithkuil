import { has } from "../helpers/has.js"
import {
  affixualAdjunctToIthkuil,
  type AffixualAdjunct,
} from "./affixual/index.js"
import {
  ALL_BIAS_ADJUNCTS,
  biasAdjunctToIthkuil,
  type BiasAdjunct,
} from "./bias.js"
import {
  modularAdjunctToIthkuil,
  type ModularAdjunct,
} from "./modular/index.js"
import { numericAdjunctToIthkuil, type NumericAdjunct } from "./numeric.js"
import {
  ALL_PARSING_ADJUNCTS,
  parsingAdjunctToIthkuil,
  type ParsingAdjunct,
} from "./parsing.js"
import {
  ALL_REGISTER_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  registerAdjunctToIthkuil,
  singleRegisterAdjunctToIthkuil,
  type RegisterAdjunct,
  type SingleRegisterAdjunct,
} from "./register.js"
import {
  suppletiveAdjunctToIthkuil,
  type SuppletiveAdjunct,
} from "./suppletive/index.js"

export * from "./affixual/index.js"
export * from "./bias.js"
export * from "./modular/index.js"
export * from "./numeric.js"
export * from "./parsing.js"
export * from "./register.js"
export * from "./suppletive/index.js"

/** A general adjunct. */
export type Adjunct =
  | AffixualAdjunct
  | BiasAdjunct
  | ModularAdjunct
  | NumericAdjunct
  | ParsingAdjunct
  | RegisterAdjunct
  | SingleRegisterAdjunct
  | SuppletiveAdjunct

/** An adjunct other than a non-single {@link RegisterAdjunct}. */
export type PlainAdjunct =
  | AffixualAdjunct
  | BiasAdjunct
  | ModularAdjunct
  | NumericAdjunct
  | ParsingAdjunct
  | SingleRegisterAdjunct
  | SuppletiveAdjunct

/**
 * Converts an adjunct into Ithkuil.
 * @param adjunct The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 *
 * Note that for non-single register adjuncts, this returns a string of the form
 * "X ... Y", "... X", or "...", depending on the adjunct type. For all other
 * adjuncts, this function returns exactly what you would expect.
 */
export function adjunctToIthkuil(adjunct: Adjunct): string {
  if (typeof adjunct == "number" || typeof adjunct == "bigint") {
    return numericAdjunctToIthkuil(adjunct)
  }

  if (typeof adjunct == "string") {
    if (has(ALL_BIAS_ADJUNCTS, adjunct)) {
      return biasAdjunctToIthkuil(adjunct)
    }

    if (has(ALL_PARSING_ADJUNCTS, adjunct)) {
      return parsingAdjunctToIthkuil(adjunct)
    }

    if (has(ALL_SINGLE_REGISTER_ADJUNCTS, adjunct)) {
      return singleRegisterAdjunctToIthkuil(adjunct)
    }

    if (has(ALL_REGISTER_ADJUNCTS, adjunct)) {
      const [initial, final] = registerAdjunctToIthkuil(adjunct)

      return (initial ? initial + " " : "") + "..." + (final ? " " + final : "")
    }

    throw new Error("Unrecognized adjunct: '" + adjunct + "'.")
  }

  if ("affixes" in adjunct && adjunct.affixes) {
    return affixualAdjunctToIthkuil(adjunct)
  }

  if ("vn1" in adjunct && adjunct.vn1) {
    return modularAdjunctToIthkuil(adjunct)
  }

  if ("type" in adjunct && adjunct.type) {
    return suppletiveAdjunctToIthkuil(adjunct)
  }

  throw new Error("Unrecognized adjunct: '" + adjunct + "'.", {
    cause: adjunct,
  })
}
