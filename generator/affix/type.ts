import { deepFreeze } from "../helpers/deep-freeze.js"
import { Enum } from "../helpers/enum.js"

/** An affix type. */
export type AffixType = 1 | 2 | 3

/** An array containing all affix types. */
export const ALL_AFFIX_TYPES: readonly AffixType[] = /* @__PURE__ */ deepFreeze(
  [1, 2, 3],
)

/** A Zod validator matching affix types. */
export const zodAffixType = /* @__PURE__ */ new Enum(ALL_AFFIX_TYPES)
