import { object, undefined, union } from "zod"
import {
  suppletiveAdjunctTypeToIthkuil,
  zodSuppletiveAdjunctType,
  type SuppletiveAdjunctType,
} from "../adjunct/index.js"
import { affixToIthkuil, zodAffix, type Affix } from "../affix/index.js"
import {
  zodEssence,
  zodPerspective,
  type Essence,
  type Perspective,
} from "../ca/index.js"
import {
  caseToIthkuil,
  zodCase,
  zodSpecification,
  type Case,
  type Specification,
} from "../formative/index.js"
import { countVowelForms } from "../helpers/stress.js"
import { WithWYAlternative } from "../helpers/with-wy-alternative.js"
import {
  isLegalConsonantForm,
  isLegalWordFinalConsonantForm,
} from "../phonotactics/index.js"
import { fillInDefaultReferentialSlots } from "./default.js"
import { applyReferentialEssence } from "./essence.js"
import {
  referentialPerspectiveToIthkuil,
  referentialPerspectiveToIthkuilAlt,
} from "./perspective.js"
import {
  referentToIthkuil,
  zodReferent,
  type Referent,
} from "./referent/index.js"
import {
  referentListToIthkuil,
  zodReferentList,
  type ReferentList,
} from "./referent/list.js"
import { referentialSpecificationToIthkuil } from "./specification.js"

export * from "./default.js"
export * from "./essence.js"
export * from "./perspective.js"
export * from "./referent/index.js"
export * from "./specification.js"

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

/** A Zod validator matching {@link ReferentialReferentialCore}s. */
export const zodReferentialReferentialCore = /* @__PURE__ */ object({
  referents: zodReferentList,
  perspective: zodPerspective,
  type: /* @__PURE__ */ undefined().optional(),
  case: zodCase,
  case2: /* @__PURE__ */ zodCase.optional(),
  essence: zodEssence,
})

/** The structure shared between all suppletive referentials. */
export type SuppletiveReferentialCore = {
  readonly referents?: undefined
  readonly perspective?: undefined
  readonly type: SuppletiveAdjunctType
  readonly case: Case
  readonly case2?: Case | undefined
  readonly essence: Essence
}

/** A Zod validator matching {@link SuppletiveReferentialCore}s. */
export const zodSuppletiveReferentialCore = /* @__PURE__ */ object({
  referents: /* @__PURE__ */ undefined().optional(),
  perspective: /* @__PURE__ */ undefined().optional(),
  type: zodSuppletiveAdjunctType,
  case: zodCase,
  case2: /* @__PURE__ */ zodCase.optional(),
  essence: zodEssence,
})

/** The core structure of a referential. */
export type ReferentialCore =
  | ReferentialReferentialCore
  | SuppletiveReferentialCore

/** A Zod validator matching {@link ReferentialCore}s. */
export const zodReferentialCore = /* @__PURE__ */ union([
  zodReferentialReferentialCore,
  zodSuppletiveReferentialCore,
])

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

/** A Zod validator matching {@link PartialReferentialReferentialCore}s. */
export const zodPartialReferentialReferentialCore = /* @__PURE__ */ object({
  referents: zodReferentList,
  perspective: /* @__PURE__ */ zodPerspective.optional(),
  type: /* @__PURE__ */ undefined().optional(),
  case: /* @__PURE__ */ zodCase.optional(),
  case2: /* @__PURE__ */ zodCase.optional(),
  essence: /* @__PURE__ */ zodEssence.optional(),
})

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

/** A Zod validator matching {@link PartialSuppletiveReferentialCore}s. */
export const zodPartialSuppletiveReferentialCore = /* @__PURE__ */ object({
  referents: /* @__PURE__ */ undefined().optional(),
  perspective: /* @__PURE__ */ undefined().optional(),
  type: zodSuppletiveAdjunctType,
  case: /* @__PURE__ */ zodCase.optional(),
  case2: /* @__PURE__ */ zodCase.optional(),
  essence: /* @__PURE__ */ zodEssence.optional(),
})

/**
 * The core structure of a referent, with optional slots properly marked
 * optional. Note that either the `referents` slot or `type` slot must be
 * present in instances of this type.
 */
