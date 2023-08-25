import { CASE_TO_NAME_MAP, type Case } from "../generate/index.js"
import { GlossString, asGloss } from "./glossable.js"

/**
 * Glosses a case.
 * @param case_ The case to be glossed.
 * @returns A `GlossString` representing the case.
 */
export function glossCase(case_: Case) {
  return new GlossString(case_, asGloss(CASE_TO_NAME_MAP[case_]))
}
