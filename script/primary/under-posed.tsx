import { deepFreezeAndNullPrototype } from "../../index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = deepFreezeAndNullPrototype({
  "UNF/K": "DOT",
  FRM: "HORIZ_BAR",
  1: "VERT_BAR",
  2: "HORIZ_WITH_BOTTOM_LINE",
})

const OFFSETS = deepFreezeAndNullPrototype({
  "UNF/K": { x: 0, y: 0 },
  FRM: { x: 0, y: 10 },
  1: { x: 0, y: 0 },
  2: { x: 0, y: 10 },
})

export function PrimaryUnderPosed({
  bottom = "UNF/C",
}: {
  readonly bottom?: "UNF/C" | "UNF/K" | "FRM" | 1 | 2 | undefined
}) {
  if (bottom == "UNF/C") {
    return <path />
  }

  const diacriticName = DIACRITICS[bottom]

  return (
    <Anchor
      at="tc"
      {...OFFSETS[bottom]}
    >
      <Diacritic name={diacriticName} />
    </Anchor>
  )
}
