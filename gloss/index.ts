// TODO: JSDoc everything

import type {
  PartialFormative,
  SuppletiveAdjunct,
  Word,
} from "../generate/index.js"
import { glossAdjunct } from "./adjunct.js"
import { glossFormative } from "./formative.js"
import { glossReferential } from "./referential.js"

export * from "./adjunct.js"
export * from "./affix.js"
export * from "./ca.js"
export * from "./case.js"
export * from "./cn.js"
export * from "./formative.js"
export * from "./glossable.js"
export * from "./referent-list-and-perspective.js"
export * from "./referent.js"
export * from "./referential.js"
export * from "./vn.js"

function assertWordIsNotFormative<T>(
  word: T,
): asserts word is Exclude<typeof word, PartialFormative> {}

/**
 * Glosses a word.
 * @param word The word to gloss.
 * @returns A `GlossString` representing the word.
 */
export function glossWord(word: Word) {
  if (typeof word == "string") {
    return glossAdjunct(word)
  }

  if ("vn1" in word && typeof word.vn1 == "string") {
    return glossAdjunct(word)
  }

  if ("root" in word && word.root != null) {
    return glossFormative(word)
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
      return glossAdjunct(word as SuppletiveAdjunct)
    }

    return glossReferential(word)
  }

  if (word.affixes && (!("referents" in word) || word.referents == null)) {
    return glossAdjunct(word)
  }

  if (word.referents) {
    return glossReferential(word)
  }

  throw new Error("Invalid word.", { cause: word })
}
