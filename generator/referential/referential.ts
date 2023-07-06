import {
  suppletiveAdjunctTypeToIthkuil,
  type SuppletiveAdjunctType,
} from "../adjunct/index.js"
import { affixToIthkuil, type Affix } from "../affix/index.js"
import { type Essence, type Perspective } from "../ca/index.js"
import {
  caseToIthkuil,
  type Case,
  type Specification,
} from "../formative/index.js"
import { countVowelForms } from "../helpers/stress.js"
import { WithWYAlternative } from "../helpers/with-wy-alternative.js"
import { isLegalWordFinalConsonantForm } from "../phonotactics/index.js"
import { fillInDefaultReferentialSlots } from "./default.js"
import { applyReferentialEssence } from "./essence.js"
import { referentListToIthkuil, type ReferentList } from "./referent/list.js"
import { referentialSpecificationToIthkuil } from "./specification.js"

/**
 * The structure shared between all single-, dual-, and combination
 * referentials.
 */
export type ReferentialReferentialCore = {
  readonly referents: ReferentList
  readonly perspective: Perspective
  readonly type?: undefined
  readonly case: Case
  readonly case2?: Case | undefined
  readonly essence: Essence
}

/** The structure shared between all suppletive referentials. */
export type SuppletiveReferentialCore = {
  readonly referents?: undefined
  readonly perspective?: undefined
  readonly type: SuppletiveAdjunctType
  readonly case: Case
  readonly case2?: Case | undefined
  readonly essence: Essence
}

/** The core structure of a referential. */
export type ReferentialCore =
  | ReferentialReferentialCore
  | SuppletiveReferentialCore

/**
 * The structure shared between all single-, dual-, and combination
 * referentials, with all optional slots properly marked optional.
 * Note that the `referents` slot is still required.
 */
export type PartialReferentialReferentialCore = {
  readonly referents: ReferentList
  readonly perspective?: Perspective | undefined
  readonly type?: undefined
  readonly case?: Case | undefined
  readonly case2?: Case | undefined
  readonly essence?: Essence | undefined
}

/**
 * The core structure of all suppletive referentials, with all optional slots
 * properly marked optional. Note that the `type` slot is still required.
 */
export type PartialSuppletiveReferentialCore = {
  readonly referents?: undefined
  readonly perspective?: undefined
  readonly type: SuppletiveAdjunctType
  readonly case?: Case | undefined
  readonly case2?: Case | undefined
  readonly essence?: Essence | undefined
}

/**
 * The core structure of a referent, with optional slots properly marked
 * optional. Note that either the `referents` slot or `type` slot must be
 * present in instances of this type.
 */
export type PartialReferentialCore =
  | PartialReferentialReferentialCore
  | PartialSuppletiveReferentialCore

/** A referential. */
export type Referential =
  | (ReferentialCore & {
      readonly referents2?: undefined
      readonly perspective2?: undefined
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (ReferentialCore & {
      readonly referents2: ReferentList
      readonly perspective2: Perspective
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (ReferentialCore & {
      readonly referents2?: undefined
      readonly perspective2?: undefined
      readonly specification: Specification
      readonly affixes: readonly Affix[]
    })

/** A referential, with optional slots properly marked optional. */
export type PartialReferential =
  | (PartialReferentialCore & {
      readonly referents2: ReferentList
      readonly perspective2?: Perspective | undefined
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (PartialReferentialCore & {
      readonly referents2?: undefined
      readonly perspective2?: undefined
      readonly specification?: Specification | undefined
      readonly affixes?: readonly Affix[] | undefined
    })

/**
 * Converts a referential into Ithkuil.
 * @param referential The referential to convert.
 * @returns Romanized Ithkuilic text representing the referential.
 */
function completeReferentialToIthkuil(referential: Referential) {
  const slot1 = referential.referents
    ? referentListToIthkuil(
        referential.referents,
        referential.perspective,
        false,
      )
    : (referential.specification && referential.affixes ? "a" : "üo") +
      suppletiveAdjunctTypeToIthkuil(referential.type)

  const slot2 = WithWYAlternative.of(
    caseToIthkuil(referential.case, false, false),
  ).withPreviousText(slot1)

  if (referential.specification && referential.affixes) {
    const slot3 = referentialSpecificationToIthkuil(referential.specification)

    const slot4 = referential.affixes.length
      ? referential.affixes
          .map((affix) => affixToIthkuil(affix, { reversed: false }))
          .reduce((a, b) => a.add(b))
          .withPreviousText(slot1 + slot2 + slot3)
      : ""

    const slot5 = referential.case2
      ? referential.case2 == "THM"
        ? "üa"
        : WithWYAlternative.of(
            caseToIthkuil(referential.case2, false, false),
          ).withPreviousText(slot1 + slot2 + slot3 + slot4)
      : referential.essence == "NRM" ||
        countVowelForms(slot1 + slot2 + slot3 + slot4) >= 2
      ? ""
      : "a"

    const word = slot1 + slot2 + slot3 + slot4 + slot5

    return applyReferentialEssence(word, referential.essence)
  }

  if (referential.case2 || referential.perspective2 || referential.referents2) {
    const slot3 =
      "w" +
      WithWYAlternative.of(
        caseToIthkuil(referential.case2 || "THM", false, false),
      ).valueAfterW

    let slot4 = ""

    if (referential.referents2) {
      const referentList = referentListToIthkuil(
        referential.referents2,
        referential.perspective2,
        true,
      )

      slot4 = isLegalWordFinalConsonantForm(referentList)
        ? referentList
        : referentList + "ë"
    }

    return applyReferentialEssence(
      slot1 + slot2 + slot3 + slot4,
      referential.essence,
    )
  }

  return applyReferentialEssence(slot1 + slot2, referential.essence)
}

/**
 * Converts a referential into Ithkuil.
 * @param referential The referential to convert.
 * @returns Romanized Ithkuilic text representing the referential.
 */
export function referentialToIthkuil(referential: PartialReferential) {
  return completeReferentialToIthkuil(
    fillInDefaultReferentialSlots(referential),
  )
}
