import {
  ALL_ASPECTS,
  ALL_CASES,
  ALL_CASES_SKIPPING_DEGREE_8,
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
  EFE,
  IVL,
  LVL,
  MCS,
  PHS,
  VAL,
  caToIthkuil,
  deepFreeze,
  has,
  referentListToPersonalReferenceRoot,
  toAffix,
  type Affix,
  type AffixDegree,
  type AffixType,
  type CaStackingAffix,
  type Case,
  type CaseAccessorAffix,
  type CaseScope,
  type Illocution,
  type Level,
  type Mood,
  type PartialFormative,
  type PlainAffix,
  type ReferentialAffix,
  type Valence,
  type Validation,
} from "../../generate/index.js"
import {
  AnchorX,
  Primary,
  Row,
  Secondary,
  Tertiary,
  textToSecondaries,
  type AdvancedAlphabeticCharacter,
  type BiasCharacter,
  type Mutable,
  type PrimaryCharacter,
  type RegisterCharacter,
  type RowProps,
  type SecondaryCharacter,
  type TertiaryCharacter,
  type TertiarySegmentName,
} from "../index.js"
import { numericAdjunctToNumerals } from "../numerals/from-number.js"
import type { NumeralCharacter } from "../numerals/index.js"
import type { BreakCharacter } from "../other/break.js"
import {
  QUATERNARY_DIACRITIC_MAP,
  Quaternary,
  type QuaternaryCharacter,
  type StandardQuaternaryCharacter,
} from "../quaternary/index.js"

// Throughout this script, Slot XI is used to refer to affixes which have scope
// over the formative as a whole.

/** Information about a generic character. */
export type Character =
  | PrimaryCharacter
  | SecondaryCharacter
  | TertiaryCharacter
  | QuaternaryCharacter
  | BiasCharacter
  | RegisterCharacter
  | NumeralCharacter
  | BreakCharacter
  | AdvancedAlphabeticCharacter

/** A script character paired with its constructor. */
export type ConstructableCharacter<T extends Character = Character> = T & {
  construct(character: T): SVGGElement
  readonly dimmed?: boolean | undefined
  readonly handwritten?: boolean | undefined
}

const isArray = /* @__PURE__ */ (() => Array.isArray)() as (
  arg: unknown,
) => arg is readonly unknown[]

/** An object mapping affix degrees to their corresponding diacritics. */
export const AFFIX_DEGREES = /* @__PURE__ */ deepFreeze(
  /* @__PURE__ */ Object.assign(
    [
      "CURVE_TO_RIGHT",
      "DOT",
      "HORIZ_WITH_BOTTOM_LINE",
      "VERT_WITH_RIGHT_LINE",
      "CURVE_TO_TOP",
      "DIAG_BAR",
      "CURVE_TO_BOTTOM",
      "VERT_WITH_LEFT_LINE",
      "HORIZ_WITH_TOP_LINE",
      "HORIZ_BAR",
    ] as const,
    { ca: "CURVE_TO_LEFT" as const },
  ),
)

/**
 * Converts an affix into script.
 * @param cs The Cs of the affix to be converted.
 * @param degree The degree of the affix.
 * @param type The type of the affix.
 * @param slot The slot the affix is placed in.
 * @param handwritten Whether the outputted characters should be handwritten.
 * @returns An array of `ConstructableCharacter`s.
 */
export function affixToScript(
  cs: string | number | bigint,
  degree: AffixDegree | "ca",
  type: AffixType,
  slot: "v" | "vii" | "xi",
  handwritten?: boolean | undefined,
): ConstructableCharacter<SecondaryCharacter>[] {
  const raw =
    typeof cs == "number" || typeof cs == "bigint" ?
      numericAdjunctToNumerals(cs, handwritten)
    : textToSecondaries(cs, {
        forcePlaceholderCharacters: true,
        handwritten,
      })

  return raw
    .map((secondary) => attachConstructor(secondary, Secondary))
    .map((secondary, index) =>
      index == 0 ?
        {
          ...secondary,
          rotated: slot == "vii",
          superposed:
            type == 2 ? "DOT"
            : type == 3 ? "HORIZ_BAR"
            : undefined,
          right: slot == "xi" ? "DOT" : undefined,
          underposed: AFFIX_DEGREES[degree],
        }
      : secondary,
    )
}

