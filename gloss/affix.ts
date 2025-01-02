import { affixesMap, getIntegerAffixEntry } from "../data/affixes-map.js"
import {
  ALL_ASPECTS,
  ALL_CASE_SCOPES,
  ALL_EFFECTS,
  ALL_ILLOCUTIONS,
  ALL_LEVELS,
  ALL_MOODS,
  ALL_PHASES,
  ALL_VALENCES,
  ALL_VALIDATIONS,
  AP1,
  AP2,
  AP3,
  AP4,
  ASPECT_TO_NAME_MAP,
  CASE_SCOPE_TO_NAME_MAP,
  EFE,
  EFFECT_TO_NAME_MAP,
  ILLOCUTION_TO_NAME_MAP,
  IVL,
  LEVEL_TO_NAME_MAP,
  LVL,
  MCS,
  MOOD_TO_NAME_MAP,
  PHASE_TO_NAME_MAP,
  PHS,
  VAL,
  VALENCE_TO_NAME_MAP,
  VALIDATION_TO_NAME_MAP,
  type Affix,
} from "../generate/index.js"
import { glossCa } from "./ca.js"
import { glossCase } from "./case.js"
import { GlossString, asGloss } from "./glossable.js"
import { glossReferentListAndPerspective } from "./referent-list-and-perspective.js"

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
 *
 * @param affix The affix to be glossed.
 * @param isTypeless If true, omits a type (1/2/3) on the output.
 * @returns A `GlossString` representing the affix.
 */
export function glossAffix(affix: Affix, isTypeless: boolean) {
  if (affix.ca) {
    return glossCa(affix.ca, true)
  }

  if (affix.referents) {
    let referent = glossReferentListAndPerspective(
      affix.referents,
      affix.perspective,
    )

    return GlossString.of("(")
      .plusGloss(referent)
      .plusString("-")
      .plusGloss(glossCase(affix.case || "THM"))
      .plusString(")")
  }

  if (affix.case) {
    if (affix.type) {
      const label =
        affix.isInverse ?
          new GlossString("ia:", "inverse_accessor:")
        : new GlossString("acc:", "case_accessor:")

      const type = getAffixType(affix.type)

      return GlossString.of("(")
        .plusGloss(label)
        .plusGloss(glossCase(affix.case))
        .plusString(")")
        .plusString(type)
    }

    return GlossString.of("(")
      .plusStrings("case:", "case_stacking:")
      .plusGloss(glossCase(affix.case))
      .plusString(")")
  }

  if (affix.cs == MCS) {
    if (affix.degree >= 1 && affix.degree <= 5) {
      return new GlossString(
        "(" + ALL_MOODS[affix.degree] + ")" + getAffixType(affix.type),
        "(" +
          MOOD_TO_NAME_MAP[ALL_MOODS[affix.degree]!].toLowerCase() +
          ")" +
          getAffixType(affix.type),
      )
    } else {
      const degree = affix.degree == 0 ? 10 : affix.degree

      return new GlossString(
        "(" + ALL_CASE_SCOPES[degree - 5] + ")" + getAffixType(affix.type),
        "(" +
          CASE_SCOPE_TO_NAME_MAP[ALL_CASE_SCOPES[degree - 5]!].toLowerCase() +
          ")" +
          getAffixType(affix.type),
      )
    }
  }

  if (affix.cs == IVL && affix.degree != 0) {
    if (affix.type == 1) {
      return new GlossString(
        "(" + ALL_ILLOCUTIONS[affix.degree - 1] + ")",
        "(" +
          ILLOCUTION_TO_NAME_MAP[
            ALL_ILLOCUTIONS[affix.degree - 1]!
          ].toLowerCase() +
          ")",
      )
    }

    if (affix.type == 2) {
      return new GlossString(
        "(" + ALL_VALIDATIONS[affix.degree - 1] + ")",
        "(" +
          VALIDATION_TO_NAME_MAP[
            ALL_VALIDATIONS[affix.degree - 1]!
          ].toLowerCase() +
          ")",
      )
    }
  }

  if (
    (affix.cs == AP1 ||
      affix.cs == AP2 ||
      affix.cs == AP3 ||
      affix.cs == AP4) &&
    affix.degree != 0
  ) {
    const index = 9 * [AP1, AP2, AP3, AP4].indexOf(affix.cs) + affix.degree - 1

    return new GlossString(
      "(" + ALL_ASPECTS[index] + ")" + getAffixType(affix.type),
      "(" +
        ASPECT_TO_NAME_MAP[ALL_ASPECTS[index]!].toLowerCase() +
        ")" +
        getAffixType(affix.type),
    )
  }

  if (affix.cs == LVL && affix.degree != 0) {
    return new GlossString(
      "(" + ALL_LEVELS[affix.degree - 1] + ")" + getAffixType(affix.type),
      "(" +
        LEVEL_TO_NAME_MAP[ALL_LEVELS[affix.degree - 1]!].toLowerCase() +
        ")" +
        getAffixType(affix.type),
    )
  }

  if (affix.cs == EFE && affix.degree != 0) {
    return new GlossString(
      "(" + ALL_EFFECTS[affix.degree - 1] + ")" + getAffixType(affix.type),
      "(" +
        asGloss(EFFECT_TO_NAME_MAP[ALL_EFFECTS[affix.degree - 1]!]) +
        ")" +
        getAffixType(affix.type),
    )
  }

  if (affix.cs == PHS && affix.degree != 0) {
    return new GlossString(
      "(" + ALL_PHASES[affix.degree - 1] + ")" + getAffixType(affix.type),
      "(" +
        PHASE_TO_NAME_MAP[ALL_PHASES[affix.degree - 1]!].toLowerCase() +
        ")" +
        getAffixType(affix.type),
    )
  }

  if (affix.cs == VAL && affix.degree != 0) {
    return new GlossString(
      "(" + ALL_VALENCES[affix.degree - 1] + ")" + getAffixType(affix.type),
      "(" +
        VALENCE_TO_NAME_MAP[ALL_VALENCES[affix.degree - 1]!].toLowerCase() +
        ")" +
        getAffixType(affix.type),
    )
  }

  const type = isTypeless ? "" : getAffixType(affix.type)

  const associatedAffix =
    typeof affix.cs == "number" || typeof affix.cs == "bigint" ?
      getIntegerAffixEntry(BigInt(affix.cs))
    : affixesMap.get(affix.cs.replace(/_/g, ""))

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
