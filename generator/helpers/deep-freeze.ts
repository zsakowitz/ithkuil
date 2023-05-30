import type { WithWYAlternative } from "./with-wy-alternative.js"

/**
 * Deeply freezes an object.
 * @template T The object to be deeply frozen.
 */
export type DeepFreeze<T> = T extends WithWYAlternative
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepFreeze<T[K]> }
  : T

/**
 * Deeply freezes a value. This prevents properties from being added, removed,
 * or changed; and deeply freezes all values of the object. For arrays, elements
 * will be deeply frozen.
 *
 * No other values (such as `Set`s and `Map`s) are treated specially, as this
 * project does not use them.
 *
 * @param value The value to be deeply frozen.
 * @returns A reference to the original value, now deeply frozen.
 */
export function deepFreeze<const T>(value: T): DeepFreeze<T> {
  if (value && typeof value == "object") {
    Object.freeze(value)
    Object.values(value).forEach(deepFreeze)
  }

  return value as DeepFreeze<T>
}
