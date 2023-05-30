import type { Essence } from "../ca/index.js"
import { applyStress, countVowelForms } from "../helpers/stress.js"

/**
 * Applies an essence to an unstressed referential.
 * @param word The unstressed word to apply essence to.
 * @param essence The essence to be applies.
 * @returns Romanized Ithkuilic text containing the word, along with a possible
 * stress indicator on a single vowel.
 */
export function applyReferentialEssence(word: string, essence: Essence) {
  if (essence == "NRM") {
    return word
  }

  if (!word.startsWith("ë") && countVowelForms(word) < 2) {
    word = "ë" + word
  }

  return applyStress(word, -1)
}
