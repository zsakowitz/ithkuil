export function getVerticesOf(path: string) {
  const relativePoints =
    path
      .match(/[-+e.\d]+ [-+e.\d]+ [A-Za-z]/g)
      ?.map((x) => x.split(" ", 2).map(Number) as [number, number]) || []

  let x = 0
  let y = 0

  const output: [x: number, y: number][] = []

  for (const point of relativePoints) {
    x += point[0] || 0
    y += point[1] || 0
    output.push([x, y])
  }

  return output
}
