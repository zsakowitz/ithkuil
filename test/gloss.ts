import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises"
import { glossWord } from "../gloss/index.js"
import { parseWord } from "../parse/index.js"

const rl = createInterface(stdin, stdout)

while (true) {
  const inputWord = await rl.question("\nWord:  ")

  try {
    const parsedWord = parseWord(inputWord)

    if (parsedWord == null) {
      throw new Error("Invalid word: '" + inputWord + "'.")
    }

    const gloss = glossWord(parsedWord)

    console.log("Gloss: " + gloss.short)
    console.log("Gloss: " + gloss.full)
  } catch (error) {
    console.error(
      "Error: " + (error instanceof Error ? error.message : String(error)),
    )
  }
}
