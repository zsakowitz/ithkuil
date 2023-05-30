import { deepFreeze } from "../helpers/deep-freeze.js"

/** An affix type. */
export type AffixType = 1 | 2 | 3

/** An array containing all affix types. */
export const ALL_AFFIX_TYPES: readonly AffixType[] = /* @__PURE__ */ deepFreeze(
  [1, 2, 3]
)
