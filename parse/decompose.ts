import type { Stress } from "./transform.js"

/** A section of Ithkuil text which represents a single grammatical category. */
export class DCLeaf<S extends string, K extends string, const T> {
  constructor(
    readonly source: string,
    readonly slot: S,
    readonly type: K,
    readonly value: T,
  ) {}
}

/** The decomposition of the stress placed on a particular Ithkuil word. */
export class DCStress<const T> {
  constructor(
    readonly stress: Stress,
    readonly value: T,
  ) {}
}

/**
 * A section of Ithkuil text which can further be broken down, but which is tied
 * to itself in some way.
 *
 * Examples include the VnCn compund, which uses the Cn to determine whether the
 * Vn is aspectual or not.
 */
export class DCGroup<K extends string> {
  readonly items

  constructor(
    readonly type: K,
    ...items: readonly DCNode[]
  ) {
    this.items = items
  }
}

/** A decomposed string of text. */
export type DCNode = DCLeaf<string, string, unknown> | DCGroup<string>

/** A completely decomposed Ithkuil word. */
export class DCWord<K extends string> {
  readonly items

  constructor(
    readonly kind: K,
    readonly stress: DCStress<unknown>,
    ...items: readonly DCNode[]
  ) {
    this.items = items
  }
}
