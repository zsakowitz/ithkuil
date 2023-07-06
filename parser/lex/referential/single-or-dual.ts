import { any, anyText, seq, text } from "../builder.js"
import { C, V } from "../forms.js"

/**
 * A regular expression matching single or dual referentials with these
 * capturing groups. A group marked as **required** will always be present,
 * while those marked **optional** may not be present.
 *
 * 1. Suppletive Adjunct type (optional, present if slot 2 is not present)
 * 2. Primary referent(s) (may include ë, optional, present if slot 1 is not
 *    present)
 * 3. Vc1 (required)
 * 4. Vc2 (optional)
 * 5. Second referent(s) (does not include ë, optional)
 */
export const singleOrDualReferential = /* @__PURE__ */ seq(
  any(
    seq(
      text("üo"),

      anyText("hl", "hm", "hn", "hň").asGroup(),
    ),

    // Slot I: C1
    seq(
      text("ë").optional(),

      C,

      seq(text("ë"), C).zeroOrMore(),
    ).asGroup(),
  ),

  // Slot II: Vc1
  V.asGroup(),

  seq(
    anyText("w", "y"),

    // Slot III: Vc2
    V.asGroup(),

    seq(
      // Slot IV: C2
      C.asGroup(),

      text("ë").optional(),
    ).optional(),
  ).optional(),
)
  .matchEntireText()
  .compile()
