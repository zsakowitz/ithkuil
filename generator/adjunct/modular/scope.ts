import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** The scope of a modular adjunct. */
export type ModularAdjunctScope =
  | "CASE/MOOD+ILL/VAL"
  | "CASE/MOOD"
  | "FORMATIVE"
  | "ADJACENT"

/** An array containing all modular adjunct scopes. */
export const ALL_MODULAR_ADJUNCT_SCOPES: readonly ModularAdjunctScope[] =
  /* @__PURE__ */ deepFreeze([
    "CASE/MOOD+ILL/VAL",
    "CASE/MOOD",
    "FORMATIVE",
    "ADJACENT",
  ])

/** A Zod validator matching modular adjunct scopes. */
export const zodModularAdjunctScope = /* @__PURE__ */ new Enum(
  ALL_MODULAR_ADJUNCT_SCOPES,
)

/**
 * An object mapping from modular adjunct scopes to their Ithkuilic
 * translations.
 */
export const MODULAR_ADJUNCT_SCOPE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  "CASE/MOOD+ILL/VAL": "a",
  "CASE/MOOD": "e",
  FORMATIVE: "i",
  ADJACENT: "o",
})

/**
 * An object mapping from modular adjunct scopes to what they have scope over.
 */
export const MODULAR_ADJUNCT_SCOPE_TO_DESCRIPTION_MAP =
  /* @__PURE__ */ deepFreeze({
    "CASE/MOOD+ILL/VAL": "Case/Mood and Validation + Illocution",
    "CASE/MOOD": "Case/Mood",
    FORMATIVE: "the formative as a whole",
    ADJACENT: "the formative and adjacent adjuncts",
  })

/**
 * Converts a modular adjunct scope into Ithkuil.
 * @param scope The modular adjunct scope to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function modularAdjunctScopeToIthkuil(scope: ModularAdjunctScope) {
  return MODULAR_ADJUNCT_SCOPE_TO_ITHKUIL_MAP[scope]
}
