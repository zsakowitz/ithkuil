import { deepFreeze } from "../helpers/deep-freeze.js"

/** An affiliation. */
export type Affiliation = "CSL" | "COA" | "ASO" | "VAR"

/** An array containing all affiliations. */
export const ALL_AFFILIATIONS: readonly Affiliation[] =
  /* @__PURE__ */ deepFreeze(["CSL", "COA", "ASO", "VAR"])

/** An object mapping affiliations to their names. */
export const AFFILIATION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  CSL: "Consolidative",
  COA: "Coalescent",
  ASO: "Associative",
  VAR: "Variative",
})

/** An object mapping affiliations to their Ithkuilic translations. */
export const AFFILIATION_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  CSL: ["", ""],
  COA: ["r", "rļ"],
  ASO: ["l", "nļ"],
  VAR: ["ř", "ň"],
})

/**
 * Converts an affiliation into Ithkuil.
 * @param affiliation The affiliation to be converted.
 * @param isStandalone Whether the affiliation is the only affix present in the
 * Ca affix complex.
 * @returns Romanized Ithkuilic text representing the affiliation.
 */
export function affiliationToIthkuil(
  affiliation: Affiliation,
  isStandalone: boolean,
): string {
  return AFFILIATION_TO_ITHKUIL_MAP[affiliation][+isStandalone as 0 | 1]
}