export type PartialReferentialCore =
  | PartialReferentialReferentialCore
  | PartialSuppletiveReferentialCore

/** A Zod validator matching {@link PartialReferentialCore}s. */
export const zodPartialReferentialCore = /* @__PURE__ */ union([
  zodPartialReferentialReferentialCore,
  zodPartialSuppletiveReferentialCore,
])

/** A referential. */
export type Referential =
  | (ReferentialCore & {
      readonly referent2?: undefined
      readonly perspective2?: undefined
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (ReferentialCore & {
      readonly referent2: Referent
      readonly perspective2: Perspective
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (ReferentialCore & {
      readonly referent2?: undefined
      readonly perspective2?: undefined
      readonly specification: Specification
      readonly affixes: readonly Affix[]
    })

/** A Zod validator matching referentials. */
export const zodReferential = /* @__PURE__ */ union([
  /* @__PURE__ */ zodReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ zodReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: zodReferent,
      perspective2: zodPerspective,
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ zodReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: zodSpecification,
      affixes: /* @__PURE__ */ zodAffix.array(),
    }),
  ),
])

/** A referential, with optional slots properly marked optional. */
export type PartialReferential =
  | (PartialReferentialCore & {
      readonly referent2?: undefined
      readonly perspective2?: undefined
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (PartialReferentialCore & {
      readonly referent2: Referent
      readonly perspective2?: Perspective | undefined
      readonly specification?: undefined
      readonly affixes?: undefined
    })
  | (PartialReferentialCore & {
      readonly referent2?: undefined
      readonly perspective2?: undefined
      readonly specification?: Specification | undefined
      readonly affixes?: readonly Affix[] | undefined
    })

/** A Zod validator matching partial referentials. */
export const zodPartialReferential = /* @__PURE__ */ union([
  /* @__PURE__ */ zodPartialReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ zodPartialReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: zodReferent,
      perspective2: /* @__PURE__ */ zodPerspective.optional(),
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ zodPartialReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: /* @__PURE__ */ zodSpecification.optional(),
      affixes: /* @__PURE__ */ zodAffix.array().optional(),
    }),
  ),
])

/**
 * Converts a referential into Ithkuil.
 * @param referential The referential to convert.
 * @returns Romanized Ithkuilic text representing the referential.
 */
function completeReferentialToIthkuil(referential: Referential) {
  const slot1 = referential.referents
    ? referentListToIthkuil(referential.referents, referential.perspective)
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
        : caseToIthkuil(referential.case2, false, false)
      : referential.essence == "NRM" ||
        countVowelForms(slot1 + slot2 + slot3 + slot4) >= 2
      ? ""
      : "a"

    const word = slot1 + slot2 + slot3 + slot4 + slot5

    return applyReferentialEssence(word, referential.essence)
  }

  if (referential.case2 || referential.perspective2 || referential.referent2) {
    const slot3 =
      "w" +
      WithWYAlternative.of(
        caseToIthkuil(referential.case2 || "THM", false, false),
      ).valueAfterW

    let slot4 = ""

    if (referential.referent2) {
      const referent = referentToIthkuil(referential.referent2, false)

      const perspective = referentialPerspectiveToIthkuil(
        referential.perspective2,
      )

      if (isLegalWordFinalConsonantForm(perspective + referent)) {
        slot4 = perspective + referent
      } else if (isLegalWordFinalConsonantForm(referent + perspective)) {
        slot4 = referent + perspective
      } else if (isLegalConsonantForm(perspective + referent)) {
        slot4 = perspective + referent + "ë"
      } else if (isLegalConsonantForm(referent + perspective)) {
        slot4 = referent + perspective + "ë"
      }

      const perspective2 = referentialPerspectiveToIthkuilAlt(
        referential.perspective2,
      )

      if (isLegalWordFinalConsonantForm(referent + perspective2)) {
        slot4 = referent + perspective2
      } else if (isLegalWordFinalConsonantForm(perspective2 + referent)) {
        slot4 = perspective2 + referent
      } else if (isLegalConsonantForm(referent + perspective2)) {
        slot4 = referent + perspective2 + "ë"
      } else {
        // The following may be phonotactically invalid.
        slot4 = perspective2 + referent + "ë"
      }
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
