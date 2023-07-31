import { deepFreezeAndNullPrototype, type Context } from "../../index.js"
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
  context,
}: {
  /** The context of the character. */
  readonly context?: Context | undefined
}) {
  if (!context || context == "EXS") {
    return undefined
  }

  const diacriticName = DIACRITICS[context]

  return (
    <Anchor at="bc">
      <Diacritic name={diacriticName} />
    </Anchor>
  ) as SVGPathElement
}
