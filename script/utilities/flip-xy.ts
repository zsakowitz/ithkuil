/**
 * Flips X and Y coordinates in an SVG path, ignoring capital M commands.
 * @param path The path to be modified.
 * @returns The resulting path.
 */
export function flipXY(path: string) {
  return path.replace(/(?<!M[\s\d.-]+)([\d.-]+)\s+([\d.-]+)/g, "$2 $1")
}
