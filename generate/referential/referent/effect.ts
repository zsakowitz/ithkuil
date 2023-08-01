import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A referent effect. */
export type ReferentEffect = "NEU" | "BEN" | "DET"

/** An array containing all referent effects. */
export const ALL_REFERENT_EFFECTS: readonly ReferentEffect[] =
  /* @__PURE__ */ deepFreeze(["NEU", "BEN", "DET"])

/** An object mapping referent effects to their names. */
export const REFERENT_EFFECT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  NEU: "Neutral",
  BEN: "Beneficial",
  DET: "Detrimental",
})
