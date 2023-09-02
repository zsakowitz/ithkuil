import { deepFreezeAndNullPrototype } from "../../generate/index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = /* @__PURE__ */ deepFreezeAndNullPrototype({
  "UNF/K": "DOT",
  FRM: "HORIZ_BAR",
  1: "VERT_BAR",
  2: "HORIZ_WITH_BOTTOM_LINE",
})

/**
 * Creates the underposed diacritic of a primary character as an SVG path.
 * @param props Properties that modify the diacritic.
 * @returns An `SVGPathElement` containing the diacritic, or `undefined` if no
 * diacritic is needed.
 */
export function PrimaryUnderPosed({
  handwritten,
  bottom = "UNF/C",
}: {
  /** Whether this character is handwritten. */
  readonly handwritten?: boolean | undefined

  /**
   * The bottom item on this character. May be a relation, such as UNF/C, UNF/K,
   * or FRM, or a concatenation type, such as 1 or 2.
   */
  readonly bottom?: "UNF/C" | "UNF/K" | "FRM" | 1 | 2 | undefined
}): SVGPathElement | undefined {
  if (bottom == "UNF/C") {
    return undefined
  }

  const diacriticName = DIACRITICS[bottom]

  return (
    <Anchor at="tc">
      <Diacritic
        handwritten={handwritten}
        name={diacriticName}
      />
    </Anchor>
  ) as SVGPathElement
}
