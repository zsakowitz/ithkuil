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
  type FormativeToScriptOptions,
} from "./index.js"
import { numericAdjunctToNumerals } from "./numerals/from-number.js"
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
  opts?: FormativeToScriptOptions | boolean | undefined,
): Result<ConstructableCharacter[]> {
  const useCaseIllValDiacritics =
    typeof opts == "object" ? opts.useCaseIllValDiacritics : undefined
  const handwritten = typeof opts == "boolean" ? opts : opts?.handwritten

  try {
    const words = text.match(
      /[\p{ID_Start}\d\u02BC\u0027\u2019'_][\p{ID_Start}\p{ID_Continue}\d\u02BC\u0027\u2019'_-]*/gu,
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

      if (result == null) {
        return { ok: false, reason: `Expected word, found ${word}.` }
      }

      if (typeof result == "number" || typeof result == "bigint") {
        output.push(...numericAdjunctToNumerals(result, handwritten))

        continue
      }

      if (typeof result == "string") {
        if (has(ALL_BIAS_ADJUNCTS, result)) {
          output.push({
            construct: Bias,
            bias: result,
            handwritten,
          })
        } else if (
          result != "END:END" &&
          has(ALL_SINGLE_REGISTER_ADJUNCTS, result)
        ) {
          if (result.startsWith("DSV")) {
            output.push({
              construct: Register,
              handwritten,
              type: "DSV",
              mode: "transcriptive",
            })
          } else {
            output.push({
              construct: Register,
              handwritten,
              type: result.slice(0, 3) as Exclude<RegisterAdjunct, "END">,
              mode: result == "SPF:START" ? "alphabetic" : "standard",
            })

            if (result == "SPF:START") {
              wordType = {
                close: [
                  {
                    construct: Register,
                    handwritten,
                    type: "SPF",
                    mode: "alphabetic",
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
              { handwritten, useCaseIllValDiacritics },
            ),
          )
        } else {
          output.push(
            ...formativeToScript(mergeAdjunctsAndFormative(adjuncts, result), {
              handwritten,
              useCaseIllValDiacritics,
            }),
          )

          adjuncts.length = 0
        }

        if (wordType == "formativeFollowingConcatenatedCarrier") {
          if (!isConcatenated) {
            wordType = {
              open: [{ construct: Register, mode: "alphabetic", handwritten }],
              close: [{ construct: Register, mode: "alphabetic", handwritten }],
            }
          }
        } else if (result.root == "s") {
          if (isConcatenated) {
            wordType = "formativeFollowingConcatenatedCarrier"
          } else {
            wordType = {
              open: [{ construct: Register, mode: "alphabetic", handwritten }],
              close: [{ construct: Register, mode: "alphabetic", handwritten }],
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
        const register = SUPPLETIVE_ADJUNCT_TO_REGISTER_CHARACTER[result.type]

        let usedCase2 = false

        if ("referents2" in result && result.referents2) {
          usedCase2 = true

          if (result.perspective2 && result.perspective2 != "M") {
            wordType = {
              close: [
                { ...register, handwritten },
                ...formativeToScript(
                  {
                    type: "UNF/C",
                    root: result.referents2,
                    ca: { perspective: result.perspective2 },
                    case: result.case2,
                  },
                  { handwritten, useCaseIllValDiacritics },
                ),
              ],
            }
          } else {
            wordType = {
              close: [
                { ...register, handwritten },
                { construct: Quaternary, handwritten, value: result.case2 },
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
            close: [{ ...register, handwritten }],
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
          formative.push({ construct: Quaternary, handwritten })
        }

        if (
          formative.find((x, i) => i != 1 && x.construct == Secondary) ||
          (formative[1] as SecondaryCharacter).superposed ||
          (formative[1] as SecondaryCharacter).underposed
        ) {
          output.push(...formative)

          output.push({ ...register, handwritten })
        } else {
          output.push({ ...register, handwritten })

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
              { handwritten, useCaseIllValDiacritics },
            ),
          )

          adjuncts.length = 0
        } else {
          output.push(
            { construct: Quaternary, value: result.case, handwritten },
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
                { handwritten, useCaseIllValDiacritics },
              ),
            )
          } else {
            output.push(
              {
                construct: Quaternary,
                value: result.case2,
                handwritten,
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
          output.push({
            construct: Quaternary,
            value: result.case2,
            handwritten,
          })
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
  /(^|[^\p{ID_Start}\p{ID_Continue}\d\u02BC\u0027\u2019'_])(çç|ç[waeiouäëöüìùáéíóúâêôû]|çë[\p{ID_Start}\p{ID_Continue}\d\u02BC\u0027\u2019'_])/gu

/**
 * Converts romanized text into Ithkuil characters.
 * @param text The text to be converted.
 * @param options If a boolean, marks whether the outputted characters should be
 * handwritten. Otherwise, an object marking properties about how to transform
 * the text.
 * @returns A `Result` containing an array of `ConstructableCharacter`s.
 */
export function textToScript(
  text: string,
  options?: FormativeToScriptOptions | boolean | undefined,
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
    const result = sentenceToScript(sentence, options)

    if (!result.ok) {
      return result
    }

    if (!isFirst) {
      output.push({
        construct: Break,
        handwritten:
          typeof options == "boolean" ? options : options?.handwritten,
      })
    }

    output.push(...result.value)

    isFirst = false
  }

  return { ok: true, value: output }
}

/** New script conversion norms

{!flag} means {flag: false} or {flag: []}
{=flag} means {flag: true}
{flag?} means {flag: flag}
{flag¿} means {flag: !flag}

q(V?)(C?)(V?)([\-~^h`'"?]?)([/|\\><]{0,2})
Q1(formative whose primary will be shown)
Q2?(EVE|CVV|VVC|V?CV?|VV|V̀)
Q3(VL)?(V[PEA])?V?([PEA]V)?(LV)?
Q4(Hcasescope)?V(Hmood)?          V's stress determines case/ill+val
Q(AI?|I)[123]?[57]?V
NV?\d{1,4}V?

STATE: SELF (a list of self states based on current state)
- STANDARD{carrier?, !adjuncts}
- SUPPLETIVE{register?}
- REGISTER

STATE: GLOBAL (these are possible options in every state)
- (word)               (output)                (next state)
- q...                 adjuncts+alphabetic     SELF
- Q1...                adjuncts+primary        SELF
- Q2?...               adjuncts+secondary      SELF
- Q3...                adjuncts+tertiary       SELF
- Q4...                adjuncts+quaternary     SELF
- Q(AI?|I)...          adjuncts+accessor       SELF
- QB...                adjuncts+bias           SELF
- (digits)             adjuncts+numeral        SELF
- n...                 adjuncts+numeral_adv    SELF
- hi                   adjuncts+register       REGISTER_ONEWORD
- h[aeiou]?[0123]?     adjuncts+register       SELF
- H[aeiou]?[0123]?     adjuncts+register       REGISTER
- x[aeiou]?[0123]?     adjuncts+register       SUPPLETIVE{!register}
- X[aeiou]?[0123]?     adjuncts+register       SUPPLETIVE{=register}
- QS                   adjuncts                STANDARD{!carrier, !adjuncts}
- QSC                  adjuncts                STANDARD{=carrier, !adjuncts}
- QSS                  adjuncts                SUPPLETIVE{!register}
- QSSR                 adjuncts                SUPPLETIVE{=register}
- QSR                  adjuncts                REGISTER

STATE: STANDARD{carrier, adjuncts} (this is the default state)
- (word)               (output)                (next state)
- global states
- s...                 formative               HUNT_REGISTER
- hlas...              formative               STANDARD{=carrier}
- (child formative)    formative+adjuncts      STANDARD{carrier?, adjuncts?}
- (parent formative)   formative+adjuncts      STANDARD{!carrier, adjuncts?}  if carrier=false
- (parent formative)   formative               HUNT_REGISTER                  if carrier=true
- (affix/mod adjunct)  ————————                STANDARD{!carrier, adjuncts: adjuncts.with(this)}
- (bias adjunct)       bias                    STANDARD{!carrier, adjuncts?}
- hla/hmn/hna/hňa      register                REGISTER

STATE: SUPPLETIVE{register}
- global states
- s...                 formative w/o -S-       STANDARD{!carrier, !adjuncts}  if register=false
- s...                 formative w/o -S-       REGISTER                       if register=true
-                                              STANDARD{!carrier, !adjuncts}  if register=false
-                                              REGISTER                       if register=false

STATE: REGISTER (this state is for when writing alphabetics inside
registers. its goal is to write alphabetic characters while allowing global
states to be usable.)
- @...                 secondaries             REGISTER
- global states
- ...                  secondaries             REGISTER

STATE: REGISTER_ONEWORD (this state is immediately after a lone "hi"
adjunct. its goal is to preserve the old just-one-word behavior.)
- @...                 secondaries             REGISTER
- global states
- ...                  secondaries             REGISTER

STATE: HUNT_REGISTER (this state is immediately after carrier formatives. its
goal is to default to h1 but use other registers if provided)
- global states
-                      register                REGISTER

*/
