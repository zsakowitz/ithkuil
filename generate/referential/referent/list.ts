import type { Perspective } from "../../ca/index.js"
import { allPermutationsOf } from "../../helpers/permutations.js"
import {
  isLegalConsonantForm,
  isLegalWordInitialConsonantForm,
} from "../../phonotactics/index.js"
import { isLegalWordFinalConsonantForm } from "../../phonotactics/word-final.js"
import {
  referentialPerspectiveToIthkuil,
  referentialPerspectiveToIthkuilAlt,
} from "../perspective.js"
import { referentToIthkuil, type Referent } from "./index.js"

/** A list of referents. */
export type ReferentList = readonly [Referent, ...Referent[]]

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
 * @param isSecondReferent Whether this is the second referent in a dual referential.
 * @returns Romanized Ithkuilic text representing the referent list.
 */
export function assembleReferentList(
  referents: ReferentList,
  perspective: Perspective,
  isReferentialAffix: boolean,
  isSecondReferent: boolean,
) {
  const text = referents.map((referent) =>
    referentToIthkuil(referent, isReferentialAffix),
  )

  let output = ""

  let index = 0

  if (isSecondReferent) {
    for (; index < text.length; index++) {
      output += text[index]
    }
  } else {
    for (; index < text.length; index++) {
      if (isLegalWordInitialConsonantForm(output + text[index])) {
        output += text[index]
      } else {
        output = "ë" + output + text.slice(index)
        break
      }
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

  const isLegal = isSecondReferent
    ? isLegalWordFinalConsonantForm
    : isLegalWordInitialConsonantForm

  if (isLegal(output + persp)) {
    return output + persp
  }

  if (isLegal(persp + output)) {
    return persp + output
  }

  if (isLegal(output + persp2)) {
    return output + persp2
  }

  if (isLegal(persp2 + output)) {
    return persp2 + output
  }

  if (isSecondReferent) {
    // The following may be phonotactically invalid.
    return output + persp
  } else {
    // The following may be phonotactically invalid.
    return "ë" + output + persp
  }
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
 * @param isSecondReferent Whether this is the second referent in a dual referential.
 * @returns Romanized Ithkuilic text representing the referent list.
 */
export function referentListToIthkuil(
  referents: ReferentList,
  perspective: Perspective,
  isSecondReferent: boolean,
): string {
  const all = allPermutationsOf(referents.slice().sort())
    .map((referentList) =>
      assembleReferentList(
        referentList as [Referent, ...Referent[]],
        perspective,
        false,
        isSecondReferent,
      ),
    )
    .sort((a, b) => (a.length < b.length ? -1 : a.length > b.length ? 1 : 0))

  if (isSecondReferent) {
    const valid = all.find((text) => isLegalWordFinalConsonantForm(text))

    return valid ?? all[0]!
  }

  const valid = all.find((text) => isLegalWordInitialConsonantForm(text))

  if (valid) {
    return valid
  }

  const valid2 = all.find((text) => text.startsWith("ë"))

  return valid2 || all[0]!
}

/**
 * Converts a `ReferentList` into an Ithkuilic referential affix.
 * @param referents The `ReferentList` to be converted.
 * @param perspective The perspective to be attatched to the referent.
 * @returns Romanized Ithkuilic text representing the referent.
 */
export function referentialAffixToIthkuil(
  referents: ReferentList,
  perspective: "M" | "G" | "N",
): string {
  if (
    // @ts-ignore
    perspective == "A"
  ) {
    throw new Error(
      "Referents may not be marked Abstract in referential affixes.",
    )
  }

  const options = allPermutationsOf(referents.slice().sort()).flatMap(
    (referents) => [
      referents.map((referent) => referentToIthkuil(referent, true)).join("") +
        referentialPerspectiveToIthkuil(perspective),

      referents.map((referent) => referentToIthkuil(referent, true)).join("") +
        referentialPerspectiveToIthkuilAlt(perspective),

      referentialPerspectiveToIthkuil(perspective) +
        referents.map((referent) => referentToIthkuil(referent, true)).join(""),

      referentialPerspectiveToIthkuilAlt(perspective) +
        referents.map((referent) => referentToIthkuil(referent, true)).join(""),
    ],
  )

  for (const option of options) {
    if (isLegalConsonantForm(option)) {
      return option
    }
  }

  if (options[0]) {
    return options[0]
  }

  throw new Error("Unable to construct referential affix.")
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
