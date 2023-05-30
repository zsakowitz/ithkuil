import type { AffixDegree } from "../../affix/index.js"
import type { ReferrentList } from "../../referential/index.js"

/** Slot III. */
export type SlotIII =
  | string
  | ReferrentList
  | {
      /** The degree of the affix. */
      readonly degree: AffixDegree

      /** The consonantal form of the affix. */
      readonly cs: string
    }
