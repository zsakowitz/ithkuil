import { ALL_MOOD_OR_CASE_SCOPES } from "../formative/slot-8/mood-or-case-scope.js"
import {
  ALL_CASE_SCOPES,
  ALL_MOODS,
  MCS,
  deepFreeze,
  has,
  vnToAffix,
  type Affix,
  type AffixDegree,
  type AffixualAdjunct,
  type ModularAdjunct,
  type PartialFormative,
} from "../index.js"

const SCOPE_TO_PRECEDENCE = /* @__PURE__ */ deepFreeze({
  "V:SUB": 0,
  "V:DOM": 1,
  "VII:SUB": 2,
  "VII:DOM": 3,
  "CASE/MOOD": 4,
  "CASE/MOOD+ILL/VAL": 5,
  FORMATIVE: 6,
  ADJACENT: 7,
})

/**
 * Merges affixual and modular adjuncts into a formative.
 *
 * @param adjuncts The adjunct to be merged into the formative.
 * @param formative The original formative.
 * @returns The newly merged formative.
 */
export function mergeAdjunctsAndFormative(
  adjuncts: (AffixualAdjunct | ModularAdjunct)[],
  formative: PartialFormative,
): PartialFormative & { readonly slotXIAffixes: readonly Affix[] } {
  const slotVAffixes = formative.slotVAffixes?.slice() || []
  const slotVIIAffixes = formative.slotVIIAffixes?.slice() || []
  const slotXIAffixes: Affix[] = []

  const affixes: [
    vSub: Affix[],
    vDom: Affix[],
    viiSub: Affix[],
    viiDom: Affix[],
    caseMood: Affix[],
    caseMoodIllVal: Affix[],
    formative: Affix[],
    adjacent: Affix[],
  ] = [[], [], [], [], [], [], [], []]

  for (const adjunct of adjuncts) {
    if ("vn1" in adjunct) {
      const scope = SCOPE_TO_PRECEDENCE[adjunct.scope || "CASE/MOOD"]
      const affixList = affixes[scope]

      affixList.push(vnToAffix(adjunct.vn1))

      if (adjunct.vn2) {
        affixList.push(vnToAffix(adjunct.vn2))
      }

      if (adjunct.cn) {
        const index =
          has(ALL_MOODS, adjunct.cn) ? ALL_MOODS.indexOf(adjunct.cn)
          : has(ALL_CASE_SCOPES, adjunct.cn) ?
            ALL_CASE_SCOPES.indexOf(adjunct.cn)
          : ALL_MOOD_OR_CASE_SCOPES.indexOf(adjunct.cn)

        if (index != 0) {
          affixList.push({
            cs: MCS,
            degree: ((formative.type == "UNF/C" ? 5 : 0) +
              (index % 10)) as AffixDegree,
            type: 1,
          })
        }
      }

      if (adjunct.vn3) {
        affixList.push(vnToAffix(adjunct.vn3))
      }
    } else {
      const scope = SCOPE_TO_PRECEDENCE[adjunct.scope || "V:DOM"]
      const affixList = affixes[scope]
      affixList.push(adjunct.affixes[0])

      if (adjunct.affixes.length > 1) {
        const scope =
          SCOPE_TO_PRECEDENCE[adjunct.scope2 || adjunct.scope || "V:DOM"]
        const affixList = affixes[scope]
        affixList.push(...adjunct.affixes.slice(1))
      }
    }
  }

  adjuncts.length = 0

  slotVAffixes.unshift(...affixes[0])
  slotVAffixes.push(...affixes[1])
  slotVIIAffixes.unshift(...affixes[2])
  slotVIIAffixes.push(...affixes[3])
  slotXIAffixes.push(...affixes[4])
  slotXIAffixes.push(...affixes[5])
  slotXIAffixes.push(...affixes[6])
  slotXIAffixes.push(...affixes[7])

  const result = { ...formative, slotVAffixes, slotVIIAffixes, slotXIAffixes }

  return result
}
