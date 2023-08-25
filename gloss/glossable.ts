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
  ) {
    Object.freeze(this)
  }

  isEmpty() {
    return !(this.short || this.full)
  }

  plusGloss(other: GlossString) {
    return new GlossString(this.short + other.short, this.full + other.full)
  }

  plusString(other: string) {
    return new GlossString(this.short + other, this.full + other)
  }

  plusStrings(short: string, full: string) {
    return new GlossString(this.short + short, this.full + full)
  }
}
