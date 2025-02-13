import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A level. */
export type Level =
  | "MIN"
  | "SBE"
  | "IFR"
  | "DFC"
  | "EQU"
  | "SUR"
  | "SPL"
  | "SPQ"
  | "MAX"

/** An array containing all levels. */
export const ALL_LEVELS: readonly Level[] = /* @__PURE__ */ deepFreeze([
  "MIN",
  "SBE",
  "IFR",
  "DFC",
  "EQU",
  "SUR",
  "SPL",
  "SPQ",
  "MAX",
])

/** An object mapping levels to their Ithkuilic translations. */
export const LEVEL_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  MIN: "ao",
  SBE: "aö",
  IFR: "eo",
  DFC: "eö",
  EQU: "oë",
  SUR: "öe",
  SPL: "oe",
  SPQ: "öa",
  MAX: "oa",
})

/** An object mapping levels to their names. */
export const LEVEL_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  MIN: "Minimal",
  SBE: "Subequative",
  IFR: "Inferior",
  DFC: "Deficient",
  EQU: "Equative",
  SUR: "Surpassive",
  SPL: "Superlative",
  SPQ: "Superequative",
  MAX: "Maximal",
})

/**
 * Converts a level into Ithkuil.
 *
 * @param level The level to be converted.
 * @returns Romanized Ithkuilic text representing the level.
 */
export function levelToIthkuil(level: Level) {
  return LEVEL_TO_ITHKUIL_MAP[level]
}
