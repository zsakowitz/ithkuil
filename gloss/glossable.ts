export class GlossString {
  constructor(readonly short: string, readonly full: string) {
    Object.freeze(this)
  }
}
