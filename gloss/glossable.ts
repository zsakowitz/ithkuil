export function asGloss(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[-–—]|\s/g, "_")
    .replace(/_+/, "_")
}

export class GlossString {
  constructor(
    /** The short form of the gloss. */
    readonly short: string,

    /** The long form of the gloss. */
    readonly full: string,

    /** The short form of the gloss, with Markdown formatting. */
    readonly shortMD = short,

    /** The long form of the gloss, with Markdown formatting. */
    readonly fullMD = full,
  ) {
    Object.freeze(this)
  }

  isEmpty() {
    return !(this.short || this.full || this.shortMD || this.fullMD)
  }

  plusGloss(other: GlossString) {
    return new GlossString(
      this.short + other.short,
      this.full + other.full,
      this.shortMD + other.shortMD,
      this.fullMD + other.fullMD,
    )
  }

  plusString(other: string) {
    return new GlossString(
      this.short + other,
      this.full + other,
      this.shortMD + other,
      this.fullMD + other,
    )
  }

  plusStrings(short: string, full: string, shortMD = short, fullMD = full) {
    return new GlossString(
      this.short + short,
      this.full + full,
      this.shortMD + shortMD,
      this.fullMD + fullMD,
    )
  }
}
