import {
  ALL_SUPPLETIVE_ADJUNCT_TYPES,
  has,
  type PartialFormative,
  type PartialNominalFormative,
  type Word,
} from "../generate/index.js"
import { parseWord } from "../parse/index.js"

/** A result type showing either success or failure. */
export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: string }

/**
 * A helper type which removes properties that may only be undefined from an
 * object type `T`.
 */
export type OmitUndefinedValues<T> = T extends infer U
  ? {
      [K in keyof U as [U[K]] extends [undefined] ? never : K]: U[K]
    }
  : never

/** A parsed item from a string of sentences. */
export type ParsedItem =
  | {
      readonly type: "word"
      readonly word: Word
      readonly source: string
      readonly properNoun?: string | undefined
    }
  | {
      readonly type: "chain"

      readonly words: readonly [
        readonly [source: string, formative: PartialNominalFormative],
        ...(readonly [source: string, formative: PartialNominalFormative])[],
        readonly [source: string, formative: PartialFormative],
      ]

      readonly properNoun?: string | undefined
    }
  | {
      readonly type: "brokenChain"

      readonly words: readonly [
        readonly [source: string, formative: PartialNominalFormative],
        ...(readonly [source: string, formative: PartialNominalFormative])[],
      ]

      readonly properNoun?: undefined
    }
  | {
      readonly type: "sentenceBreak"
    }

function parseSentence(text: string): Result<ParsedItem[]> {
  try {
    const words = text.match(/[\p{ID_Start}'][\p{ID_Start}\p{ID_Continue}']*/gu)

    if (!words) {
      return { ok: true, value: [] }
    }

    const output: ParsedItem[] = []

    let wordType:
      | { type: "word" }
      | { type: "carrier"; word: Word; source: string }
      | {
          type: "chain"
          words: [
            [string, PartialNominalFormative],
            ...[string, PartialFormative][],
          ]
          includesCarrier: boolean
          expects: "formative" | "properNoun"
        } = { type: "word" }

    for (const word of words) {
      if (wordType.type == "carrier") {
        output.push({
          type: "word",
          word: wordType.word,
          source: wordType.source,
          properNoun: word,
        })

        wordType = { type: "word" }

        continue
      }

      if (wordType.type == "chain" && wordType.expects == "properNoun") {
        output.push({
          type: "chain",
          words: wordType.words as any,
          properNoun: word,
        })

        wordType = { type: "word" }

        continue
      }

      const result = parseWord(word)!

      if (!result) {
        return { ok: false, reason: `“${word}” is not a valid word.` }
      }

      if (typeof result == "object" && "root" in result) {
        if (wordType.type == "chain") {
          if (result.root == "s") {
            wordType.includesCarrier = true
          }

          wordType.words.push([word, result])

          if (
            result.type != "UNF/C" ||
            (result.concatenationType != 1 && result.concatenationType != 2)
          ) {
            if (wordType.includesCarrier) {
              wordType.expects = "properNoun"
            } else {
              output.push({ type: "chain", words: wordType.words as any })

              wordType = { type: "word" }
            }
          }
        } else {
          if (
            result.type == "UNF/C" &&
            (result.concatenationType == 1 || result.concatenationType == 2)
          ) {
            wordType = {
              type: "chain",
              expects: "formative",
              includesCarrier: result.root == "s",
              words: [[word, result]],
            }
          } else if (result.root == "s") {
            wordType = { type: "carrier", word: result, source: word }
          } else {
            output.push({ type: "word", word: result, source: word })
            wordType = { type: "word" }
          }
        }
      } else {
        if (wordType.type == "chain") {
          output.push({ type: "brokenChain", words: wordType.words as any })
        }

        if (
          result == "SPF:START" ||
          (typeof result == "object" &&
            "type" in result &&
            has(ALL_SUPPLETIVE_ADJUNCT_TYPES, result.type))
        ) {
          wordType = { type: "carrier", word: result, source: word }
        } else {
          output.push({ type: "word", word: result, source: word })
          wordType = { type: "word" }
        }
      }
    }

    if (wordType.type == "carrier") {
      output.push({
        type: "word",
        word: wordType.word,
        source: wordType.source,
      })
    } else if (wordType.type == "chain") {
      output.push({ type: "brokenChain", words: wordType.words as any })
    }

    return { ok: true, value: output }
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
    }
  }
}

const sentenceJunctureAffix =
  /(^|[^\p{ID_Start}\p{ID_Continue}'])(çç|ç[waeiouäëöüìùáéíóúâêôû]|çë[\p{ID_Start}\p{ID_Continue}'])/gu

/**
 * Parses romanized Ithkuilic text into a series of items.
 * @param text The text to be parsed.
 * @returns A `Result` containing an array of `ParsedItem`s.
 */
export function parseSentences(text: string): Result<ParsedItem[]> {
  text = text
    // The ç in the regex is a "c" with an extension of "̧ ".
    // We replace it with "ç" (a single character) for parsing purposes.
    .replace(/ç/g, "ç")
    .replace(
      sentenceJunctureAffix,
      (_, previousChar: string, junctureAffix: string) => {
        return (
          previousChar +
          ". " +
          (junctureAffix == "çç"
            ? "y"
            : junctureAffix.slice(junctureAffix.startsWith("çë") ? 2 : 1))
        )
      },
    )

  const output: ParsedItem[] = []
  let isFirst = true

  for (const sentence of text.split(/[.!?]/g).filter((x) => x.trim() != "")) {
    const result = parseSentence(sentence)

    if (!result.ok) {
      return result
    }

    if (!isFirst) {
      output.push({ type: "sentenceBreak" })
    }

    output.push(...result.value)

    isFirst = false
  }

  return { ok: true, value: output }
}
