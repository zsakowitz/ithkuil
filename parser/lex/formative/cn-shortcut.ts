import { anyText, seq } from "../builder.js"
import { C, CNG, V } from "../forms.js"

const ccNoShortcut = /* @__PURE__ */ anyText("hw", "h")

/**
 * A regular expression matching non-shortcut formatives with these capturing
 * groups. A group marked as **required** will always be present, while those
 * marked **optional** may not be present.
 *
 * 1. Cc (optional)
 * 2. Vv (optional, but present if Cc is present)
 * 3. Cr (required)
 * 4. Vr (required)
 * 5. Cn (required)
 * 6. VxCs... (optional)
 * 7. Vc/Vf/Vk (optional)
 */
export const cnShortcutFormative = /* @__PURE__ */ seq(
  seq(
    // Slot I: Cc
    ccNoShortcut.asGroup().optional(),

    // Slot II: Vv
    V.asGroup(),
  ).optional(),

  // Slot III: Cr
  C.asGroup(),

  // Slot IV: Vr
  V.asGroup(),

  // Slot VI: Cn
  anyText("hl", "hr", "hm", "hn", "hň").asGroup(),

  // Slot VII: (VxCs...)
  seq(V, CNG).zeroOrMore().asGroup(),

  // Slot IX: (Vc/Vf/Vk)
  V.asGroup().optional(),
)
  .matchEntireText()
  .compile()
