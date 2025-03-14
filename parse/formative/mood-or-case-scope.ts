import {
  ASM_CCS,
  COU_CCP,
  FAC_CCN,
  HYP_CCV,
  MoodOrCaseScope,
  SPC_CCQ,
  SUB_CCA,
} from "../../generate/formative/slot-8/mood-or-case-scope.js"
import { deepFreeze } from "../../generate/helpers/deep-freeze.js"
import { DCLeaf } from "../decompose.js"

// We can't use `deepFreezeAndNullPrototype` here.
const CN_TO_MOOD_OR_CASE_SCOPE = /* @__PURE__ */ deepFreeze({
  h: FAC_CCN,
  hl: SUB_CCA,
  hr: ASM_CCS,
  hm: SPC_CCQ,
  hn: COU_CCP,
  hň: HYP_CCV,
})

// We can't use `deepFreezeAndNullPrototype` here.
const CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE = /* @__PURE__ */ deepFreeze({
  w: FAC_CCN,
  y: FAC_CCN,
  hw: SUB_CCA,
  hrw: ASM_CCS,
  hmw: SPC_CCQ,
  hnw: COU_CCP,
  hňw: HYP_CCV,
})

/**
 * Parsed a Cn form as a {@link MoodOrCaseScope}.
 *
 * @param cn The Cn form to be parsed.
 * @returns An array containing the parsed {@link MoodOrCaseScope} and a boolean
 *   value indicating whether the case scope indicates the corresponding Vn form
 *   is an aspect.
 */
export function parseMoodOrCaseScope(
  cn: string,
): [moodOrCaseScope: MoodOrCaseScope, isAspectual: boolean] {
  if (cn in CN_TO_MOOD_OR_CASE_SCOPE) {
    return [
      CN_TO_MOOD_OR_CASE_SCOPE[cn as keyof typeof CN_TO_MOOD_OR_CASE_SCOPE],
      false,
    ]
  }

  if (cn in CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE) {
    return [
      CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE[
        cn as keyof typeof CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE
      ],
      true,
    ]
  }

  throw new Error("Invalid Cn: '" + cn + "'.")
}

/**
 * Decomposes a Cn form as a {@link MoodOrCaseScope}.
 *
 * @param cn The Cn form to be decomposed.
 * @returns An array containing the decomposed {@link MoodOrCaseScope} and a
 *   boolean value indicating whether the case scope indicates the corresponding
 *   Vn form is an aspect.
 */
export function dcMoodOrCaseScope(
  cn: string,
): [
  moodOrCaseScope: DCLeaf<"Cn", "mcs", MoodOrCaseScope>,
  isAspectual: boolean,
] {
  if (cn in CN_TO_MOOD_OR_CASE_SCOPE) {
    return [
      new DCLeaf(
        cn,
        "Cn",
        "mcs",
        CN_TO_MOOD_OR_CASE_SCOPE[cn as keyof typeof CN_TO_MOOD_OR_CASE_SCOPE],
      ),
      false,
    ]
  }

  if (cn in CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE) {
    return [
      new DCLeaf(
        cn,
        "Cn",
        "mcs",
        CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE[
          cn as keyof typeof CN_TO_ASPECTUAL_MOOD_OR_CASE_SCOPE
        ],
      ),
      true,
    ]
  }

  throw new Error("Invalid Cn: '" + cn + "'.")
}
