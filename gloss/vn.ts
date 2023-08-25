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
import { GlossString } from "./glossable.js"

export function glossVn(vn: VN) {
  if (has(ALL_ASPECTS, vn)) {
    return new GlossString(vn, ASPECT_TO_NAME_MAP[vn].toLowerCase())
  }

  if (has(ALL_VALENCES, vn)) {
    return new GlossString(vn, VALENCE_TO_NAME_MAP[vn].toLowerCase())
  }

  if (has(ALL_PHASES, vn)) {
    return new GlossString(vn, PHASE_TO_NAME_MAP[vn].toLowerCase())
  }

  if (has(ALL_EFFECTS, vn)) {
    return new GlossString(vn, EFFECT_TO_NAME_MAP[vn].toLowerCase())
  }

  if (has(ALL_LEVELS, vn)) {
    return new GlossString(vn, LEVEL_TO_NAME_MAP[vn].toLowerCase())
  }

  return new GlossString("RTR", "retrospective")
}
