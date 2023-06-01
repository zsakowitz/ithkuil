import { literal, object, union } from "zod"
import type { Affix } from "../affix/index.js"
import { zodPartialCA, type CA, type PartialCA } from "../ca/index.js"
import { deepFreeze } from "../helpers/deep-freeze.js"
import { applyStress, countVowelForms } from "../helpers/stress.js"
import { WithWYAlternative } from "../helpers/with-wy-alternative.js"
import { ZERO_INDEXED_STANDARD_VOWEL_TABLE } from "../index.js"
import { referentListToPersonalReferenceRoot } from "../referential/index.js"
import { fillInDefaultFormativeSlots } from "./default.js"
import { zodShortcutType, type ShortcutType } from "./shortcut-type.js"
import {
  slotIToIthkuil,
  zodConcatenationType,
  type ConcatenationType,
} from "./slot-1/index.js"
import { applySlotXStress } from "./slot-10/index.js"
import {
  SLOT_II_SHORTCUT_MAP,
  slotIIToIthkuil,
  zodStem,
  zodVersion,
  type Stem,
  type Version,
} from "./slot-2/index.js"
import { zodSlotIII, type SlotIII } from "./slot-3/index.js"
import {
  slotIVToIthkuil,
  zodContext,
  zodFunction,
  zodSpecification,
  type Context,
  type Function,
  type Specification,
} from "./slot-4/index.js"
import { slotVToIthkuil, zodSlotV } from "./slot-5/index.js"
import { slotVIToIthkuil, zodSlotVI } from "./slot-6/index.js"
import { slotVIIToIthkuil, zodSlotVII } from "./slot-7/index.js"
import {
  slotVIIIToIthkuil,
  zodCaseScope,
  zodMood,
  zodVn,
  type Aspect,
  type CaseScope,
  type Effect,
  type Level,
  type Mood,
  type Phase,
  type Valence,
} from "./slot-8/index.js"
import {
  ALL_CASES,
  slotIXToIthkuil,
  zodCase,
  zodIllocutionOrValidation,
  type Case,
  type IllocutionOrValidation,
} from "./slot-9/index.js"

export * from "./default.js"
export * from "./shortcut-type.js"
export * from "./slot-1/index.js"
export * from "./slot-10/index.js"
export * from "./slot-2/index.js"
export * from "./slot-3/index.js"
export * from "./slot-4/index.js"
export * from "./slot-5/index.js"
export * from "./slot-6/index.js"
export * from "./slot-7/index.js"
export * from "./slot-8/index.js"
export * from "./slot-9/index.js"

/** The core structure shared between all formatives. */
export type CoreFormative = {
  /** The version of the formative. */
  readonly version: Version

  /** The stem of the formative. */
  readonly stem: Stem

  /** The root of the formative. */
  readonly root: SlotIII

  /** The function of the formative. */
  readonly function: Function

  /** The specification of the formative. */
  readonly specification: Specification

  /** The context of the formative. */
  readonly context: Context

  /** The Slot V affixes of the formative. */
  readonly slotVAffixes: readonly Affix[]

  /** The Ca affix complex of the formative. */
  readonly ca: CA

  /** The Slot VII affixes of the formative. */
  readonly slotVIIAffixes: readonly Affix[]

  /** The Vn slot of the formative. */
  readonly vn: Valence | Aspect | Phase | Level | Effect

  /** Whether to use a+Ca and Slot VII shortcuts. */
  readonly shortcut: ShortcutType
}

/** A Zod validator matching {@link CoreFormative}s. */
export const zodCoreFormative = /* @__PURE__ */ object({
  version: zodVersion,
  stem: zodStem,
  root: zodSlotIII,
  function: zodFunction,
  specification: zodSpecification,
  context: zodContext,
  slotVAffixes: zodSlotV,
  ca: zodSlotVI,
  slotVIIAffixes: zodSlotVII,
  vn: zodVn,
  shortcut: zodShortcutType,
})

/**
 * The core structure shared between all formatives, with all optional slots
 * properly marked as optional.
 *
 * Note that the `type` and `root` properties are still required, and the `ca`
 * property is also partial. For these reasons, use `PartialFormative` instead
 * of `Partial<Formative>`, as the latter gives improper results.
 */
