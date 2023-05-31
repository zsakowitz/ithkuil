import { Enum } from "../../helpers/enum.js"
import { deepFreeze } from "../../index.js"

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

/** A Zod validator matching Vn types. */
export const zodVnType = /* @__PURE__ */ new Enum(ALL_VN_TYPES)
