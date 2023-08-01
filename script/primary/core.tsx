import { deepFreeze, type Specification } from "../../generate/index.js"

const CORES = /* @__PURE__ */ deepFreeze({
  BSC: "M -25 -35 l -7.5 7.5 57.5 62.5 7.5 -7.5 -57.5 -62.5 z",
  CTE: "M 8.75 5 l 7.5 -7.5 -32.5 -32.5 -7.5 7.5 32.5 32.5 m -17.5 -10 l -7.5 7.5 32.5 32.5 7.5 -7.5 -32.5 -32.5 z",
  CSV: "M -7 8.1 l 7.45 -7.5 27.05 34.4 7.5 -7.5 -27.8 -36 -7.75 7.8 -26.95 -34.3 -7.5 7.5 28 35.6 z",
  OBJ: "M 20 35 l 7.5 -7.5 -26.9 -26.9 7.45 -7.55 -28.05 -28.05 -7.5 7.5 26.9 26.9 -7.5 7.5 28.1 28.1 z",
})

/**
 * Creates the core shape of a primary character as an SVG path.
 * @param props Properties that modify the shape.
 * @returns An `SVGPathElement` containing the shape.
 */
export function PrimaryCore(props: {
  /** The specification of the character. */
  readonly specification: Specification
}): SVGPathElement {
  return (<path d={CORES[props.specification]} />) as SVGPathElement
}
