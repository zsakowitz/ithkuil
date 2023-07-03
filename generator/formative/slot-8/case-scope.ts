import { deepFreeze } from "../../helpers/deep-freeze.js"
import type { VNType } from "./vn-type.js"

/** A case-scope. */
export type CaseScope = "CCN" | "CCA" | "CCS" | "CCQ" | "CCP" | "CCV"

/** An array containing all case-scopes. */
export const ALL_CASE_SCOPES: readonly CaseScope[] = /* @__PURE__ */ deepFreeze(
  ["CCN", "CCA", "CCS", "CCQ", "CCP", "CCV"],
)

/** An object mapping case-scopes to their Ithkuilic counterparts. */
export const CASE_SCOPE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  /**
   * The `false` branch is used when the case-scope occurs after non-aspectual
   * Vn forms.
   */
  false: {
    CCN: "h",
    CCA: "hl",
    CCS: "hr",
    CCQ: "hm",
    CCP: "hn",
    CCV: "hň",
  },

  /**
   * The `true` branch is used when the case-scope occurs after aspectual Vn
   * forms.
   */
  true: {
    CCN: "w",
    CCA: "hw",
    CCS: "hrw",
    CCQ: "hmw",
    CCP: "hnw",
    CCV: "hňw",
  },
})

/** An object mapping case-scopes to their names. */
export const CASE_SCOPE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  CCN: "Natural",
  CCA: "Antecedent",
  CCS: "Subaltern",
  CCQ: "Qualifier",
  CCP: "Precedent",
  CCV: "Successive",
})

/**
 * Converts a case-scope into Ithkuil.
 * @param caseScope The case-scope to be converted.
 * @param vnType The type of Vn form associated with this case-scope. Use
 * "aspect" when Vn contains an aspect, "non-aspect" when it contains a
 * non-aspect, and "empty" when it has been elided due to the use of MNO
 * valence.
 * @returns Romanized Ithkuilic text representing the case-scope.
 */
export function caseScopeToIthkuil(caseScope: CaseScope, vnType: VNType) {
  const value = CASE_SCOPE_TO_ITHKUIL_MAP[`${vnType == "aspect"}`][caseScope]

  if (value == "h" && vnType == "empty") {
    return ""
  }

  return value
}
