import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A function. */
export type Function = "STA" | "DYN"

/** An array containing all functions. */
export const ALL_FUNCTIONS: readonly Function[] = /* @__PURE__ */ deepFreeze([
  "STA",
  "DYN",
])

/** A Zod validator matching functions. */
export const zodFunction = /* @__PURE__ */ new Enum(ALL_FUNCTIONS)

/** An object mapping from functions to their names. */
export const FUNCTION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  STA: "Static",
  DYN: "Dynamic",
})
