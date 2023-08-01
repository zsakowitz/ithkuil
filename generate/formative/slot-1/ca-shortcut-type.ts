import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A Ca shortcut type. */
export type CAShortcutType = "none" | "w" | "y"

/** An array containing all Ca shortcut types. */
export const ALL_CA_SHORTCUT_TYPES: readonly CAShortcutType[] =
  /* @__PURE__ */ deepFreeze(["none", "w", "y"])
