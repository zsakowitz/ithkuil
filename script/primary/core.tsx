import { deepFreeze, type Specification } from "../../generate/index.js"

export const PRIMARY_CORES = /* @__PURE__ */ deepFreeze({
  BSC: "M -25 -35 l -7.5 7.5 57.5 62.5 7.5 -7.5 -57.5 -62.5 z",
  BSC_ALT: "M -25 -35 l -7.5 7.5 57.5 62.5 7.5 -7.5 -57.5 -62.5 z",
  CTE: "M 8.75 5 l 7.5 -7.5 -32.5 -32.5 -7.5 7.5 32.5 32.5 m -17.5 -10 l -7.5 7.5 32.5 32.5 7.5 -7.5 -32.5 -32.5 z",
  CSV: "M -7 8.1 l 7.45 -7.5 27.05 34.4 7.5 -7.5 -27.8 -36 -7.75 7.8 -26.95 -34.3 -7.5 7.5 28 35.6 z",
  OBJ: "M 20 35 l 7.5 -7.5 -26.9 -26.9 7.45 -7.55 -28.05 -28.05 -7.5 7.5 26.9 26.9 -7.5 7.5 28.1 28.1 z",
})

export const HANDWRITTEN_PRIMARY_CORES = /* @__PURE__ */ deepFreeze({
  BSC: "M -35 -35 c 0 40 30 70 70 70",
  BSC_ALT: "M -35 -35 c 40 0 70 30 70 70",
  CTE: "M -25 -35 c 17.156325 0 30 17.1428 30 40 m 20 30 c -17.156325 0 -30 -17.1428 -30 -40",
  CSV: "M -30 -35 c 30 0 30 20 30 35 c 30 0 30 20 30 35",
  OBJ: "M -30 -35 c 0 35 15 35 30 35 c 0 35 15 35 30 35",
})

export const HANDWRITTEN_CORE_EXTENSIONS = /* @__PURE__ */ deepFreeze({
  BSC: ["vert2", "horiz2"],
  BSC_ALT: ["horiz2", "vert2"],
  CTE: ["horiz2", "horiz2"],
  CSV: ["horiz2", "vert2"],
  OBJ: ["vert2", "horiz2"],
})

/**
 * Creates the core shape of a primary character as an SVG path.
 *
 * @param props Properties that modify the shape.
 * @returns An `SVGPathElement` containing the shape.
 */
export function PrimaryCore(props: {
  /** Whether this item is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The specification of the character. */
  readonly specification: Specification | "BSC_ALT"
}): SVGPathElement {
  return (
    <path
      d={
        (props.handwritten ? HANDWRITTEN_PRIMARY_CORES : PRIMARY_CORES)[
          props.specification
        ]
      }
    />
  ) as SVGPathElement
}
