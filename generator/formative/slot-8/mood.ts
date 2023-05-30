import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A mood. */
export type Mood = "FAC" | "SUB" | "ASM" | "SPC" | "COU" | "HYP"

/** An array containing all moods. */
export const ALL_MOODS: readonly Mood[] = /* @__PURE__ */ deepFreeze([
  "FAC",
  "SUB",
  "ASM",
  "SPC",
  "COU",
  "HYP",
])

/** An object mapping moods to their Ithkuilic translations. */
export const MOOD_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  /**
   * The `false` branch is used when the mood occurs after non-aspectual Vn
   * forms.
   */
  false: {
    FAC: "h",
    SUB: "hl",
    ASM: "hr",
    SPC: "hm",
    COU: "hn",
    HYP: "hň",
  },

  /**
   * The `true` branch is used when the mood occurs after aspectual Vn forms.
   */
  true: {
    FAC: "w",
    SUB: "hw",
    ASM: "hrw",
    SPC: "hmw",
    COU: "hnw",
    HYP: "hňw",
  },
})

/** An object mapping moods to their names. */
export const MOOD_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  FAC: "Factual",
  SUB: "Subjunctive",
  ASM: "Assumptive",
  SPC: "Speculative",
  COU: "Counterfactive",
  HYP: "Hypothetical",
})

/**
 * Converts a mood into Ithkuil.
 * @param mood The mood to be converted.
 * @param vnType The type of Vn form associated with this mood. Use "aspect"
 * when Vn contains an aspect, "non-aspect" when it contains a non-aspect, and
 * "empty" when it has been elided due to the use of MNO valence.
 * @returns Romanized Ithkuilic text representing the mood.
 */
export function moodToIthkuil(
  mood: Mood,
  vnType: "aspect" | "non-aspect" | "empty"
) {
  const value = MOOD_TO_ITHKUIL_MAP[`${vnType == "aspect"}`][mood]

  if (value == "h" && vnType == "empty") {
    return ""
  }

  return value
}
