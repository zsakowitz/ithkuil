import type { VowelForm } from "../../parse/vowel-form.js"
import { insertGlottalStop } from "./insert-glottal-stop.js"

export type Text = string | WithWYAlternative
export type Joinable = Text | VowelForm | null | undefined

/**
 * Represents strings that have alternatives when preceded by W or Y, such as
 * most of the vowel forms in column 3 of the standard vowel table.
 */
export class WithWYAlternative {
  /**
   * Adds two strings or `WithWYAlternative`s.
   *
   * @param first The left side of the output.
   * @param second The right side of the output.
   * @returns A string containing the output.
   */
  static add(first: string, second: Text): string

  /**
   * Adds two strings or `WithWYAlternative`s.
   *
   * @param first The left side of the output.
   * @param second The right side of the output.
   * @returns A `WithWYAlternative` containing the output.
   */
  static add(first: WithWYAlternative, second: Text): WithWYAlternative

  /**
   * Adds two strings or `WithWYAlternative`s.
   *
   * @param first The left side of the output.
   * @param second The right side of the output.
   * @returns A string or `WithWYAlternative` representing the output.
   */
  static add(first: Text, second: Text): Text

  static add(first: Text, second: Text): Text {
    if (typeof first == "string") {
      if (typeof second == "string") {
        return first + second
      }

      return first + second.withPreviousText(first)
    }

    return first.add(second)
  }

  /**
   * Coerces a string or `WithWYAlternative` as a `WithWYAlternative`.
   *
   * @param text The string or `WithWYAlternative` to create an object from.
   * @returns A `WithWYAlternative` containing the input data.
   */
  static of(text: Text) {
    if (text instanceof WithWYAlternative) {
      return text
    }

    return new WithWYAlternative(text, text, text)
  }

  /**
   * Constructs a `WithWYAlternative`.
   *
   * @param defaultValue The default value.
   * @param valueAfterW The value when preceded by W.
   * @param valueAfterY The value when preceded by Y.
   * @returns The constructed, frozen `WithWYAlternative`.
   */
  constructor(
    readonly defaultValue: string,
    readonly valueAfterW: string,
    readonly valueAfterY: string,
  ) {
    Object.freeze(this)
  }

  /**
   * Gets the appropriate field (defaultValue, precededByW, or precededByY)
   * based on the contents of text preceding this `WithWYAlternative`.
   *
   * @param text The text preceding this `WithWYAlternative`.
   * @returns The value of the appropriate field.
   */
  withPreviousText(text: string) {
    if (text.endsWith("w")) {
      return this.valueAfterW
    }

    if (text.endsWith("y")) {
      return this.valueAfterY
    }

    return this.defaultValue
  }

  /**
   * Adds this `WithWYAlternative` to a string or another `WithWYAlternative`.
   *
   * @param other A string or `WithWYAlternative` to add this to.
   * @returns A `WithWYAlternative` containing the appropriate outputs.
   */
  add(other: Text) {
    other = WithWYAlternative.of(other)

    return new WithWYAlternative(
      this.defaultValue + other.withPreviousText(this.defaultValue),
      this.valueAfterW + other.withPreviousText(this.valueAfterW),
      this.valueAfterY + other.withPreviousText(this.valueAfterY),
    )
  }

  /**
   * Stringifies this WithWYAlternative.
   *
   * @returns A stringified representation of this WithWYAlternative.
   */
  toString() {
    if (
      this.defaultValue != this.valueAfterW &&
      this.defaultValue != this.valueAfterY
    ) {
      return `(${this.defaultValue}/${this.valueAfterW}/${this.valueAfterY})`
    }

    if (this.defaultValue != this.valueAfterW) {
      return `(${this.defaultValue}/${this.valueAfterW})`
    }

    if (this.defaultValue != this.valueAfterY) {
      return `(${this.defaultValue}/${this.valueAfterY})`
    }

    return this.defaultValue
  }

  /**
   * Inserts glottal stops into this `WithWYAlternative`.
   *
   * @param isAtEndOfWord Whether this `WithWYAlternative` is at the end of a
   *   word.
   * @returns A `WithWYAlternative` containing the contents of this one, but
   *   with a glottal stop in each alternative.
   */
  insertGlottalStop(isAtEndOfWord: boolean) {
    return new WithWYAlternative(
      insertGlottalStop(this.defaultValue, isAtEndOfWord),
      insertGlottalStop(this.valueAfterW, isAtEndOfWord),
      insertGlottalStop(this.valueAfterY, isAtEndOfWord),
    )
  }
}

/** A `WithWYAlternative` instance containing the empty string. */
export const EMPTY = /* @__PURE__ */ new WithWYAlternative("", "", "")

/** A `WithWyAlternative` instance containing `ia/uä`. */
export const IA_UÄ = /* @__PURE__ */ new WithWYAlternative("ia", "ia", "uä")

/** A `WithWyAlternative` instance containing `ie/uë`. */
export const IE_UË = /* @__PURE__ */ new WithWYAlternative("ie", "ie", "uë")

/** A `WithWyAlternative` instance containing `io/üä`. */
export const IO_ÜÄ = /* @__PURE__ */ new WithWYAlternative("io", "io", "üä")

/** A `WithWyAlternative` instance containing `iö/üë`. */
export const IÖ_ÜË = /* @__PURE__ */ new WithWYAlternative("iö", "iö", "üë")

/** A `WithWyAlternative` instance containing `uö/öë`. */
export const UÖ_ÖË = /* @__PURE__ */ new WithWYAlternative("uö", "öë", "uö")

/** A `WithWyAlternative` instance containing `uo/öä`. */
export const UO_ÖÄ = /* @__PURE__ */ new WithWYAlternative("uo", "öä", "uo")

/** A `WithWyAlternative` instance containing `ue/ië`. */
export const UE_IË = /* @__PURE__ */ new WithWYAlternative("ue", "ië", "ue")

/** A `WithWyAlternative` instance containing `ua/iä`. */
export const UA_IÄ = /* @__PURE__ */ new WithWYAlternative("ua", "iä", "ua")

/**
 * Joins several strings and vowel forms into a `WithWYAlternative`. Passing the
 * proper `isAtEndOfWord` value to `VowelForm`s is taken care of automatically.
 *
 * This is intended to be used to create a full word, as it will not preserve
 * forms which can alternate if they are at the beginning of the word.
 *
 * @param texts The strings and `WithWYAlternative`s to create an object from.
 * @returns A `WithWYAlternative` containing all input data, joined properly.
 */
export function join(...texts: (Joinable | Joinable[])[]) {
  return texts
    .flat()
    .filter((x) => x != null)
    .filter((x) => x != "")
    .reduce<string>((a, b, i, list) => {
      if (b instanceof WithWYAlternative || typeof b == "string") {
        return WithWYAlternative.add(a, b)
      }

      const isEnd = list.slice(i + 1).every(
        // Only need to check `defaultValue` since we're after a
        // `VowelForm`, which will never end in -w or -y
        (x) => x instanceof WithWYAlternative && x.defaultValue == "",
      )

      return a + b.toString(isEnd)
    }, "")
}
