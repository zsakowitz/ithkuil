import { seq, text } from "../builder.js"
import { V } from "../forms.js"

/**
 * A regular expression matching register adjuncts. A group marked as
 * **required** will always be present, while those marked **optional** may not
 * be present.
 *
 * 1. V (required)
 */
export const registerAdjunct = /* @__PURE__ */ seq(
  /* @__PURE__ */ text("h"),

  /* @__PURE__ */ V.asGroup(),
)
  .matchEntireText()
  .compile()
