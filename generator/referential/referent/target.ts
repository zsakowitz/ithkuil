import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A referent target. */
export type ReferentTarget =
  | "1m"
  | "2m"
  | "2p"
  | "ma"
  | "pa"
  | "mi"
  | "pi"
  | "Mx"
  | "Rdp"
  | "Obv"
  | "PVS"

/** An array containing all referent targets. */
export const ALL_REFERENT_TARGETS: readonly ReferentTarget[] =
  /* @__PURE__ */ deepFreeze([
    "1m",
    "2m",
    "2p",
    "ma",
    "pa",
    "mi",
    "pi",
    "Mx",
    "Rdp",
    "Obv",
    "PVS",
  ])

/** A Zod validator matching referent targets. */
export const zodReferentTarget = /* @__PURE__ */ new Enum(ALL_REFERENT_TARGETS)

/** An object mapping referent targets to descriptions of them. */
export const REFERENT_TARGET_TO_DESCRIPTION_MAP = /* @__PURE__ */ deepFreeze({
  "1m": "monadic speaker",
  "2m": "monadic addressee",
  "2p": "polyadic addressee",
  ma: "monadic animate 3rd party",
  pa: "polyadic animate 3rd party",
  mi: "monadic inanimate 3rd party",
  pi: "polyadic inanimate 3rd party",
  Mx: "mixed animate/inanimate 3rd party",
  Rdp: "Reduplicative (i.e., resumptive)",
  Obv: "Obviative",
  PVS: "Provisional",
})
