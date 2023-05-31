import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A valence. */
export type Valence =
  | "MNO"
  | "PRL"
  | "CRO"
  | "RCP"
  | "CPL"
  | "DUP"
  | "DEM"
  | "CNG"
  | "PTI"

/** An array containing all valences. */
export const ALL_VALENCES: readonly Valence[] = [
  "MNO",
  "PRL",
  "CRO",
  "RCP",
  "CPL",
  "DUP",
  "DEM",
  "CNG",
  "PTI",
]

/** A Zod validator matching valences. */
export const zodValence = /* @__PURE__ */ new Enum(ALL_VALENCES)

/** An object mapping from valences to their Ithkuilic translations. */
export const VALENCE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  MNO: "a",
  PRL: "ä",
  CRO: "e",
  RCP: "i",
  CPL: "ëi",
  DUP: "ö",
  DEM: "o",
  CNG: "ü",
  PTI: "u",
})

/** An object mapping from valences to their names. */
export const VALENCE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  MNO: "Monoactive",
  PRL: "Parallel",
  CRO: "Corollary",
  RCP: "Reciprocal",
  CPL: "Complementary",
  DUP: "Duplicative",
  DEM: "Demonstrative",
  CNG: "Contingent",
  PTI: "Participatory",
})

/**
 * Converts a valence into Ithkuil.
 * @param valence The valence to be converted.
 * @param omitDefaultValence Whether MNO valence should be omitted.
 * @returns Romanized Ithkuilic text representing the valence.
 */
export function valenceToIthkuil(
  valence: Valence,
  omitDefaultValence: boolean,
): string {
  if (omitDefaultValence && valence == "MNO") {
    return ""
  }

  return VALENCE_TO_ITHKUIL_MAP[valence]
}
