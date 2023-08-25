import { affixesMap } from "../data/affixes-map.js"
import { type Affix } from "../generate/index.js"
import { glossCa } from "./ca.js"
import { glossCase } from "./case.js"
import { GlossString } from "./glossable.js"
import { glossReferent } from "./referent.js"

const AFFIX_TYPE_1 = "₁"
const AFFIX_TYPE_2 = "₂"
const AFFIX_TYPE_3 = "₃"

function getAffixType(type: 1 | 2 | 3) {
  if (type == 2) {
    return AFFIX_TYPE_2
  }

  if (type == 3) {
    return AFFIX_TYPE_3
  }

  return AFFIX_TYPE_1
}

/**
 * Glosses an affix.
 * @param affix The affix to be glossed.
 * @param isTypeless If true, omits a type (1/2/3) on the output.
 * @returns A `GlossString` representing the affix.
 */
export function glossAffix(affix: Affix, isTypeless: boolean) {
  if (affix.ca) {
    return glossCa(affix.ca, true)
  }

  if (affix.referent) {
    let referent = glossReferent(affix.referent)

    if (affix.perspective && affix.perspective != "M") {
      referent = new GlossString("[", "[")
        .plusGloss(referent)
        .plusString("+")
        .plusStrings(
          affix.perspective,
          affix.perspective == "G" ? "agglomerative" : "nomic",
        )
        .plusString("]")
    }

    return new GlossString("(", "(")
      .plusGloss(referent)
      .plusString("-")
      .plusGloss(glossCase(affix.case || "THM"))
      .plusString(")")
  }

  if (affix.case) {
    if (affix.type) {
      const label = affix.isInverse
        ? new GlossString("ia:", "inverse_accessor:")
        : new GlossString("acc:", "case_accessor:")

      const type = getAffixType(affix.type)

      return new GlossString("(", "(")
        .plusGloss(label)
        .plusGloss(glossCase(affix.case))
        .plusString(")")
        .plusString(type)
    }

    return new GlossString("(", "(")
      .plusStrings("case:", "case_stacking:")
      .plusGloss(glossCase(affix.case))
      .plusString(")")
  }

  const type = isTypeless ? "" : getAffixType(affix.type)

  const associatedAffix = affixesMap.get(affix.cs)

  if (!associatedAffix) {
    return GlossString.of(affix.cs + "/" + affix.degree + type)
  }

  const entry = associatedAffix.degrees[affix.degree]

  if (!entry) {
    return GlossString.of(
      associatedAffix.abbreviation + "/" + affix.degree + type,
    )
  }

  return GlossString.of("‘" + entry + "’" + type)
}
