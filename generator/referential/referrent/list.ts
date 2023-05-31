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
import { referrentToIthkuil, zodReferrent, type Referrent } from "./index.js"

/** A list of referrents. */
export type ReferrentList = readonly [Referrent, ...Referrent[]]

/** A Zod validator matching a list of referrents. */
export const zodReferrentList = /* @__PURE__ */ zodReferrent.array().nonempty()

/**
 * Converts a list of referrents into Ithkuil. Does not attempt to change the
 * order of the referrents to create phonotactically permissible consonant
 * clusters. As such, the generated clusters may be phonotactically invalid.
 *
 * To automatically rearrange the referrents to optimize for phonotactically
 * correct consonant clusters, use {@link referrentListToIthkuil} instead.
 *
 * @param referrents A list of referrents.
 * @param perspective The perspective to attach to said referrents.
 * @param isReferentialAffix Whether this is used in a referential affix.
 * @returns Romanized Ithkuilic text representing the referrent list.
 */
export function assembleReferrentList(
  referrents: ReferrentList,
  perspective: Perspective,
  isReferentialAffix: boolean,
) {
  const text = referrents.map((referrent) =>
    referrentToIthkuil(referrent, isReferentialAffix),
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
 * Converts a list of referrents into Ithkuil. Will automatically rearrange the
 * order of the referrents to create phonotactically permissible consonant
 * clusters. As such, the generated clusters will most often be phonotactically
 * valid.
 *
 * To avoid automatically rearranging the referrents, use
 * {@link assembleReferrentList} instead.
 *
 * @param referrents A list of referrents.
 * @param perspective The perspective to attach to said referrents.
 * @returns Romanized Ithkuilic text representing the referrent list.
 */
export function referrentListToIthkuil(
  referrents: ReferrentList,
  perspective: Perspective,
): string {
  const all = allPermutationsOf(referrents)
    .map((referrentList) =>
      assembleReferrentList(referrentList, perspective, false),
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
 * Converts a referrent into an Ithkuilic referential affix.
 * @param referrent The referrent to be converted.
 * @param perspective The perspective to be attatched to the referrent.
 * @returns Romanized Ithkuilic text representing the referrent.
 */
export function referentialAffixToIthkuil(
  referrent: Referrent,
  perspective: "M" | "G" | "N",
) {
  if (
    // @ts-ignore
    perspective == "A"
  ) {
    throw new Error(
      "Referrents may not be marked Abstract in referential affixes.",
    )
  }

  const ref = referrentToIthkuil(referrent, true)
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

function nonReferentialAffixReferrentToIthkuil(referrent: Referrent) {
  return referrentToIthkuil(referrent, false)
}

/**
 * Converts a list of referrents to an Ithkuilic personal reference root.
 * @param list The referrents to be converted.
 * @returns Romanized Ithkuilic text representing the referrent list.
 */
export function referrentListToPersonalReferenceRoot(list: ReferrentList) {
  const sorted = list.slice().sort().reverse()

  const fallback = sorted.map(nonReferentialAffixReferrentToIthkuil).join("")

  for (const permututation of allPermutationsOf(sorted)) {
    const output = permututation
      .map(nonReferentialAffixReferrentToIthkuil)
      .join("")

    if (isLegalConsonantForm(output)) {
      return output
    }
  }

  return fallback
}
