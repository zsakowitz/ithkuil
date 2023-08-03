import { deepFreezeAndNullPrototype } from "../generate/index.js"

/** The types of stress markings in an Ithkuil word. */
export type Stress =
  | "antepenultimate"
  | "penultimate"
  | "ultimate"
  | "monosyllabic"
  | "zerosyllabic"

/** The type of a transformed word. */
export interface TransformedWord {
  /** The original word, unmodified. */
  readonly original: string

  /**
   * The transformed word, with stress markings and grave accents removed and
   * with alternate forms of letters changed (e.g. ḍ -> ḑ, ù -> u, ê -> ë).
   */
  readonly word: string

  /** The stress of the word. */
  readonly stress: Stress
}

export const STRESSED_TO_UNSTRESSED_VOWEL_MAP =
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

// Taken from https://github.com/ngoriyasjil/IthkuilGloss/blob/181241b89c962d83b999a669c298366b07df53b9/src/ithkuil/iv/gloss/Constants.kt#L27C4-L27C4

const LETTER_SUBSTITUTIONS = /* @__PURE__ */ deepFreezeAndNullPrototype({
  "​": "",
  // The previous line is keyed with the Unicode Byte Order Mark

  "’": "'",
  ʼ: "'",
  "‘": "'",
  á: "á",
  ä: "ä",
  â: "â",
  é: "é",
  ë: "ë",
  ê: "ê",
  ì: "i",
  ı: "i",
  ì: "i",
  í: "í",
  ó: "ó",
  ö: "ö",
  ô: "ô",
  ù: "u",
  ù: "u",
  ú: "ú",
  ü: "ü",
  û: "û",
  č: "č",
  ç: "ç",
  ṭ: "ţ",
  ŧ: "ţ",
  ț: "ţ",
  ţ: "ţ",
  ṭ: "ţ",
  ḍ: "ḑ",
  đ: "ḑ",
  ḍ: "ḑ",
  ḑ: "ḑ",
  ł: "ļ",
  ḷ: "ļ",
  ḷ: "ļ",
  ļ: "ļ",
  š: "š",
  ž: "ž",
  ż: "ż",
  ẓ: "ż",
  ẓ: "ż",
  ṇ: "ň",
  ň: "ň",
  ņ: "ň",
  ṇ: "ň",
  ṛ: "ř",
  ř: "ř",
  ŗ: "ř",
  r͕: "ř",
  ŗ: "ř",
  ṛ: "ř",
})

const LETTER_SUBSTITUTION_REGEX =
  // The first element of this character class is the Unicode Byte Order Mark
  /[​’ʼ‘ìıùṭŧțḍđłḷẓṇṛŗ]|á|ä|â|é|ë|ê|ì|í|ó|ö|ô|ù|ú|ü|û|č|ç|ţ|ṭ|ḍ|ḑ|ḷ|ļ|š|ž|ż|ẓ|ň|ņ|ṇ|ř|ŗ|r͕|ṛ/gu

/**
 * Transforms a word by normalizing spelling and parsing and removing stress
 * markings.
 * @param word The word to be transformed.
 * @returns An object containing information about the transformed word.
 */
export function transformWord(word: string): TransformedWord {
  const original = word

  word = word
    .toLowerCase()
    .replace(LETTER_SUBSTITUTION_REGEX, (x) => (LETTER_SUBSTITUTIONS as any)[x])

  if (word.startsWith("'")) {
    word = word.slice(1)
  }

  const syllables = word.match(
    /[aáeéëêoóuú][ií]|[aáeéëêiíoó][uú]|[aeiouäëöüáéíóúâêôû]/g,
  )

  let stress: Stress

  if (syllables == null) {
    stress = "zerosyllabic"
  } else if (syllables.length == 1) {
    stress = "monosyllabic"
  } else {
    const stressed = syllables.map((syllable) => /[áéíóúâêôû]/.test(syllable))

    const index = stressed.findIndex((x) => x)
    const lastIndex = stressed.findLastIndex((x) => x)

    if (index != lastIndex) {
      throw new Error("Two syllables are marked as stressed.")
    }

    if (index == -1) {
      stress = "penultimate"
    } else {
      const value = stressed.length - index

      if (value == 1) {
        stress = "ultimate"
      } else if (value == 2) {
        stress = "penultimate"
      } else if (value == 3) {
        stress = "antepenultimate"
      } else {
        throw new Error("Invalid stress in '" + word + "'.")
      }
    }
  }

  return Object.freeze({
    original,
    word: word.replace(
      /[áéíóúâêôû]/g,
      (x) => (STRESSED_TO_UNSTRESSED_VOWEL_MAP as any)[x],
    ),
    stress,
  })
}

/**
 * Transforms a word by normalizing spelling. Does not remove stress markings.
 * @param word The word to be transformed.
 * @returns An object containing information about the transformed word.
 */
export function transformWordButLeaveStressMarkings(
  word: string,
): Pick<TransformedWord, "original" | "word"> {
  const original = word

  word = word
    .toLowerCase()
    .replace(LETTER_SUBSTITUTION_REGEX, (x) => (LETTER_SUBSTITUTIONS as any)[x])

  if (word.startsWith("'")) {
    word = word.slice(1)
  }

  return Object.freeze({
    original,
    word,
  })
}
