import {
  PERSPECTIVE_TO_NAME_MAP,
  type Perspective,
  type ReferentList,
} from "../generate/index.js"
import { GlossString, asGloss } from "./glossable.js"
import { glossReferent } from "./referent.js"

/**
 * Glosses a referent list and perspective.
 * @param list The referent list to be glossed.
 * @param perspective The perspective of the referent list.
 * @returns A `GlossString` representing the referent list and perspective.
 */
export function glossReferentListAndPerspective(
  list: ReferentList,
  perspective: Perspective | undefined,
) {
  let output = list
    .map(glossReferent)
    .reduce((a, b) => a.plusString("+").plusGloss(b))

  if (perspective && perspective != "M") {
    output = output
      .plusString("+")
      .plusStrings(perspective, asGloss(PERSPECTIVE_TO_NAME_MAP[perspective]))
  }

  if (list.length > 1 || (perspective && perspective != "M")) {
    return GlossString.of("[").plusGloss(output).plusString("]")
  }

  return output
}
