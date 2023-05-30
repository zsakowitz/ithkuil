import { applyStress, countVowelForms } from "../../helpers/stress.js"

/** The stress type marked by Slot X. */
export type SlotX = "UNF/C" | "UNF/K" | "FRM"

/**
 * Applies Slot X stress to an Ithkuilic word.
 * @param word The word to apply stress to.
 * @param stress The stress type to apply.
 * @returns Romanized Ithkuilic text representing the full formative, including
 * the stress, marked with an accent mark or circumflex.
 */
export function applySlotXStress(word: string, stress: SlotX) {
  const vowelFormCount = countVowelForms(word)

  if (stress == "UNF/C") {
    if (vowelFormCount >= 2) {
      return word
    }

    throw new Error(`The formative '${word}' cannot be marked nominal.`)
  }

  if (stress == "UNF/K") {
    if (vowelFormCount == 1) {
      return word
    }

    return applyStress(word, -1)
  }

  if (stress == "FRM") {
    return applyStress(word, -3)
  }

  throw new Error("Invalid stress type '" + stress + "'.")
}
