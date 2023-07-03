import { object } from "zod"
import {
  caseToIthkuil,
  zodCase,
  type Case,
} from "../../formative/slot-9/case.js"
import { WithWYAlternative } from "../../helpers/with-wy-alternative.js"
import {
  suppletiveAdjunctTypeToIthkuil,
  zodSuppletiveAdjunctType,
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

/** A Zod validator matching suppletive adjuncts. */
export const zodSuppletiveAdjunct = /* @__PURE__ */ object({
  type: zodSuppletiveAdjunctType,
  case: zodCase,
})

/**
 * Converts a suppletive adjunct into Ithkuil.
 * @param adjunct The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function suppletiveAdjunctToIthkuil(adjunct: SuppletiveAdjunct) {
  const type = suppletiveAdjunctTypeToIthkuil(adjunct.type)

  return WithWYAlternative.add(type, caseToIthkuil(adjunct.case, false, false))
}
