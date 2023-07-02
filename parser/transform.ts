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

function freeze<const T>(value: T): Readonly<T> {
  Object.setPrototypeOf(value, null)
  return Object.freeze(value)
}

const STRESSED_TO_UNSTRESSED_VOWEL_MAP = freeze({
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

const LETTER_SUBSTITUTIONS = freeze({
  ḍ: "ḑ",
  đ: "ḑ",
  ı: "i",
  ì: "i",
  ȷ: "j",
  ł: "ļ",
  ḷ: "ļ",
  l͕: "ļ",
  n͕: "ň",
  ṇ: "ň",
  ṛ: "ř",
  r͕: "ř",
  ṭ: "ţ",
  ŧ: "ţ",
  ù: "u",
  ẓ: "ż",
  "‘": "'",
  "’": "'",
})

/**
 * Transforms a word by normalizing spelling and parsing and removing stress
 * markings.
 * @param word The word to be transformed.
 * @returns An object containing information about the transformed word.
 */
export function transform(word: string): TransformedWord {
  const original = word

  word = word
    .toLowerCase()
    .replace(/[ḍđıìȷłḷṇṛṭŧù‘’]|l͕|n͕|r͕/g, (x) => (LETTER_SUBSTITUTIONS as any)[x])

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
