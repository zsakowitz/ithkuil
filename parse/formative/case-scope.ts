import type { CaseScope } from "../../generate/formative/slot-8/case-scope.js"
import { deepFreezeAndNullPrototype } from "../../generate/helpers/deep-freeze.js"

const CN_TO_CASE_SCOPE = /* @__PURE__ */ deepFreezeAndNullPrototype({
  h: "CCN",
  hl: "CCA",
  hr: "CCS",
  hm: "CCQ",
  hn: "CCP",
  hň: "CCV",
})

const CN_TO_ASPECTUAL_CASE_SCOPE = /* @__PURE__ */ deepFreezeAndNullPrototype({
  w: "CCN",
  y: "CCN",
  hw: "CCA",
  hrw: "CCS",
  hmw: "CCQ",
  hnw: "CCP",
  hňw: "CCV",
})

/**
 * Parsed a Cn form as a case scope.
 * @param cn The Cn form to be parsed.
 * @returns An array containing the parsed case scope and a boolean value
 * indicating whether the case scope indicates the corresponding Vn form is an
 * aspect.
 */
export function parseCaseScope(
  cn: string,
): [caseScope: CaseScope, isAspectual: boolean] {
  if (cn in CN_TO_CASE_SCOPE) {
    return [CN_TO_CASE_SCOPE[cn as keyof typeof CN_TO_CASE_SCOPE], false]
  }

  if (cn in CN_TO_ASPECTUAL_CASE_SCOPE) {
    return [
      CN_TO_ASPECTUAL_CASE_SCOPE[cn as keyof typeof CN_TO_ASPECTUAL_CASE_SCOPE],
      true,
    ]
  }

  throw new Error("Invalid Cn: '" + cn + "'.")
}
