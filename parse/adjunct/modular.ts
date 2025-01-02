import type { ModularAdjunct } from "../../generate/adjunct/modular/index.js"
import type { ModularAdjunctScope } from "../../generate/adjunct/modular/scope.js"
import { DCList, Decomposed } from "../decompose.js"
import {
  dcMoodOrCaseScope,
  parseMoodOrCaseScope,
} from "../formative/mood-or-case-scope.js"
import {
  dcAspect,
  dcNonAspectualVn,
  parseAspect,
  parseNonAspectualVn,
} from "../formative/vn.js"
import { modularAdjunct } from "../lex/adjunct/modular.js"
import type { Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"

const VH_TO_SCOPE: Readonly<Record<string, ModularAdjunctScope>> = {
  a: "CASE/MOOD+ILL/VAL",
  e: "CASE/MOOD",
  i: "FORMATIVE",
  u: "FORMATIVE",
  o: "ADJACENT",
}

/**
 * Builds a modular adjunct.
 *
 * @param word The word to be built.
 * @param stress The stress of the adjunct.
 * @returns Either a parsed `ModularAdjunct` indicating a success, or
 *   `undefined` indicating a tokenization failure. Throws if the adjunct was
 *   successfully tokenized but had another error in it (e.g. invalid Vn slot,
 *   etc.).
 */
export function buildModularAdjunct(
  word: string,
  stress: Stress,
): ModularAdjunct | undefined {
  const match = modularAdjunct.exec(word)

  if (!match) {
    return
  }

  const type =
    match[1] == "w" ? "PARENT"
    : match[1] == "y" ? "CONCAT"
    : undefined

  if (!(match[2] || match[4])) {
    return {
      type,
      vn1: parseAspect(VowelForm.parseOrThrow(match[6]!)),
    }
  }

  const [cn, isVnAspectual] = parseMoodOrCaseScope(match[3]!)

  const vn1 =
    isVnAspectual ?
      parseAspect(VowelForm.parseOrThrow(match[2]!))
    : parseNonAspectualVn(VowelForm.parseOrThrow(match[2]!))

  let vn2

  if (match[4]) {
    vn2 =
      match[5] == "n" ?
        parseAspect(VowelForm.parseOrThrow(match[4]!))
      : parseNonAspectualVn(VowelForm.parseOrThrow(match[4]!))
  }

  let scope: ModularAdjunctScope | undefined

  if (stress == "ultimate") {
    scope = VH_TO_SCOPE[match[6]!]

    if (scope == null) {
      throw new Error("Invalid Vh slot: " + match[6] + ".")
    }

    if (vn2) {
      return {
        type,
        vn1,
        cn,
        vn2,
        scope,
      }
    }

    return {
      type,
      vn1,
      cn,
      scope,
    }
  }

  if (vn2) {
    return {
      type,
      vn1,
      cn,
      vn2,
      vn3: parseNonAspectualVn(VowelForm.parseOrThrow(match[6]!)),
    }
  }

  return {
    type,
    vn1,
    cn,
    vn3: parseNonAspectualVn(VowelForm.parseOrThrow(match[6]!)),
  }
}

/**
 * Builds a modular adjunct.
 *
 * @param word The word to be decomposed.
 * @param stress The stress of the adjunct.
 * @returns Either a parsed array of decompositions indicating a success, or
 *   `undefined` indicating a tokenization failure. Throws if the adjunct was
 *   successfully tokenized but had another error in it (e.g. invalid Vn slot,
 *   etc.).
 */
export function dcModularAdjunct(
  word: string,
  stress: Stress,
): DCList | undefined {
  const match = modularAdjunct.exec(word)

  if (!match) {
    return
  }

  const type =
    match[1] == "w" ? [new Decomposed("w", "C*", "modularType", "PARENT")]
    : match[1] == "y" ? [new Decomposed("y", "C*", "modularType", "CONCAT")]
    : []

  if (!(match[2] || match[4])) {
    return new DCList(
      ...type,
      new Decomposed(
        match[6]!,
        "Vn",
        "aspect",
        parseAspect(VowelForm.parseOrThrow(match[6]!)),
      ),
    )
  }

  const [cn, isVnAspectual] = dcMoodOrCaseScope(match[3]!)

  const vn1 = isVnAspectual ? dcAspect(match[2]!) : dcNonAspectualVn(match[2]!)

  const vn2 =
    match[5] == "n" ?
      [dcAspect(match[4]!), new Decomposed("n", "Cm", "modularCm", "ASPECT")]
    : match[5] == "ň" ?
      [
        dcNonAspectualVn(match[4]!),
        new Decomposed("ň", "Cm", "modularCm", "NON-ASPECT"),
      ]
    : []

  if (stress == "ultimate") {
    const scope = VH_TO_SCOPE[match[6]!]

    if (scope == null) {
      throw new Error("Invalid Vh slot: " + match[6] + ".")
    }

    return new DCList(
      ...type,
      vn1,
      cn,
      ...vn2,
      new Decomposed(match[6]!, "Vh", "modularScope", scope),
    )
  }

  return new DCList(...type, vn1, cn, ...vn2, dcNonAspectualVn(match[6]!))
}
