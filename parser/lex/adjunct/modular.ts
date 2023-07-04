import { anyText, seq } from "../builder.js"
import { H, V } from "../forms.js"

/**
 * A regular expression matching modulas adjuncts. A group marked as
 * **required** will always be present, while those marked **optional** may not
 * be present.
 *
 * 1. w/y (optional)
 * 2. Vn (optional, but present if slots 3, 4, or 5 are present)
 * 3. Cn (optional, but present if slots 2, 4, or 5 are present)
 * 4. Vn (optional, but present if slot 5 is present)
 * 5. Cm (optional, but present if slot 4 is present)
 * 6. Vn/Vh (required)
 */
export const modularAdjunct = seq(
  anyText("w", "y").asGroup().optional(),

  seq(
    V.asGroup(),

    H.asGroup(),

    seq(
      V.asGroup(),

      anyText("n", "ň").asGroup(),
    ).optional(),
  ).optional(),

  V.asGroup(),
)
  .matchEntireText()
  .compile()
