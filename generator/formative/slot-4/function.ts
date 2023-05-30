import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A function. */
export type Function = "STA" | "DYN"

/** An array containing all functions. */
export const ALL_FUNCTIONS: readonly Function[] = /* @__PURE__ */ deepFreeze([
  "STA",
  "DYN",
])

/** An object mapping from functions to their names. */
export const FUNCTION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  STA: "Static",
  DYN: "Dynamic",
})
