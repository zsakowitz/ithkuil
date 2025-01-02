import {
  ALL_MOOD_OR_CASE_SCOPES,
  FAC_CCN,
} from "../generate/formative/slot-8/mood-or-case-scope.js"
import {
  ALL_CASE_SCOPES,
  ALL_MOODS,
  CASE_SCOPE_TO_NAME_MAP,
  MOOD_TO_NAME_MAP,
  has,
  type CN,
} from "../generate/index.js"
import { GlossString } from "./glossable.js"

/**
 * Glosses a Cn form.
 *
 * @param cn The Cn form to be glossed.
 * @param elidable Whether FAC/CCN Cn forms can be elided.
 * @returns A `GlossString` representing the Cn form.
 */
export function glossCn(cn: CN, elidable: boolean) {
  if (elidable && (cn == "FAC" || cn == "CCN" || cn == FAC_CCN)) {
    return new GlossString("", "")
  }

  if (has(ALL_MOODS, cn)) {
    return new GlossString(cn, MOOD_TO_NAME_MAP[cn].toLowerCase())
  }

  if (has(ALL_CASE_SCOPES, cn)) {
    return new GlossString(cn, CASE_SCOPE_TO_NAME_MAP[cn].toLowerCase())
  }

  if (has(ALL_MOOD_OR_CASE_SCOPES, cn)) {
    return new GlossString(
      "(" + cn.mood + "/" + cn.caseScope + ")",
      (
        "(" +
        MOOD_TO_NAME_MAP[cn.mood] +
        "/" +
        CASE_SCOPE_TO_NAME_MAP[cn.caseScope] +
        ")"
      ).toLowerCase(),
    )
  }

  return new GlossString("(FAC/CCN)", "(factual/natural)")
}
