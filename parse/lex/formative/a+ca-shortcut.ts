import { RegexPart, any, anyText, seq } from "../builder.js"
import { C, H, V, VG, VNG } from "../forms.js"

const ccShortcut = /* @__PURE__ */ anyText("w", "y", "hl", "hr", "hm", "hn")

/**
 * A regular expression matching non-shortcut formatives with these capturing
 * groups. A group marked as **required** will always be present, while those
 * marked **optional** may not be present.
 *
 * 1. Cc (required)
 * 2. Vv (required)
 * 3. Cr (required)
 * 4. VxCs...' (slot V, optional)
 * 5. VxCs... (slot VII, optional)
 * 6. Vn (optional, but present if Cn is present)
 * 7. Cn (optional, but present if Vn is present)
 * 8. Vc/Vf/Vk (optional)
 */
export const shortcutFormative = /* @__PURE__ */ seq(
  // Slot I: Cc
  /* @__PURE__ */ ccShortcut.asGroup(),

  // Slot II: Vv
  /* @__PURE__ */ V.asGroup(),

  // Slot III: Cr
  /* @__PURE__ */ any(C, new RegexPart("\\d+")).asGroup(),

  // Slot V: (VxCs...')
  /* @__PURE__ */ seq(/* @__PURE__ */ seq(VNG, C).zeroOrMore(), VG, C)
    .asGroup()
    .optional(),

  // Slot VII: (VxCs...)
  /* @__PURE__ */ seq(V, C).zeroOrMore().asGroup(),

  // Slot VIII: (VnCn)
  /* @__PURE__ */ seq(
    /* @__PURE__ */ V.asGroup(),
    /* @__PURE__ */ H.asGroup(),
  ).optional(),

  // Slot IX: (Vc/Vf/Vk)
  /* @__PURE__ */ V.asGroup().optional(),
)
  .matchEntireText()
  .compile()
