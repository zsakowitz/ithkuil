/** A numeric adjunct. */
export type NumericAdjunct = number | bigint

/**
 * Converts a numeric adjunct to Ithkuil.
 * @param bias The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function numericAdjunctToIthkuil(number: NumericAdjunct): string {
  return "" + number
}
