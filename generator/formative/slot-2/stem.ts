import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** The stem of a formative. */
export type Stem = 1 | 2 | 3 | 0

/** An array containing all stems. */
export const ALL_STEMS: readonly Stem[] = /* @__PURE__ */ deepFreeze([
  1, 2, 3, 0,
])

/** A Zod validator matching stems. */
export const zodStem = /* @__PURE__ */ new Enum(ALL_STEMS)
