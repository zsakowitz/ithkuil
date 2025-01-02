import { affixToIthkuil, type Affix } from "../../affix/index.js"
import { EMPTY, WithWYAlternative } from "../../helpers/with-wy-alternative.js"

/** Information directly pertaining to Slot VII. */
export type SlotVII = readonly Affix[]

/**
 * Converts Slot VII into Ithkuil.
 *
 * @param slot The Slot VII affixes of the formative.
 * @returns A `WithWYAlternative` containing romanized Ithkuilic text
 *   representing Slot VII.
 */
export function slotVIIToIthkuil(slot: SlotVII): WithWYAlternative {
  if (slot.length == 0) {
    return EMPTY
  }

  return slot
    .map((affix) => affixToIthkuil(affix, { reversed: false }))
    .reduce((a, b) => a.add(b))
}
