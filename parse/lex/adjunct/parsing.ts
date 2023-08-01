import { charIn, seq, text } from "../builder.js"

/**
 * A regular expression matching parsing adjuncts. Due to the simple structure
 * of parsing adjuncts, these do not have any capture groups. Instead, use the
 * entire result (`match[0]`) to get the relevant information.
 */
export const parsingAdjunct = /* @__PURE__ */ seq(charIn("aeou"), text("'"))
  .matchEntireText()
  .compile()
