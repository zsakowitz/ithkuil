import {
  ALL_ASPECTS,
  ALL_CASES,
  ALL_CASES_SKIPPING_DEGREE_8,
  ALL_EFFECTS,
  ALL_ILLOCUTIONS,
  ALL_LEVELS,
  ALL_PHASES,
  ALL_VALENCES,
  ALL_VALIDATIONS,
  caToIthkuil,
  deepFreeze,
  has,
  referentListToPersonalReferenceRoot,
  referentialAffixToIthkuil,
  type AffixDegree,
  type AffixType,
  type CaseScope,
  type Level,
  type Mood,
  type PartialFormative,
  type ReferentList,
  type Valence,
} from "../../index.js"
import {
  AnchorX,
  Primary,
  Row,
  Secondary,
  textToSecondaries,
  type PrimaryCharacter,
  type RowProps,
  type SecondaryCharacter,
  type TertiaryCharacter,
  type TertiarySegmentName,
} from "../index.js"
import {
  DIACRITIC_MAP,
  Quaternary,
  type CaseAccessorQuaternaryCharacter,
  type QuaternaryCharacter,
  type StandardQuaternaryCharacter,
} from "../quaternary/index.js"
import { AP1, AP2, AP3, AP4, EFE, IVL, LVL, MCS, PHS, VAL } from "./affixes.js"

/** Information about a generic character. */
export type Character =
  | PrimaryCharacter
  | SecondaryCharacter
  | TertiaryCharacter
  | QuaternaryCharacter

/** A script character paired with its constructor. */
export type ConstructableCharacter<T extends Character = Character> =
  T extends infer U ? U & { construct(character: U): SVGGElement } : never

const isArray = /* @__PURE__ */ (() => Array.isArray)() as (
  arg: unknown,
) => arg is readonly unknown[]

