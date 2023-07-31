import { placeElementInDOM } from "./with-element-in-dom.js"

const PATH_INTERVAL = 1

export function doPathsIntersect(a: SVGPathElement, b: string, margin = 10) {
  const length = a.getTotalLength()

  const el = (
    <path
      d={b}
      stroke-width={2 * margin}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="red"
    />
  ) as SVGPathElement

  const c1 = placeElementInDOM(a)
  const c2 = placeElementInDOM(el)

  try {
    for (let x = 0; x < length; x += PATH_INTERVAL) {
      const point = a.getPointAtLength(x)

      if (el.isPointInStroke(point) || el.isPointInFill(point)) {
        return true
      }
    }

    return false
  } finally {
    c1()
    c2()
  }
}

export function doShapesIntersect(a: SVGElement, b: SVGElement, margin = 10) {
  const pathsA =
    a instanceof SVGPathElement ? [a] : a.getElementsByTagName("path")

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
