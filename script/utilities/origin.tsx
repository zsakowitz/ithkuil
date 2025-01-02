import { Point } from "./point.js"

/**
 * Gets a point on an SVG path.
 *
 * @param path The path to get the origin of.
 * @param offset The distance along the path to get the point on.
 * @returns The point on `path` at the specified offset.
 */
export function getOrigin(path: string, offset = 0) {
  const el = (<path d={path} />) as SVGPathElement
  return el.getPointAtLength(offset)
}

/**
 * Shows the origin of an SVG path.
 *
 * @param props Properties modifying the display.
 * @returns A point showing the origin of the specified path.
 */
export function Origin(props: {
  /** The element to show the origin of. */
  readonly children: SVGElement

  /** The color of the displayed point. */
  readonly color?: string | undefined

  /** The offset of the displayed point from the beginning of the path. */
  readonly offset?: number | undefined

  /** The size of the displayed point. */
  readonly size?: number | undefined
}): SVGPathElement {
  const d = props.children.getAttribute("d")

  if (!d) {
    return (<path />) as SVGPathElement
  }

  const origin = getOrigin(d, props.offset)

  return (
    <Point
      {...props}
      x={origin.x}
      y={origin.y}
    />
  ) as SVGPathElement
}
