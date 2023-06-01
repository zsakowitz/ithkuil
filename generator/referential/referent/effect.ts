import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A referent effect. */
export type ReferentEffect = "NEU" | "BEN" | "DET"

/** An array containing all referent effects. */
export const ALL_REFERENT_EFFECTS: readonly ReferentEffect[] =
  /* @__PURE__ */ deepFreeze(["NEU", "BEN", "DET"])

/** A Zod validator matching referent effects. */
export const zodReferentEffect = /* @__PURE__ */ new Enum(ALL_REFERENT_EFFECTS)

/** An object mapping referent effects to their names. */
export const REFERENT_EFFECT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  NEU: "Neutral",
  BEN: "Beneficial",
  DET: "Detrimental",
})
