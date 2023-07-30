import {
  AtomicRegexPart,
  any,
  charIn,
  deepFreezeAndNullPrototype,
  seq,
  start,
  transformWordButLeaveStressMarkings,
} from "../../index.js"
import type { DiacriticName } from "../other/diacritic.js"
import type { CoreName } from "./core.js"
import type { ExtensionName } from "./extension.js"
import type { SecondaryCharacter } from "./index.js"

export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

const STRESSED_TO_UNSTRESSED_VOWEL_MAP =
  /* @__PURE__ */ deepFreezeAndNullPrototype({
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    â: "ä",
    ê: "ë",
    ô: "ö",
    û: "ü",
  })

const UNSTRESSED_VOWEL = "aeiouäëöü"
const unstressedVowel = /* @__PURE__ */ charIn(UNSTRESSED_VOWEL)

const ANY_VOWEL = "aeiouäëöüáéíóúâêôû"
const anyVowel = /* @__PURE__ */ charIn(ANY_VOWEL)

const CORE = "pbtdkgfvţḑszšžçxhļcżčjmnňrlř"
const core = /* @__PURE__ */ charIn(CORE)

const EXT = "pbtdkgfvţḑszšžçxhļcżčjmnňrlwyř'"
const ext = /* @__PURE__ */ charIn(EXT)

const letterCore = any(
  seq(ext.optional(), core, ext.optional()),
  seq(ext, ext.optional()),
)

const secondary = seq(
  start,

  any(
    seq(ext, unstressedVowel, ext).asGroup(),

    any(
      seq(letterCore, unstressedVowel, unstressedVowel),
      seq(unstressedVowel, unstressedVowel, letterCore),
      seq(unstressedVowel.optional(), letterCore, unstressedVowel.optional()),
    ).asGroup(),

    seq(unstressedVowel, unstressedVowel).asGroup(),

    anyVowel.asGroup(),
  ),
).compile()

const secondaryWithoutRightDiacritics = seq(
  start,

  new AtomicRegexPart("()"),

  any(
    seq(
      unstressedVowel.optional(),
      letterCore,
      unstressedVowel.optional(),
    ).asGroup(),

    seq(unstressedVowel, unstressedVowel).asGroup(),

    anyVowel.asGroup(),
  ),
).compile()

export interface SecondaryTranslationOptions {
  readonly useRightDiacritics?: boolean | undefined
  readonly placeholder?: "STANDARD_PLACEHOLDER" | "ALPHABETIC_PLACEHOLDER"
}

export function textToSecondaries(
  word: string,
  options?: SecondaryTranslationOptions,
) {
  ;({ word } = transformWordButLeaveStressMarkings(word))

  word = word
    .replace(/[^aeiouäëöüáéíóúâêôûpbtdkgfvţḑszšžçxhļcżčjmnňrlwyř']+/g, " ")
    .trim()

  const output: SecondaryCharacter[] = []

  let match

  const regex =
    options?.useRightDiacritics === false
      ? secondaryWithoutRightDiacritics
      : secondary

  while ((match = regex.exec(word))) {
    let source = match[0]

    if (!source) {
      break
    }

    word = word.slice(source.length).trimStart()

    const secondary: Mutable<SecondaryCharacter> = {}

    if (options?.placeholder == "ALPHABETIC_PLACEHOLDER") {
      secondary.core = "ALPHABETIC_PLACEHOLDER"
    }

    if (match[1]) {
      secondary.top = source[0] as ExtensionName
      secondary.right = source[1] as DiacriticName
      secondary.bottom = source[2] as ExtensionName
    } else if (match[2]) {
      if (UNSTRESSED_VOWEL.includes(source[0]!)) {
        secondary.superposed = source[0] as DiacriticName
        source = source.slice(1)

        if (UNSTRESSED_VOWEL.includes(source[0]!)) {
          secondary.right = source[0] as DiacriticName
          source = source.slice(1)
        }
      }

      if (UNSTRESSED_VOWEL.includes(source.at(-1)!)) {
        secondary.underposed = source.at(-1) as DiacriticName
        source = source.slice(0, -1)

        if (UNSTRESSED_VOWEL.includes(source.at(-1)!)) {
          secondary.right = source.at(-1) as DiacriticName
          source = source.slice(0, -1)
        }
      }

      if (source.length == 1) {
        if (CORE.includes(source)) {
          secondary.core = source as CoreName
        } else if (secondary.underposed) {
          secondary.top = source as ExtensionName
        } else {
          secondary.bottom = source as ExtensionName
        }
      } else if (source.length == 2) {
        if (CORE.includes(source[0]!)) {
          secondary.core = source[0] as CoreName
          secondary.bottom = source[1] as ExtensionName
        } else if (CORE.includes(source[1]!)) {
          secondary.top = source[0] as ExtensionName
          secondary.core = source[1] as CoreName
        } else {
          secondary.top = source[0] as ExtensionName
          secondary.bottom = source[1] as ExtensionName
        }
      } else if (source.length == 3) {
        secondary.top = source[0] as ExtensionName
        secondary.core = source[1] as CoreName
        secondary.bottom = source[2] as ExtensionName
      }
    } else if (match[3]) {
      secondary.superposed = source[0] as DiacriticName
      secondary.underposed = source[1] as DiacriticName
    } else if (match[4]) {
      if (source in STRESSED_TO_UNSTRESSED_VOWEL_MAP) {
        secondary.core = "STRESSED_SYLLABLE_PLACEHOLDER"

        secondary.underposed = STRESSED_TO_UNSTRESSED_VOWEL_MAP[
          source as keyof typeof STRESSED_TO_UNSTRESSED_VOWEL_MAP
        ] as DiacriticName
      } else {
        secondary.superposed = source as DiacriticName
      }
    }

    if (secondary.core) {
      if (secondary.core == secondary.top) {
        secondary.top = "CORE_GEMINATE"
      } else if (secondary.core == secondary.bottom) {
        secondary.bottom = "CORE_GEMINATE"
      }
    }

    output.push(secondary)
  }

  return output
}
