import { deepFreeze } from "../helpers/deep-freeze.js"

/** A parsing adjunct. */
export type ParsingAdjunct =
  | "monosyllabic"
  | "ultimate"
  | "penultimate"
  | "antepenultimate"

/** An array containing all parsing adjuncts. */
export const ALL_PARSING_ADJUNCTS: readonly ParsingAdjunct[] =
  /* @__PURE__ */ deepFreeze([
    "monosyllabic",
    "ultimate",
    "penultimate",
    "antepenultimate",
  ])

/** An object mapping from parsing adjuncts to their Ithkuilic translations. */
export const PARSING_ADJUNCT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  monosyllabic: "a'",
  ultimate: "e'",
  penultimate: "o'",
  antepenultimate: "u'",
})

/**
 * Converts a parsing adjunct into Ithkuil.
 * @param adjunct The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function parsingAdjunctToIthkuil(adjunct: ParsingAdjunct) {
  return PARSING_ADJUNCT_TO_ITHKUIL_MAP[adjunct]
}
