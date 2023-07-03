import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A concatenation type. */
export type ConcatenationType = "none" | 1 | 2

/** An array containing all concatenation types. */
export const ALL_CONCATENATION_TYPES: readonly ConcatenationType[] =
  /* @__PURE__ */ deepFreeze(["none", 1, 2])
