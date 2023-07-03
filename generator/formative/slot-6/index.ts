import { caToIthkuil, geminatedCAToIthkuil, type CA } from "../../ca/index.js"

/** Information directly pertaining to Slot VI. */
export type SlotVI = CA

/** Additional information relevant to Slot VI. */
export type SlotVIMetadata = {
  /** Whether Slot V contains any affixes. */
  readonly isSlotVFilled: boolean
}

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
