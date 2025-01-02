import { deepFreeze } from "./deep-freeze.js"
import {
  IA_UÄ,
  IE_UË,
  IO_ÜÄ,
  IÖ_ÜË,
  UA_IÄ,
  UE_IË,
  UO_ÖÄ,
  UÖ_ÖË,
} from "./with-wy-alternative.js"

/**
 * The standard vowel table, indexed to be optimal for affix degrees. Index 0
 * means the 10th row of the vowel table, while index 1 means the 1st row. In
 * addition, the array-of-arrays starts at index 1 (index 0 is `undefined`). See
 * the types for more information.
 *
 * @example
 *   STANDARD_VOWEL_TABLE[2][0] // "ea"
 *   STANDARD_VOWEL_TABLE[0][1] // throws an error
 *   STANDARD_VOWEL_TABLE[1][9] // "u"
 */
export const STANDARD_VOWEL_TABLE = /* @__PURE__ */ deepFreeze([
  undefined,
  ["ae", "a", "ä", "e", "i", "ëi", "ö", "o", "ü", "u"],
  ["ea", "ai", "au", "ei", "eu", "ëu", "ou", "oi", "iu", "ui"],
  ["üo", IA_UÄ, IE_UË, IO_ÜÄ, IÖ_ÜË, "eë", UÖ_ÖË, UO_ÖÄ, UE_IË, UA_IÄ],
  ["üö", "ao", "aö", "eo", "eö", "oë", "öe", "oe", "öa", "oa"],
])

/**
 * The standard vowel table, indexed as would be traditionally expected for
 * computers. Index 0 means the 1st row of the vowel table, while index 9 means
 * the 10th row.
 *
 * @example
 *   ZERO_INDEXED_STANDARD_VOWEL_TABLE[2][0] // IA_UÄ
 *   ZERO_INDEXED_STANDARD_VOWEL_TABLE[0][1] // "ä"
 *   ZERO_INDEXED_STANDARD_VOWEL_TABLE[1][9] // "ea"
 */
export const ZERO_INDEXED_STANDARD_VOWEL_TABLE = /* @__PURE__ */ deepFreeze([
  ["a", "ä", "e", "i", "ëi", "ö", "o", "ü", "u", "ae"],
  ["ai", "au", "ei", "eu", "ëu", "ou", "oi", "iu", "ui", "ea"],
  [IA_UÄ, IE_UË, IO_ÜÄ, IÖ_ÜË, "eë", UÖ_ÖË, UO_ÖÄ, UE_IË, UA_IÄ, "üo"],
  ["ao", "aö", "eo", "eö", "oë", "öe", "oe", "öa", "oa", "üö"],
])

/**
 * Same as {@link ZERO_INDEXED_STANDARD_VOWEL_TABLE}, but with index 0
 * corresponding to the 10th row of the vowel table, while index 1 means the 1st
 * row.
 *
 * @example
 *   ONE_INDEXED_STANDARD_VOWEL_TABLE[2][0] // "üo"
 *   ONE_INDEXED_STANDARD_VOWEL_TABLE[0][1] // "a"
 *   ONE_INDEXED_STANDARD_VOWEL_TABLE[1][9] // "ui"
 */
export const ONE_INDEXED_STANDARD_VOWEL_TABLE = /* @__PURE__ */ deepFreeze([
  ["ae", "a", "ä", "e", "i", "ëi", "ö", "o", "ü", "u"],
  ["ea", "ai", "au", "ei", "eu", "ëu", "ou", "oi", "iu", "ui"],
  ["üo", IA_UÄ, IE_UË, IO_ÜÄ, IÖ_ÜË, "eë", UÖ_ÖË, UO_ÖÄ, UE_IË, UA_IÄ],
  ["üö", "ao", "aö", "eo", "eö", "oë", "öe", "oe", "öa", "oa"],
])
