import { Enum } from "../helpers/enum.js"
import { deepFreeze } from "../index.js"

/**
 * Whether to shortcut in a formative, and which slots to do so.
 *
 * - `true` indicates that all shortcuts should be used (if possible).
 * - `false` indicates that no shortcuts should be used (if possible).
 * - `"IV/VI"` indicates that an a+Ca shortcut should be used (if possible).
 * - `"VII"` indicates that a Slot VII shortcut should be used (if possible).
 */
export type ShortcutType = boolean | "IV/VI" | "VII"

/** An array containing all shortcut types. */
export const ALL_SHORTCUT_TYPES: readonly ShortcutType[] =
  /* @__PURE__ */ deepFreeze([true, false, "IV/VI", "VII"])

/** A Zod validator matching shortcut types. */
export const zodShortcutType = /* @__PURE__ */ new Enum(ALL_SHORTCUT_TYPES)
