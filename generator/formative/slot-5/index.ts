import { boolean, object } from "zod"
import { affixToIthkuil, zodAffix, type Affix } from "../../affix/index.js"
import { EMPTY, WithWYAlternative } from "../../helpers/with-wy-alternative.js"

/** Information directly pertaining to Slot V. */
export type SlotV = readonly Affix[]

/** A Zod validator matching Slot V data. */
export const zodSlotV = /* @__PURE__ */ zodAffix.array()

/** Additional information relevant to Slot V. */
export type SlotVMetadata = {
  /** Whether Slot VI is elided. */
  readonly isSlotVIElided: boolean

  /** Whether Slot V is at the end of the word. */
  readonly isAtEndOfWord: boolean
}

/** A Zod validator matching Slot V metadata. */
export const zodSlotVMetadata = /* @__PURE__ */ object({
  isSlotVIElided: /* @__PURE__ */ boolean(),
  isAtEndOfWord: /* @__PURE__ */ boolean(),
})

/**
 * Converts Slot V into Ithkuil.
 * @param slot The Slot V affixes of the formative.
 * @param metadata Additional information relevant to Slot V.
 * @returns A `WithWYAlternative` containing romanized Ithkuilic text
 * representing Slot V.
 */
export function slotVToIthkuil(
  slot: SlotV,
  metadata: SlotVMetadata,
): WithWYAlternative {
  if (slot.length == 0) {
    return EMPTY
  }

  if (metadata.isSlotVIElided) {
    return slot
      .map((affix, index) =>
        affixToIthkuil(affix, {
          reversed: false,
          insertGlottalStop: index == slot.length - 1,
        }),
      )
      .reduce((a, b) => a.add(b))
  } else {
    return slot
      .map((affix) => affixToIthkuil(affix, { reversed: true }))
      .reduce((a, b) => a.add(b))
  }
}