export type PartialCoreFormative = {
  /** The version of the formative. */
  readonly version?: Version | undefined

  /** The stem of the formative. */
  readonly stem?: Stem | undefined

  /** The root of the formative. */
  readonly root: SlotIII

  /** The function of the formative. */
  readonly function?: Function | undefined

  /** The specification of the formative. */
  readonly specification?: Specification | undefined

  /** The context of the formative. */
  readonly context?: Context | undefined

  /** The Slot V affixes of the formative. */
  readonly slotVAffixes?: readonly Affix[] | undefined

  /** The Ca affix complex of the formative. */
  readonly ca?: PartialCA | undefined

  /** The Slot VII affixes of the formative. */
  readonly slotVIIAffixes?: readonly Affix[] | undefined

  /** The Vn slot of the formative. */
  readonly vn?: Valence | Aspect | Phase | Level | Effect | undefined

  /** Whether to use a+Ca and Slot VII shortcuts. */
  readonly shortcut?: ShortcutType
}

/** A Zod validator matching {@link PartialCoreFormative}s. */
export const zodPartialCoreFormative = /* @__PURE__ */ object({
  version: /* @__PURE__ */ zodVersion.optional(),
  stem: /* @__PURE__ */ zodStem.optional(),
  root: zodSlotIII,
  function: /* @__PURE__ */ zodFunction.optional(),
  specification: /* @__PURE__ */ zodSpecification.optional(),
  context: /* @__PURE__ */ zodContext.optional(),
  slotVAffixes: /* @__PURE__ */ zodSlotV.optional(),
  ca: zodPartialCA,
  slotVIIAffixes: /* @__PURE__ */ zodSlotVII.optional(),
  vn: /* @__PURE__ */ zodVn.optional(),
  shortcut: /* @__PURE__ */ zodShortcutType.optional(),
})

/** A nominal formative. */
export type NominalFormative = CoreFormative & {
  /** The type of the formative. */
  readonly type: "UNF/C"

  /** The concatenation type of the formative. */
  readonly concatenatenationType: ConcatenationType

  /** The case-scope of the formative. */
  readonly caseScope: CaseScope

  /** The case of the formative. */
  readonly case: Case
}

/** A Zod validator matching nominal formatives. */
export const zodNominalFormative = /* @__PURE__ */ zodCoreFormative.extend({
  type: /* @__PURE__ */ literal("UNF/C"),
  concatenationType: zodConcatenationType,
  caseScope: zodCaseScope,
  case: zodCase,
})

/**
 * A nominal formative, with all optional slots properly marked as optional.
 *
 * Note that the `type` and `root` properties are still required, and the `ca`
 * property is also partial. For these reasons, use `PartialFormative` instead
 * of `Partial<Formative>`, as the latter gives improper results.
 */
export type PartialNominalFormative = PartialCoreFormative & {
  /** The type of the formative. */
  readonly type: "UNF/C"

  /** The concatenation type of the formative. */
  readonly concatenatenationType?: ConcatenationType | undefined

  /** The case-scope of the formative. */
  readonly caseScope?: CaseScope | undefined

  /** The case of the formative. */
  readonly case?: Case | undefined
}

/** A Zod validator matching partial nominal formatives. */
export const zodPartialNominalFormative =
  /* @__PURE__ */ zodPartialCoreFormative.extend({
    type: /* @__PURE__ */ literal("UNF/C"),
    concatenationType: /* @__PURE__ */ zodConcatenationType.optional(),
    caseScope: /* @__PURE__ */ zodCaseScope.optional(),
    case: /* @__PURE__ */ zodCase.optional(),
  })

/** An unframed verbal formative. */
export type UnframedVerbalFormative = CoreFormative & {
  /** The type of the formative. */
  readonly type: "UNF/K"

  /** The mood of the formative. */
  readonly mood: Mood

  /** The illocution+validation of the formative. */
  readonly illocutionValidation: IllocutionOrValidation
}

/** A Zod validator matching unframed verbal formatives. */
export const zodUnframedVerbalFormative =
  /* @__PURE__ */ zodCoreFormative.extend({
    type: /* @__PURE__ */ literal("UNF/K"),
    mood: zodMood,
    illocutionValidation: zodIllocutionOrValidation,
  })

