import { ALL_DIPTIONGS } from "./dipthongs.js"
import { has } from "./has.js"
import { WithWYAlternative } from "./with-wy-alternative.js"

/**
 * Inserts a glottal stop into a vowel form.
 * @param vowelForm The vowel form to insert a glottal stop into.
 * @param isAtEndOfWord Whether the finished vowel form will be at the end of a
 * word.
 * @returns The vowel form with a glottal stop inserted.
 */
export function insertGlottalStop(vowelForm: string, isAtEndOfWord: boolean) {
  if (isAtEndOfWord) {
    if (vowelForm.length == 1) {
      return vowelForm + "'" + vowelForm
    }

    if (vowelForm.length == 2) {
      return vowelForm[0] + "'" + vowelForm[1]
    }
  } else {
    if (vowelForm.length == 1 || has(ALL_DIPTIONGS, vowelForm)) {
      return vowelForm + "'"
    }

    if (vowelForm.length == 2) {
      return vowelForm[0] + "'" + vowelForm[1]
    }
  }

  throw new Error("Vowel forms may only 1 or 2 vowels.")
}

/**
 * Inserts a glottal stop into a vowel form (which may be a WithWYAlternative).
 * @param vowelForm The vowel form to insert a glottal stop into.
 * @param isAtEndOfWord Whether the finished vowel form will be at the end of a
 * word.
 * @returns The vowel form with a glottal stop inserted.
 */
export function insertGlottalStopIntoPossiblyWithWYAlternative(
  vowelForm: string,
  isAtEndOfWord: boolean,
): string

/**
 * Inserts a glottal stop into a vowel form (which may be a WithWYAlternative).
 * @param vowelForm The vowel form to insert a glottal stop into.
 * @param isAtEndOfWord Whether the finished vowel form will be at the end of a
 * word.
 * @returns The vowel form with a glottal stop inserted.
 */
export function insertGlottalStopIntoPossiblyWithWYAlternative(
  vowelForm: WithWYAlternative,
  isAtEndOfWord: boolean,
): WithWYAlternative

/**
 * Inserts a glottal stop into a vowel form (which may be a WithWYAlternative).
 * @param vowelForm The vowel form to insert a glottal stop into.
 * @param isAtEndOfWord Whether the finished vowel form will be at the end of a
 * word.
 * @returns The vowel form with a glottal stop inserted.
 */
export function insertGlottalStopIntoPossiblyWithWYAlternative(
  vowelForm: string | WithWYAlternative,
  isAtEndOfWord: boolean,
): string | WithWYAlternative

export function insertGlottalStopIntoPossiblyWithWYAlternative(
  vowelForm: string | WithWYAlternative,
  isAtEndOfWord: boolean,
) {
  if (typeof vowelForm == "string") {
    return insertGlottalStop(vowelForm, isAtEndOfWord)
  } else {
    return vowelForm.insertGlottalStop(isAtEndOfWord)
  }
}
