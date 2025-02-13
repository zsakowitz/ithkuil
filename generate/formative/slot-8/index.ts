import { has } from "../../helpers/has.js"
import { EMPTY, WithWYAlternative } from "../../helpers/with-wy-alternative.js"
import { ALL_ASPECTS, aspectToIthkuil, type Aspect } from "./aspect.js"
import { caseScopeToIthkuil, type CaseScope } from "./case-scope.js"
import { ALL_EFFECTS, effectToIthkuil, type Effect } from "./effect.js"
import { ALL_LEVELS, levelToIthkuil, type Level } from "./level.js"
import { FAC_CCN, MoodOrCaseScope } from "./mood-or-case-scope.js"
import { ALL_MOODS, moodToIthkuil, type Mood } from "./mood.js"
import { ALL_PHASES, phaseToIthkuil, type Phase } from "./phase.js"
import { ALL_VALENCES, valenceToIthkuil, type Valence } from "./valence.js"
import type { VNType } from "./vn-type.js"

export * from "./aspect.js"
export * from "./case-scope.js"
export * from "./effect.js"
export * from "./level.js"
export * from "./mood.js"
export * from "./phase.js"
export * from "./valence.js"
export * from "./vn-type.js"

/**
 * Categories able to be placed in a Vn slot, such as Valence, Phase, Effect,
 * Level, and Aspect.
 */
export type VN = Valence | Phase | Effect | Level | Aspect

/**
 * Non-aspectual categories able to be placed in a Vn slot, such as Valence,
 * Phase, Effect, and Level.
 */
export type NonAspectualVN = Valence | Phase | Effect | Level

/** Categories able to be placed in a Cn slot, such as Mood and Case-Scope. */
export type CN = Mood | CaseScope | MoodOrCaseScope

/** Information directly pertaining to Slot VIII. */
export type SlotVIII = {
  /** The Vn slot: a Valence, Phase, Effect, Level, or Aspect. */
  readonly vn: VN

  /** The Cn slot: a Mood or Case-Scope. */
  readonly cn: CN
}

/** Additional information relevant to Slot VIII. */
export type SlotVIIIMetadata = {
  /** Whether default MNO+FAC/CCN valence+mood/case-scope should be omitted. */
  readonly omitDefault: boolean
}

/**
 * Converts a Vn form into Ithkuil.
 *
 * @param vn The Vn form to be converted.
 * @param omitDefaultValence Whether default MNO valence should be omitted.
 * @returns Romanized Ithkuilic text representing the Vn form.
 */
export function vnToIthkuil(vn: VN, omitDefaultValence: boolean) {
  return (
    has(ALL_VALENCES, vn) ? valenceToIthkuil(vn, omitDefaultValence)
    : has(ALL_PHASES, vn) ? phaseToIthkuil(vn)
    : has(ALL_EFFECTS, vn) ? effectToIthkuil(vn)
    : has(ALL_LEVELS, vn) ? levelToIthkuil(vn)
    : aspectToIthkuil(vn)
  )
}

/**
 * Converts a Cn form into Ithkuil.
 *
 * @param cn The Cn form to be converted.
 * @param vnType The contents of Slot 8. Use "aspect" when Slot 8 contains an
 *   aspect, "non-aspect" when it contains a non-aspect, and "empty" when Slot 8
 *   has been elided due to the use of MNO valence.
 * @returns Romanized Ithkuilic text representing the Cn form.
 */
export function cnToIthkuil(cn: CN, vnType: VNType) {
  return (
    cn instanceof MoodOrCaseScope ?
      vnType == "empty" && cn == FAC_CCN ? ""
      : vnType == "aspect" ? cn.aspectualValue
      : cn.nonAspectualValue
    : has(ALL_MOODS, cn) ? moodToIthkuil(cn, vnType)
    : caseScopeToIthkuil(cn, vnType)
  )
}

/**
 * Converts Slot VIII into Ithkuil
 *
 * @param slot The Vn and Cn forms of the formative.
 * @param metadata Additional information relevant to Slot VIII.
 * @returns A `WithWYAlternative` containing romanized Ithkuilic text
 *   representing Slot VIII.
 */
export function slotVIIIToIthkuil(slot: SlotVIII, metadata: SlotVIIIMetadata) {
  if (
    metadata.omitDefault &&
    slot.vn == "MNO" &&
    (slot.cn == "CCN" || slot.cn == "FAC")
  ) {
    return EMPTY
  }

  const vn = vnToIthkuil(slot.vn, false)

  const vnType = has(ALL_ASPECTS, slot.vn) ? "aspect" : "non-aspect"

  const cn = cnToIthkuil(slot.cn, vnType)

  if (typeof vn == "string") {
    return WithWYAlternative.of(vn + cn)
  } else {
    return vn.add(cn)
  }
}
