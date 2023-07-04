import type { ReferentList } from "../../generator/referential/referent/list.js"
import {
  ALL_REFERENTS,
  REFERENT_TO_ITHKUIL_MAP,
  type Referent,
} from "../../generator/referential/referent/referent.js"

const ALL_REFERENTS_REVERSED = /* @__PURE__ */ ALL_REFERENTS.slice().reverse()

/**
 * Parses a referent list (e.g. `"sml"`).
 * @param list The referent list to be parsed.
 * @returns The parsed `ReferentList`.
 */
export function parseReferentList(list: string): ReferentList {
  const output: Referent[] = []

  outer: while (list.length) {
    for (const referent of ALL_REFERENTS_REVERSED) {
      const value = REFERENT_TO_ITHKUIL_MAP.false[referent]

      if (list.startsWith(value)) {
        output.push(referent)
        list = list.slice(value.length)
        break outer
      }
    }

    throw new Error("Invalid referent: " + list + ".")
  }

  if (output.length == 0) {
    throw new Error("Invalid referent: " + list + ".")
  }

  return output as [Referent, ...Referent[]]
}
