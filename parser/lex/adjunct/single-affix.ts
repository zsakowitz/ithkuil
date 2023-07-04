import { anyText, seq } from "../builder.js"
import { C, V } from "../forms.js"

/**
 * A regular expression matching single-affix affixual adjuncts. A group marked
 * as **required** will always be present, while those marked **optional** may
 * not be present.
 *
 * 1. Vx (required)
 * 2. Cs (required)
 * 3. Vs (optional)
 */
export const singleAffixAffixualAdjunct = seq(
  V.asGroup(),

  C.asGroup(),

  anyText("a", "u", "e", "i", "o", "ö").asGroup().optional(),
)
  .matchEntireText()
  .compile()
