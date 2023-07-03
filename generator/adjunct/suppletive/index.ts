import { caseToIthkuil, type Case } from "../../formative/slot-9/case.js"
import { WithWYAlternative } from "../../helpers/with-wy-alternative.js"
import {
  suppletiveAdjunctTypeToIthkuil,
  type SuppletiveAdjunctType,
} from "./type.js"

export * from "./type.js"

/** A suppletive adjunct. */
export type SuppletiveAdjunct = {
  /** The type of the adjunct. */
  readonly type: SuppletiveAdjunctType

  /** The case of the adjunct. */
  readonly case: Case
}

/**
 * Converts a suppletive adjunct into Ithkuil.
 * @param adjunct The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function suppletiveAdjunctToIthkuil(adjunct: SuppletiveAdjunct) {
  const type = suppletiveAdjunctTypeToIthkuil(adjunct.type)

  return WithWYAlternative.add(type, caseToIthkuil(adjunct.case, false, false))
}
