import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A phase. */
export type Phase =
  | "PUN"
  | "ITR"
  | "REP"
  | "ITM"
  | "RCT"
  | "FRE"
  | "FRG"
  | "VAC"
  | "FLC"

/** An array containing all phases. */
export const ALL_PHASES: readonly Phase[] = /* @__PURE__ */ deepFreeze([
  "PUN",
  "ITR",
  "REP",
  "ITM",
  "RCT",
  "FRE",
  "FRG",
  "VAC",
  "FLC",
])

/** An object mapping phases to their Ithkuilic translations. */
export const PHASE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  PUN: "ai",
  ITR: "au",
  REP: "ei",
  ITM: "eu",
  RCT: "ëu",
  FRE: "ou",
  FRG: "oi",
  VAC: "iu",
  FLC: "ui",
})

/** An object mapping phases to their names. */
export const PHASE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  PUN: "Punctual",
  ITR: "Iterative",
  REP: "Repetitive",
  ITM: "Intermittent",
  RCT: "Recurrent",
  FRE: "Frequentative",
  FRG: "Fragmentative",
  VAC: "Vacillitative",
  FLC: "Fluctuative",
})

/**
 * Converts a phase into Ithkuil.
 *
 * @param phase The phase to be converted.
 * @returns Romanized Ithkuilic text representing the phase.
 */
export function phaseToIthkuil(phase: Phase) {
  return PHASE_TO_ITHKUIL_MAP[phase]
}
