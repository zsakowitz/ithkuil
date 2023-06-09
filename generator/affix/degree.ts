import { deepFreeze } from "../helpers/deep-freeze.js"

/** An affix degree. */
export type AffixDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

/** An array containing all affixes. */
export const ALL_AFFIX_DEGREES: readonly AffixDegree[] =
  /* @__PURE__ */ deepFreeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
