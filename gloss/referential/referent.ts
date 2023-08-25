import {
  REFERENT_TARGET_TO_NAME_MAP,
  referentToReferentObject,
  type Referent,
} from "../../generate/index.js"
import { GlossString, asGloss } from "../glossable.js"

export function glossReferent(referent: Referent) {
  const { effect, target } = referentToReferentObject(referent)

  return new GlossString(
    target + (effect == "BEN" ? ".BEN" : effect == "DET" ? ".DET" : ""),
    asGloss(REFERENT_TARGET_TO_NAME_MAP[target]) +
      (effect == "BEN" ? ".beneficial" : effect == "DET" ? ".detrimental" : ""),
  )
}
