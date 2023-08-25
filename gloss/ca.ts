import {
  AFFILIATION_TO_NAME_MAP,
  CONFIGURATION_TO_NAME_MAP,
  EXTENSION_TO_NAME_MAP,
  PERSPECTIVE_TO_NAME_MAP,
  type PartialCA,
} from "../generate/index.js"
import { GlossString, asGloss } from "./glossable.js"

export function glossCa(ca: PartialCA, isAffix: boolean) {
  const segments = [
    ca.affiliation == "CSL" || !ca.affiliation
      ? new GlossString("", "")
      : new GlossString(
          ca.affiliation,
          asGloss(AFFILIATION_TO_NAME_MAP[ca.affiliation]),
        ),

    ca.configuration == "UPX" || !ca.configuration
      ? new GlossString("", "")
      : new GlossString(
          ca.configuration,
          asGloss(CONFIGURATION_TO_NAME_MAP[ca.configuration]),
        ),

    ca.extension == "DEL" || !ca.extension
      ? new GlossString("", "")
      : new GlossString(
          ca.extension,
          asGloss(EXTENSION_TO_NAME_MAP[ca.extension]),
        ),

    ca.perspective == "M" || !ca.perspective
      ? new GlossString("", "")
      : new GlossString(
          ca.perspective,
          asGloss(PERSPECTIVE_TO_NAME_MAP[ca.perspective]),
        ),

    ca.essence == "RPV"
      ? new GlossString("RPV", "representative")
      : new GlossString("", ""),
  ].filter((x) => !x.isEmpty())

  if (segments.length == 0) {
    if (isAffix) {
      return new GlossString("(default Ca)", "(default Ca)")
    } else {
      return new GlossString("{Ca}", "{default Ca}")
    }
  }

  const output = segments.reduce((a, b) => a.plusString(".").plusGloss(b))

  if (isAffix) {
    return new GlossString("(" + output.short + ")", "(" + output.full + ")")
  }

  return output
}
