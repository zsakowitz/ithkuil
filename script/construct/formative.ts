import {
  caToIthkuil,
  deepFreeze,
  referentListToPersonalReferenceRoot,
  type AffixDegree,
  type AffixType,
  type PartialFormative,
  type ReferentList,
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
  debug,
} from "../index.js"

/** A script character paired with its constructor. */
export type ConstructableCharacter =
  | ({ readonly constructor: typeof Primary } & PrimaryCharacter)
  | ({ readonly constructor: typeof Secondary } & SecondaryCharacter)

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
    .map((secondary) => ({
      constructor: Secondary,
      ...secondary,
    }))
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

/**
 * Converts a formative into script.
 * @param formative The formative to be converted.
 * @returns `ConstructableCharacter`s containing data from which the script can
 * be constructed.
 */
export function formativeToScript(formative: PartialFormative) {
  debug(JSON.stringify(formative, undefined, 2))

  const output: ConstructableCharacter[] = []

  output.push({
    constructor: Primary,

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
      ).map((x, i) => ({
        constructor: Secondary,
        ...x,
        rotated: i == 0,
        superposed: i == 0 ? ("DOT" as const) : undefined,
      })),
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
    output.push(
      ...textToSecondaries(formative.root, {
        forcePlaceholderCharacters: true,
      }).map((x) => ({
        constructor: Secondary,
        ...x,
      })),
    )
  }

  // const tertiaries: Tertiary

  for (const [rotated, affixes] of [
    [false, formative.slotVAffixes || []],
    [true, formative.slotVIIAffixes || []],
  ] as const) {
    for (const affix of affixes) {
      if (affix.ca) {
        output.push(...affixToScript(caToIthkuil(affix.ca), "ca", 1, rotated))
      } else if (affix.referent) {
        // TODO: waiting on quaternaries
      } else if (affix.case) {
        // TODO: waiting on quaternaries
      } else {
        output.push(
          ...affixToScript(affix.cs, affix.degree, affix.type, rotated),
        )
      }
    }
  }

  return output
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
      children: props.children.map((x) => x.constructor(x as any)),
    }),
  })
}
