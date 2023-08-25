import {
  ALL_ASPECTS,
  ALL_EFFECTS,
  ALL_LEVELS,
  ALL_PHASES,
  ALL_VALENCES,
  ASPECT_TO_NAME_MAP,
  EFFECT_TO_NAME_MAP,
  has,
  LEVEL_TO_NAME_MAP,
  PHASE_TO_NAME_MAP,
  VALENCE_TO_NAME_MAP,
  type VN,
} from "../generate/index.js"
import { asGloss, GlossString } from "./glossable.js"

/**
 * Glosses a Vn form.
 * @param vn The Vn form to be glossed.
 * @returns A `GlossString` representing the Vn form.
 */
export function glossVn(vn: VN) {
  if (has(ALL_VALENCES, vn)) {
    return new GlossString(vn, asGloss(VALENCE_TO_NAME_MAP[vn]))
  }

  if (has(ALL_PHASES, vn)) {
    return new GlossString(vn, asGloss(PHASE_TO_NAME_MAP[vn]))
  }

  if (has(ALL_EFFECTS, vn)) {
    return new GlossString(vn, asGloss(EFFECT_TO_NAME_MAP[vn]))
  }

  if (has(ALL_LEVELS, vn)) {
    return new GlossString(vn, asGloss(LEVEL_TO_NAME_MAP[vn]))
  }

  if (has(ALL_ASPECTS, vn)) {
    return new GlossString(vn, asGloss(ASPECT_TO_NAME_MAP[vn]))
  }

  throw new Error("Invalid Vn form: '" + vn + "'.")
}
