import { getIntegerRootEntry, rootsMap } from "../data/roots-map.js"
import {
  ALL_ILLOCUTIONS,
  CASE_TO_NAME_MAP,
  CONTEXT_TO_NAME_MAP,
  ILLOCUTION_TO_NAME_MAP,
  SPECIFICATION_TO_NAME_MAP,
  VALIDATION_TO_NAME_MAP,
  has,
  type PartialFormative,
} from "../generate/index.js"
import { glossAffix } from "./affix.js"
import { glossCa } from "./ca.js"
import { glossCn } from "./cn.js"
import { GlossString, asGloss } from "./glossable.js"
import { glossReferent } from "./referent.js"
import { glossVn } from "./vn.js"

const isArray = /* @__PURE__ */ (() => Array.isArray)() as (
  arg: unknown,
) => arg is readonly unknown[]

/**
 * Glosses a formative.
 * @param formative The formative to be glossed.
 * @returns A `GlossString` representing the formative.
 */
export function glossFormative(formative: PartialFormative) {
  // Slot I

  const slot1 =
    formative.type == "UNF/C" ?
      formative.concatenationType == 1 ? new GlossString("T1", "type_one")
      : formative.concatenationType == 2 ? new GlossString("T2", "type_two")
      : GlossString.of("")
    : GlossString.of("")

  // Slot II

  const slotVIIAffixes = formative.slotVIIAffixes?.slice() || []

  let additionalSlot2Information = GlossString.of("")
  let didSlotVIIShortcut = false

  if (
    formative.shortcut == "VII" ||
    formative.shortcut == "VII+VIII" ||
    formative.shortcut == true
  ) {
    const finalSlotVIIAffix = slotVIIAffixes[slotVIIAffixes.length - 1]

    if (
      ((finalSlotVIIAffix?.cs == "t" &&
        (finalSlotVIIAffix.degree == 4 || finalSlotVIIAffix.degree == 5)) ||
        (finalSlotVIIAffix?.cs == "r" && finalSlotVIIAffix.degree == 4)) &&
      finalSlotVIIAffix.type == 1
    ) {
      slotVIIAffixes.pop()

      additionalSlot2Information = GlossString.of(".").plusGloss(
        glossAffix(finalSlotVIIAffix, true),
      )

      didSlotVIIShortcut = true
    }
  }

  let didCaShortcut = false

  if (
    formative.shortcut == "IV/VI" ||
    (formative.shortcut == true && !didSlotVIIShortcut)
  ) {
    additionalSlot2Information = glossCa(formative.ca || {}, false)

    if (!additionalSlot2Information.isEmpty()) {
      additionalSlot2Information = GlossString.of(".").plusGloss(
        additionalSlot2Information,
      )
    }

    didCaShortcut = true
  }

  const version =
    formative.version == "CPT" ?
      new GlossString(".CPT", ".completive")
    : GlossString.of("")

  const stem = new GlossString(
    "S" + (formative.stem ?? 1),
    "stem_" + (["zero", "one", "two", "three"][formative.stem ?? 1] || "one"),
  )

  const slot2 = stem.plusGloss(version).plusGloss(additionalSlot2Information)

  // Slot III

  let slot3: GlossString

  if (isArray(formative.root)) {
    slot3 = formative.root
      .map((x) => glossReferent(x))
      .reduce((a, b) => a.plusString("+").plusGloss(b))

    if (formative.root.length > 1) {
      slot3 = GlossString.of("[").plusGloss(slot3).plusString("]")
    }
  } else if (typeof formative.root == "object" && formative.root) {
    slot3 = glossAffix(
      {
        cs: formative.root.cs,
        degree: formative.root.degree,
        type: 1,
      },
      true,
    )
  } else {
    const associatedRoot =
      typeof formative.root == "number" || typeof formative.root == "bigint" ?
        getIntegerRootEntry(BigInt(formative.root))
      : rootsMap.get(formative.root.replace(/_/g, ""))

    if (associatedRoot) {
      const root =
        associatedRoot.stems[formative.stem ?? 1] || associatedRoot.stems[0]

      slot3 = GlossString.of("“" + root + "”")
    } else {
      slot3 = GlossString.of("" + formative.root)
    }
  }

  // Slot IV

  const slot4 = [
    formative.function == "DYN" ?
      new GlossString("DYN", "dynamic")
    : GlossString.of(""),

    formative.specification && formative.specification != "BSC" ?
      new GlossString(
        formative.specification,
        SPECIFICATION_TO_NAME_MAP[formative.specification].toLowerCase(),
      )
    : GlossString.of(""),

    formative.context && formative.context != "EXS" ?
      new GlossString(
        formative.context,
        CONTEXT_TO_NAME_MAP[formative.context].toLowerCase(),
      )
    : GlossString.of(""),
  ].reduce((a, b) =>
    !a.isEmpty() && !b.isEmpty() ? a.plusString(".").plusGloss(b)
    : a.isEmpty() ? b
    : a,
  )

  // Slot V

  let slot5 = GlossString.of("")

  if (formative.slotVAffixes && formative.slotVAffixes.length) {
    slot5 = formative.slotVAffixes
      .map((affix) => glossAffix(affix, false))
      .reduce((a, b) => a.plusString("-").plusGloss(b))
  }

  // Slot VI

  let didSlotVIIIShortcut = false

  let slot6 = GlossString.of("")

  if (
    !didCaShortcut &&
    (formative.shortcut == "VII+VIII" ||
      formative.shortcut == "VIII" ||
      formative.shortcut == true) &&
    (!formative.vn || formative.vn == "MNO") &&
    (!formative.ca ||
      ((!formative.ca.affiliation || formative.ca.affiliation == "CSL") &&
        (!formative.ca.configuration || formative.ca.configuration == "UPX") &&
        (!formative.ca.extension || formative.ca.extension == "DEL") &&
        (!formative.ca.perspective || formative.ca.perspective == "M") &&
        formative.ca.essence != "RPV"))
  ) {
    if (formative.type == "UNF/K") {
      if (formative.mood && formative.mood != "FAC") {
        slot6 = glossCn(formative.mood, false)
        didSlotVIIIShortcut = true
      }
    } else if (formative.caseScope && formative.caseScope != "CCN") {
      slot6 = glossCn(formative.caseScope, false)
      didSlotVIIIShortcut = true
    }
  }

  if (!didCaShortcut && !didSlotVIIIShortcut) {
    slot6 = glossCa(formative.ca || {}, false)
  }

  if (slot6.isEmpty() && !slot5.isEmpty()) {
    slot6 = GlossString.of("{Ca}")
  }

  // Slot VII

  let slot7 = GlossString.of("")

  if (slotVIIAffixes.length) {
    slot7 = slotVIIAffixes
      .map((affix) => glossAffix(affix, false))
      .reduce((a, b) => a.plusString("-").plusGloss(b))
  }

  // Slot VIII

  let slot8 = GlossString.of("")

  if (!didSlotVIIIShortcut) {
    const vn =
      !formative.vn || formative.vn == "MNO" ? undefined : glossVn(formative.vn)

    const cnForm =
      formative.type == "UNF/K" ? formative.mood : formative.caseScope

    const cn =
      cnForm && cnForm != "FAC" && cnForm != "CCN" ?
        glossCn(cnForm, false)
      : undefined

    if (vn && cn) {
      slot8 = vn.plusString(".").plusGloss(cn)
    } else {
      slot8 = vn || cn || slot8
    }
  }

  // Slot IX

  let slot9 = GlossString.of("")

  if (formative.type == "UNF/K") {
    slot9 = new GlossString(
      formative.illocutionValidation || "OBS",
      has(ALL_ILLOCUTIONS, formative.illocutionValidation) ?
        asGloss(ILLOCUTION_TO_NAME_MAP[formative.illocutionValidation])
      : asGloss(
          VALIDATION_TO_NAME_MAP[formative.illocutionValidation || "OBS"],
        ),
    )
  } else {
    if (formative.case && formative.case != "THM") {
      slot9 = new GlossString(
        formative.case,
        asGloss(CASE_TO_NAME_MAP[formative.case]),
      )
    }
  }

  // Result

  const result = [
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6,
    slot7,
    slot8,
    slot9,
  ].reduce((a, b) =>
    a.isEmpty() ?
      b.isEmpty() ?
        GlossString.of("")
      : b
    : b.isEmpty() ? a
    : a.plusString("-").plusGloss(b),
  )

  if (formative.type == "FRM") {
    return result.plusString("\\FRM")
  }

  return result
}
