/**
 * Checks whether an array contains an item. Returns a TypeScript `is` clause to
 * improve typings.
 * @param array The array to check within.
 * @param item The item to check for.
 * @returns A boolean indicating whether the item is present in the array.
 *
 * @example
 * declare const aspectOrEffect: Aspect | Effect
 *
 * // This `if` statement is invalid. TypeScript complains because
 * // `aspectOrEffect` is not assignable to type `Aspect`, which is what
 * // `ALL_ASPECTS` includes. It also doesn't narrow properly.
 * if (ALL_ASPECTS.includes(aspectOrEffect)) {
 *   console.log("aspect:", aspectToIthkuil(aspectOrEffect))
 * }
 *
 * // This `if` statement is correct. TypeScript will properly allow this and
 * // correctly narrow `aspectOrEffect` to be an `Aspect` in the `if` branch.
 * if (has(ALL_ASPECTS, aspectOrEffect)) {
 *   console.log("aspect:", aspectToIthkuil(aspectOrEffect))
 * }
 */
export function has<T>(array: readonly T[], item: unknown): item is T {
  return array.includes(item as any)
}
