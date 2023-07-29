import {
  deepFreezeAndNullPrototype,
  type Affiliation,
  type Essence,
} from "../../index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = deepFreezeAndNullPrototype({
  NRM: {
    CSL: "",
    ASO: "DIAG_BAR",
    VAR: "VERT_BAR",
    COA: "HORIZ_BAR",
  },
  RPV: {
    CSL: "HORIZ_WITH_BOTTOM_LINE",
    ASO: "VERT_WITH_LEFT_LINE",
    VAR: "CURVE_TO_TOP",
    COA: "CURVE_TO_BOTTOM",
  },
})

const OFFSETS = deepFreezeAndNullPrototype({
  NRM: {
    CSL: { x: 0, y: 0 },
    ASO: { x: 0, y: 0 },
    VAR: { x: 0, y: -17.5 },
    COA: { x: 7.5, y: 0 },
  },
  RPV: {
    CSL: { x: 7.5, y: 0 },
    ASO: { x: 0, y: -17.5 },
    VAR: { x: 7.5, y: 0 },
    COA: { x: 7.5, y: 0 },
  },
})

export function PrimaryTopRight({
  affiliation = "CSL",
  essence = "NRM",
}: {
  readonly affiliation?: Affiliation | undefined
  readonly essence?: Essence | undefined
}) {
  const diacriticName = DIACRITICS[essence][affiliation]

  if (!diacriticName) {
    return <path />
  }

  return (
    <Anchor
      at="tr"
      {...OFFSETS[essence][affiliation]}
    >
      <Diacritic name={diacriticName} />
    </Anchor>
  )
}
