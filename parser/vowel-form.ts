import { insertGlottalStopIntoPossiblyWithWYAlternative } from "../generator/helpers/insert-glottal-stop.js"
import { WithWYAlternative } from "../generator/helpers/with-wy-alternative.js"
import { STANDARD_VOWEL_TABLE, deepFreeze } from "../index.js"

/** A class representing a vowel form. */
export class VowelForm<S extends 1 | 2 | 3 | 4 = 1 | 2 | 3 | 4> {
  /**
   * Parses a textual vowel form into a `VowelForm` object.
   * @param text The vowel form as text.
   * @returns The vowel form as a `VowelForm` object, or `undefined` if `text`
   * was not a valid vowel form.
   *
   * Note that for sequence 3 vowel forms, either of their alternate forms will
   * be accepted. `VowelForm.of("ia")` and `VowelForm.of("uä")` are functionally
   * identical.
   */
  static of(text: keyof typeof VOWEL_FORM_TO_OBJECT_MAP): VowelForm

  /**
   * Parses a textual vowel form into a `VowelForm` object.
   * @param text The vowel form as text.
   * @returns The vowel form as a `VowelForm` object, or `undefined` if `text`
   * was not a valid vowel form.
   *
   * Note that for sequence 3 vowel forms, either of their alternate forms will
   * be accepted. `VowelForm.of("ia")` and `VowelForm.of("uä")` are functionally
   * identical.
   */
  static of(text: string): VowelForm | undefined

  static of(text: string): VowelForm | undefined {
    let hasGlottalStop = text.includes("'")
    text = text.replace(/'/g, "")

    if (text in VOWEL_FORM_TO_OBJECT_MAP) {
      return VOWEL_FORM_TO_OBJECT_MAP[
        text as keyof typeof VOWEL_FORM_TO_OBJECT_MAP
      ].withGlottalStop(hasGlottalStop)
    }
  }

  /**
   * Parses a textual vowel form into a `VowelForm` object.
   * @param text The vowel form as text.
   * @returns The vowel form as a `VowelForm` object.
   *
   * Throws if the vowel form is invalid.
   *
   * Note that for sequence 3 vowel forms, either of their alternate forms will
   * be accepted. `VowelForm.parseOrThrow("ia")` and
   * `VowelForm.parseOrThrow("uä")` are functionally identical.
   */
  static parseOrThrow(text: keyof typeof VOWEL_FORM_TO_OBJECT_MAP): VowelForm

  /**
   * Parses a textual vowel form into a `VowelForm` object.
   * @param text The vowel form as text.
   * @returns The vowel form as a `VowelForm` object.
   *
   * Throws if the vowel form is invalid.
   *
   * Note that for sequence 3 vowel forms, either of their alternate forms will
   * be accepted. `VowelForm.parseOrThrow("ia")` and
   * `VowelForm.parseOrThrow("uä")` are functionally identical.
   */
  static parseOrThrow(text: string): VowelForm

  static parseOrThrow(text: string): VowelForm {
    let hasGlottalStop = text.includes("'")
    text = text.replace(/'/g, "")

    if (text in VOWEL_FORM_TO_OBJECT_MAP) {
      return VOWEL_FORM_TO_OBJECT_MAP[
        text as keyof typeof VOWEL_FORM_TO_OBJECT_MAP
      ].withGlottalStop(hasGlottalStop)
    }

    throw new Error("Invalid vowel form: " + text + ".")
  }

  constructor(
    /** The sequence of this vowel form. */
    readonly sequence: S,

    /** The degree of this vowel form. */
    readonly degree: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,

    /** Whether or not this vowel form has a glottal stop. */
    readonly hasGlottalStop = false,
  ) {
    Object.freeze(this)
  }

  /**
   * Converts this vowel form into a string.
   * @param isAtEndOfWord Whether or not this vowel form will be used as the
   * final form in a word.
   * @returns A string or `WithWYAlternative` representing this vowel form.
   */
  toString(isAtEndOfWord: boolean): S extends 3 ? WithWYAlternative : string
  toString(isAtEndOfWord: boolean): string | WithWYAlternative {
    const form = STANDARD_VOWEL_TABLE[this.sequence][this.degree]

    if (this.hasGlottalStop) {
      return insertGlottalStopIntoPossiblyWithWYAlternative(form, isAtEndOfWord)
    } else {
      return form
    }
  }

  /**
   * Creates a new `VowelForm` identical to this one, but with a glottal stop.
   * @param hasGlottalStop Whether the output `VowelForm` will include a glottal
   * stop. Defaults to `true`.
   * @returns The new `VowelForm`.
   */
  withGlottalStop(hasGlottalStop = true) {
    return new VowelForm(this.sequence, this.degree, hasGlottalStop)
  }
}

/**
 * An object mapping from all non-glottal-stop-including vowel forms to their
 * corresponding `VowelForm` objects.
 */
export const VOWEL_FORM_TO_OBJECT_MAP = deepFreeze({
  ae: new VowelForm(1, 0),
  a: new VowelForm(1, 1),
  ä: new VowelForm(1, 2),
  e: new VowelForm(1, 3),
  i: new VowelForm(1, 4),
  ëi: new VowelForm(1, 5),
  ö: new VowelForm(1, 6),
  o: new VowelForm(1, 7),
  ü: new VowelForm(1, 8),
  u: new VowelForm(1, 9),

  ea: new VowelForm(2, 0),
  ai: new VowelForm(2, 1),
  au: new VowelForm(2, 2),
  ei: new VowelForm(2, 3),
  eu: new VowelForm(2, 4),
  ëu: new VowelForm(2, 5),
  ou: new VowelForm(2, 6),
  oi: new VowelForm(2, 7),
  iu: new VowelForm(2, 8),
  ui: new VowelForm(2, 9),

  üo: new VowelForm(3, 0),
  ia: new VowelForm(3, 1),
  uä: new VowelForm(3, 1),
  ie: new VowelForm(3, 2),
  uë: new VowelForm(3, 2),
  io: new VowelForm(3, 3),
  üä: new VowelForm(3, 3),
  iö: new VowelForm(3, 4),
  üë: new VowelForm(3, 4),
  eë: new VowelForm(3, 5),
  uö: new VowelForm(3, 6),
  öë: new VowelForm(3, 6),
  uo: new VowelForm(3, 7),
  öä: new VowelForm(3, 7),
  ue: new VowelForm(3, 8),
  ië: new VowelForm(3, 8),
  ua: new VowelForm(3, 9),
  iä: new VowelForm(3, 9),

  üö: new VowelForm(4, 0),
  ao: new VowelForm(4, 1),
  aö: new VowelForm(4, 2),
  eo: new VowelForm(4, 3),
  eö: new VowelForm(4, 4),
  oë: new VowelForm(4, 5),
  öe: new VowelForm(4, 6),
  oe: new VowelForm(4, 7),
  öa: new VowelForm(4, 8),
  oa: new VowelForm(4, 9),
})
