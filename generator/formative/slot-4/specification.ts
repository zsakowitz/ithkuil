import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A specification. */
export type Specification = "BSC" | "CTE" | "CSV" | "OBJ"

/** An array containing all specifications. */
export const ALL_SPECIFICATIONS: readonly Specification[] =
  /* @__PURE__ */ deepFreeze(["BSC", "CTE", "CSV", "OBJ"])

/** An object mapping from specifications to their names. */
export const SPECIFICATION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  BSC: "Basic",
  CTE: "Contential",
  CSV: "Constitutive",
  OBJ: "Objective",
})
