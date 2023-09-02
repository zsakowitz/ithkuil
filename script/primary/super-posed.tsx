import {
  deepFreezeAndNullPrototype,
  type Context,
} from "../../generate/index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = /* @__PURE__ */ deepFreezeAndNullPrototype({
  FNC: "DOT",
  RPS: "HORIZ_BAR",
  AMG: "DIAG_BAR",
})

/**
 * Creates the superposed diacritic of a primary character as an SVG path.
 * @param props Properties that modify the diacritic.
 * @returns An `SVGPathElement` containing the diacritic, or `undefined` if no
 * diacritic is needed.
 */
export function PrimarySuperPosed({
  handwritten,
  context,
}: {
  /** Whether this character is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The context of the character. */
  readonly context?: Context | undefined
}): SVGPathElement | undefined {
  if (!context || context == "EXS") {
    return undefined
  }

  const diacriticName = DIACRITICS[context]

  return (
    <Anchor at="bc">
      <Diacritic
        handwritten={handwritten}
        name={diacriticName}
      />
    </Anchor>
  ) as SVGPathElement
}
