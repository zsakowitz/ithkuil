import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A Slot VII affix shortcut. */
export type AffixShortcut = "NEG/4" | "DCD/4" | "DCD/5"

/** An array containing all Slot VII affix shortcuts. */
export const ALL_AFFIX_SHORTCUTS = /* @__PURE__ */ deepFreeze([
  "NEG/4",
  "DCD/4",
  "DCD/5",
])
