import { deepFreeze } from "../helpers/deep-freeze.js"

/** A register adjunct. */
export type RegisterAdjunct =
  | "NRR"
  | "DSV"
  | "PNT"
  | "SPF"
  | "EXM"
  | "CGT"
  | "END"

/** An array containing all register adjuncts. */
export const ALL_REGISTER_ADJUNCTS: readonly RegisterAdjunct[] =
  /* @__PURE__ */ deepFreeze(["NRR", "DSV", "PNT", "SPF", "EXM", "CGT", "END"])

/**
 * An object mapping from all register adjuncts to their Ithkuilic translations.
 */
export const REGISTER_ADJUNCT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  NRR: ["", ""] as [start: "", end: ""],
  DSV: ["ha", "hai"] as [start: "ha", end: "hai"],
  PNT: ["he", "hei"] as [start: "he", end: "hei"],
  SPF: ["hi", "hiu"] as [start: "hi", end: "hiu"],
  EXM: ["ho", "hoi"] as [start: "ho", end: "hoi"],
  CGT: ["hu", "hui"] as [start: "hu", end: "hui"],
  END: ["", "hü"] as [start: "", end: "hü"],
})

/** An object mapping from all register adjuncts to their names. */
export const REGISTER_ADJUNCT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  NRR: "Narrative",
  DSV: "Discursive",
  PNT: "Parenthetical",
  SPF: "Specificative",
  EXM: "Exemplificative",
  CGT: "Cogitant",
  END: "Carrier-End",
})

/** An object mapping from all register adjuncts to descriptions of them. */
export const REGISTER_ADJUNCT_TO_DESCRIPTION_MAP = /* @__PURE__ */ deepFreeze({
  NRR: "default register",
  DSV: "direct speech",
  PNT: "parenthetical aside",
  SPF: "proper name of preceding referent",
  EXM: "“For example, ...”",
  CGT: "silent/subjective thoughts",
  END: "end of term/phrase governed by carrier stem/adjunct",
})

/**
 * Converts a register adjunct into Ithkuil.
 * @param adjunct The adjunct to be converted.
 * @returns An array with two strings of romanized Ithkuilic text. The first is
 * the beginning adjunct; the second is the final adjunct.
 */
export function registerAdjunctToIthkuil(
  adjunct: RegisterAdjunct
): readonly [start: string, end: string] {
  return REGISTER_ADJUNCT_TO_ITHKUIL_MAP[adjunct]
}