/**
 * Attatches a constructor to a character.
 * @param character The character to attach a constructor to.
 * @param construct The constructor for the character.
 * @returns The original `character`, updated to have a `construct` property.
 */
export function attachConstructor<T extends Character>(
  character: T,
  construct: (character: T) => SVGGElement,
) {
  // @ts-ignore
  ;(character as ConstructableCharacter<T>).construct = construct

  // @ts-ignore
  return character as ConstructableCharacter<T>
}

/** Options that modify how a formative is rendered. */
export interface FormativeToScriptOptions {
  /** Whether the outputted characters should be handwritten. */
  readonly handwritten?: boolean | undefined

  /**
   * If `true`, the final quaternary character of a formative representing a
   * case or an illocution/validation will be replaced by diacritics on the
   * first secondary character, if possible.
   *
   * If `false`, cases and illocutions/validations will not be moved to
   * diacritics.
   *
   * @default true
   */
  readonly useCaseIllValDiacritics?: boolean | undefined
}

/**
 * Converts a formative into script.
 * @param formative The formative to be converted.
 * @param options Options that modify how a formative is rendered.
 * @returns `ConstructableCharacter`s containing data from which the script can
 * be constructed.
 */
export function formativeToScript(
  formative: PartialFormative & {
    /** Additional affixes which apply to the formative as a whole. */
    readonly slotXIAffixes?: readonly Affix[] | undefined
  },
  options: FormativeToScriptOptions,
) {
  const handwritten = !!options.handwritten

  /**
   * Formative layout:
   * 1. Primary
   * 2. Secondary root
   * 3. Slot V affixes
   * 4. Slot VII affixes
   * 5. Slot XI affixes
   * 6. Tertiaries
   * 7. Quaternaries
   */

  const head: ConstructableCharacter[] = []

  head.push({
    construct: Primary,
    specification: formative.specification,

    context: formative.context,

    bottom:
      formative.type == "UNF/C" ?
        formative.concatenationType == "none" ?
          undefined
        : formative.concatenationType
      : formative.type,

    affiliation: formative.ca?.affiliation,
    configuration: formative.ca?.configuration,
    extension: formative.ca?.extension,
    perspective: formative.ca?.perspective,
    essence: formative.ca?.essence,

    function: formative.function,
    version: formative.version,
    stem: formative.stem,

    handwritten,
  })

  let initialCrRoot:
    | Mutable<ConstructableCharacter<SecondaryCharacter>>
    | undefined

  if (typeof formative.root == "number" || typeof formative.root == "bigint") {
    head.push(...numericAdjunctToNumerals(formative.root, handwritten))
  } else if (isArray(formative.root)) {
    const referents = textToSecondaries(
      referentListToPersonalReferenceRoot(formative.root),
      { handwritten, forcePlaceholderCharacters: true },
    ).map((secondary, index) =>
      attachConstructor(
        {
          ...secondary,
          rotated: true,
          superposed: index == 0 ? "DOT" : undefined,
        },
        Secondary,
      ),
    )

    head.push(...referents)
  } else if (typeof formative.root == "object") {
    const { cs, degree } = formative.root

    const raw =
      typeof cs == "number" || typeof cs == "bigint" ?
        numericAdjunctToNumerals(cs, handwritten)
      : textToSecondaries(cs, {
          handwritten,
          forcePlaceholderCharacters: true,
        })

    const affix = raw.map((secondary, index) =>
      attachConstructor(
        {
          ...secondary,
          rotated: true,
          underposed: index == 0 ? AFFIX_DEGREES[degree] : undefined,
        },
        Secondary,
      ),
    )

    head.push(...affix)
  } else {
    const root = textToSecondaries(String(formative.root satisfies string), {
      handwritten,
      forcePlaceholderCharacters: true,
    }).map((secondary) => attachConstructor(secondary, Secondary))

    if (options.useCaseIllValDiacritics !== false) {
      initialCrRoot = root[0]
    }

    head.push(...root)
  }

  // Enough variables? Probably not.

  const v: (PlainAffix | CaStackingAffix | CaseAccessorAffix)[] = []
  const vii: (PlainAffix | CaStackingAffix | CaseAccessorAffix)[] = []
  const xi: (PlainAffix | CaStackingAffix)[] = []

  const valences: Valence[] = []
  const segments: TertiarySegmentName[] = []
  const relativeLevels: Level[] = []
  const absoluteLevels: Level[] = []

  const moods: Exclude<Mood, "FAC">[] = []
  const caseScopes: Exclude<CaseScope, "CCN">[] = []
  const caseOrIvl: (Case | Illocution | Validation)[] = []

  const referents: ReferentialAffix[] = []

  for (const [type, value] of [
    ["v", formative.slotVAffixes],
    ["vii", formative.slotVIIAffixes],
    [
      "vii",
      formative.vn && formative.vn != "MNO" ? [toAffix(formative.vn)] : [],
    ],
    [
      "vii",
      [formative.type == "UNF/K" ? formative.mood : formative.caseScope]
        .filter((x): x is Exclude<typeof x, undefined> => !!x)
        .map(toAffix),
    ],
    [
      "vii",
      [
        formative.type == "UNF/K" ?
          formative.illocutionValidation
        : formative.case,
      ]
        .filter((x): x is Exclude<typeof x, undefined> => !!x)
        .map(toAffix),
    ],
    ["xi", formative.slotXIAffixes],
  ] as const) {
    if (!value) {
      continue
    }

    const group =
      type == "v" ? v
      : type == "xi" ? xi
      : vii

    for (const affix of value) {
      if (!affix) {
        continue
      }

      if (affix.ca) {
        group.push(affix)
        continue
      }

      if (affix.referents) {
        referents.push(affix)
        continue
      }

      if (affix.case) {
        if (affix.type) {
          group.push(affix)
        } else {
          caseOrIvl.push(affix.case)
        }

        continue
      }

      if (affix.cs == VAL && affix.degree != 0 && affix.type == 1) {
        valences.push(ALL_VALENCES[affix.degree - 1]!)
        continue
      }

      if (
        (affix.cs == PHS ||
          affix.cs == EFE ||
          affix.cs == AP1 ||
          affix.cs == AP2 ||
          affix.cs == AP3 ||
          affix.cs == AP4) &&
        affix.degree != 0 &&
        affix.type == 1
      ) {
        segments.push(
          (affix.cs == PHS ? ALL_PHASES
          : affix.cs == EFE ? ALL_EFFECTS
          : affix.cs == AP1 ? ALL_ASPECTS
          : affix.cs == AP2 ? ALL_ASPECTS.slice(9, 18)
          : affix.cs == AP3 ? ALL_ASPECTS.slice(18, 27)
          : ALL_ASPECTS.slice(27, 36))[(affix.degree - 1) % 9]!,
        )

        continue
      }

      if (affix.cs == LVL && affix.degree != 0 && affix.type != 3) {
        ;(affix.type == 2 ? absoluteLevels : relativeLevels).push(
          ALL_LEVELS[affix.degree - (1 % 9)]!,
        )

        continue
      }

      if (affix.cs == MCS && affix.type == 1) {
        if (affix.degree >= 1 && affix.degree <= 5) {
          moods.push(ALL_MOODS[affix.degree]! as Exclude<Mood, "FAC">)
        } else if (affix.degree == 0) {
          caseScopes.push("CCV")
        } else {
          caseScopes.push(
            ALL_CASE_SCOPES[affix.degree - 5]! as Exclude<CaseScope, "CCN">,
          )
        }

        continue
      }

      if (affix.cs == IVL && affix.degree != 0 && affix.type != 3) {
        if (affix.type == 1) {
          caseOrIvl.push(ALL_ILLOCUTIONS[affix.degree - 1]!)
        } else {
          caseOrIvl.push(ALL_VALIDATIONS[affix.degree - 1]!)
        }

        continue
      }

      group.push(affix)
    }
  }

  const tertiaries: ConstructableCharacter<TertiaryCharacter>[] = []

  while (
    valences.length ||
    segments.length ||
    relativeLevels.length ||
    absoluteLevels.length
  ) {
    tertiaries.push({
      construct: Tertiary,
      handwritten,

      absoluteLevel: absoluteLevels.shift(),
      top: segments.shift(),
      valence: valences.shift(),
      bottom: segments.shift(),
      relativeLevel: relativeLevels.shift(),
    })
  }

  const quaternaries: ConstructableCharacter<StandardQuaternaryCharacter>[] = []

  while (moods.length || caseScopes.length || caseOrIvl.length) {
    quaternaries.push({
      construct: Quaternary,
      handwritten,

      caseScope: caseScopes.shift(),
      mood: moods.shift(),
      value: caseOrIvl.shift(),
    })
  }

  const finalQuaternary = quaternaries[quaternaries.length - 1]

  if (
    initialCrRoot &&
    finalQuaternary &&
    !finalQuaternary.caseScope &&
    !finalQuaternary.mood &&
    (formative.type == "UNF/K" ?
      (has(ALL_ILLOCUTIONS, finalQuaternary.value) &&
        finalQuaternary.value != "ASR") ||
      has(ALL_VALIDATIONS, finalQuaternary.value)
    : has(ALL_CASES, finalQuaternary.value))
  ) {
    quaternaries.pop()

    if (has(ALL_ILLOCUTIONS, finalQuaternary.value)) {
      initialCrRoot.superposed =
        QUATERNARY_DIACRITIC_MAP[ALL_ILLOCUTIONS.indexOf(finalQuaternary.value)]
    } else if (has(ALL_VALIDATIONS, finalQuaternary.value)) {
      initialCrRoot.underposed =
        QUATERNARY_DIACRITIC_MAP[ALL_VALIDATIONS.indexOf(finalQuaternary.value)]
    } else {
      const index = ALL_CASES_SKIPPING_DEGREE_8.indexOf(finalQuaternary.value)

      initialCrRoot.superposed = QUATERNARY_DIACRITIC_MAP[Math.floor(index / 9)]

      initialCrRoot.underposed = QUATERNARY_DIACRITIC_MAP[index % 9]
    }
  }

  const affixes: ConstructableCharacter<
    SecondaryCharacter | QuaternaryCharacter
  >[] = (
    [
      [v, "v"],
      [vii, "vii"],
      [xi, "xi"],
    ] as const
  ).flatMap(([affixes, type]) =>
    affixes.flatMap((affix) => {
      if (affix.ca) {
        return affixToScript(caToIthkuil(affix.ca), "ca", 1, type, handwritten)
      }

      if (affix.case) {
        return {
          construct: Quaternary,
          handwritten,
          type: affix.type,
          value: affix.case,
          isInverse: affix.isInverse,
          isSlotVIIAffix: type == "vii",
        }
      }

      return affixToScript(
        affix.cs,
        affix.degree,
        affix.type,
        type,
        handwritten,
      )
    }),
  )

  const referentCharacters: ConstructableCharacter[] = referents.flatMap(
    ({ referents, case: case_, perspective }) => {
      if (perspective == "G" || perspective == "N") {
        return formativeToScript(
          {
            type: "UNF/C",
            root: referents,
            ca: { perspective },
            case: case_,
          },
          options,
        )
      }

      return [
        {
          construct: Quaternary,
          value: case_,
          handwritten,
        } satisfies ConstructableCharacter<QuaternaryCharacter>,
        ...textToSecondaries(referentListToPersonalReferenceRoot(referents), {
          handwritten,
          forcePlaceholderCharacters: true,
        }).map((secondary, index) =>
          attachConstructor(
            { ...secondary, superposed: index == 0 ? "HORIZ_BAR" : undefined },
            Secondary,
          ),
        ),
      ]
    },
  )

  return head.concat(affixes, tertiaries, quaternaries, referentCharacters)
}

/**
 * Creates a series of characters from `ConstructableCharacter`s.
 * @param props Properties defining this character row.
 * @returns A series of characters.
 */
export function CharacterRow(
  props: Omit<RowProps, "children"> & {
    /** The characters to be constructed. */
    readonly children: ConstructableCharacter[]
  },
): SVGElement {
  return AnchorX({
    at: "l",
    children: Row({
      ...props,
      children: props.children.map((character) => {
        const node = character.construct(character as any)

        if (character.dimmed) {
          if (character.handwritten) {
            node.setAttribute("stroke", "#808080")
          } else {
            node.setAttribute("fill", "#808080")
          }
        }

        return node
      }),
    }),
  })
}
