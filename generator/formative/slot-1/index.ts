import { object } from "zod"
import { deepFreeze } from "../../helpers/deep-freeze.js"
import { zodCaShortcutType, type CAShortcutType } from "./ca-shortcut-type.js"
import {
  zodConcatenationType,
  type ConcatenationType,
} from "./concatenation-type.js"

export * from "./ca-shortcut-type.js"
export * from "./concatenation-type.js"

/** Information directly pertaining to Slot I. */
export type SlotI = {
  /** The concatenation type of the formative. */
  readonly concatenationType: ConcatenationType

  /** The Ca shortcut type of the formative. */
  readonly caShortcutType: CAShortcutType
}

/** A Zod validator matching Slot I data. */
export const zodSlotI = /* @__PURE__ */ object({
  concatenationType: zodConcatenationType,
  caShortcutType: zodCaShortcutType,
})

/**
 * An object mapping from concatenation types and Ca shortcut types to their
 * Ithkuilic translations.
 */
export const SLOT_I_MAP = /* @__PURE__ */ deepFreeze({
  none: {
    none: "",
    w: "w",
    y: "y",
  },
  1: {
    none: "h",
    w: "hl",
    y: "hm",
  },
  2: {
    none: "hw",
    w: "hr",
    y: "hn",
  },
})

/**
 * Converts Slot I of a formative into Ithkuil.
 * @param slot The concatenation type and Ca shortcut type of the formative.
 * @returns Romanized Ithkuilic text representing Slot I of the formative.
 */
export function slotIToIthkuil(slot: SlotI): string {
  return SLOT_I_MAP[`${slot.concatenationType}`][`${slot.caShortcutType}`]
}
