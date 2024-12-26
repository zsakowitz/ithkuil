import { any, anyText, seq, text } from "../builder.js"
import { C, R, V, VG, VNG } from "../forms.js"

/**
 * A regular expression matching multiple-affix affixual adjuncts. A group
 * marked as **required** will always be present, while those marked
 * **optional** may not be present.
 *
 * 1. Cs (required)
 * 2. Vx (present iff slot 4 is not present, will have glottal stop)
 * 3. Cz (present iff slot 2 is, h/hl/hr/hw)
 * 4. Vx (present iff slot 2 is not present, will not have glottal stop)
 * 5. Cz (present iff slot 4 is, h/hw)
 * 6. VxCs... (required)
 * 7. Vz (optional)
 */
export const multipleAffixAffixualAdjunct = /* @__PURE__ */ seq(
  /* @__PURE__ */ text("ë").optional(),

  /* @__PURE__ */ R.asGroup(),

  /* @__PURE__ */ any(
    /* @__PURE__ */ seq(
      /* @__PURE__ */ VG.asGroup(),

      /* @__PURE__ */ anyText("h", "hl", "hr", "hw").asGroup(),
    ),

    /* @__PURE__ */ seq(
      /* @__PURE__ */ VNG.asGroup(),

      /* @__PURE__ */ anyText("h", "hw").asGroup(),
    ),
  ),

  /* @__PURE__ */ seq(V, R).oneOrMore().asGroup(),

  /* @__PURE__ */ anyText("a", "u", "e", "i", "o", "ö", "ai")
    .asGroup()
    .optional(),
)
  .matchEntireText()
  .compile()
