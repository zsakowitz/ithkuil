/**
 * Shows a point.
 * @param props Properties modifying how the point is displayed.
 * @returns An `SVGPathElement` showing the point.
 */
export function Point(props: {
  /** The x-coordinate of the displayed point. */
  readonly x: number

  /** The y-coordinate of the displayed point. */
  readonly y: number

  /** The color of the displayed point. */
  readonly color?: string | undefined

  /** The offset of the displayed point from the beginning of the path. */
  readonly offset?: number | undefined

  /** The size of the displayed point. */
  readonly size?: number | undefined
}) {
  return (
    <path
      d={"M " + props.x + " " + props.y + " z"}
      opacity="0.5"
      stroke={props.color || "blue"}
      stroke-linecap="round"
      stroke-width={props.size ?? 5}
    />
  ) as SVGPathElement
}
