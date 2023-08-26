import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises"
import { wordToIthkuil } from "../generate/index.js"
import { glossWord } from "../gloss/index.js"
import { parseWord } from "../parse/index.js"
import { unglossReferential } from "../ungloss/index.js"

const rl = createInterface(stdin, stdout)

while (true) {
  const inputGloss = await rl.question("\nInput gloss:    ")

  try {
    const referential = unglossReferential(inputGloss)

    const word = wordToIthkuil(referential)
    const reparsedFormative = parseWord(word)

    if (!reparsedFormative) {
      throw new Error("Invalid word: '" + word + "'.")
    }

    const regloss = glossWord(reparsedFormative)

    console.log("Interpretation: " + regloss.short)
    console.log("Interpretation: " + regloss.full)
    console.log("Output:         " + word)
  } catch (error) {
    console.error(
      "Error: " + (error instanceof Error ? error.message : String(error)),
    )
  }
}
