import type { Specification } from "../formative/index.js"
import { deepFreeze } from "../helpers/deep-freeze.js"

/** An object mapping from specifications (in referentials) to Ithkuil. */
export const REFERENTIAL_SPECIFICATION_TO_ITHKUIL_MAP =
  /* @__PURE__ */ deepFreeze({
    BSC: "x",
    CTE: "xt",
    CSV: "xp",
    OBJ: "xx",
  })

/**
 * Converts a specification (in a referential) into Ithkuil.
 *
 * @param specification The specification to be converted.
 * @returns Romanized Ithkuilic text representing the specification (in a
 *   referential).
 */
export function referentialSpecificationToIthkuil(
  specification: Specification,
): string {
  return REFERENTIAL_SPECIFICATION_TO_ITHKUIL_MAP[specification]
}
