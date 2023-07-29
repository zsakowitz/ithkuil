import { deepFreezeAndNullPrototype, type Configuration } from "../../index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = deepFreezeAndNullPrototype({
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

const OFFSETS = deepFreezeAndNullPrototype({
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

export function PrimaryBottomLeft(props: {
  readonly configuration?: Configuration | undefined
}) {
  if (!props.configuration) {
    return <path />
  }

  const diacriticName = props.configuration.slice(1)

  if (diacriticName in DIACRITICS) {
    return (
      <Anchor
        at="bl"
        {...OFFSETS[diacriticName as keyof typeof DIACRITICS]}
      >
        <Diacritic
          name={DIACRITICS[diacriticName as keyof typeof DIACRITICS]}
        />
      </Anchor>
    )
  }

  return <path />
}
