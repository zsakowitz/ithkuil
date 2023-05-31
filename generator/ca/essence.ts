import { deepFreeze } from "../helpers/deep-freeze.js"
import { Enum } from "../helpers/enum.js"

/** An essence. */
export type Essence = "NRM" | "RPV"

/** An array containing all essences. */
export const ALL_ESSENCES: readonly Essence[] = /* @__PURE__ */ deepFreeze([
  "NRM",
  "RPV",
])

/** A Zod validator matching essences. */
export const zodEssence = /* @__PURE__ */ new Enum(ALL_ESSENCES)

/** An object mapping from essences to their names. */
export const ESSENCE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  NRM: "Normal",
  RPV: "Representative",
})
