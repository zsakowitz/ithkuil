import { deepFreeze } from "../../helpers/deep-freeze.js"
import type { Illocution } from "./illocution.js"
import type { Validation } from "./validation.js"

/** A non-ASR illocution or validation. */
export type IllocutionOrValidation = Exclude<Illocution, "ASR"> | Validation

/** An array containing all non-ASR illocutions and validations. */
export const ALL_ILLOCUTION_OR_VALIDATIONS = /* @__PURE__ */ deepFreeze([
  "DIR",
  "DEC",
  "IRG",
  "VRF",
  "ADM",
  "POT",
  "HOR",
  "CNJ",

  "OBS",
  "REC",
  "PUP",
  "RPR",
  "USP",
  "IMA",
  "CVN",
  "ITU",
  "INF",
])

/**
 * An object mapping from illocutions and validations to their Ithkuilic
 * translations.
 */
export const ILLOCUTION_AND_VALIDATION_TO_ITHKUIL_MAP =
  /* @__PURE__ */ deepFreeze({
    OBS: "a",
    REC: "ä",
    PUP: "e",
    RPR: "i",
    USP: "ëi",
    IMA: "ö",
    CVN: "o",
    ITU: "ü",
    INF: "u",

    DIR: "ai",
    DEC: "au",
    IRG: "ei",
    VRF: "eu",
    ADM: "ou",
    POT: "oi",
    HOR: "iu",
    CNJ: "ui",
  })

/**
 * Converts an illocution+validation pair into Ithkuil.
 * @param illocutionOrValidation The illocution or validation to be converted.
 * Passing a validation implies ASR illocution. Consequently, ASR illocution
 * cannot be passed.
 * @param elideIfPossible Whether ASR+OBS illocution+validation can be elided.
 * @returns Romanized Ithkuilic text representing the illocution+validation
 * pair.
 */
export function illocutionAndValidationToIthkuil(
  illocutionOrValidation: IllocutionOrValidation,
  elideIfPossible: boolean,
): string {
  if (elideIfPossible && illocutionOrValidation == "OBS") {
    return ""
  }

  return ILLOCUTION_AND_VALIDATION_TO_ITHKUIL_MAP[illocutionOrValidation]
}
