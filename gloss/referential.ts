import {
  SPECIFICATION_TO_NAME_MAP,
  SUPPLETIVE_ADJUNCT_TYPE_TO_NAME_MAP,
  type PartialReferential,
} from "../generate/index.js"
import { end } from "../parse/index.js"
import { glossAffix } from "./affix.js"
import { glossCase } from "./case.js"
import { GlossString } from "./glossable.js"
import { glossReferentListAndPerspective } from "./referent-list-and-perspective.js"

/**
 * Glosses a referential.
 * @param referential The referential to be glossed.
 * @returns A `GlossString` representing the referential.
 */
export function glossReferential(referential: PartialReferential) {
  let ending = GlossString.of("")

  if (referential.referents2) {
    ending = glossReferentListAndPerspective(
      referential.referents2,
      referential.perspective2,
    )
  } else {
    const specification =
      referential.specification && referential.specification != "BSC"
        ? new GlossString(
            referential.specification,
            SPECIFICATION_TO_NAME_MAP[referential.specification].toLowerCase(),
          )
        : undefined

    const affixes =
      referential.affixes && referential.affixes.length >= 1
        ? referential.affixes
            .map((x) => glossAffix(x, false))
            .reduce((a, b) => a.plusString("-").plusGloss(b))
        : undefined

    if (specification || affixes) {
      ending = GlossString.of("-").plusGloss(
        specification && affixes
          ? specification.plusString("-").plusGloss(affixes)
          : (specification || affixes)!,
      )
    }
  }

  if (referential.case2 || referential.referents2) {
    if (
      !referential.referents2 &&
      (referential.specification || referential.affixes)
    ) {
      ending = ending
        .plusString("-")
        .plusGloss(glossCase(referential.case2 || "THM"))
    } else {
      ending = GlossString.of("-")
        .plusGloss(glossCase(referential.case2 || "THM"))
        .plusString("-")
        .plusGloss(ending)
    }
  }

  if (referential.essence == "RPV") {
    ending = ending.plusString("\\RPV")

    ending = new GlossString(
      ending.short.replace("-\\", "\\"),
      ending.full.replace("-\\", "\\"),
    )
  }

  let head = referential.type
    ? new GlossString(
        "[" + referential.type + "]",
        SUPPLETIVE_ADJUNCT_TYPE_TO_NAME_MAP[referential.type].toLowerCase(),
      )
    : glossReferentListAndPerspective(
        referential.referents,
        referential.perspective,
      )

  if (referential.case || referential.case2) {
    head = head.plusString("-").plusGloss(glossCase(referential.case || "THM"))
  }

  return head.plusGloss(ending)
}
