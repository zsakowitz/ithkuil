import { deepFreeze } from "../../helpers/deep-freeze.js"

/** The type of a suppletive adjunct. */
export type SuppletiveAdjunctType = "CAR" | "QUO" | "NAM" | "PHR"

/** An array containing all suppletive adjunct types. */
export const ALL_SUPPLETIVE_ADJUNCT_TYPES: readonly SuppletiveAdjunctType[] =
  /* @__PURE__ */ deepFreeze(["CAR", "QUO", "NAM", "PHR"])

/**
 * An object mapping from suppletive adjunct types to their Ithkuilic
 * translations.
 */
export const SUPPLETIVE_ADJUNCT_TYPE_TO_ITHKUIL_MAP =
  /* @__PURE__ */ deepFreeze({
    CAR: "hl",
    QUO: "hm",
    NAM: "hn",
    PHR: "hň",
  })

/** An object mapping from suppletive adjunct types to their names. */
export const SUPPLETIVE_ADJUNCT_TYPE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  CAR: "Carrier",
  QUO: "Quotative",
  NAM: "Naming",
  PHR: "Phrasal",
})

/**
 * Converts a suppletive adjunct type into Ithkuil.
 * @param type The suppletive adjunct type to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct type.
 */
export function suppletiveAdjunctTypeToIthkuil(type: SuppletiveAdjunctType) {
  return SUPPLETIVE_ADJUNCT_TYPE_TO_ITHKUIL_MAP[type]
}
