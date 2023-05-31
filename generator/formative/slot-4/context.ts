import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A context. */
export type Context = "EXS" | "FNC" | "RPS" | "AMG"

/** An array containing all contexts. */
export const ALL_CONTEXTS: readonly Context[] = /* @__PURE__ */ deepFreeze([
  "EXS",
  "FNC",
  "RPS",
  "AMG",
])

/** A Zod validator matching contexts. */
export const zodContext = /* @__PURE__ */ new Enum(ALL_CONTEXTS)

/** An object mapping contexts to their names. */
export const CONTEXT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  EXS: "Existential",
  FNC: "Functional",
  RPS: "Representational",
  AMG: "Amalgamative",
})
