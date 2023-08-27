import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline"
import { wordToIthkuil, type Word } from "../generate/index.js"
import { glossWord } from "../gloss/index.js"
import { parseWord } from "../parse/index.js"
import {
  unglossAffixualAdjunct,
  unglossFormative,
  unglossModularAdjunct,
  unglossReferential,
  unglossSimpleAdjunct,
} from "../ungloss/index.js"

const colors = {
  black: "\u001b[30m",
  blue: "\u001b[34m",
  cyan: "\u001b[36m",
  dim: "\u001b[2m",
  green: "\u001b[32m",
  magenta: "\u001b[35m",
  red: "\u001b[31m",
  reset: "\u001b[0m",
  white: "\u001b[37m",
  yellow: "\u001b[33m",
} as const

const rl = createInterface(stdin, stdout)

const MAX_LABEL_LENGTH = 14
const MAX_WORD_LENGTH = 20

function ask(question: string) {
  return new Promise<string>((resolve) => rl.question(question, resolve))
}

function show<T extends Word>(
  inputGloss: string,
  label: string,
  ungloss: (gloss: string) => T | undefined,
) {
  try {
    const parsed = ungloss(inputGloss)

    if (parsed) {
      const word = wordToIthkuil(parsed)
      const reparsed = parseWord(word)

      if (reparsed) {
        const gloss = glossWord(reparsed)

        console.log(
          colors.blue +
            label.padStart(MAX_LABEL_LENGTH) +
            colors.yellow +
            word.padEnd(MAX_WORD_LENGTH) +
            " " +
            colors.reset +
            gloss.short,
        )
      }
    }
  } catch (error) {
    console.log(
      colors.red +
        colors.dim +
        label.padStart(MAX_LABEL_LENGTH) +
        (error instanceof Error ? error.message : String(error)) +
        colors.reset,
    )
  }
}

while (true) {
  const inputGloss = await ask(
    "\n" +
      colors.blue +
      "Input gloss: ".padStart(MAX_LABEL_LENGTH) +
      colors.reset,
  )

  show(inputGloss, "Formative: ", unglossFormative)
  show(inputGloss, "Referential: ", unglossReferential)
  show(inputGloss, "Adjunct: ", unglossSimpleAdjunct)
  show(inputGloss, "Affixual: ", unglossAffixualAdjunct)
  show(inputGloss, "Modular: ", unglossModularAdjunct)
}
