import {
  ALL_ASPECTS,
  ALL_EFFECTS,
  ALL_LEVELS,
  ALL_PHASES,
  ALL_VALENCES,
  type Aspect,
  type NonAspectualVN,
} from "../../generate/formative/slot-8/index.js"
import type { VowelForm } from "../vowel-form.js"

const NON_ASPECTUAL_VNS = [
  undefined,
  ALL_VALENCES,
  ALL_PHASES,
  ALL_EFFECTS,
  ALL_LEVELS,
] as const

/**
 * Parses a Vn form as a non-aspect.
 * @param vn The Vn form to be parsed.
 * @returns The parsed Vn form.
 */
export function parseNonAspectualVn(vn: VowelForm): NonAspectualVN {
  if (vn.degree == 0) {
    throw new Error("Invalid Vn form: '" + vn + "'.")
  }

  return NON_ASPECTUAL_VNS[vn.sequence][vn.degree - 1]!
}

/**
 * Parses a Vn form as an Aspect.
 * @param vn The Vn form to be parsed.
 * @returns The parsed Vn form.
 */
export function parseAspect(vn: VowelForm): Aspect {
  if (vn.degree == 0) {
    throw new Error("Invalid Vn form: '" + vn + "'.")
  }

  return ALL_ASPECTS[(vn.sequence - 1) * 9 + (vn.degree - 1)]!
}
