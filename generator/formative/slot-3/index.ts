import { object, string, union } from "zod"
import { zodAffixDegree, type AffixDegree } from "../../affix/index.js"
import { zodReferentList, type ReferentList } from "../../referential/index.js"

/** Slot III. */
export type SlotIII =
  | string
  | ReferentList
  | {
      /** The degree of the affix. */
      readonly degree: AffixDegree

      /** The consonantal form of the affix. */
      readonly cs: string
    }

/** A Zod validator matching Slot III data. */
export const zodSlotIII = /* @__PURE__ */ union([
  /* @__PURE__ */ string(),
  zodReferentList,
  /* @__PURE__ */ object({
    degree: zodAffixDegree,
    cs: /* @__PURE__ */ string(),
  }),
])
