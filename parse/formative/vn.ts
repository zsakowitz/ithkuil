import {
  ALL_ASPECTS,
  ALL_EFFECTS,
  ALL_LEVELS,
  ALL_PHASES,
  ALL_VALENCES,
  type Aspect,
  type Effect,
  type Level,
  type NonAspectualVN,
  type Phase,
  type Valence,
} from "../../generate/formative/slot-8/index.js"
import { DCLeaf } from "../decompose.js"
import { VowelForm } from "../vowel-form.js"

const NON_ASPECTUAL_VNS = [
  undefined,
  ALL_VALENCES,
  ALL_PHASES,
  ALL_EFFECTS,
  ALL_LEVELS,
] as const

/**
 * Parses a Vn form as a non-aspect.
 *
 * @param vn The Vn form to be parsed.
 * @returns The parsed Vn form.
 */
export function parseNonAspectualVn(vn: VowelForm): NonAspectualVN {
  if (vn.degree == 0) {
    throw new Error("Invalid Vn form: '" + vn + "'.")
  }

  return NON_ASPECTUAL_VNS[vn.sequence][vn.degree - 1]!
}

/**
 * Parses a Vn form as an Aspect.
 *
 * @param vn The Vn form to be parsed.
 * @returns The parsed Vn form.
 */
export function parseAspect(vn: VowelForm): Aspect {
  if (vn.degree == 0) {
    throw new Error("Invalid Vn form: '" + vn + "'.")
  }

  return ALL_ASPECTS[(vn.sequence - 1) * 9 + (vn.degree - 1)]!
}

/**
 * Decomposes a Vn form as an Aspect.
 *
 * @param vn The Vn form to be parsed.
 * @returns The decomposed Vn form.
 */
export function dcAspect(source: string) {
  return new DCLeaf(
    source,
    "Vn",
    "aspect",
    parseAspect(VowelForm.parseOrThrow(source)),
  )
}

/**
 * Decomposes a Vn form as a non-aspect.
 *
 * @param vn The Vn form to be parsed.
 * @returns The decomposed Vn form.
 */
export function dcNonAspectualVn(source: string) {
  const vn = VowelForm.parseOrThrow(source)

  if (vn.degree == 0) {
    throw new Error("Invalid Vn form: '" + vn + "'.")
  }

  return new DCLeaf(
    source,
    "Vn",
    ["", "valence", "phase", "effect", "level"][vn.sequence]!,
    NON_ASPECTUAL_VNS[vn.sequence][vn.degree - 1]!,
  ) as
    | DCLeaf<"Vn", "valence", Valence>
    | DCLeaf<"Vn", "phase", Phase>
    | DCLeaf<"Vn", "effect", Effect>
    | DCLeaf<"Vn", "level", Level>
}
