import {
  deepFreezeAndNullPrototype,
  type Configuration,
} from "../../generate/index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

/** An object mapping from Ca forms to their corresponding diacritics. */
export const CA_DIACRITICS = /* @__PURE__ */ deepFreezeAndNullPrototype({
  SS: "DIAG_BAR",
  SC: "VERT_BAR",
  SF: "HORIZ_BAR",
  DS: "HORIZ_WITH_TOP_LINE",
  DC: "VERT_WITH_RIGHT_LINE",
  DF: "CURVE_TO_BOTTOM",
  FS: "CURVE_TO_TOP",
  FC: "TWO_PART_DIAG_BAR",
  FF: "CURVE_TO_BOTTOM_WITH_LINE",
})

const OFFSETS = /* @__PURE__ */ deepFreezeAndNullPrototype({
  SS: { x: 0, y: 0 },
  SC: { x: 0, y: 17.5 },
  SF: { x: -7.5, y: 0 },
  DS: { x: -7.5, y: 0 },
  DC: { x: 0, y: 17.5 },
  DF: { x: -7.5, y: 0 },
  FS: { x: -7.5, y: 0 },
  FC: { x: -7.5, y: 0 },
  FF: { x: 0, y: 10 },
})

const HANDWRITTEN_OFFSETS = /* @__PURE__ */ deepFreezeAndNullPrototype({
  SS: { x: 0, y: 0 },
  SC: { x: 0, y: 0 },
  SF: { x: 0, y: 0 },
  DS: { x: 0, y: 0 },
  DC: { x: 0, y: 0 },
  DF: { x: 0, y: 0 },
  FS: { x: 0, y: 0 },
  FC: { x: 0, y: 0 },
  FF: { x: 0, y: 15 },
})

/**
 * Creates the bottom-left diacritic of a primary character as an SVG path.
 *
 * @param props Properties that modify the diacritic.
 * @returns An `SVGPathElement` containing the diacritic, or `undefined` if no
 *   diacritic is needed.
 */
export function PrimaryBottomLeft(props: {
  /** Whether this item is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The configuration of the character. */
  readonly configuration?: Configuration | undefined
}): SVGPathElement | undefined {
  if (!props.configuration) {
    return
  }

  const diacriticName = props.configuration.slice(1)

  if (diacriticName in CA_DIACRITICS) {
    return (
      <Anchor
        at="bl"
        {...(props.handwritten ? HANDWRITTEN_OFFSETS : OFFSETS)[
          diacriticName as keyof typeof CA_DIACRITICS
        ]}
      >
        <Diacritic
          handwritten={props.handwritten}
          name={CA_DIACRITICS[diacriticName as keyof typeof CA_DIACRITICS]}
        />
      </Anchor>
    ) as SVGPathElement
  }

  return
}
