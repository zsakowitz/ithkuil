import { debug } from "./debug.js"
import { Point } from "./point.js"

/**
 * Gets all vertices on an SVG path.
 * @param path The path to get the vertices of.
 * @returns The vertices of the path, in absolute coordinates.
 */
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

export function DebugVertices(props: { children: SVGElement }): SVGGElement {
  const vertices =
    props.children instanceof SVGPathElement
      ? getVerticesOf(props.children.getAttribute("d") || "")
      : [...props.children.getElementsByTagName("path")].flatMap((x) =>
          getVerticesOf(x.getAttribute("d") || ""),
        )

  const g = (<g>{props.children}</g>) as SVGGElement

  for (let [x, y] of vertices) {
    x = Math.round(x * 1e4) / 1e4
    y = Math.round(y * 1e4) / 1e4

    const point = (
      <Point
        x={x}
        y={y}
        color="blue"
        size={0}
      />
    )

    point.addEventListener("mousedown", (event) => {
      event.preventDefault()
      point.setAttribute("stroke", "red")
    })

    addEventListener("mouseup", () => point.setAttribute("stroke", "blue"))

    point.addEventListener("click", (event) => {
      event.preventDefault()
      debug(x.toString().padEnd(7), y)
    })

    g.appendChild(point)
  }

  return g
}
