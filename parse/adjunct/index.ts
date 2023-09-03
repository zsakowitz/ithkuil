import type { PlainAdjunct } from "../../generate/adjunct/index.js"
import { transformWord } from "../transform.js"
import { buildBiasAdjunct } from "./bias.js"
import { buildModularAdjunct } from "./modular.js"
import { buildMultipleAffixAffixualAdjunct } from "./multiple-affix.js"
import { buildNumericAdjunct } from "./numeric.js"
import { buildParsingAdjunct } from "./parsing.js"
import { buildRegisterAdjunct } from "./register.js"
import { buildSingleAffixAffixualAdjunct } from "./single-affix.js"
import { buildSuppletiveAdjunct } from "./suppletive.js"

export * from "./bias.js"
export * from "./modular.js"
export * from "./multiple-affix.js"
export * from "./numeric.js"
export * from "./parsing.js"
export * from "./register.js"
export * from "./single-affix.js"
export * from "./suppletive.js"

/**
 * Parses an adjunct.
 * @param text The adjunct to be parsed.
 * @returns The parsed adjunct, or `undefined` if the adjunct failed to
 * tokenize. Throws an error if the adjunct successfully tokenized but had
 * another error.
 */
export function parseAdjunct(text: string): PlainAdjunct | undefined {
  const { word, stress } = transformWord(text)

  return (
    buildBiasAdjunct(word) ||
    buildNumericAdjunct(word) ||
    buildParsingAdjunct(word) ||
    buildRegisterAdjunct(word) ||
    buildSuppletiveAdjunct(word) ||
    buildModularAdjunct(word, stress) ||
    buildSingleAffixAffixualAdjunct(word, stress) ||
    buildMultipleAffixAffixualAdjunct(word, stress)
  )
}
