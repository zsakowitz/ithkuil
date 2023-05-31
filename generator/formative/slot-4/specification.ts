import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** A specification. */
export type Specification = "BSC" | "CTE" | "CSV" | "OBJ"

/** An array containing all specifications. */
export const ALL_SPECIFICATIONS: readonly Specification[] =
  /* @__PURE__ */ deepFreeze(["BSC", "CTE", "CSV", "OBJ"])

/** A Zod validator matching specifications. */
export const zodSpecification = /* @__PURE__ */ new Enum(ALL_SPECIFICATIONS)

/** An object mapping from specifications to their names. */
export const SPECIFICATION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  BSC: "Basic",
  CTE: "Contential",
  CSV: "Constitutive",
  OBJ: "Objective",
})
