import { type AffixDegree } from "../../affix/index.js"
import { deepFreeze } from "../../helpers/deep-freeze.js"
import { ONE_INDEXED_STANDARD_VOWEL_TABLE } from "../../helpers/vowel-table.js"
import {
  IA_UÄ,
  IE_UË,
  IO_ÜÄ,
  IÖ_ÜË,
  UA_IÄ,
  UE_IË,
  UO_ÖÄ,
  UÖ_ÖË,
} from "../../helpers/with-wy-alternative.js"
import { type Context } from "./context.js"
import { type Function } from "./function.js"
import { type Specification } from "./specification.js"

export * from "./context.js"
export * from "./function.js"
export * from "./specification.js"

/** Information directly pertaining to Slot IV. */
export type SlotIV = {
  /** The function of the formative. */
  readonly function: Function

  /** The specification of the formative. */
  readonly specification: Specification

  /** The context of the formative. */
  readonly context: Context
}

/** Additional information relevant to Slot IV. */
export type SlotIVMetadata = {
  /** The codified contents of Slot III. */
  readonly slotIII: string

  /**
   * If the formative has an affixual root, this is the degree of that affix.
   * Otherwise, it must be `undefined`.
   */
  readonly affixualFormativeDegree?: AffixDegree | undefined
}

/**
 * An object mapping from contexts, functions, and specifications to their
 * Ithkuilic translations.
 */
export const SLOT_IV_MAP = /* @__PURE__ */ deepFreeze({
  EXS: {
    STA: { BSC: "a", CTE: "ä", CSV: "e", OBJ: "i" },
    DYN: { BSC: "u", CTE: "ü", CSV: "o", OBJ: "ö" },
  },
  FNC: {
    STA: { BSC: "ai", CTE: "au", CSV: "ei", OBJ: "eu" },
    DYN: { BSC: "ui", CTE: "iu", CSV: "oi", OBJ: "ou" },
  },
  RPS: {
    STA: { BSC: IA_UÄ, CTE: IE_UË, CSV: IO_ÜÄ, OBJ: IÖ_ÜË },
    DYN: { BSC: UA_IÄ, CTE: UE_IË, CSV: UO_ÖÄ, OBJ: UÖ_ÖË },
  },
  AMG: {
    STA: { BSC: "ao", CTE: "aö", CSV: "eo", OBJ: "eö" },
    DYN: { BSC: "oa", CTE: "öa", CSV: "oe", OBJ: "öe" },
  },
})

/**
 * An object mapping from contexts to their indices in the standard vowel table.
 */
export const CONTEXT_TO_INDEX_MAP = /* @__PURE__ */ deepFreeze({
  EXS: 0,
  FNC: 1,
  RPS: 2,
  AMG: 3,
})

/**
 * Converts Slot IV into Ithkuil.
 * @param slot The function, specification, and context of the formative.
 * @param metadata Additional information relevant to Slot IV.
 * @returns Romanized Ithkuilic text representing Slot IV.
 */
export function slotIVToIthkuil(
  slot: SlotIV,
  metadata: SlotIVMetadata,
): string {
  const value =
    metadata.affixualFormativeDegree != null ?
      ONE_INDEXED_STANDARD_VOWEL_TABLE[CONTEXT_TO_INDEX_MAP[slot.context]][
        metadata.affixualFormativeDegree
      ]
    : SLOT_IV_MAP[slot.context][slot.function][slot.specification]

  if (typeof value == "string") {
    return value
  }

  return value.withPreviousText(metadata.slotIII)
}
