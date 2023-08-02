import { ALL_MOOD_OR_CASE_SCOPES } from "../generate/formative/slot-8/mood-or-case-scope.js"
import {
  ALL_BIAS_ADJUNCTS,
  ALL_CASE_SCOPES,
  ALL_MOODS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  deepFreeze,
  has,
  referentListToPersonalReferenceRoot,
  type Affix,
  type AffixDegree,
  type AffixualAdjunct,
  type ModularAdjunct,
  type PartialFormative,
  type RegisterAdjunct,
  type SuppletiveAdjunctType,
} from "../generate/index.js"
import { parseWord } from "../parse/index.js"
import {
  Bias,
  MCS,
  Primary,
  Quaternary,
  Register,
  Secondary,
  attachConstructor,
  formativeToScript,
  textToSecondaries,
  vnToAffix,
  type ConstructableCharacter,
  type DiacriticName,
  type PrimaryCharacter,
  type RegisterCharacter,
  type SecondaryCharacter,
} from "./index.js"
import { Break } from "./other/break.js"
import type { Result } from "./utilities/result.js"

/**
 * A helper type which removes properties that may only be undefined from an
 * object type `T`.
 */
export type OmitUndefinedValues<T> = T extends infer U
  ? {
      [K in keyof U as [U[K]] extends [undefined] ? never : K]: U[K]
    }
  : never

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

const SUPPLETIVE_ADJUNCT_TO_REGISTER_CHARACTER = /* @__PURE__ */ deepFreeze({
  CAR: { construct: Register, mode: "alphabetic" },
  QUO: { construct: Register, mode: "alphabetic", type: "DSV" },
  NAM: { construct: Register, mode: "alphabetic", type: "SPF" },
  PHR: { construct: Register, mode: "alphabetic", type: "PNT" },
} satisfies Record<SuppletiveAdjunctType, ConstructableCharacter<RegisterCharacter>>)

/**
 * Merges affixual and modular adjuncts into a formative.
 * @param adjuncts The adjunct to be merged into the formative.
 * @param formative The original formative.
 * @returns The newly merged formative.
 */
export function mergeAdjunctsAndFormative(
  adjuncts: (AffixualAdjunct | ModularAdjunct)[],
  formative: PartialFormative,
) {
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
        const index = has(ALL_MOODS, adjunct.cn)
          ? ALL_MOODS.indexOf(adjunct.cn)
          : has(ALL_CASE_SCOPES, adjunct.cn)
          ? ALL_CASE_SCOPES.indexOf(adjunct.cn)
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
  slotVIIAffixes.push(...affixes[4])
  slotXIAffixes.push(...affixes[5])
  slotXIAffixes.push(...affixes[6])
  slotXIAffixes.push(...affixes[7])

  const result = { ...formative, slotVAffixes, slotVIIAffixes, slotXIAffixes }

  return result
}

