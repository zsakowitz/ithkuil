import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A referrent effect. */
export type ReferrentEffect = "NEU" | "BEN" | "DET"

/** An array containing all referrent effects. */
export const ALL_REFERRENT_EFFECTS: readonly ReferrentEffect[] =
  /* @__PURE__ */ deepFreeze(["NEU", "BEN", "DET"])

/** A Zod validator matching referrent effects. */
export const zodReferrentEffect = /* @__PURE__ */ new Enum(
  ALL_REFERRENT_EFFECTS,
)

/** An object mapping referrent effects to their names. */
export const REFERRENT_EFFECT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  NEU: "Neutral",
  BEN: "Beneficial",
  DET: "Detrimental",
})
