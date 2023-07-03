import { ALL_CASES_SKIPPING_DEGREE_8 } from "../../generator/formative/slot-9/index.js"
import type { VowelForm } from "../vowel-form.js"

/**
 * Parses a case from a `VowelForm`.
 * @param vc The `VowelForm` to be parsed.
 * @param isCaseOver36 Whether the case is over 36.
 * @returns The parsed case.
 */
export function parseCase(vc: VowelForm, isCaseOver36 = vc.hasGlottalStop) {
  const _case =
    ALL_CASES_SKIPPING_DEGREE_8[
      36 * +isCaseOver36 + 9 * (vc.sequence - 1) + vc.degree - 1
    ]

  if (_case != null) {
    return _case
  }

  throw new Error(
    "Invalid Vc form: " +
      vc +
      " (" +
      vc.sequence +
      ":" +
      vc.degree +
      ":" +
      isCaseOver36 +
      ").",
  )
}
