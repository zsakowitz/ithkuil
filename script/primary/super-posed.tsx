import { deepFreezeAndNullPrototype, type Context } from "../../index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = deepFreezeAndNullPrototype({
  FNC: "DOT",
  RPS: "HORIZ_BAR",
  AMG: "DIAG_BAR",
})

const OFFSETS = deepFreezeAndNullPrototype({
  FNC: { x: 0, y: 0 },
  RPS: { x: 0, y: -10 },
  AMG: { x: 0, y: 0 },
})

export function PrimarySuperPosed({
  context = "EXS",
}: {
  readonly context?: Context | undefined
}) {
  if (context == "EXS") {
    return <path />
  }

  const diacriticName = DIACRITICS[context]

  return (
    <Anchor
      at="bc"
      {...OFFSETS[context]}
    >
      <Diacritic name={diacriticName} />
    </Anchor>
  )
}
