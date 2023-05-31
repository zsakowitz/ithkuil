import { deepFreeze } from "../helpers/deep-freeze.js"
import { Enum } from "../helpers/enum.js"

/** A perspective. */
export type Perspective = "M" | "G" | "N" | "A"

/** An array containing all perspectives. */
export const ALL_PERSPECTIVES: readonly Perspective[] =
  /* @__PURE__ */ deepFreeze(["M", "G", "N", "A"])

/** A Zod validator matching perspectives. */
export const zodPerspective = /* @__PURE__ */ new Enum(ALL_PERSPECTIVES)

/** An object mapping from perspectives to their names. */
export const PERSPECTIVE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  M: "Monadic",
  G: "Agglomerative",
  N: "Nomic",
  A: "Abstract",
})
