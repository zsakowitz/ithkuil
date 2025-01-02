import type { Mood } from "../../generate/formative/slot-8/mood.js"
import { deepFreezeAndNullPrototype } from "../../generate/helpers/deep-freeze.js"

const CN_TO_MOOD = /* @__PURE__ */ deepFreezeAndNullPrototype({
  h: "FAC",
  hl: "SUB",
  hr: "ASM",
  hm: "SPC",
  hn: "COU",
  hň: "HYP",
})

const CN_TO_ASPECTUAL_MOOD = /* @__PURE__ */ deepFreezeAndNullPrototype({
  w: "FAC",
  y: "FAC",
  hw: "SUB",
  hrw: "ASM",
  hmw: "SPC",
  hnw: "COU",
  hňw: "HYP",
})

/**
 * Parsed a Cn form as a mood.
 *
 * @param cn The Cn form to be parsed.
 * @returns An array containing the parsed mood and a boolean value indicating
 *   whether the mood indicates the corresponding Vn form is an aspect.
 */
export function parseMood(cn: string): [mood: Mood, isAspectual: boolean] {
  if (cn in CN_TO_MOOD) {
    return [CN_TO_MOOD[cn as keyof typeof CN_TO_MOOD], false]
  }

  if (cn in CN_TO_ASPECTUAL_MOOD) {
    return [CN_TO_ASPECTUAL_MOOD[cn as keyof typeof CN_TO_ASPECTUAL_MOOD], true]
  }

  throw new Error("Invalid Cn: '" + cn + "'.")
}
