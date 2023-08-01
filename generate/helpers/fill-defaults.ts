/**
 * A Partial type that allows undefined values when `exactOptionalPropertyTypes`
 * is `true`. This is mainly so that this project works in environments with
 * that flag enabled.
 */
export type Partial<T> = { [K in keyof T]?: T[K] | undefined }

/**
 * Merges two objects, overriding values of the first object with values from
 * the second. `undefined` and `null` values in the second object are ignored.
 * @param defaultValue The default object.
 * @param additions The additions to be included into the object.
 * @returns An object containing the merged defaults and additions.
 *
 * @example
 * fillDefaults(
 *   { name: "Ithkuil IV", creation: 2020 },
 *   { creation: 2023 }
 * )
 * // { name: "Ithkuil IV", creation: 2023 }
 *
 * @example
 * fillDefaults(
 *   { case: "THM", caseScope: "CCN" },
 *   { case: undefined, caseScope: "CCS" }
 * )
 * // { case: "THM", caseScope: "CCS" }
 */
export function fillDefaults<T>(defaultValue: T, additions: Partial<T>): T {
  const output = { ...defaultValue }

  for (const key in additions) {
    const value = additions[key]

    if (value != null) {
      output[key] = value
    }
  }

  return output
}
