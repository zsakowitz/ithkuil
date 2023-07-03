import { deepFreeze } from "../helpers/deep-freeze.js"

/** A perspective. */
export type Perspective = "M" | "G" | "N" | "A"

/** An array containing all perspectives. */
export const ALL_PERSPECTIVES: readonly Perspective[] =
  /* @__PURE__ */ deepFreeze(["M", "G", "N", "A"])

/** An object mapping from perspectives to their names. */
export const PERSPECTIVE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  M: "Monadic",
  G: "Agglomerative",
  N: "Nomic",
  A: "Abstract",
})
