/**
 * Rotates an SVG path 180 degrees, ignoring capital M commands.
 * @param path The path to be modified.
 * @returns The resulting path.
 */
export function rotate180(x: string) {
  const all = x.split(" ")

  return all
    .map((text, index) => {
      const value = +text

      if (
        isNaN(value) ||
        index == 1 ||
        index == 2 ||
        all[index - 3] == "a" ||
        all[index - 4] == "a" ||
        all[index - 5] == "a"
      ) {
        return text
      }

      return -value
    })
    .join(" ")
}

/**
 * Rotates an SVG path 180 degrees, including capital M commands.
 * @param path The path to be modified.
 * @returns The resulting path.
 */
export function rotate180AndRotateStartingPoint(x: string) {
  const all = x.split(" ")

  return all
    .map((text, index) => {
      const value = +text

      if (
        isNaN(value) ||
        all[index - 3] == "a" ||
        all[index - 4] == "a" ||
        all[index - 5] == "a"
      ) {
        return text
      }

      return -value
    })
    .join(" ")
}
