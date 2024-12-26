import { deepFreeze } from "../generate/helpers/deep-freeze.js"
import { insertGlottalStopIntoPossiblyWithWYAlternative } from "../generate/helpers/insert-glottal-stop.js"
import { STANDARD_VOWEL_TABLE } from "../generate/helpers/vowel-table.js"
import { WithWYAlternative } from "../generate/helpers/with-wy-alternative.js"

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

    if (text[0] == text[1]) {
      return VOWEL_FORM_TO_OBJECT_MAP[
        text[0] as keyof typeof VOWEL_FORM_TO_OBJECT_MAP
      ]?.withGlottalStop(hasGlottalStop)
    }

    return VOWEL_FORM_TO_OBJECT_MAP[
      text as keyof typeof VOWEL_FORM_TO_OBJECT_MAP
    ]?.withGlottalStop(hasGlottalStop)
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

    if (text[0] == text[1]) {
      return VOWEL_FORM_TO_OBJECT_MAP[
        text[0] as keyof typeof VOWEL_FORM_TO_OBJECT_MAP
      ].withGlottalStop(hasGlottalStop)
    }

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
export const VOWEL_FORM_TO_OBJECT_MAP = /* @__PURE__ */ deepFreeze({
  ae: /* @__PURE__ */ new VowelForm(1, 0),
  a: /* @__PURE__ */ new VowelForm(1, 1),
  ä: /* @__PURE__ */ new VowelForm(1, 2),
  e: /* @__PURE__ */ new VowelForm(1, 3),
  i: /* @__PURE__ */ new VowelForm(1, 4),
  ëi: /* @__PURE__ */ new VowelForm(1, 5),
  ö: /* @__PURE__ */ new VowelForm(1, 6),
  o: /* @__PURE__ */ new VowelForm(1, 7),
  ü: /* @__PURE__ */ new VowelForm(1, 8),
  u: /* @__PURE__ */ new VowelForm(1, 9),

  ea: /* @__PURE__ */ new VowelForm(2, 0),
  ai: /* @__PURE__ */ new VowelForm(2, 1),
  au: /* @__PURE__ */ new VowelForm(2, 2),
  ei: /* @__PURE__ */ new VowelForm(2, 3),
  eu: /* @__PURE__ */ new VowelForm(2, 4),
  ëu: /* @__PURE__ */ new VowelForm(2, 5),
  ou: /* @__PURE__ */ new VowelForm(2, 6),
  oi: /* @__PURE__ */ new VowelForm(2, 7),
  iu: /* @__PURE__ */ new VowelForm(2, 8),
  ui: /* @__PURE__ */ new VowelForm(2, 9),

  üo: /* @__PURE__ */ new VowelForm(3, 0),
  ia: /* @__PURE__ */ new VowelForm(3, 1),
  uä: /* @__PURE__ */ new VowelForm(3, 1),
  ie: /* @__PURE__ */ new VowelForm(3, 2),
  uë: /* @__PURE__ */ new VowelForm(3, 2),
  io: /* @__PURE__ */ new VowelForm(3, 3),
  üä: /* @__PURE__ */ new VowelForm(3, 3),
  iö: /* @__PURE__ */ new VowelForm(3, 4),
  üë: /* @__PURE__ */ new VowelForm(3, 4),
  eë: /* @__PURE__ */ new VowelForm(3, 5),
  uö: /* @__PURE__ */ new VowelForm(3, 6),
  öë: /* @__PURE__ */ new VowelForm(3, 6),
  uo: /* @__PURE__ */ new VowelForm(3, 7),
  öä: /* @__PURE__ */ new VowelForm(3, 7),
  ue: /* @__PURE__ */ new VowelForm(3, 8),
  ië: /* @__PURE__ */ new VowelForm(3, 8),
  ua: /* @__PURE__ */ new VowelForm(3, 9),
  iä: /* @__PURE__ */ new VowelForm(3, 9),

  üö: /* @__PURE__ */ new VowelForm(4, 0),
  ao: /* @__PURE__ */ new VowelForm(4, 1),
  aö: /* @__PURE__ */ new VowelForm(4, 2),
  eo: /* @__PURE__ */ new VowelForm(4, 3),
  eö: /* @__PURE__ */ new VowelForm(4, 4),
  oë: /* @__PURE__ */ new VowelForm(4, 5),
  öe: /* @__PURE__ */ new VowelForm(4, 6),
  oe: /* @__PURE__ */ new VowelForm(4, 7),
  öa: /* @__PURE__ */ new VowelForm(4, 8),
  oa: /* @__PURE__ */ new VowelForm(4, 9),
})
