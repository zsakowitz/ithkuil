import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"

/** The scope of an affixual adjunct. */
export type AffixualAdjunctScope =
  | "V:DOM"
  | "V:SUB"
  | "VII:DOM"
  | "VII:SUB"
  | "FORMATIVE"
  | "ADJACENT"

/** An array containing all affixual adjunct scopes. */
export const ALL_AFFIXUAL_ADJUNCT_SCOPES: readonly AffixualAdjunctScope[] =
  /* @__PURE__ */ deepFreeze([
    "V:DOM",
    "V:SUB",
    "VII:DOM",
    "VII:SUB",
    "FORMATIVE",
    "ADJACENT",
  ])

/** A Zod validator matching affixual adjunct scopes. */
export const zodAffixualAdjunctScope = /* @__PURE__ */ new Enum(
  ALL_AFFIXUAL_ADJUNCT_SCOPES,
)

/**
 * An object mapping from affixual adjunct scopes to their Ithkuilic
 * translations.
 */
export const AFFIXUAL_ADJUNCT_SCOPE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze(
  {
    vs: {
      "V:DOM": "a",
      "V:SUB": "u",
      "VII:DOM": "e",
      "VII:SUB": "i",
      FORMATIVE: "o",
      ADJACENT: "ö",
    },
    cz: {
      "V:DOM": "h",
      "V:SUB": "'h",
      "VII:DOM": "'hl",
      "VII:SUB": "'hr",
      FORMATIVE: "hw",
      ADJACENT: "'hw",
    },
  },
)

/** An object mapping from affixual adjunct scopes to their names. */
export const AFFIXUAL_ADJUNCT_SCOPE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  "V:DOM": "Last of Slot V",
  "V:SUB": "First of Slot V",
  "VII:DOM": "Last of Slot VII",
  "VII:SUB": "First of Slot VII",
  FORMATIVE: "Entire Formative",
  ADJACENT: "Formative + Affixes",
})

/**
 * Converts an affixual adjunct scope into Ithkuil.
 * @param scope The scope to be converted.
 * @param type Whether this scope is used in a Vs, Cz, or Vz slot.
 * @param omitWhenPossible Whether the default scope may be ommitted.
 * @returns Romanized Ithkuilic text representing the affixual adjunct scope.
 */
export function affixualAdjunctScopeToIthkuil(
  scope: AffixualAdjunctScope,
  type: "vs" | "cz" | "vz",
  omitWhenPossible: boolean,
): string {
  if (type == "vs" && scope == "V:DOM" && omitWhenPossible) {
    return ""
  }

  return AFFIXUAL_ADJUNCT_SCOPE_TO_ITHKUIL_MAP[type == "vz" ? "vs" : type][
    scope
  ]
}
