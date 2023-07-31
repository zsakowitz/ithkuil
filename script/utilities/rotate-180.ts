/**
 * Rotates an SVG path 180 degrees, ignoring capital M commands.
 * @param path The path to be modified.
 * @returns The resulting path.
 */
export function rotate180(x: string) {
  return x.replace(/(?<!M[\s\d.-]+)[\d.-]+/g, (x) => -x as any)
}

/**
 * Rotates an SVG path 180 degrees, including capital M commands.
 * @param path The path to be modified.
 * @returns The resulting path.
 */
export function rotate180AndRotateStartingPoint(x: string) {
  return x.replace(/[\d.-]+/g, (x) => -x as any)
}
