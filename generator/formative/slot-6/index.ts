import { boolean, object } from "zod"
import {
  caToIthkuil,
  geminatedCAToIthkuil,
  zodCa,
  type CA,
} from "../../ca/index.js"

/** Information directly pertaining to Slot VI. */
export type SlotVI = CA

/** A Zod validator matching Slot VI data. */
export const zodSlotVI = zodCa

/** Additional information relevant to Slot VI. */
export type SlotVIMetadata = {
  /** Whether Slot V contains any affixes. */
  readonly isSlotVFilled: boolean
}

/** A Zod validator matching Slot VI metadata. */
export const slotVIMetadata = /* @__PURE__ */ object({
  isSlotVFilled: /* @__PURE__ */ boolean(),
})

/**
 * Converts Slot VI into Ithkuil.
 * @param slot The Ca of the formative.
 * @param metadata Additional information relevant to Slot VI.
 * @returns Romanized Ithkuilic text representing Slot VI.
 */
export function slotVIToIthkuil(
  slot: SlotVI,
  metadata: SlotVIMetadata,
): string {
  return metadata.isSlotVFilled ? geminatedCAToIthkuil(slot) : caToIthkuil(slot)
}
