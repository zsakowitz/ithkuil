import {
  AFFILIATION_TO_NAME_MAP,
  CONFIGURATION_TO_NAME_MAP,
  EXTENSION_TO_NAME_MAP,
  PERSPECTIVE_TO_NAME_MAP,
  type PartialCA,
} from "../generate/index.js"
import { GlossString, asGloss } from "./glossable.js"

/**
 * Glosses an Ca form.
 * @param ca The Ca form to be glossed.
 * @param isAffix Whether this is a Ca-stacking affix.
 * @returns A `GlossString` representing the Ca form.
 */
export function glossCa(ca: PartialCA, isAffix: boolean) {
  const segments = [
    ca.affiliation == "CSL" || !ca.affiliation
      ? GlossString.of("")
      : new GlossString(
          ca.affiliation,
          asGloss(AFFILIATION_TO_NAME_MAP[ca.affiliation]),
        ),

    ca.configuration == "UPX" || !ca.configuration
      ? GlossString.of("")
      : new GlossString(
          ca.configuration,
          asGloss(CONFIGURATION_TO_NAME_MAP[ca.configuration]),
        ),

    ca.extension == "DEL" || !ca.extension
      ? GlossString.of("")
      : new GlossString(
          ca.extension,
          asGloss(EXTENSION_TO_NAME_MAP[ca.extension]),
        ),

    ca.perspective == "M" || !ca.perspective
      ? GlossString.of("")
      : new GlossString(
          ca.perspective,
          asGloss(PERSPECTIVE_TO_NAME_MAP[ca.perspective]),
        ),

    ca.essence == "RPV"
      ? new GlossString("RPV", "representative")
      : GlossString.of(""),
  ].filter((x) => !x.isEmpty())

  if (segments.length == 0) {
    if (isAffix) {
      return GlossString.of("(default Ca)")
    } else {
      return GlossString.of("")
    }
  }

  const output = segments.reduce((a, b) => a.plusString(".").plusGloss(b))

  if (isAffix) {
    return new GlossString("(" + output.short + ")", "(" + output.full + ")")
  }

  return output
}
