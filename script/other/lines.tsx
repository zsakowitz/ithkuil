/**
 * Instantiates a set of lines that most letters rest on.
 * @param props Properties that modify the output of these `Lines`.
 * @returns An `SVGPathElement` containing the lines.
 */
export function Lines(props: {
  /** The width of the lines. */
  readonly width?: number | undefined

  /** The height of the central line. */
  readonly height?: number | undefined
}): SVGPathElement {
  const width = props.width ?? 250
  const height = props.height ?? 250

  return (
    <path
      d={`M -${width} 35 l ${2 * width} 0 M -${width} 0 l ${
        2 * width
      } 0 M 0 -${height} l 0 ${2 * height} M -${width} -35 l ${2 * width} 0`}
      stroke="#ccc"
      stroke-width="0.5"
    />
  ) as SVGPathElement
}
