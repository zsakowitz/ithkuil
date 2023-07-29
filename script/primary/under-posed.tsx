import { deepFreezeAndNullPrototype } from "../../index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = deepFreezeAndNullPrototype({
  "UNF/K": "DOT",
  FRM: "HORIZ_BAR",
  1: "VERT_BAR",
  2: "HORIZ_WITH_BOTTOM_LINE",
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
    <Anchor at="tc">
      <Diacritic name={diacriticName} />
    </Anchor>
  )
}
