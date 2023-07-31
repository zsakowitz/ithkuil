import { getVerticesOf } from "./vertices.js"

const svg = (<svg />) as SVGSVGElement

function _doPathsIntersect(a: string, b: string, margin = 10) {
  const el = (
    <path
      d={b}
      stroke-width={2 * margin}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="red"
    />
  ) as SVGPathElement

  svg.append(el)
  document.body.append(svg)

  try {
    for (const [x, y] of getVerticesOf(a)) {
      const point = svg.createSVGPoint()
      point.x = x
      point.y = y

      if (el.isPointInStroke(point) || el.isPointInFill(point)) {
        return true
      }
    }

    return false
  } finally {
    svg.remove()
  }
}

/**
 * Checks if two paths intersect.
 * @param a The first path to check.
 * @param b The second path to check.
 * @param margin The margin of error allowed.
 * @returns Whether the paths intersect.
 */
export function doPathsIntersect(a: string, b: string, margin = 10) {
  return _doPathsIntersect(a, b, margin) || _doPathsIntersect(b, a, margin)
}

/**
 * Checks if two elements intersect.
 * @param a The first element to check.
 * @param b The second element to check.
 * @param margin The margin of error allowed.
 * @returns Whether the elements intersect.
 */
export function doShapesIntersect(a: SVGElement, b: SVGElement, margin = 10) {
  const pathsA = [
    ...(a instanceof SVGPathElement ? [a] : a.getElementsByTagName("path")),
  ]
    .map((x) => x.getAttribute("d") || "")
    .filter((x) => x)

  const pathsB =
    b instanceof SVGPathElement ? [b] : b.getElementsByTagName("path")

  for (const b of pathsB) {
    const d = b.getAttribute("d")

    if (!d) {
      continue
    }

    for (const a of pathsA) {
      if (doPathsIntersect(a, d, margin)) {
        return true
      }
    }
  }

  return false
}
