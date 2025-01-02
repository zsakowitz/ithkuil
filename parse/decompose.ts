/** A decomposed section of Ithkuil text. */
export class Decomposed<S extends string, K extends string, const T> {
  constructor(
    readonly source: string,
    readonly slot: S,
    readonly type: K,
    readonly value: T,
  ) {}
}

/** A list of decomposed sections of Ithkuil text. */
export class DCList {
  readonly items

  constructor(...args: readonly Decomposed<string, string, unknown>[]) {
    this.items = args
  }
}
