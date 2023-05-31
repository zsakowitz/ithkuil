import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A level. */
export type Level =
  | "MIN"
  | "SBE"
  | "IFR"
  | "DFT"
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
  "DFT",
  "EQU",
  "SUR",
  "SPL",
  "SPQ",
  "MAX",
])

/** A Zod validator matching levels. */
export const zodLevel = /* @__PURE__ */ new Enum(ALL_LEVELS)

/** An object mapping levels to their Ithkuilic translations. */
export const LEVEL_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  MIN: "ao",
  SBE: "aö",
  IFR: "eo",
  DFT: "eö",
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
  DFT: "Deficient",
  EQU: "Equative",
  SUR: "Surpassive",
  SPL: "Superlative",
  SPQ: "Superequative",
  MAX: "Maximal",
})

/**
 * Converts a level into Ithkuil.
 * @param level The level to be converted.
 * @returns Romanized Ithkuilic text representing the level.
 */
export function levelToIthkuil(level: Level) {
  return LEVEL_TO_ITHKUIL_MAP[level]
}
