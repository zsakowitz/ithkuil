import { deepFreeze } from "../../helpers/deep-freeze.js"

/**
 * The type of information contained in the Vn slot.
 *
 * - `empty` means the slot contains MNO Valence and has been elided.
 * - `non-aspect` means the slot contains a non-elided Valence, Phase, Effect,
 *    or Level.
 * - `aspect` means the slot contains an Aspect.
 */
export type VNType = "empty" | "non-aspect" | "aspect"

/** An array containing all Vn types. */
export const ALL_VN_TYPES: readonly VNType[] = /* @__PURE__ */ deepFreeze([
  "empty",
  "non-aspect",
  "aspect",
])
