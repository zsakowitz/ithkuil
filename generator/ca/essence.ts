import { deepFreeze } from "../helpers/deep-freeze.js"

/** An essence. */
export type Essence = "NRM" | "RPV"

/** An array containing all essences. */
export const ALL_ESSENCES: readonly Essence[] = /* @__PURE__ */ deepFreeze([
  "NRM",
  "RPV",
])

/** An object mapping from essences to their names. */
export const ESSENCE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  NRM: "Normal",
  RPV: "Representative",
})
