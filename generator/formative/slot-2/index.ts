import { boolean, object, string } from "zod"
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
import { zodSlotIII, type SlotIII } from "../slot-3/index.js"
import { zodFunction, type Function } from "../slot-4/index.js"
import { zodAffixShortcut, type AffixShortcut } from "./affix-shortcut.js"
import type { Stem } from "./stem.js"
import { zodStem } from "./stem.js"
import { zodVersion, type Version } from "./version.js"

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

/** A Zod validator matching Slot II data. */
export const zodSlotII = /* @__PURE__ */ object({
  stem: zodStem,
  version: zodVersion,
})

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

/** A Zod validator matching Slot II metadata. */
export const zodSlotIIMetadata = /* @__PURE__ */ object({
  slotI: /* @__PURE__ */ string(),
  slotIII: zodSlotIII,
  affixShortcut: /* @__PURE__ */ zodAffixShortcut.optional(),
  doesSlotVHaveAtLeastTwoAffixes: /* @__PURE__ */ boolean(),
  function: zodFunction,
})

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
  1: { PRC: 0, CPT: 1 },
  2: { PRC: 2, CPT: 3 },
  3: { PRC: 5, CPT: 6 },
  0: { PRC: 7, CPT: 8 },
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
