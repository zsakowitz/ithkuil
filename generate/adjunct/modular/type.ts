import { deepFreeze } from "../../helpers/deep-freeze.js"

/**
 * The type of a modular adjunct, indicating whether it has scope over the
 * entire next formative, only the parent formative, or only the concatenated
 * formative.
 */
export type ModularAdjunctType = "WHOLE" | "PARENT" | "CONCAT"

/** An array containing all modular adjunct types. */
export const ALL_MODULAR_ADJUNCT_TYPES: readonly ModularAdjunctType[] =
  /* @__PURE__ */ deepFreeze(["WHOLE", "PARENT", "CONCAT"])

/** An object mapping from modular adjunct types to their Ithkuilic translations. */
export const MODULAR_ADJUNCT_TYPE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  WHOLE: "",
  PARENT: "w",
  CONCAT: "y",
})

/** An object mapping from modular adjunct types to what they apply to. */
export const MODULAR_ADJUNCT_TYPE_TO_DESCRIPTION_MAP =
  /* @__PURE__ */ deepFreeze({
    WHOLE: "entire formative",
    PARENT: "parent formative only",
    CONCAT: "concatenated formative only",
  })

/**
 * Converts a modular adjunct type into Ithkuil.
 *
 * @param type The modular adjunct type to be converted.
 * @returns Romanized Ithkuilic text representing the type.
 */
export function modularAdjunctTypeToIthkuil(type: ModularAdjunctType) {
  return MODULAR_ADJUNCT_TYPE_TO_ITHKUIL_MAP[type]
}