/** An object mapping affix degrees to their corresponding diacritics. */
export const AFFIX_DEGREES = deepFreeze(
  Object.assign(
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
 * @param rotated Whether the affix is rotated?
 * @param hasScopeOverEntireFormative Whether the affix has scope over the
 * formative as a whole, including tertiary and quaternary characters.
 * @returns An array of `ConstructableCharacter`s.
 */
export function affixToScript(
  cs: string,
  degree: AffixDegree | "ca",
  type: AffixType,
  rotated: boolean,
  hasScopeOverEntireFormative?: boolean,
): ConstructableCharacter[] {
  return textToSecondaries(cs, {
    forcePlaceholderCharacters: true,
  })
    .map((secondary) => attachConstructor(secondary, Secondary))
    .map((secondary, index) =>
      index == 0
        ? {
            ...secondary,
            rotated,
            superposed: type == 2 ? "DOT" : type == 3 ? "HORIZ_BAR" : undefined,
            right: hasScopeOverEntireFormative ? "DOT" : undefined,
            underposed: AFFIX_DEGREES[degree],
          }
        : secondary,
    )
}

function attachConstructor<T extends Character>(
  character: T,
  construct: (character: T) => SVGGElement,
) {
  // @ts-ignore
  ;(character as ConstructableCharacter<T>).construct = construct

  // @ts-ignore
  return character as ConstructableCharacter<T>
}

/**
 * Converts a formative into script.
 * @param formative The formative to be converted.
 * @returns `ConstructableCharacter`s containing data from which the script can
 * be constructed.
 */
export function formativeToScript(
  formative: PartialFormative,
): ConstructableCharacter[] {
  let initialCrRoot: ConstructableCharacter<SecondaryCharacter> | undefined

  const output: ConstructableCharacter[] = []
  const slotVAffixes: ConstructableCharacter<SecondaryCharacter>[] = []

  output.push({
    construct: Primary,

    specification: formative.specification,

    context: formative.context,

    bottom:
      formative.type == "UNF/C"
        ? formative.concatenationType == "none"
          ? undefined
          : formative.concatenationType
        : formative.type,

    ...formative.ca,

    function: formative.function,
    version: formative.version,
    stem: formative.stem,
  })

  if (isArray(formative.root)) {
    output.push(
      ...textToSecondaries(
        referentListToPersonalReferenceRoot(formative.root as ReferentList),
        { forcePlaceholderCharacters: true },
      ).map((x, i) => {
        ;(x as ConstructableCharacter<SecondaryCharacter>).construct = Secondary

        // @ts-expect-error: It's okay to mutate here because we own the object.
        x.rotated = i == 0

        // @ts-expect-error: It's okay to mutate here because we own the object.
        x.superposed = i == 0 ? "DOT" : undefined

        return x as ConstructableCharacter<SecondaryCharacter>
      }),
    )
  } else if (typeof formative.root == "object") {
    output.push(
      ...affixToScript(
        formative.root.cs,
        formative.root.degree,
        1,
        true,
        false,
      ),
    )
  } else {
    const secondaries = textToSecondaries(formative.root, {
      forcePlaceholderCharacters: true,
    }).map((x) => attachConstructor(x, Secondary))

    initialCrRoot = secondaries[0]

    output.push(...secondaries)
  }

  const absoluteLevels: Level[] = []
  const relativeLevels: Level[] = []
  const valences: Valence[] = []
  const modulars: TertiarySegmentName[] = []
  const moods: [mood: Mood, isSlotVII: boolean][] = []
  const caseScopes: [caseScope: CaseScope, isSlotVII: boolean][] = []

  const caseAccessors: ConstructableCharacter<CaseAccessorQuaternaryCharacter>[] =
    []

  const nonAccessorQuaternaries: ConstructableCharacter<StandardQuaternaryCharacter>[] =
    []

  const referents: ConstructableCharacter[] = []

  for (const [isSlotVII, affixes] of [
    [false, formative.slotVAffixes || []],
    [true, formative.slotVIIAffixes || []],
  ] as const) {
    for (const affix of affixes) {
      if (affix.ca) {
        const affixGroup = isSlotVII ? slotVAffixes : output

        affixGroup.push(
          ...affixToScript(caToIthkuil(affix.ca), "ca", 1, isSlotVII),
        )
      } else if (affix.referent) {
        referents.push({
          construct: Quaternary,
          value: affix.case,
        })

        referents.push(
          ...textToSecondaries(
            referentialAffixToIthkuil(affix.referent, affix.perspective || "M"),
            { forcePlaceholderCharacters: true },
          ).map((x) => attachConstructor(x, Secondary)),
        )

        affix.case
        // TODO: waiting on quaternaries
      } else if (affix.case) {
        if (affix.type) {
          caseAccessors.push({
            construct: Quaternary,
            value: affix.case,
            type: affix.type,
            isInverse: affix.isInverse,
            isSlotVIIAffix: isSlotVII,
          })
        } else {
          nonAccessorQuaternaries.push({
            construct: Quaternary,
            value: affix.case,
          })
        }
      } else {
        if (affix.cs == VAL && affix.type == 1 && affix.degree != 0) {
          valences.push(ALL_VALENCES[affix.degree - 1] || "MNO")
        } else if (affix.cs == PHS && affix.type == 1 && affix.degree != 0) {
          modulars.push(ALL_PHASES[affix.degree - 1] || "PUN")
        } else if (affix.cs == EFE && affix.type == 1 && affix.degree != 0) {
          modulars.push(ALL_EFFECTS[affix.degree - 1] || "UNK")
        } else if (affix.cs == LVL && affix.type != 3 && affix.degree != 0) {
          const levelGroup = affix.type == 1 ? relativeLevels : absoluteLevels

          levelGroup.push(ALL_LEVELS[affix.degree - 1] || "EQU")
        } else if (
          (affix.cs == AP1 ||
            affix.cs == AP2 ||
            affix.cs == AP3 ||
            affix.cs == AP4) &&
          affix.type == 1 &&
          affix.degree != 0
        ) {
          const index =
            9 * [AP1, AP2, AP3, AP4].indexOf(affix.cs) + affix.degree - 1

          modulars.push(ALL_ASPECTS[index] || "RTR")
        } else if (affix.cs == MCS && affix.type == 1) {
          if (affix.degree == 0) {
            caseScopes.push(["CCV", isSlotVII])
          } else if (affix.degree <= 5) {
            moods.push([
              (["SUB", "ASM", "SPC", "COU", "HYP"] as const)[
                (affix.degree - 1) as 0 | 1 | 2 | 3 | 4
              ]!,
              isSlotVII,
            ])
          } else {
            caseScopes.push([
              (["CCA", "CCS", "CCQ", "CCP"] as const)[
                (affix.degree - 6) as 0 | 1 | 2 | 3
              ]!,
              isSlotVII,
            ])
          }
        } else if (affix.cs == IVL && affix.type != 3 && affix.degree != 0) {
          nonAccessorQuaternaries.push({
            construct: Quaternary,
            value:
              affix.type == 1
                ? ALL_ILLOCUTIONS[affix.degree]!
                : ALL_VALIDATIONS[affix.degree]!,
          })
        } else {
          const affixGroup = isSlotVII ? slotVAffixes : output

          affixGroup.push(
            ...affixToScript(affix.cs, affix.degree, affix.type, isSlotVII),
          )
        }
      }
    }
  }

  if (formative.vn && formative.vn != "MNO") {
    if (has(ALL_LEVELS, formative.vn)) {
      relativeLevels.push(formative.vn)
    } else if (has(ALL_VALENCES, formative.vn)) {
      valences.push(formative.vn)
    } else {
      modulars.push(formative.vn)
    }
  }

  let extraQuaternary:
    | ConstructableCharacter<StandardQuaternaryCharacter>
    | undefined

  if (formative.type == "UNF/K") {
    if (
      formative.illocutionValidation &&
      formative.illocutionValidation != "OBS"
    ) {
      nonAccessorQuaternaries.push({
        construct: Quaternary,
        value: formative.illocutionValidation,
      })
    }

    if (formative.mood && formative.mood != "FAC") {
      moods.push([formative.mood, true])
    } else {
      extraQuaternary = { construct: Quaternary }
    }
  } else {
    if (formative.case && formative.case != "THM") {
      nonAccessorQuaternaries.push({
        construct: Quaternary,
        value: formative.case,
      })
    } else {
      extraQuaternary = { construct: Quaternary }
    }

    if (formative.caseScope && formative.caseScope != "CCN") {
      caseScopes.push([formative.caseScope, true])
    }
  }

  for (let index = 0; index < moods.length; index++) {
    const mood = moods[index]!

    if (mood[0] != "FAC") {
      if (extraQuaternary && index == nonAccessorQuaternaries.length) {
        nonAccessorQuaternaries.push(extraQuaternary)

        // @ts-expect-error: We can mutate here because we own the object.
        extraQuaternary.mood = mood[0]
      } else if (index < nonAccessorQuaternaries.length) {
        // @ts-expect-error: We can mutate here because we own the object.
        nonAccessorQuaternaries[index]!.mood = mood[0]
      } else {
        // TODO: Place mood as affix
      }
    }
  }

  for (let index = 0; index < caseScopes.length; index++) {
    const caseScope = caseScopes[index]!

    if (caseScope[0] != "CCN") {
      if (extraQuaternary && index == nonAccessorQuaternaries.length) {
        nonAccessorQuaternaries.push(extraQuaternary)

        // @ts-expect-error: We can mutate here because we own the object.
        extraQuaternary.caseScope = caseScope[0]
      } else if (index < nonAccessorQuaternaries.length) {
        // @ts-expect-error: We can mutate here because we own the object.
        nonAccessorQuaternaries[index]!.caseScope = caseScope[0]
      } else {
        // TODO: Place case-scope as affix
      }
    }
  }

  if (initialCrRoot) {
    const finalQuaternary = nonAccessorQuaternaries.pop()

    if (
      finalQuaternary &&
      finalQuaternary.value &&
      (!finalQuaternary.mood || finalQuaternary.mood == "FAC") &&
      (!finalQuaternary.caseScope || finalQuaternary.caseScope == "CCN")
    ) {
      if (formative.type != "UNF/K" && has(ALL_CASES, finalQuaternary.value)) {
        const index = ALL_CASES_SKIPPING_DEGREE_8.indexOf(finalQuaternary.value)

        // @ts-expect-error: We can mutate here because we own `initialCrRoot`.
        initialCrRoot.superposed = DIACRITIC_MAP[Math.floor(index / 9)]

        // @ts-expect-error: We can mutate here because we own `initialCrRoot`.
        initialCrRoot.underposed = DIACRITIC_MAP[index % 9]
      } else if (
        formative.type == "UNF/K" &&
        has(ALL_ILLOCUTIONS, finalQuaternary.value)
      ) {
        const index = ALL_ILLOCUTIONS.indexOf(finalQuaternary.value)

        // @ts-expect-error: We can mutate here because we own `initialCrRoot`.
        initialCrRoot.superposed = DIACRITIC_MAP[index]
      } else if (
        formative.type == "UNF/K" &&
        has(ALL_VALIDATIONS, finalQuaternary.value)
      ) {
        const index = ALL_VALIDATIONS.indexOf(finalQuaternary.value)

        // @ts-expect-error: We can mutate here because we own `initialCrRoot`.
        initialCrRoot.underposed = DIACRITIC_MAP[index]
      } else {
        nonAccessorQuaternaries.push(finalQuaternary)
      }
    } else if (finalQuaternary) {
      nonAccessorQuaternaries.push(finalQuaternary)
    }
  }

  // TODO: Detect modular affixes and place moods and case-scopes as affixes

  return output.concat(caseAccessors, nonAccessorQuaternaries, referents)
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
) {
  return AnchorX({
    at: "l",
    children: Row({
      ...props,
      children: props.children.map((x) => x.construct(x as any)),
    }),
  })
}