function sentenceToScript(text: string): Result<ConstructableCharacter[]> {
  try {
    const words = text.match(/[\p{ID_Start}'][\p{ID_Start}\p{ID_Continue}']*/gu)

    if (!words) {
      return { ok: true, value: [] }
    }

    const output: ConstructableCharacter[] = []

    const adjuncts: (AffixualAdjunct | ModularAdjunct)[] = []

    let wordType:
      | "formativeFollowingConcatenatedCarrier"
      | {
          readonly open?: ConstructableCharacter[] | undefined
          readonly close?: ConstructableCharacter[] | undefined
        }
      | undefined

    for (const word of words) {
      if (typeof wordType == "object") {
        if (wordType.open) {
          output.push(...wordType.open)
        }

        output.push(
          ...textToSecondaries(word).map((secondary) =>
            attachConstructor(secondary, Secondary),
          ),
        )

        if (wordType.close) {
          output.push(...wordType.close)
        }

        wordType = undefined

        continue
      }

      const result = parseWord(word) as OmitUndefinedValues<
        ReturnType<typeof parseWord>
      >

      if (!result) {
        return { ok: false, reason: `Expected word, found ${word}.` }
      }

      if (typeof result == "string") {
        if (has(ALL_BIAS_ADJUNCTS, result)) {
          output.push({
            construct: Bias,
            bias: result,
          })
        } else if (
          result != "END:END" &&
          has(ALL_SINGLE_REGISTER_ADJUNCTS, result)
        ) {
          output.push({
            construct: Register,
            type: result.slice(0, 3) as Exclude<RegisterAdjunct, "END">,
          })

          if (result == "SPF:START") {
            wordType = {
              close: [
                {
                  construct: Register,
                  type: result.slice(0, 3) as Exclude<RegisterAdjunct, "END">,
                },
              ],
            }
          }
        }

        continue
      }

      if ("root" in result) {
        const isConcatenated =
          result.type == "UNF/C" &&
          (result.concatenationType == 1 || result.concatenationType == 2)

        if (isConcatenated) {
          const concatenatedModifiers = []

          for (let index = 0; index < adjuncts.length; index++) {
            const modifier = adjuncts[index]!

            if (
              "vn1" in modifier
                ? modifier.type == "CONCAT"
                : modifier.appliesToConcatenatedStemOnly
            ) {
              concatenatedModifiers.push(modifier)
              adjuncts.splice(index, 1)
              index--
            }
          }

          output.push(
            ...formativeToScript(
              mergeAdjunctsAndFormative(concatenatedModifiers, result),
            ),
          )
        } else {
          output.push(
            ...formativeToScript(mergeAdjunctsAndFormative(adjuncts, result)),
          )

          adjuncts.length = 0
        }

        if (wordType == "formativeFollowingConcatenatedCarrier") {
          if (!isConcatenated) {
            wordType = {
              open: [{ construct: Register, mode: "alphabetic" }],
              close: [{ construct: Register, mode: "alphabetic" }],
            }
          }
        } else if (result.root == "s") {
          if (isConcatenated) {
            wordType = "formativeFollowingConcatenatedCarrier"
          } else {
            wordType = {
              open: [{ construct: Register, mode: "alphabetic" }],
              close: [{ construct: Register, mode: "alphabetic" }],
            }
          }
        }

        continue
      }

      if ("vn1" in result) {
        adjuncts.push(result)
        continue
      }

      if ("type" in result) {
        const closing: ConstructableCharacter =
          SUPPLETIVE_ADJUNCT_TO_REGISTER_CHARACTER[result.type]

        let usedCase2 = false

        if ("referents2" in result && result.referents2) {
          usedCase2 = true

          if (result.perspective2 && result.perspective2 != "M") {
            wordType = {
              close: [
                { ...closing },
                ...formativeToScript({
                  type: "UNF/C",
                  root: result.referents2,
                  ca: { perspective: result.perspective2 },
                  case: result.case2,
                }),
              ],
            }
          } else {
            wordType = {
              close: [
                { ...closing },
                { construct: Quaternary, value: result.case2 },
                ...textToSecondaries(
                  referentListToPersonalReferenceRoot(result.referents2),
                  { forcePlaceholderCharacters: true },
                )
                  .map((secondary) => attachConstructor(secondary, Secondary))
                  .map((secondary, index) => {
                    if (index == 0) {
                      ;(secondary as any).superposed =
                        "HORIZ_BAR" satisfies DiacriticName
                    }

                    return secondary
                  }),
              ],
            }
          }
        } else {
          wordType = {
            close: [{ ...closing }],
          }
        }

        const case2 = "case2" in result && !usedCase2 ? result.case2 : undefined

        const formative = formativeToScript(
          mergeAdjunctsAndFormative(adjuncts, {
            type: "UNF/C",
            root: "s",
            specification:
              "specification" in result ? result.specification : undefined,
            slotVAffixes: "affixes" in result ? result.affixes : undefined,
            ca: { essence: "essence" in result ? result.essence : undefined },
            slotVIIAffixes:
              case2 && result.case ? [{ case: result.case }] : undefined,
            case: case2 || result.case,
          }),
          { useCaseIllValDiacritics: false },
        )

        if (formative.at(-1)?.construct != Quaternary) {
          formative.push({ construct: Quaternary })
        }

        if (
          formative.find((x, i) => i != 1 && x.construct == Secondary) ||
          (formative[1] as SecondaryCharacter).superposed ||
          (formative[1] as SecondaryCharacter).underposed
        ) {
          output.push(...formative)

          output.push({ ...closing })
        } else {
          output.push({ ...closing })

          formative.splice(1, 1)

          output.push(...formative)
        }

        continue
      }

      if ("referents" in result) {
        let didUseCase2 = false

        if (
          result.essence == "RPV" ||
          (result.perspective && result.perspective != "M") ||
          ("specification" in result &&
            result.specification &&
            result.specification != "BSC") ||
          ("affixes" in result && result.affixes?.length) ||
          adjuncts.length
        ) {
          const affixes: Affix[] =
            "affixes" in result && result.affixes ? result.affixes.slice() : []

          let case_ = result.case

          if (
            result.case2 &&
            (!("referents2" in result) || !result.referents2)
          ) {
            didUseCase2 = true
            affixes.push({ case: result.case || "THM" })
            case_ = result.case2
          }

          output.push(
            ...formativeToScript(
              mergeAdjunctsAndFormative(adjuncts, {
                type: "UNF/C",
                root: result.referents,
                specification:
                  "specification" in result ? result.specification : undefined,
                ca: {
                  perspective: result.perspective,
                  essence: result.essence,
                },
                slotVAffixes: affixes,
                case: case_,
              }),
            ),
          )

          adjuncts.length = 0
        } else {
          output.push(
            { construct: Quaternary, value: result.case },
            ...textToSecondaries(
              referentListToPersonalReferenceRoot(result.referents),
              { forcePlaceholderCharacters: true },
            )
              .map((secondary) => attachConstructor(secondary, Secondary))
              .map((secondary, index) => {
                if (index == 0) {
                  ;(secondary as any).superposed =
                    "HORIZ_BAR" satisfies DiacriticName
                }

                return secondary
              }),
          )
        }

        if ("referents2" in result && result.referents2) {
          if (result.perspective2 && result.perspective2 != "M") {
            output.push(
              ...formativeToScript({
                type: "UNF/C",
                root: result.referents2,
                ca: { perspective: result.perspective2 },
                case: result.case2,
              }),
            )
          } else {
            output.push(
              {
                construct: Quaternary,
                value: result.case2,
              },
              ...textToSecondaries(
                referentListToPersonalReferenceRoot(result.referents2),
                { forcePlaceholderCharacters: true },
              )
                .map((secondary) => attachConstructor(secondary, Secondary))
                .map((secondary, index) => {
                  if (index == 0) {
                    ;(secondary as any).superposed =
                      "HORIZ_BAR" satisfies DiacriticName
                  }

                  return secondary
                }),
            )
          }
        } else if (!didUseCase2 && result.case2) {
          output.push({ construct: Quaternary, value: result.case2 })
        }

        continue
      }

      if ("affixes" in result) {
        adjuncts.push(result)
        continue
      }
    }

    if (adjuncts.length) {
      output.push(
        ...formativeToScript(
          mergeAdjunctsAndFormative(adjuncts, { root: "s", type: "UNF/C" }),
          { useCaseIllValDiacritics: false },
        )
          .slice(2)
          .map((x) => {
            ;(x as any).dimmed = true
            return x
          }),
      )
    }

    const first = output[0]
    if (first?.construct == Primary) {
      ;(first as PrimaryCharacter as any).isSentenceInitial = true
    }

    return { ok: true, value: output }
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Converts romanized text into Ithkuil characters.
 * @param text The text to be converted.
 * @returns A `Result` containing an array of `ConstructableCharacter`s.
 */
export function textToScript(text: string): Result<ConstructableCharacter[]> {
  const output: ConstructableCharacter[] = []
  let isFirst = true

  for (const sentence of text.split(/[.!?]/g).filter((x) => x.trim() != "")) {
    const result = sentenceToScript(sentence)

    if (!result.ok) {
      return result
    }

    if (!isFirst) {
      output.push({ construct: Break })
    }

    output.push(...result.value)

    isFirst = false
  }

  return { ok: true, value: output }
}
