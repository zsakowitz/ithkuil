import { deepFreezeAndNullPrototype, type Context } from "../../index.js"
import { Diacritic } from "../other/diacritic.js"
import { Anchor } from "../utilities/anchor.js"

const DIACRITICS = deepFreezeAndNullPrototype({
  FNC: "DOT",
  RPS: "HORIZ_BAR",
  AMG: "DIAG_BAR",
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
    <Anchor at="bc">
      <Diacritic name={diacriticName} />
    </Anchor>
  )
}
