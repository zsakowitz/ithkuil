import { affixToIthkuil, type Affix } from "../../affix/index.js"
import { applyStress, countVowelForms } from "../../helpers/stress.js"
import { extractAllConsonants } from "../../phonotactics/letters.js"
import { isLegalWordFinalConsonantForm } from "../../phonotactics/word-final.js"
import { isLegalWordInitialConsonantForm } from "../../phonotactics/word-initial.js"
import {
  affixualAdjunctScopeToIthkuil,
  type AffixualAdjunctScope,
} from "./scope.js"

export * from "./scope.js"

/**
 * An affixual adjunct.
 *
 * @example
 * ({ affixes: [{ type: 2, degree: 7, cs: "c" }] })
 *
 * @example
 * ({
 *   affixes: [{ type: 2, degree: 7, cs: "c" }],
 *   scope: "VII:DOM",
 *   appliesToConcatenatedStemOnly: true,
 * })
 */
export type AffixualAdjunct = {
  /** The affixes that are part of this adjunct. */
  readonly affixes: [Affix, ...Affix[]]

  /**
   * Scope of first affix. Also controls scope of 2nd and subsequent affixes
   * when `scope2` is omitted.
   *
   * @default "V:DOM"
   */
  readonly scope?: AffixualAdjunctScope | undefined

  /**
   * Scope of 2nd and subsequent affixes. Defaults to the value of `scope` in
   * this affixual adjunct.
   */
  readonly scope2?: AffixualAdjunctScope | undefined

  /**
   * `true` if adjunct applies only to concatenated stem.
   * `false` if adjunct applies to formative as a whole.
   *
   * @default false
   */
  readonly appliesToConcatenatedStemOnly?: boolean | undefined
}

/**
 * Converts an affixual adjunct into Ithkuil.
 * @param adjunct The affixual adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the affixual adjunct.
 *
 * @example
 * affixualAdjunctToIthkuil({
 *   affixes: [{ type: 2, degree: 7, cs: "c" }],
 *   scope: "VII:DOM",
 *   appliesToConcatenatedStemOnly: true,
 * })
 * // "oicé"
 */
export function affixualAdjunctToIthkuil(adjunct: AffixualAdjunct) {
  if (adjunct.affixes.length == 1) {
    const affix = affixToIthkuil(adjunct.affixes[0], {
      reversed: false,
    }).defaultValue

    const scope = affixualAdjunctScopeToIthkuil(
      adjunct.scope ?? "V:DOM",
      "vs",
      (adjunct.appliesToConcatenatedStemOnly ?? false) &&
        isLegalWordFinalConsonantForm(extractAllConsonants(affix)),
    )

    if (adjunct.appliesToConcatenatedStemOnly) {
      const output = affix + scope

      if (countVowelForms(output) == 1) {
        return output
      } else {
        return applyStress(output, -1)
      }
    }

    return affix + scope
  }

  const rawAffix1 = affixToIthkuil(adjunct.affixes[0], {
    reversed: true,
  }).defaultValue

  const affix1 = isLegalWordInitialConsonantForm(
    extractAllConsonants(rawAffix1),
  )
    ? rawAffix1
    : "ë" + rawAffix1

  const cz = affixualAdjunctScopeToIthkuil(
    adjunct.scope ?? "V:DOM",
    "cz",
    false,
  )

  const main = adjunct.affixes
    .slice(1)
    .map((affix) => affixToIthkuil(affix, { reversed: false }))
    .reduce((a, b) => a + b.withPreviousText(a), affix1 + cz)

  const scope = adjunct.scope2
    ? affixualAdjunctScopeToIthkuil(adjunct.scope2, "vz", false)
    : "ai"

  const output = main + scope

  if (adjunct.appliesToConcatenatedStemOnly) {
    return applyStress(output, -1)
  }

  return output
}
