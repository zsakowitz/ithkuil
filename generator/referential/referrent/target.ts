import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A referrent target. */
export type ReferrentTarget =
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

/** An array containing all referrent targets. */
export const ALL_REFERRENT_TARGETS: readonly ReferrentTarget[] =
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

/** An object mapping referrent targets to descriptions of them. */
export const REFERRENT_TARGET_TO_DESCRIPTION_MAP = /* @__PURE__ */ deepFreeze({
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
