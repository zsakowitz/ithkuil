import { seq, text } from "../builder.js"
import { V } from "../forms.js"

/**
 * A regular expression matching register adjuncts. A group marked as
 * **required** will always be present, while those marked **optional** may not
 * be present.
 *
 * 1. V (required)
 */
export const registerAdjunct = seq(
  text("h"),

  V.asGroup(),
)
  .matchEntireText()
  .compile()
