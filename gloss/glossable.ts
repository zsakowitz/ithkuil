/**
 * Converts text into something that can be used in a gloss string by making
 * everything lowercase and changing spaces to underscores.
 * @param text The text to be modified.
 * @returns The modified text.
 */
export function asGloss(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[-–—]|\s/g, "_")
    .replace(/_+/, "_")
}

/** A glossed string. */
export class GlossString {
  /**
   * Constructs a `GlossString` where both components have the same text.
   * @param text The text of the `GlossString`.
   * @returns The constructed `GlossString`.
   */
  static of(text: string) {
    return new GlossString(text, text)
  }

  constructor(
    /** The short form of the gloss. */
    readonly short: string,

    /** The long form of the gloss. */
    readonly full: string,
  ) {
    Object.freeze(this)
  }

  /**
   * Checks if this GlossString is empty.
   * @returns Whether this GlossString is empty or not.
   */
  isEmpty() {
    return !(this.short || this.full)
  }

  /**
   * Concatenates this GlossString with another.
   * @param other The other GlossString to add.
   * @returns The new GlossString.
   */
  plusGloss(other: GlossString) {
    return new GlossString(this.short + other.short, this.full + other.full)
  }

  /**
   * Concatenates this GlossString with plain text.
   * @param other The text to add.
   * @returns The new GlossString.
   */
  plusString(other: string) {
    return new GlossString(this.short + other, this.full + other)
  }

  /**
   * Concatenates this GlossString with a short component and a full component.
   * @param short The short form to add.
   * @param full The full form to add.
   * @returns The new GlossString.
   */
  plusStrings(short: string, full: string) {
    return new GlossString(this.short + short, this.full + full)
  }
}
