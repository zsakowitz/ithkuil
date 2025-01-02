/**
 * Scales an SVG path.
 *
 * @param path The path to be modified.
 * @param scale The number to scale by.
 * @returns The resulting path.
 */
export function scale(x: string, scale = 2) {
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

      return scale * value
    })
    .join(" ")
}
