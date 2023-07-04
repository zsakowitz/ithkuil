import { anyText, seq, text } from "../builder.js"
import { C, V } from "../forms.js"

/**
 * A regular expression matching multiple-affix affixual adjuncts. A group
 * marked as **required** will always be present, while those marked
 * **optional** may not be present.
 *
 * 1. Cs (required)
 * 2. Vx (required)
 * 3. Cz (required, doesn't include glottal stop)
 * 4. VxCs... (required)
 * 5. Vz (optional)
 */
export const multipleAffixAffixualAdjunct = seq(
  text("ë").optional(),

  C.asGroup(),

  V.asGroup(),

  anyText("h", "hl", "hr", "hw").asGroup(),

  seq(V, C).oneOrMore().asGroup(),

  anyText("a", "u", "e", "i", "o", "ö", "ai").asGroup().optional(),
)
  .matchEntireText()
  .compile()
