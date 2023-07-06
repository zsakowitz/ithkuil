import type { ReferentList } from "../../generator/referential/referent/list.js"
import {
  ALL_REFERENTS,
  REFERENT_TO_ITHKUIL_MAP,
  type Referent,
} from "../../generator/referential/referent/referent.js"

const ALL_REFERENTS_REVERSED = /* @__PURE__ */ ALL_REFERENTS.slice().reverse()

const PERSPECTIVES = [
  ["ļ", "G"],
  ["tļ", "G"],
  ["ç", "N"],
  ["x", "N"],
  ["w", "A"],
  ["y", "A"],
] as const

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
        continue outer
      }
    }

    throw new Error("Invalid referent: " + list + ".")
  }

  if (output.length == 0) {
    throw new Error("Invalid referent: " + list + ".")
  }

  return output as [Referent, ...Referent[]]
}

/**
 * Parses a referent list along with an optional perspective (e.g. `"smlx"`).
 * @param list The referent list and perspective to be parsed.
 * @returns An array containing two items: an array of parsed referents, and an
 * optional perspective.
 */
export function parseReferentListAndPerspective(
  list: string,
): [referentList: ReferentList, perspective: "G" | "N" | "A" | undefined] {
  let perspective: "G" | "N" | "A" | undefined

  for (const [value, persp] of PERSPECTIVES) {
    if (list.startsWith(value)) {
      list = list.slice(value.length)
      perspective = persp
      break
    }

    if (list.endsWith(value)) {
      list = list.slice(0, -value.length)
      perspective = persp
      break
    }
  }

  const output: Referent[] = []

  outer: while (list.length) {
    for (const referent of ALL_REFERENTS_REVERSED) {
      const value = REFERENT_TO_ITHKUIL_MAP.false[referent]

      if (list.startsWith(value)) {
        output.push(referent)
        list = list.slice(value.length)
        continue outer
      }
    }

    throw new Error("Invalid referent: " + list + ".")
  }

  if (output.length == 0) {
    throw new Error("Invalid referent: " + list + ".")
  }

  return [output as [Referent, ...Referent[]], perspective]
}
