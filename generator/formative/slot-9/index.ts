import { has } from "../../helpers/has.js"
import { caseToIthkuil, type Case } from "./case.js"
import {
  illocutionAndValidationToIthkuil,
  type IllocutionOrValidation,
} from "./illocution-and-validation.js"
import { ALL_ILLOCUTIONS } from "./illocution.js"
import { ALL_VALIDATIONS } from "./validation.js"

export * from "./case.js"
export * from "./illocution-and-validation.js"
export * from "./illocution.js"
export * from "./validation.js"

/** The case or illocution+validation marked by Slot IX. */
export type SlotIX = Case | IllocutionOrValidation

/** Additional information relevant to Slot IX. */
export interface SlotIXMetadata {
  /** Whether THM case or ASR+OBS illocution+validation can be elided. */
  elideIfPossible: boolean

  /** Whether this slot is part of a concatenated formative. */
  isPartOfConcatenatedFormative: boolean
}

/**
 * Converts Slot IX to Ithkuil.
 * @param slot The case or illocution+validation of this slot.
 * @param metadata Additional information relevant to Slot IX.
 * @returns A string or `WithWYAlternative` containing romanized Ithkuilic text
 * representing Slot IX.
 */
export function slotIXToIthkuil(slot: SlotIX, metadata: SlotIXMetadata) {
  if (has(ALL_ILLOCUTIONS, slot) || has(ALL_VALIDATIONS, slot)) {
    return illocutionAndValidationToIthkuil(slot, metadata.elideIfPossible)
  } else {
    return caseToIthkuil(
      slot,
      metadata.elideIfPossible,
      metadata.isPartOfConcatenatedFormative,
    )
  }
}
