import { type IllocutionOrValidation } from "../../generate/formative/slot-9/illocution-and-validation.js"
import { ALL_VALIDATIONS } from "../../generate/formative/slot-9/validation.js"
import type { VowelForm } from "../vowel-form.js"

const ILLOCUTIONS = [
  ,
  "DIR",
  "DEC",
  "IRG",
  "VRF",
  ,
  "ADM",
  "POT",
  "HOR",
  "CNJ",
] as const

/**
 * Parses a Vk form into an illocution or validation.
 *
 * @param vk The Vk form to be parsed.
 * @returns The parsed illocution or validation.
 */
export function parseIllocutionValidation(
  vk: VowelForm,
): IllocutionOrValidation {
  if (vk.sequence == 1) {
    const validation = ALL_VALIDATIONS[vk.degree - 1]

    if (validation != null) {
      return validation
    }
  }

  if (vk.sequence == 2) {
    const illocution = ILLOCUTIONS[vk.degree]

    if (illocution != null) {
      return illocution
    }
  }

  throw new Error("Invalid Vk slot: " + vk + ".")
}
