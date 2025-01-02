import { any, anyText, seq, text } from "../builder.js"
import { C, RNG, V } from "../forms.js"

/**
 * A regular expression matching combination referentials with these capturing
 * groups. A group marked as **required** will always be present, while those
 * marked **optional** may not be present.
 *
 * 1. Suppletive Adjunct type (optional, present if slot 2 is not present)
 * 2. Primary referent(s) (does not include ë, optional, present if slot 1 is not
 *    present)
 * 3. Vc (required)
 * 4. Specification (x/xt/xp/xx, required)
 * 5. VxCs... (optional)
 * 6. Vc2 (optional)
 */
export const combinationReferential = /* @__PURE__ */ seq(
  any(
    seq(
      text("a"),

      anyText("hl", "hm", "hn", "hň").asGroup(),
    ),

    seq(
      text("ë").optional(),

      // Slot I: C1
      C.asGroup(),
    ),
  ),

  // Slot II: Vc
  V.asGroup(),

  // Slot III: x/xt/xp/xx
  anyText("xx", "xp", "xt", "x").asGroup(),

  // Slot IV: VxCs...
  seq(V, RNG).zeroOrMore().asGroup(),

  // Slot V: Vc2
  V.optional().asGroup(),
)
  .matchEntireText()
  .compile()
