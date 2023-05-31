import { Enum } from "../../helpers/enum.js"
import { deepFreeze } from "../../index.js"

/** A Slot VII affix shortcut. */
export type AffixShortcut = "NEG/4" | "DCD/4" | "DCD/5"

/** An array containing all Slot VII affix shortcuts. */
export const ALL_AFFIX_SHORTCUTS = /* @__PURE__ */ deepFreeze([
  "NEG/4",
  "DCD/4",
  "DCD/5",
])

/** A Zod validator matching affix shortcuts. */
export const zodAffixShortcut = /* @__PURE__ */ new Enum(ALL_AFFIX_SHORTCUTS)
