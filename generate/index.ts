import { affixualAdjunctToIthkuil } from "./adjunct/affixual/index.js"
import { adjunctToIthkuil, type Adjunct } from "./adjunct/index.js"
import { modularAdjunctToIthkuil } from "./adjunct/modular/index.js"
import {
  suppletiveAdjunctToIthkuil,
  type SuppletiveAdjunct,
} from "./adjunct/suppletive/index.js"
import { formativeToIthkuil, type PartialFormative } from "./formative/index.js"
import {
  referentialToIthkuil,
  type PartialReferential,
} from "./referential/referential.js"

export * from "./adjunct/index.js"
export * from "./affix/index.js"
export * from "./ca/index.js"
export * from "./formative/index.js"
export * from "./helpers/deep-freeze.js"
export * from "./helpers/dipthongs.js"
export * from "./helpers/enum.js"
export * from "./helpers/fill-defaults.js"
export * from "./helpers/has.js"
export * from "./helpers/insert-glottal-stop.js"
export * from "./helpers/permutations.js"
export * from "./helpers/stress.js"
export * from "./helpers/vowel-table.js"
export * from "./helpers/with-wy-alternative.js"
export * from "./phonotactics/index.js"
export * from "./referential/index.js"

function assertWordIsNotFormative<T>(
  word: T,
): asserts word is Exclude<typeof word, PartialFormative> {}

/** The type of a generic Ithkuilic word. */
export type Word = PartialReferential | PartialFormative | Adjunct

/**
 * Converts a single word into Ithkuil.
 * @param word The word to be converted.
 * @returns Romanized Ithkuilic text representing the word.
 *
 * Note that while this function aims to always capture the caller's intent and
 * return the correct type of word, there is one edge case. Specifically, all
 * Suppletive Adjuncts can alternately be parsed as referentials with suppletive
 * referents. To resolve this ambiguity, this function always converts
 * Suppletive Adjuncts to their standard adjunct forms if possible.
 *
 * Here is an example of such an ambiguity, and how `wordToIthkuil` resolves it.
 *
 * ```ts
 * suppletiveAdjunctToIthkuil({ type: "NAM", case: "STM" })
 * // "hnëi"
 *
 * referentialToIthkuil({ type: "NAM", case: "STM" })
 * // "üohnëi"
 *
 * wordToIthkuil({ type: "NAM", case: "STM" })
 * // "hnëi"
 * ```
 *
 * Of course, it calls `referentialToIthkuil` when needed.
 *
 * ```ts
 * wordToIthkuil({ type: "NAM", case: "STM", essence: "RPV" })
 * // "üohnêi"
 * ```
 */
export function wordToIthkuil(word: Word): string {
  if (
    typeof word == "string" ||
    typeof word == "number" ||
    typeof word == "bigint"
  ) {
    return adjunctToIthkuil(word)
  }

  if ("vn1" in word && typeof word.vn1 == "string") {
    return modularAdjunctToIthkuil(word)
  }

  if ("root" in word && word.root != null) {
    return formativeToIthkuil(word)
  }

  // This does nothing except make TypeScript happy.
  assertWordIsNotFormative(word)

  if ("type" in word) {
    if (
      (word.type == "CAR" ||
        word.type == "NAM" ||
        word.type == "PHR" ||
        word.type == "QUO") &&
      "case" in word &&
      typeof word.case == "string" &&
      !(
        ("affixes" in word && word.affixes) ||
        ("case2" in word && word.case2) ||
        ("essence" in word && word.essence != "RPV") ||
        ("perspective2" in word && word.perspective2) ||
        ("referents2" in word && word.referents2) ||
        ("specification" in word && word.specification)
      )
    ) {
      return suppletiveAdjunctToIthkuil(word as SuppletiveAdjunct)
    }

    return referentialToIthkuil(word)
  }

  if (word.affixes && (!("referents" in word) || word.referents == null)) {
    return affixualAdjunctToIthkuil(word)
  }

  if (word.referents) {
    return referentialToIthkuil(word)
  }

  throw new Error("Invalid word.", { cause: word })
}
