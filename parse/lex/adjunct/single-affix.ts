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
export const singleAffixAffixualAdjunct = /* @__PURE__ */ seq(
  /* @__PURE__ */ V.asGroup(),

  /* @__PURE__ */ C.asGroup(),

  /* @__PURE__ */ anyText("a", "u", "e", "i", "o", "ö").asGroup().optional(),
)
  .matchEntireText()
  .compile()
