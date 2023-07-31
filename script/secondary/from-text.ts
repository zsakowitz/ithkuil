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

/** Removes `readonly` modifiers from an object. */
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

const CORE = "_pbtdkgfvţḑszšžçxhļcżčjmnňrlř"
const core = /* @__PURE__ */ charIn(CORE)

const EXT = "_pbtdkgfvţḑszšžçxhļcżčjmnňrlwyř'"
const ext = /* @__PURE__ */ charIn(EXT)

const extensionOnlyCore = /* @__PURE__ */ seq(
  ext,
  /* @__PURE__ */ ext.optional(),
)

const letterCore = /* @__PURE__ */ any(
  /* @__PURE__ */ seq(
    /* @__PURE__ */ ext.optional(),
    core,
    /* @__PURE__ */ ext.optional(),
  ),
  extensionOnlyCore,
)

const secondary = /* @__PURE__ */ seq(
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

const extensionOnlySecondary = /* @__PURE__ */ seq(
  start,

  any(
    seq(ext, unstressedVowel, ext).asGroup(),

    any(
      seq(extensionOnlyCore, unstressedVowel, unstressedVowel),
      seq(unstressedVowel, unstressedVowel, extensionOnlyCore),
      seq(
        unstressedVowel.optional(),
        extensionOnlyCore,
        unstressedVowel.optional(),
      ),
    ).asGroup(),

    seq(unstressedVowel, unstressedVowel).asGroup(),

    anyVowel.asGroup(),
  ),
).compile()

const secondaryWithoutRightDiacritics = /* @__PURE__ */ seq(
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

const extensionOnlySecondaryWithoutRightDiacritics = /* @__PURE__ */ seq(
  start,

  new AtomicRegexPart("()"),

  any(
    seq(
      unstressedVowel.optional(),
      extensionOnlyCore,
      unstressedVowel.optional(),
    ).asGroup(),

    seq(unstressedVowel, unstressedVowel).asGroup(),

    anyVowel.asGroup(),
  ),
).compile()

/** Options modifiying how secondary characters are translated. */
export interface SecondaryTranslationOptions {
  /**
   * Whether all characters other than the first should be placed on extensions.
   *
   * @default false
   */
  readonly forcePlaceholderCharacters?: boolean | undefined

  /**
   * The placeholder character to use when needed.
   *
   * @default "STANDARD_PLACEHOLDER"
   */
  readonly placeholder?:
    | "STANDARD_PLACEHOLDER"
    | "ALPHABETIC_PLACEHOLDER"
    | undefined

  /**
   * How to mark geminates. If `true`, geminates are marked with the special
   * `CORE_GEMINATE` extension. If `false`, geminates are marked with standard
   * extensions.
   *
   * @default true
   */
  readonly useGeminateMarkers?: boolean | undefined

  /**
   * Whether right diacritics should be used to indicate vowels. When `false`,
   * VVC(C)(C), (C)(C)CVV, and V(C)C(C)V patterns are translated using multiple
   * characters.
   *
   * @default true
   */
  readonly useRightDiacritics?: boolean | undefined
}

/**
 * Converts text into secondary character templates.
 * @param text The text to be converted. Use spaces to force character breaks,
 * and use underscore to force placeholders and extension locations.
 * @param options Options that modify how the secondary characters are
 * translated.
 * @returns An array of secondary characters parsed from the text.
 */
export function textToSecondaries(
  text: string,
  options?: SecondaryTranslationOptions,
) {
  ;({ word: text } = transformWordButLeaveStressMarkings(text))

  text = text
    .replace(/[^_aeiouäëöüáéíóúâêôûpbtdkgfvţḑszšžçxhļcżčjmnňrlwyř']+/g, " ")
    .trim()

  const output: SecondaryCharacter[] = []

  let match

  let regex =
    options?.useRightDiacritics === false
      ? secondaryWithoutRightDiacritics
      : secondary

  let index = 0

  while ((match = regex.exec(text))) {
    if (options?.forcePlaceholderCharacters) {
      regex =
        options?.useRightDiacritics === false
          ? extensionOnlySecondaryWithoutRightDiacritics
          : extensionOnlySecondary
    }

    let source = match[0]

    if (!source) {
      break
    }

    text = text.slice(source.length).trimStart()

    const secondary: Mutable<SecondaryCharacter> = {}

    if (options?.placeholder == "ALPHABETIC_PLACEHOLDER") {
      secondary.core = "ALPHABETIC_PLACEHOLDER"
    }

    const CORE_ = options?.forcePlaceholderCharacters && index++ ? "" : CORE

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
        if (CORE_.includes(source)) {
          secondary.core = source as CoreName
        } else if (secondary.underposed) {
          secondary.top = source as ExtensionName
        } else {
          secondary.bottom = source as ExtensionName
        }
      } else if (source.length == 2) {
        if (CORE_.includes(source[0]!)) {
          secondary.core = source[0] as CoreName
          secondary.bottom = source[1] as ExtensionName
        } else if (CORE_.includes(source[1]!)) {
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

    if (options?.useGeminateMarkers !== false && secondary.core) {
      if (secondary.core == secondary.top) {
        secondary.top = "CORE_GEMINATE"
      } else if (secondary.core == secondary.bottom) {
        secondary.bottom = "CORE_GEMINATE"
      }
    }

    if ((secondary.top as any) == "_") {
      delete secondary.top
    }

    if ((secondary.core as any) == "_") {
      delete secondary.core

      if (options?.placeholder == "ALPHABETIC_PLACEHOLDER") {
        secondary.core = "ALPHABETIC_PLACEHOLDER"
      }
    }

    if ((secondary.bottom as any) == "_") {
      delete secondary.bottom
    }

    output.push(secondary)
  }

  return output
}
