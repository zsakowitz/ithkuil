import { CASE_TO_NAME_MAP, type Case } from "../generate/index.js"
import { GlossString } from "./glossable.js"

export function glossCase(_case: Case) {
  return new GlossString(_case, CASE_TO_NAME_MAP[_case])
}
