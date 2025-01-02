import {
  ALL_CASES_SKIPPING_DEGREE_8,
  ALL_ILLOCUTIONS,
  ALL_VALIDATIONS,
  deepFreeze,
  has,
  type AffixType,
  type Case,
  type CaseScope,
  type Illocution,
  type Mood,
  type Validation,
} from "../../generate/index.js"
import { Secondary, type ExtensionName } from "../index.js"

// NOTE: Because quaternary characters are almost just secondary characters, we
// can render quaternaries using secondary characters as a base, which avoids
// having to re-calculate all the quaternary extensions.

/** Information about a case-accessor quaternary character. */
export type CaseAccessorQuaternaryCharacter = {
  /** Whether this character is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The case-accessor affix type of this quaternary character. */
  readonly type: AffixType

  /** The case shown by this quaternary character. */
  readonly value: Case

  /** Whether this character is an inverse case-accessor. */
  readonly isInverse?: boolean | undefined

  /** Whether this is a slot VII affix. */
  readonly isSlotVIIAffix?: boolean | undefined
}

/** Information about a non-case-accessor quaternary character. */
export type StandardQuaternaryCharacter = {
  /** Whether this character is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The mood shown on this quaternary character. */
  readonly mood?: Mood | undefined

  /** The case or illocution/validation shown on this quaternary character. */
  readonly value?: Case | Illocution | Validation | undefined

  /** The case-scope shown on this quaternary character. */
  readonly caseScope?: CaseScope | undefined

  readonly type?: undefined
}

/** Information about a quaternary character. */
export type QuaternaryCharacter =
  | StandardQuaternaryCharacter
  | CaseAccessorQuaternaryCharacter

/** An object mapping case-scopes to their corresponding diacritics. */
export const CASE_SCOPE_TO_DIACRITIC_MAP = /* @__PURE__ */ deepFreeze({
  CCN: undefined,
  CCA: "DOT",
  CCS: "DIAG_BAR",
  CCQ: "CURVE_TO_TOP",
  CCP: "CURVE_TO_BOTTOM",
  CCV: "HORIZ_BAR",
})

/** An object mapping moods to their corresponding diacritics. */
export const MOOD_TO_DIACRITIC_MAP = /* @__PURE__ */ deepFreeze({
  FAC: undefined,
  SUB: "DOT",
  ASM: "DIAG_BAR",
  SPC: "CURVE_TO_TOP",
  COU: "CURVE_TO_BOTTOM",
  HYP: "HORIZ_BAR",
})

/** An array mapping cases to their corresponding Secondary extensions. */
export const CASE_TO_SECONDARY_EXTENSION = /* @__PURE__ */ deepFreeze([
  undefined,
  "d",
  "š",
  "g",
  "p",
  "t",
  "k",
  "b",
  "m",
])

/** An array mapping illocutions to their corresponding Secondary extensions. */
export const ILLOCUTION_TO_SECONDARY_EXTENSION = /* @__PURE__ */ deepFreeze({
  ASR: "s",
  DIR: "ḑ",
  DEC: "f",
  IRG: "ř",
  VRF: "v",
  ADM: "ţ",
  POT: "x",
  HOR: "n",
  CNJ: "z",
})

/** An array mapping validations to their corresponding Secondary extensions. */
export const VALIDATION_TO_SECONDARY_EXTENSION = /* @__PURE__ */ deepFreeze({
  OBS: "s",
  REC: "ḑ",
  PUP: "f",
  RPR: "ř",
  IMA: "v",
  CVN: "ţ",
  ITU: "x",
  INF: "n",
  USP: "z",
})

/**
 * An array mapping cases, illocutions, and validations to their corresponding
 * diacritics, which can then be used in Cr roots where no case-scope or mood is
 * present.
 */
export const QUATERNARY_DIACRITIC_MAP = /* @__PURE__ */ deepFreeze([
  undefined,
  "DOT",
  "HORIZ_BAR",
  "CURVE_TO_LEFT",
  "CURVE_TO_RIGHT",
  "HORIZ_WITH_BOTTOM_LINE",
  "HORIZ_WITH_TOP_LINE",
  "CURVE_TO_TOP",
  "CURVE_TO_BOTTOM",
])

/**
 * Renders a quaternary character as a group of SVG paths.
 *
 * @param quaternary Information about the quaternary character.
 * @returns The rendered quaternary character.
 */
export function Quaternary(quaternary: QuaternaryCharacter): SVGGElement {
  let top: ExtensionName | undefined
  let bottom: ExtensionName | undefined

  if (has(ALL_VALIDATIONS, quaternary.value)) {
    top = ILLOCUTION_TO_SECONDARY_EXTENSION.ASR
    bottom = VALIDATION_TO_SECONDARY_EXTENSION[quaternary.value]
  } else if (has(ALL_ILLOCUTIONS, quaternary.value)) {
    top = ILLOCUTION_TO_SECONDARY_EXTENSION[quaternary.value]
  } else if (quaternary.value) {
    const caseIndex = ALL_CASES_SKIPPING_DEGREE_8.indexOf(quaternary.value)

    top = CASE_TO_SECONDARY_EXTENSION[Math.floor(caseIndex / 9)]
    bottom = CASE_TO_SECONDARY_EXTENSION[caseIndex % 9]
  }

  if (quaternary.type) {
    return Secondary({
      handwritten: quaternary.handwritten,
      superposed:
        quaternary.type == 2 ? "DOT"
        : quaternary.type == 3 ? "HORIZ_BAR"
        : undefined,
      top,
      core: "STRESSED_SYLLABLE_PLACEHOLDER",
      bottom,
      underposed:
        quaternary.isInverse ?
          quaternary.isSlotVIIAffix ?
            "CURVE_TO_RIGHT_WITH_DOT"
          : "CURVE_TO_RIGHT"
        : quaternary.isSlotVIIAffix ? "CURVE_TO_LEFT_WITH_DOT"
        : "CURVE_TO_LEFT",
    })
  } else {
    return Secondary({
      handwritten: quaternary.handwritten,
      superposed:
        quaternary.mood ? MOOD_TO_DIACRITIC_MAP[quaternary.mood] : undefined,
      top,
      core: "STRESSED_SYLLABLE_PLACEHOLDER",
      bottom,
      underposed:
        quaternary.caseScope ?
          CASE_SCOPE_TO_DIACRITIC_MAP[quaternary.caseScope]
        : undefined,
    })
  }
}
