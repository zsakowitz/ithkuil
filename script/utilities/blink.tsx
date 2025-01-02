/**
 * Creates an SVG element that blinks.
 *
 * @param props Properties modifying the animation.
 * @returns An `SVGGElement` which starts hidden, then blinks in or out every
 *   `props.interval` milliseconds.
 */
export function Blink(props: {
  /** The elements to be blinked. */
  readonly children?: SVGElement | SVGElement[] | undefined

  /**
   * The number of milliseconds between switching from hidden to visible and
   * vice versa.
   *
   * @default 1000
   */
  readonly interval?: number | undefined
}): SVGGElement {
  const g = (<g opacity={0}>{props.children}</g>) as SVGGElement

  setInterval(() => {
    g.setAttribute("opacity", g.getAttribute("opacity") == "0" ? "1" : "0")
  }, props.interval ?? 1000)

  return g
}
