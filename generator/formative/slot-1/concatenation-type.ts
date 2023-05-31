import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A concatenation type. */
export type ConcatenationType = "none" | 1 | 2

/** An array containing all concatenation types. */
export const ALL_CONCATENATION_TYPES: readonly ConcatenationType[] =
  /* @__PURE__ */ deepFreeze(["none", 1, 2])

/** A Zod validator matching concatenation types. */
export const zodConcatenationType = /* @__PURE__ */ new Enum(
  ALL_CONCATENATION_TYPES,
)
