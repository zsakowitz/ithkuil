import {
  ALL_ASPECTS,
  ALL_CASES,
  ALL_CASE_SCOPES,
  ALL_EFFECTS,
  ALL_ILLOCUTIONS,
  ALL_LEVELS,
  ALL_MOODS,
  ALL_PHASES,
  ALL_VALENCES,
  ALL_VALIDATIONS,
  has,
  type Affix,
  type AffixDegree,
  type Case,
  type CaseScope,
  type Illocution,
  type Mood,
  type PartialCA,
  type VN,
  type Validation,
} from "../index.js"

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

  if (index == -1) {
    throw new Error("Invalid Vn form: '" + vn + "'.")
  }

  return {
    cs: [AP1, AP2, AP3, AP4][Math.floor(index / 9)]!,
    degree: ((index % 9) + 1) as AffixDegree,
    type: 1,
  }
}

/**
 * Converts a Ca, Vn, Cn, Vc, Vk, or Vf form into an affix.
 * @param item The Ca, Vn, Cn, Vc, Vk, or Vf form to be converted.
 * @returns The Ca, Vn, Cn, Vc, Vk, or Vf form as an affix, or undefined if no
 * affix is needed. `undefined` is only returned for FAC mood and CCN
 * case-scope, which are not specifiable via affixes.
 */
export function toAffix(
  item: PartialCA | VN | Mood | CaseScope | Case | Illocution | Validation,
): Affix | undefined {
  if (typeof item == "object") {
    return { ca: item }
  }

  if (has(ALL_ILLOCUTIONS, item)) {
    return {
      cs: IVL,
      degree: (ALL_ILLOCUTIONS.indexOf(item) + 1) as AffixDegree,
      type: 1,
    }
  }

  if (has(ALL_VALIDATIONS, item)) {
    return {
      cs: IVL,
      degree: (ALL_VALIDATIONS.indexOf(item) + 1) as AffixDegree,
      type: 1,
    }
  }

  if (has(ALL_CASES, item)) {
    return {
      case: item,
    }
  }

  if (has(ALL_MOODS, item)) {
    if (item == "FAC") {
      return
    }

    return {
      cs: MCS,
      degree: ALL_MOODS.indexOf(item) as AffixDegree,
      type: 1,
    }
  }

  if (has(ALL_CASE_SCOPES, item)) {
    if (item == "CCN") {
      return
    }

    return {
      cs: MCS,
      degree: (ALL_CASE_SCOPES.indexOf(item) + (5 % 10)) as AffixDegree,
      type: 1,
    }
  }

  return vnToAffix(item)
}
