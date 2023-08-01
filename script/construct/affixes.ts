import {
  ALL_ASPECTS,
  ALL_EFFECTS,
  ALL_LEVELS,
  ALL_PHASES,
  ALL_VALENCES,
  has,
  type Affix,
  type AffixDegree,
  type VN,
} from "../../index.js"

/** The Cs form for the Valence affix. */
export const VAL = "żk"

/** The Cs form for the Phase affix. */
export const PHS = "bž"

/** The Cs form for the Effect affix. */
export const EFE = "m"

/**
 * The Cs form for the Level affix.
 * Type-1 denotes relative levels, type-2 denotes absolute levels.
 */
export const LVL = "řž"

/** The Cs form for the Aspects 1 affix. */
export const AP1 = "mc"

/** The Cs form for the Aspects 2 affix. */
export const AP2 = "mč"

/** The Cs form for the Aspects 3 affix. */
export const AP3 = "mż"

/** The Cs form for the Aspects 4 affix. */
export const AP4 = "mj"

/**
 * The Cs form for the Mood/Case-Scope affix.
 * 1-5 are moods, 6-9 are case-scopes, and 0 is CCV.
 */
export const MCS = "bż"

/**
 * The Cs form for the Illocution/Validation affix.
 * Type-1 = illocution, type-2 = validation.
 */
export const IVL = "nļ"

/**
 * Converts a Vn form into an affix.
 * @param vn The Vn form to be converted.
 * @returns The Vn form as an affix.
 */
export function vnToAffix(vn: VN): Affix {
  if (has(ALL_VALENCES, vn)) {
    return {
      cs: VAL,
      degree: (ALL_VALENCES.indexOf(vn) + 1) as AffixDegree,
      type: 1,
    }
  }

  if (has(ALL_PHASES, vn)) {
    return {
      cs: PHS,
      degree: (ALL_PHASES.indexOf(vn) + 1) as AffixDegree,
      type: 1,
    }
  }

  if (has(ALL_EFFECTS, vn)) {
    return {
      cs: EFE,
      degree: (ALL_EFFECTS.indexOf(vn) + 1) as AffixDegree,
      type: 1,
    }
  }

  if (has(ALL_LEVELS, vn)) {
    return {
      cs: LVL,
      degree: (ALL_LEVELS.indexOf(vn) + 1) as AffixDegree,
      type: 1,
    }
  }

  const index = ALL_ASPECTS.indexOf(vn)

  return {
    cs: [AP1, AP2, AP3, AP4][Math.floor(index / 9)]!,
    degree: ((index % 9) + 1) as AffixDegree,
    type: 1,
  }
}
