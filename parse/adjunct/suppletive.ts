import type { SuppletiveAdjunct } from "../../generate/adjunct/suppletive/index.js"
import { parseCase } from "../formative/case.js"
import { suppletiveAdjunct } from "../lex/adjunct/suppletive.js"
import { VowelForm } from "../vowel-form.js"

const CP_TO_SUPPLETIVE_ADJUNCT = {
  hl: "CAR",
  hm: "QUO",
  hn: "NAM",
  hň: "PHR",
} as const

/**
 * Builds a suppletive adjunct.
 * @param word The word to be built.
 * @param stress The stress of the adjunct.
 * @returns Either a parsed `SuppletiveAdjunct` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the adjunct was
 * successfully tokenized but had another error in it (e.g. invalid Vh slot,
 * etc.).
 */
export function buildSuppletiveAdjunct(
  word: string,
): SuppletiveAdjunct | undefined {
  const match = suppletiveAdjunct.exec(word)

  if (!match) {
    return
  }

  return {
    type: CP_TO_SUPPLETIVE_ADJUNCT[
      match[1]! as keyof typeof CP_TO_SUPPLETIVE_ADJUNCT
    ],
    case: parseCase(VowelForm.parseOrThrow(match[2]!)),
  }
}
