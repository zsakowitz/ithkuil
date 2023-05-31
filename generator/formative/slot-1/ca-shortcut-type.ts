import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A Ca shortcut type. */
export type CAShortcutType = "none" | "w" | "y"

/** An array containing all Ca shortcut types. */
export const ALL_CA_SHORTCUT_TYPES: readonly CAShortcutType[] =
  /* @__PURE__ */ deepFreeze(["none", "w", "y"])

/** A Zod validator matching Ca shortcut types. */
export const zodCaShortcutType = /* @__PURE__ */ new Enum(ALL_CA_SHORTCUT_TYPES)
