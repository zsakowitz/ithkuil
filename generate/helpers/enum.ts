import { ZodType, type ParseInput, type ParseReturnType } from "zod"

/** A `ZodType` matching a specific enumerated set of literals. */
export class Enum<const T> extends ZodType<T> {
  /**
   * Constructs an `Enum`.
   *
   * @param items The items to match against.
   * @returns The constructed `Enum`.
   */
  constructor(readonly items: readonly T[]) {
    super({})
    // Object.freeze(this)
  }

  _parse(input: ParseInput): ParseReturnType<T> {
    if (this.items.includes(input.data)) {
      return {
        status: "valid",
        value: input.data,
      }
    } else {
      return {
        status: "aborted",
      }
    }
  }
}