/**
 * An unframed verbal formative, with all optional slots properly marked as
 * optional.
 *
 * Note that the `type` and `root` properties are still required, and the `ca`
 * property is also partial. For these reasons, use `PartialFormative` instead
 * of `Partial<Formative>`, as the latter gives improper results.
 */
export type PartialUnframedVerbalFormative = PartialCoreFormative & {
  /** The type of the formative. */
  readonly type: "UNF/K"

  /** The mood of the formative. */
  readonly mood?: Mood | undefined

  /** The illocution+validation of the formative. */
  readonly illocutionValidation?: IllocutionOrValidation | undefined
}

/** A Zod validator matching partial unframed verbal formatives. */
export const zodPartialUnframedVerbalFormative =
  /* @__PURE__ */ zodPartialCoreFormative.extend({
    type: /* @__PURE__ */ literal("UNF/K"),
    mood: /* @__PURE__ */ zodMood.optional(),
    illocutionValidation: /* @__PURE__ */ zodIllocutionOrValidation.optional(),
  })

/** A framed verbal formative. */
export type FramedVerbalFormative = CoreFormative & {
  /** The type of the formative. */
  readonly type: "FRM"

  /** The case-scope of the formative. */
  readonly caseScope: CaseScope

  /** The case of the formative. */
  readonly case: Case
}

/** A Zod validator matching framed verbal formatives. */
export const zodFramedVerbalFormative = /* @__PURE__ */ zodCoreFormative.extend(
  {
    type: /* @__PURE__ */ literal("FRM"),
    caseScope: zodCaseScope,
    case: zodCase,
  },
)

/**
 * A framed verbal formative, with all optional slots properly marked as
 * optional.
 *
 * Note that the `type` and `root` properties are still required, and the `ca`
 * property is also partial. For these reasons, use `PartialFormative` instead
 * of `Partial<Formative>`, as the latter gives improper results.
 */
export type PartialFramedVerbalFormative = PartialCoreFormative & {
  /** The type of the formative. */
  readonly type: "FRM"

  /** The case-scope of the formative. */
  readonly caseScope?: CaseScope | undefined

  /** The case of the formative. */
  readonly case?: Case | undefined
}

/** A Zod validator matching partial framed verbal formatives. */
export const zodPartialFramedVerbalFormative =
  /* @__PURE__ */ zodPartialCoreFormative.extend({
    type: /* @__PURE__ */ literal("FRM"),
    caseScope: /* @__PURE__ */ zodCaseScope.optional(),
    case: /* @__PURE__ */ zodCase.optional(),
  })

/** A formative. */
export type Formative =
  | NominalFormative
  | UnframedVerbalFormative
  | FramedVerbalFormative

/** A Zod validator matching formatives. */
export const zodFormative = /* @__PURE__ */ union([
  zodNominalFormative,
  zodUnframedVerbalFormative,
  zodFramedVerbalFormative,
])

/**
 * A formative, with all optional slots properly marked as optional.
 *
 * Note that the `type` and `root` properties are still required, and the `ca`
 * property is also partial. For these reasons, use `PartialFormative` instead
 * of `Partial<Formative>`, as the latter gives improper results.
 */
export type PartialFormative =
  | PartialNominalFormative
  | PartialUnframedVerbalFormative
  | PartialFramedVerbalFormative

/** A Zod validator matching partial formatives. */
export const zodPartialFormative = /* @__PURE__ */ union([
  zodPartialNominalFormative,
  zodPartialUnframedVerbalFormative,
  zodPartialFramedVerbalFormative,
])

/** An object mapping from formative types to their names. */
export const FORMATIVE_TYPE_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  "UNF/C": "Nominal",
  "UNF/K": "Unframed Verbal",
  FRM: "Framed Verbal",
})

const isArray = /* @__PURE__ */ (() => Array.isArray)() as (
  arg: unknown,
) => arg is readonly unknown[]

/**
 * Converts a formative into Ithkuil.
 * @param formative The formative to be converted.
 * @returns Romanized Ithkuilic text representing the formative.
 */
