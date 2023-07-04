import { anyText, seq } from "../builder.js"
import { V } from "../forms.js"

/**
 * A regular expression matching suppletive adjuncts. A group marked as
 * **required** will always be present, while those marked **optional** may not
 * be present.
 *
 * 1. Cp (required)
 * 2. Vc (required)
 */
export const suppletiveAdjunct = seq(
  anyText("hl", "hm", "hn", "hň"),

  V.asGroup(),
)
  .matchEntireText()
  .compile()
