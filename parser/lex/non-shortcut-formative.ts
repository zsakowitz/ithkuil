import { any, anyText, seq } from "./builder.js"
import { C, CG, CNG, H, V } from "./forms.js"

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
 * 5. CsVx... affixes (optional)
 * 6. Geminated Ca (either this or ungeminated Ca will be present)
 * 7. Ungeminated Ca (either this or geminated Ca will be present)
 * 8. VxCs... affixes (optional)
 * 9. Vn (optional, but present if Cn is present)
 * 10. Cn (optional, but present if Vn is present)
 * 11. Vc/Vf/Vk (optional)
 */
export const nonShortcutFormative = /* @__PURE__ */ seq(
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

  any(
    seq(
      // Slot V: (CsVx...)
      seq(CNG, V).oneOrMore().asGroup(),

      // Slot VI: geminated Ca
      CG.asGroup(),
    ),

    // Slot VI: ungeminated Ca
    CNG.asGroup(),
  ),

  // Slot VII: (VxCs...)
  seq(V, CNG).zeroOrMore().asGroup(),

  // Slot VIII: (VnCn)
  seq(V.asGroup(), H.asGroup()).optional(),

  // Slot IX: (Vc/Vf/Vk)
  V.asGroup().optional(),
)
  .matchEntireText()
  .compile()
