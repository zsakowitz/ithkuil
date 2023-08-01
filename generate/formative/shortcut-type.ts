import { deepFreeze } from "../helpers/deep-freeze.js"

/**
 * Whether to shortcut in a formative, and which slots to do so within.
 *
 * - `false` indicates that no shortcuts should be used.
 * - `true` indicates that as many shortcuts should be taken as possible.
 * - `"IV/VI"` indicates that a Slot IV/VI shortcut should be used, if possible.
 * - `"VII"` indicates that a Slot VII shortcut should be used, if possible.
 * - `"VIII"` indicates that a Slot VIII shortcut should be used, if possible.
 *
 * What are these shortcuts?
 *
 * A Slot IV/VI shortcut eliminates Slot IV (Vr) and Slot VI (Ca) and merges
 * their information into slots I and II. This can only be done if the formative
 * has default STA Function, BSC Specification, and EXS Context, and if the Ca
 * form is either [default], PRX, G, N, A, RPV, G+RPV, or PRX+RPV.
 *
 * A Slot VII shortcut moves a final NEG/4, DCD/4, or DCD/5 affix in Slot VII to
 * Slot II. This can only be done if the final affix of Slot VII is Type-1
 * NEG/4, Type-1 DCD/4, or Type-1 DCD/5.
 *
 * A Slot VIII shortcut replaces the Slot VI Ca form with a Cn Mood or
 * Case-Scope marker in Slot VIII. This can only be done when the formative's Vn
 * form is default MNO Valence and when its Cn form is not default FAC/CCN.
 *
 * Note that while Slot VII and VIII shortcuts can be applied simultaneously, a
 * Slot IV/VI shortcut is incompatiable with both of them.
 *
 * Also note that you do not have to calculate shortcuts in advance (e.g. only
 * passing "IV/VI" when you're certain that the formative can take a Slot IV/VI
 * a+Ca shortcut). Shortcuts are only taken when they're possible.
 *
 * If `true` is passed and multiple types of shortcuts are possible, Slot VIII
 * shortcuts are prioritized over Slot VII shortcuts, which in turn are
 * prioritized over Slot IV/VI shortcuts.
 */
export type ShortcutType = boolean | "IV/VI" | "VII" | "VIII" | "VII+VIII"

/** An array containing all shortcut types. */
export const ALL_SHORTCUT_TYPES: readonly ShortcutType[] =
  /* @__PURE__ */ deepFreeze([true, false, "IV/VI", "VII", "VIII", "VII+VIII"])
