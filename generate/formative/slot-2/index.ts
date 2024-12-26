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
import { isLegalWordInitialConsonantForm } from "../../index.js"
import { type SlotIII } from "../slot-3/index.js"
import { type Function } from "../slot-4/index.js"
import { type AffixShortcut } from "./affix-shortcut.js"
import type { Stem } from "./stem.js"
import { type Version } from "./version.js"

export * from "./affix-shortcut.js"
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
  readonly affixShortcut?: AffixShortcut | undefined

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
 * An object mapping stems and versions to their indices in the standard vowel
 * table when an a+Ca shortcut is used.
 */
export const SLOT_II_SHORTCUT_MAP = /* @__PURE__ */ deepFreeze({
  1: { PRC: 1, CPT: 2 },
  2: { PRC: 3, CPT: 4 },
  3: { PRC: 9, CPT: 8 },
  0: { PRC: 7, CPT: 6 },
})

/**
 * Converts Slot II into Ithkuil.
 * @param slot The stem and version of the formative.
 * @param metadata Additional information relevant to Slot II.
 * @returns Romanized Ithkuilic text representing Slot II.
 */
export function slotIIToIthkuil(
  slot: SlotII,
  metadata: SlotIIMetadata,
): string {
  if (Array.isArray(metadata.slotIII)) {
    return (
      metadata.doesSlotVHaveAtLeastTwoAffixes ?
        slot.version == "CPT" ?
          "e'a"
        : "a'e"
      : slot.version == "CPT" ? "ea"
      : "ae"
    )
  }

  if (typeof metadata.slotIII == "object") {
    return (
      metadata.doesSlotVHaveAtLeastTwoAffixes ?
        slot.version == "CPT" ?
          metadata.function == "DYN" ?
            "o'ë"
          : "ëu'"
        : metadata.function == "DYN" ? "e'ë"
        : "ëi'"
      : slot.version == "CPT" ?
        metadata.function == "DYN" ?
          "oë"
        : "ëu"
      : metadata.function == "DYN" ? "eë"
      : "ëi"
    )
  }

  let value: string | WithWYAlternative =
    SLOT_II_MAP[`${metadata.affixShortcut}`][slot.stem][
      +(slot.version == "CPT") as 0 | 1
    ]

  if (
    typeof metadata.slotIII == "string" &&
    isLegalWordInitialConsonantForm(metadata.slotIII.replace(/(.)\1/g, "$1")) &&
    metadata.slotI == "" &&
    value == "a" &&
    !metadata.doesSlotVHaveAtLeastTwoAffixes
  ) {
    return ""
  }

  if (typeof value != "string") {
    value = value.withPreviousText(metadata.slotI)
  }

  if (metadata.doesSlotVHaveAtLeastTwoAffixes) {
    value = insertGlottalStop(value, false)
  }

  return value
}
