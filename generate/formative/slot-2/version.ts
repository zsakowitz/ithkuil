import { deepFreeze } from "../../helpers/deep-freeze.js"

/** The version of a formative. */
export type Version = "PRC" | "CPT"

/** An array containing all versions. */
export const ALL_VERSIONS: readonly Version[] = /* @__PURE__ */ deepFreeze([
  "PRC",
  "CPT",
])

/** An object mapping versions to their names. */
export const VERSION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  PRC: "Processual",
  CPT: "Completive",
})
