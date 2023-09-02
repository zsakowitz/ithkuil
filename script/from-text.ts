import { mergeAdjunctsAndFormative } from "../generate/helpers/consolidate.js"
import {
  ALL_BIAS_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  deepFreeze,
  has,
  referentToIthkuil,
  type Affix,
  type AffixualAdjunct,
  type ModularAdjunct,
  type ReferentList,
  type RegisterAdjunct,
  type SuppletiveAdjunctType,
} from "../generate/index.js"
import { parseWord } from "../parse/index.js"
import {
  Bias,
  Primary,
  Quaternary,
  Register,
  Secondary,
  attachConstructor,
  formativeToScript,
  textToSecondaries,
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

const SUPPLETIVE_ADJUNCT_TO_REGISTER_CHARACTER = /* @__PURE__ */ deepFreeze({
  CAR: { construct: Register, mode: "alphabetic" },
  QUO: { construct: Register, mode: "transcriptive", type: "DSV" },
  NAM: { construct: Register, mode: "transliterative", type: "SPF" },
  PHR: { construct: Register, mode: "transcriptive", type: "PNT" },
} satisfies Record<SuppletiveAdjunctType, Omit<ConstructableCharacter<RegisterCharacter>, "handwritten">>)

function referentListToString(list: ReferentList): string {
  return list.map((referent) => referentToIthkuil(referent, false)).join("")
}

function sentenceToScript(
  text: string,
  handwritten?: boolean | undefined,
): Result<ConstructableCharacter[]> {
  try {
    const words = text.match(
      /[\p{ID_Start}'][\p{ID_Start}\p{ID_Continue}'-]*/gu,
    )

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

    for (let index = 0; index < words.length; index++) {
      let word = words[index]!

      if (typeof wordType == "object") {
        if (wordType.open) {
          output.push(...wordType.open)
        }

        output.push(
          ...textToSecondaries(word, {
            handwritten,
            placeholder: "ALPHABETIC_PLACEHOLDER",
          }).map((secondary) => attachConstructor(secondary, Secondary)),
        )

        if (wordType.close) {
          output.push(...wordType.close)
        }

        wordType = undefined

        continue
      }

      if (word.includes("-")) {
        const [thisWord, ...rest] = word.split("-")
        word = thisWord!
        words.splice(index + 1, 0, rest.join("-"))
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
          if (result.startsWith("DSV")) {
            output.push({
              construct: Register,
              type: "DSV",
              mode: "transcriptive",
            })
          } else {
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
              { handwritten },
            ),
          )
        } else {
          output.push(
            ...formativeToScript(mergeAdjunctsAndFormative(adjuncts, result), {
              handwritten,
            }),
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
        const register: ConstructableCharacter =
          SUPPLETIVE_ADJUNCT_TO_REGISTER_CHARACTER[result.type]

        let usedCase2 = false

        if ("referents2" in result && result.referents2) {
          usedCase2 = true

          if (result.perspective2 && result.perspective2 != "M") {
            wordType = {
              close: [
                { ...register },
                ...formativeToScript(
                  {
                    type: "UNF/C",
                    root: result.referents2,
                    ca: { perspective: result.perspective2 },
                    case: result.case2,
                  },
                  { handwritten },
                ),
              ],
            }
          } else {
            wordType = {
              close: [
                { ...register },
                { construct: Quaternary, value: result.case2 },
                ...textToSecondaries(referentListToString(result.referents2), {
                  forcePlaceholderCharacters: true,
                  handwritten,
                })
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
            close: [{ ...register }],
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
          { useCaseIllValDiacritics: false, handwritten },
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

          output.push({ ...register })
        } else {
          output.push({ ...register })

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
              { handwritten },
            ),
          )

          adjuncts.length = 0
        } else {
          output.push(
            { construct: Quaternary, value: result.case },
            ...textToSecondaries(referentListToString(result.referents), {
              forcePlaceholderCharacters: true,
              handwritten,
            })
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
              ...formativeToScript(
                {
                  type: "UNF/C",
                  root: result.referents2,
                  ca: { perspective: result.perspective2 },
                  case: result.case2,
                },
                { handwritten },
              ),
            )
          } else {
            output.push(
              {
                construct: Quaternary,
                value: result.case2,
              },
              ...textToSecondaries(referentListToString(result.referents2), {
                forcePlaceholderCharacters: true,
                handwritten,
              })
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
          { useCaseIllValDiacritics: false, handwritten },
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

const sentenceJunctureAffix =
  /(^|[^\p{ID_Start}\p{ID_Continue}'_])(çç|ç[waeiouäëöüìùáéíóúâêôû]|çë[\p{ID_Start}\p{ID_Continue}'_])/gu

/**
 * Converts romanized text into Ithkuil characters.
 * @param text The text to be converted.
 * @param handwritten Whether the outputted characters should be handwritten.
 * @returns A `Result` containing an array of `ConstructableCharacter`s.
 */
export function textToScript(
  text: string,
  handwritten?: boolean | undefined,
): Result<ConstructableCharacter[]> {
  text = text
    // The ç in the regex is a "c" with an extension of "̧ ".
    // We replace it with "ç" (a single character) for parsing purposes.
    .replace(/ç/g, "ç")
    .replace(
      sentenceJunctureAffix,
      (_, previousChar: string, junctureAffix: string) => {
        return (
          previousChar +
          ". " +
          (junctureAffix == "çç"
            ? "y"
            : junctureAffix.slice(junctureAffix.startsWith("çë") ? 2 : 1))
        )
      },
    )

  const output: ConstructableCharacter[] = []
  let isFirst = true

  for (const sentence of text.split(/[.!?]/g).filter((x) => x.trim() != "")) {
    const result = sentenceToScript(sentence, handwritten)

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
