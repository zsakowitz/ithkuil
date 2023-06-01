import type { Perspective } from "../../ca/index.js"
import { allPermutationsOf } from "../../helpers/permutations.js"
import {
  isLegalConsonantForm,
  isLegalWordInitialConsonantForm,
} from "../../phonotactics/index.js"
import {
  referentialPerspectiveToIthkuil,
  referentialPerspectiveToIthkuilAlt,
} from "../perspective.js"
import { referentToIthkuil, zodReferent, type Referent } from "./index.js"

/** A list of referents. */
export type ReferentList = readonly [Referent, ...Referent[]]

/** A Zod validator matching a list of referents. */
export const zodReferentList = /* @__PURE__ */ zodReferent.array().nonempty()

/**
 * Converts a list of referents into Ithkuil. Does not attempt to change the
 * order of the referents to create phonotactically permissible consonant
 * clusters. As such, the generated clusters may be phonotactically invalid.
 *
 * To automatically rearrange the referents to optimize for phonotactically
 * correct consonant clusters, use {@link referentListToIthkuil} instead.
 *
 * @param referents A list of referents.
 * @param perspective The perspective to attach to said referents.
 * @param isReferentialAffix Whether this is used in a referential affix.
 * @returns Romanized Ithkuilic text representing the referent list.
 */
export function assembleReferentList(
  referents: ReferentList,
  perspective: Perspective,
  isReferentialAffix: boolean,
) {
  const text = referents.map((referent) =>
    referentToIthkuil(referent, isReferentialAffix),
  )

  let output = ""

  let index = 0

  for (; index < text.length; index++) {
    if (isLegalWordInitialConsonantForm(output + text[index])) {
      output += text[index]
    } else {
      output = "ë" + output + text.slice(index)
      break
    }
  }

  const persp = referentialPerspectiveToIthkuil(perspective)
  const persp2 = referentialPerspectiveToIthkuilAlt(perspective)

  if (output.startsWith("ë")) {
    if (isLegalConsonantForm(output.slice(1) + persp)) {
      return output + persp
    }

    if (isLegalConsonantForm(persp + output.slice(1))) {
      return "ë" + persp + output.slice(1)
    }

    // The following may be phonotactically invalid.
    return output + persp
  }

  if (isLegalWordInitialConsonantForm(output + persp)) {
    return output + persp
  }

  if (isLegalWordInitialConsonantForm(persp + output)) {
    return persp + output
  }

  if (isLegalWordInitialConsonantForm(output + persp2)) {
    return output + persp2
  }

  if (isLegalWordInitialConsonantForm(persp2 + output)) {
    return persp2 + output
  }

  // The following may be phonotactically invalid.
  return "ë" + output + persp
}

/**
 * Converts a list of referents into Ithkuil. Will automatically rearrange the
 * order of the referents to create phonotactically permissible consonant
 * clusters. As such, the generated clusters will most often be phonotactically
 * valid.
 *
 * To avoid automatically rearranging the referents, use
 * {@link assembleReferentList} instead.
 *
 * @param referents A list of referents.
 * @param perspective The perspective to attach to said referents.
 * @returns Romanized Ithkuilic text representing the referent list.
 */
export function referentListToIthkuil(
  referents: ReferentList,
  perspective: Perspective,
): string {
  const all = allPermutationsOf(referents)
    .map((referentList) =>
      assembleReferentList(referentList, perspective, false),
    )
    .sort((a, b) => (a.length < b.length ? -1 : a.length > b.length ? 1 : 0))

  const valid = all.filter(
    (text) => text.startsWith("ë") || isLegalWordInitialConsonantForm(text),
  )

  if (valid.length > 0) {
    return valid[0]!
  } else {
    return all[0]!
  }
}

/**
 * Converts a referent into an Ithkuilic referential affix.
 * @param referent The referent to be converted.
 * @param perspective The perspective to be attatched to the referent.
 * @returns Romanized Ithkuilic text representing the referent.
 */
export function referentialAffixToIthkuil(
  referent: Referent,
  perspective: "M" | "G" | "N",
) {
  if (
    // @ts-ignore
    perspective == "A"
  ) {
    throw new Error(
      "Referents may not be marked Abstract in referential affixes.",
    )
  }

  const ref = referentToIthkuil(referent, true)
  const persp = referentialPerspectiveToIthkuil(perspective)
  const persp2 = referentialPerspectiveToIthkuilAlt(perspective)

  if (isLegalConsonantForm(ref + persp)) {
    return ref + persp
  }

  if (isLegalConsonantForm(persp + ref)) {
    return persp + ref
  }

  if (isLegalConsonantForm(ref + persp2)) {
    return ref + persp2
  }

  if (isLegalConsonantForm(persp2 + ref)) {
    return persp2 + ref
  }

  // The following may be phonotactically invalid.
  return ref + persp2
}

function nonReferentialAffixReferentToIthkuil(referent: Referent) {
  return referentToIthkuil(referent, false)
}

/**
 * Converts a list of referents to an Ithkuilic personal reference root.
 * @param list The referents to be converted.
 * @returns Romanized Ithkuilic text representing the referent list.
 */
export function referentListToPersonalReferenceRoot(list: ReferentList) {
  const sorted = list.slice().sort().reverse()

  const fallback = sorted.map(nonReferentialAffixReferentToIthkuil).join("")

  for (const permututation of allPermutationsOf(sorted)) {
    const output = permututation
      .map(nonReferentialAffixReferentToIthkuil)
      .join("")

    if (isLegalConsonantForm(output)) {
      return output
    }
  }

  return fallback
}
