import { deepFreeze } from "../../helpers/deep-freeze.js"
import { insertGlottalStop } from "../../helpers/insert-glottal-stop.js"
import {
  IA_UÄ,
  IE_UË,
  IO_ÜÄ,
  IÖ_ÜË,
  UA_IÄ,
  UE_IË,
  UO_ÖÄ,
  UÖ_ÖË,
  WithWYAlternative,
} from "../../helpers/with-wy-alternative.js"
import type { SlotIII } from "../slot-3/index.js"
import type { Function } from "../slot-4/index.js"
import type { Stem } from "./stem.js"
import type { Version } from "./version.js"

export * from "./stem.js"
export * from "./version.js"

/** Information directly pertaining to Slot II. */
export type SlotII = {
  /** The stem of the formative. */
  readonly stem: Stem

  /** The version of the formative. */
  readonly version: Version
}

/** Additional information relevant to Slot II. */
export type SlotIIMetadata = {
  /** The codified contents of Slot I. */
  readonly slotI: string

  /** The raw contents of Slot III. */
  readonly slotIII: SlotIII

  /** The affix shortcut (if any) indicated by Slot II. */
  readonly affixShortcut?: "NEG/4" | "DCD/4" | "DCD/5" | undefined

  /** Whether Slot V contains at least two affixes. */
  readonly doesSlotVHaveAtLeastTwoAffixes: boolean

  /** The function of the formative. */
  readonly function: Function
}

/**
 * An object mapping affix shortcuts, stems, and versions to their Ithkuilic
 * translations.
 */
export const SLOT_II_MAP = /* @__PURE__ */ deepFreeze({
  undefined: [
    ["o", "ö"],
    ["a", "ä"],
    ["e", "i"],
    ["u", "ü"],
  ],
  "NEG/4": [
    ["oi", "ou"],
    ["ai", "au"],
    ["ei", "eu"],
    ["ui", "iu"],
  ],
  "DCD/4": [
    [UO_ÖÄ, UÖ_ÖË],
    [IA_UÄ, IE_UË],
    [IO_ÜÄ, IÖ_ÜË],
    [UA_IÄ, UE_IË],
  ],
  "DCD/5": [
    ["oe", "öe"],
    ["ao", "aö"],
    ["eo", "eö"],
    ["oa", "öa"],
  ],
})

/**
 * Converts Slot II into Ithkuil.
 * @param slot The stem and version of the formative.
 * @param metadata Additional information relevant to Slot II.
 * @returns Romanized Ithkuilic text representing Slot II.
 */
export function slotIIToIthkuil(
  slot: SlotII,
  metadata: SlotIIMetadata
): string {
  if (Array.isArray(metadata.slotIII)) {
    return slot.version == "CPT" ? "ea" : "ae"
  }

  if (typeof metadata.slotIII == "object") {
    return slot.version == "CPT"
      ? metadata.function == "DYN"
        ? "oë"
        : "ëu"
      : metadata.function == "DYN"
      ? "eë"
      : "ëi"
  }

  let value: string | WithWYAlternative =
    SLOT_II_MAP[`${metadata.affixShortcut}`][slot.stem][
      +(slot.version == "CPT") as 0 | 1
    ]

  if (
    metadata.slotIII.replace(/(.)\1/g, "$1").length <= 2 &&
    metadata.slotI == "" &&
    value == "a"
  ) {
    if (metadata.doesSlotVHaveAtLeastTwoAffixes) {
      return "a'"
    } else {
      return ""
    }
  }

  if (typeof value != "string") {
    value = value.withPreviousText(metadata.slotI)
  }

  if (metadata.doesSlotVHaveAtLeastTwoAffixes) {
    value = insertGlottalStop(value, false)
  }

  return value
}