function completeFormativeToIthkuil(formative: Formative) {
  const slot3 =
    typeof formative.root == "string"
      ? formative.root
      : isArray(formative.root)
      ? referentListToPersonalReferenceRoot(formative.root)
      : formative.root.cs

  let slot4 = slotIVToIthkuil(formative, {
    slotIII: slot3,
    affixualFormativeDegree:
      typeof formative.root == "object" && !isArray(formative.root)
        ? formative.root.degree
        : undefined,
  })

  let slot6 = slotVIToIthkuil(formative.ca, {
    isSlotVFilled: formative.slotVAffixes.length > 0,
  })

  let slot1 = slotIToIthkuil({
    concatenationType:
      formative.type == "UNF/C" ? formative.concatenatenationType : "none",
    caShortcutType: "none",
  })

  let slot2 = slotIIToIthkuil(formative, {
    slotI: slot1,
    slotIII: formative.root,
    function: formative.function,
    doesSlotVHaveAtLeastTwoAffixes: formative.slotVAffixes.length >= 2,
  })

  const slotVIIAffixes = formative.slotVIIAffixes.slice()

  let didVIIShortcut = false

  if (
    slotVIIAffixes.length != 0 &&
    (formative.shortcut === true || formative.shortcut === "VII")
  ) {
    const finalSlotVIIAffix = slotVIIAffixes.pop()!

    const shortcut =
      finalSlotVIIAffix &&
      "cs" in finalSlotVIIAffix &&
      finalSlotVIIAffix.type == 1
        ? finalSlotVIIAffix.cs == "r" && finalSlotVIIAffix.degree == 4
          ? 1
          : finalSlotVIIAffix.cs == "t"
          ? finalSlotVIIAffix.degree == 4
            ? 2
            : finalSlotVIIAffix.degree == 5
            ? 3
            : null
          : null
        : null

    if (shortcut) {
      const slotII =
        ZERO_INDEXED_STANDARD_VOWEL_TABLE[shortcut][
          SLOT_II_SHORTCUT_MAP[formative.stem][formative.version]
        ]

      slot2 = WithWYAlternative.of(slotII).withPreviousText(slot1)

      didVIIShortcut = true
    } else {
      slotVIIAffixes.push(finalSlotVIIAffix)
    }
  }

  if (
    !didVIIShortcut &&
    (formative.shortcut === true || formative.shortcut === "IV/VI") &&
    typeof formative.root == "string" &&
    formative.specification == "BSC" &&
    formative.context == "EXS" &&
    formative.function == "STA" &&
    formative.ca.configuration == "UPX" &&
    formative.ca.affiliation == "CSL"
  ) {
    const { extension, perspective, essence } = formative.ca

    const shortcut =
      essence == "RPV"
        ? perspective == "M" && extension == "DEL"
          ? 1 // RPV
          : perspective == "G" && extension == "DEL"
          ? 3 // G / RPV
          : perspective == "M" && extension == "PRX"
          ? 3 // PRX / RPV
          : null
        : perspective == "M" && extension == "PRX"
        ? 0 // PRX
        : extension == "DEL"
        ? {
            M: 0 as const,
            G: 1 as const,
            N: 2 as const,
            A: 2 as const,
          }[perspective]
        : null

    const shortcutType =
      essence == "RPV"
        ? perspective == "M" && extension == "DEL"
          ? "y" // RPV
          : perspective == "G" && extension == "DEL"
          ? "y" // G / RPV
          : perspective == "M" && extension == "PRX"
          ? "y" // PRX / RPV
          : null
        : perspective == "M" && extension == "PRX"
        ? "y" // PRX
        : extension == "DEL"
        ? {
            M: "w" as const,
            G: "w" as const,
            N: "w" as const,
            A: "y" as const,
          }[perspective]
        : null

    if (shortcut != null) {
      slot1 = slotIToIthkuil({
        concatenationType:
          formative.type == "UNF/C" ? formative.concatenatenationType : "none",
        caShortcutType: shortcutType!,
      })

      let slotII = WithWYAlternative.of(
        ZERO_INDEXED_STANDARD_VOWEL_TABLE[shortcut][
          SLOT_II_SHORTCUT_MAP[formative.stem][formative.version]
        ],
      )

      if (formative.slotVAffixes.length >= 2) {
        slotII = slotII.insertGlottalStop(false)
      }

      slot2 = slotII.withPreviousText(slot1)

      slot4 = ""

      slot6 = ""
    }
  }

  const slot5 = slotVToIthkuil(formative.slotVAffixes, {
    isAtEndOfWord: false,
    isSlotVIElided: slot6 == "",
  }).withPreviousText(slot3 + slot4)

  const slot7 = slotVIIToIthkuil(slotVIIAffixes)

  // Nominal formatives
  if (formative.type == "UNF/C") {
    const slot8 = slotVIIIToIthkuil(
      {
        vn: formative.vn,
        cn: formative.caseScope,
      },
      {
        omitDefaultValence: true,
      },
    ).withPreviousText(slot3 + slot4 + slot5 + slot6 + slot7)

    const slot9 = WithWYAlternative.of(
      slotIXToIthkuil(formative.case, {
        elideIfPossible:
          !slot8 &&
          slot6 != "" &&
          countVowelForms(
            slot1 + slot2 + slot3 + slot4 + slot5 + slot6 + slot7 + slot8,
          ) >= 2,
        isPartOfConcatenatedFormative:
          formative.concatenatenationType != "none",
      }),
    ).withPreviousText(slot3 + slot4 + slot5 + slot6 + slot7 + slot8)

    const word =
      slot1 + slot2 + slot3 + slot4 + slot5 + slot6 + slot7 + slot8 + slot9

    if (formative.concatenatenationType == "none") {
      return applySlotXStress(word, "UNF/C")
    }

    if (ALL_CASES.indexOf(formative.case) >= 36) {
      return applyStress(word, -1)
    } else {
      return word
    }
  }

  // Unframed verbal formatives
  if (formative.type == "UNF/K") {
    const slot8 = slotVIIIToIthkuil(
      {
        vn: formative.vn,
        cn: formative.mood,
      },
      {
        omitDefaultValence: true,
      },
    ).withPreviousText(slot3 + slot4 + slot5 + slot6 + slot7)

    const slot9 = WithWYAlternative.of(
      slotIXToIthkuil(formative.illocutionValidation, {
        elideIfPossible: slot6.length == 1 && !slot8,
        isPartOfConcatenatedFormative: false,
      }),
    ).withPreviousText(slot3 + slot4 + slot5 + slot6 + slot7 + slot8)

    const word =
      slot1 + slot2 + slot3 + slot4 + slot5 + slot6 + slot7 + slot8 + slot9

    return applySlotXStress(word, "UNF/K")
  }

  // Framed verbal formatives
  if (formative.type == "FRM") {
    const slot8 = slotVIIIToIthkuil(
      {
        vn: formative.vn,
        cn: formative.caseScope,
      },
      {
        omitDefaultValence:
          countVowelForms(
            slot1 + slot2 + slot3 + slot4 + slot5 + slot6 + slot7,
          ) >= 2,
      },
    ).withPreviousText(slot3 + slot4 + slot5 + slot6 + slot7)

    const slot9 = WithWYAlternative.of(
      slotIXToIthkuil(formative.case, {
        elideIfPossible:
          !slot8 &&
          countVowelForms(
            slot1 + slot2 + slot3 + slot4 + slot5 + slot6 + slot7 + slot8,
          ) >= 3,
        isPartOfConcatenatedFormative: false,
      }),
    ).withPreviousText(slot3 + slot4 + slot5 + slot6 + slot7 + slot8)

    const word =
      slot1 + slot2 + slot3 + slot4 + slot5 + slot6 + slot7 + slot8 + slot9

    return applySlotXStress(word, "FRM")
  }

  throw new Error("Unknown formative type '" + (formative as any)?.type + "'.")
}

/**
 * Converts a formative into Ithkuil.
 * @param formative The formative to be converted.
 * @returns Romanized Ithkuilic text representing the formative.
 */
export function formativeToIthkuil(formative: PartialFormative): string {
  return completeFormativeToIthkuil(fillInDefaultFormativeSlots(formative))
}
