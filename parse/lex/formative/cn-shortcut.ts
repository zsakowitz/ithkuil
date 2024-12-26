import { anyText, seq } from "../builder.js"
import { R, V } from "../forms.js"

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
  /* @__PURE__ */ seq(
    // Slot I: Cc
    /* @__PURE__ */ ccNoShortcut.asGroup().optional(),

    // Slot II: Vv
    /* @__PURE__ */ V.asGroup(),
    /* @__PURE__ */
  ).optional(),

  // Slot III: Cr
  /* @__PURE__ */ R.asGroup(),

  // Slot IV: Vr
  /* @__PURE__ */ V.asGroup(),

  // Slot VI: Cn
  /* @__PURE__ */ anyText("hl", "hr", "hm", "hn", "hň").asGroup(),

  // Slot VII: (VxCs...)
  /* @__PURE__ */ seq(V, R).zeroOrMore().asGroup(),

  // Slot IX: (Vc/Vf/Vk)
  /* @__PURE__ */ V.asGroup().optional(),
)
  .matchEntireText()
  .compile()
