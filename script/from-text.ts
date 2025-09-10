import { mergeAdjunctsAndFormative } from "../generate/helpers/consolidate.js"
import {
  ALL_BIAS_ADJUNCTS,
  ALL_PARSING_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  applyStress,
  deepFreeze,
  has,
  referentToIthkuil,
  type Affix,
  type AffixualAdjunct,
  type Level,
  type ModularAdjunct,
  type ParsingAdjunct,
  type ReferentList,
  type RegisterAdjunct,
  type SuppletiveAdjunctType,
  type Valence,
} from "../generate/index.js"
import {
  STRESSED_TO_UNSTRESSED_VOWEL_MAP,
  VowelForm,
  parseCase,
  parseCaseScope,
  parseFormative,
  parseIllocutionValidation,
  parseMood,
  parseWord,
  transformWord,
} from "../parse/index.js"
import {
  AdvancedAlphabetic,
  Bias,
  Primary,
  Quaternary,
  Register,
  Secondary,
  Tertiary,
  attachConstructor,
  formativeToScript,
  textToSecondaries,
  type AdvancedAlphabeticCharacter,
  type ConstructableCharacter,
  type DiacriticName,
  type FormativeToScriptOptions,
  type PrimaryCharacter,
  type RegisterCharacter,
  type SecondaryCharacter,
  type TertiarySegmentName,
} from "./index.js"
import { numericAdjunctToNumerals } from "./numerals/from-number.js"
import { Break } from "./other/break.js"
import type { Result } from "./utilities/result.js"

/**
 * A helper type which removes properties that may only be undefined from an
 * object type `T`.
 */
export type OmitUndefinedValues<T> =
  T extends infer U ?
    {
      [K in keyof U as [U[K]] extends [undefined] ? never : K]: U[K]
    }
  : never

const SUPPLETIVE_ADJUNCT_TO_REGISTER_CHARACTER = /* @__PURE__ */ deepFreeze({
  CAR: { construct: Register, mode: "alphabetic" },
  QUO: { construct: Register, mode: "transcriptive", type: "DSV" },
  NAM: { construct: Register, mode: "transliterative", type: "SPF" },
  PHR: { construct: Register, mode: "transcriptive", type: "PNT" },
} satisfies Record<
  SuppletiveAdjunctType,
  Omit<ConstructableCharacter<RegisterCharacter>, "handwritten">
>)

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
      /[\p{ID_Start}\d\u02BC\u0027\u2019'_][\p{ID_Start}\p{ID_Continue}\d\u02BC\u0027\u2019_\-~^:`'"¿\\|/><]*/gu,
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
      | "forcedRegister"
      | undefined

    let parsingAdjunctStress: ParsingAdjunct | undefined
    let parsingAdjunctIndex: number | undefined

    for (let index = 0; index < words.length; index++) {
      let word = words[index]!

      // Advanced alphabetic characters
      if (word.startsWith("q")) {
        type Vowel = "a" | "ä" | "e" | "ë" | "i" | "o" | "ö" | "u" | "ü" | ""
        type Consonant =
          | "b"
          | "c"
          | "ç"
          | "č"
          | "d"
          | "ḑ"
          | "f"
          | "g"
          | "h"
          | "j"
          | "k"
          | "l"
          | "ļ"
          | "m"
          | "n"
          | "ň"
          | "p"
          | "r"
          | "ř"
          | "s"
          | "š"
          | "t"
          | "ţ"
          | "v"
          | "w"
          | "x"
          | "y"
          | "z"
          | "ž"
          | "ż"
          | "_"
          | ""
        type Articulation = "-" | "~" | "^" | ":" | "`" | "'" | '"' | "¿" | ""
        type Tone1 = "\\" | "|" | "/" | ">" | "<" | ""
        type Tone2 = "\\" | "|" | "/" | ">" | "<" | "_" | ""
        // special alphabetic character parsing
        const match = word.match(
          /^q([aäeëioöuü]?)([bcçčdḑfghjklļmnňprřsštţvwxyzžż_]?)([aäeëioöuü]?)([-~^:`'"¿]?)([\\|/><]?)([\\|/><_]?)$/,
        )

        // rules:
        // a single vowel is bottom by default
        // a single tone is right by default
        // an underscore consonant can shift the vowel
        // an underscore right tone can shift the main tone

        if (!match) {
          return {
            ok: false,
            reason: `Invalid advanced alphabetic word ${word}.`,
          }
        }

        const consonant = match[2]! as Consonant
        let topVowel = match[1]! as Vowel
        let bottomVowel = match[3]! as Vowel

        if (!consonant && topVowel && !bottomVowel) {
          bottomVowel = topVowel
          topVowel = ""
        }

        const articulation = match[4]! as Articulation
        let toneLeft = match[5]! as Tone1
        let toneRight = match[6]! as Tone2

        if (toneLeft && !toneRight) {
          toneRight = toneLeft
          toneLeft = ""
        }

        output.push({
          construct: AdvancedAlphabetic,
          handwritten,
          top: consonant == "" || consonant == "_" ? undefined : consonant,
          bottom: (
            {
              "-": "k",
              "~": "š",
              "^": "p",
              ":": "g",
              "`": "EXTENSION_GEMINATE",
              "'": "'",
              '"': "EJECTIVE",
              "¿": "VELARIZED",
              "": undefined,
            } as const
          )[articulation],
          superposed: topVowel == "" ? undefined : topVowel,
          underposed: bottomVowel == "" ? undefined : bottomVowel,
          left: (
            {
              "\\": "HORIZ_BAR",
              "|": "DOT",
              "/": "HORIZ_WITH_TOP_LINE",
              ">": "CURVE_TO_LEFT",
              "<": "CURVE_TO_RIGHT",
              "": undefined,
            } as const
          )[toneLeft],
          right: (
            {
              "\\": "HORIZ_BAR",
              "|": "DOT",
              "/": "HORIZ_WITH_TOP_LINE",
              ">": "CURVE_TO_LEFT",
              "<": "CURVE_TO_RIGHT",
              _: undefined,
              "": undefined,
            } as const
          )[toneRight],
        } satisfies ConstructableCharacter<AdvancedAlphabeticCharacter>)

        continue
      }

      // Other custom characters
      if (word.startsWith("Q")) {
        // Q1(formative whose primary will be shown)
        if (word[1] == "1") {
          const formative = parseFormative(word.slice(2))

          if (!formative) {
            return {
              ok: false,
              reason: `Q-primary ${word} is not a valid formative.`,
            }
          }

          output.push({
            construct: Primary,
            handwritten,
            specification: formative.specification,
            context: formative.context,
            bottom:
              formative.type == "UNF/C" ?
                formative.concatenationType == "none" ?
                  undefined
                : formative.concatenationType
              : formative.type,
            perspective: formative.ca?.perspective,
            extension: formative.ca?.extension,
            affiliation: formative.ca?.affiliation,
            essence: formative.ca?.essence,
            configuration: formative.ca?.configuration,
            function: formative.function,
            version: formative.version,
            stem: formative.stem,
          })

          continue
        }

        // Q2(EVE|CVV|VVC|V?CV?|VV|V̀)
        if (word[1] == "2") {
          output.push(
            ...textToSecondaries(word.slice(2), {
              handwritten,
              placeholder: "ALPHABETIC_PLACEHOLDER",
            }).map((secondary) => attachConstructor(secondary, Secondary)),
          )

          continue
        }

        // Q5(EVE|CVV|VVC|V?CV?|VV|V̀)
        if (word[1] == "5") {
          output.push(
            ...textToSecondaries(word.slice(2), {
              handwritten,
              placeholder: "ALPHABETIC_PLACEHOLDER",
            }).map((secondary) =>
              attachConstructor({ ...secondary, rotated: true }, Secondary),
            ),
          )

          continue
        }

        // Q3(VL)?(V[PEA])?V?([PEA]V)?(LV)?
        if (word[1] == "3") {
          const match = word.match(
            /^Q3(?:(ao|aö|eo|eö|oë|öe|oe|öa|oa)L)?([aäeëioöuü]{1,2}[PEA])?([aäeioöuü]|ëi)?([PEA][aäeëioöuü]{1,2})?(?:L(ao|aö|eo|eö|oë|öe|oe|öa|oa))?$/,
          )

          if (!match) {
            return {
              ok: false,
              reason: `Q-tertiary ${word} is not a valid Q3 word.`,
            }
          }

          const superposed = match[1] || ""
          const top = match[2] || ""
          const mid = match[3] || ""
          const bottom = match[4] || ""
          const underposed = match[5] || ""

          // I wrote this section much later than the original project, so I'm
          // hard-coding a table instead of using the appropriate parsing
          // functions. It's easy, and it works.

          const valenceTable: Record<string, Valence> = {
            a: "MNO",
            ä: "PRL",
            e: "CRO",
            i: "RCP",
            ëi: "CPL",
            ö: "DUP",
            o: "DEM",
            ü: "CNG",
            u: "PTI",
          }

          const levelTable: Record<string, Level> = {
            ao: "MIN",
            aö: "SBE",
            eo: "IFR",
            eö: "DFT",
            oë: "EQU",
            öe: "SUR",
            oe: "SPL",
            öa: "SPQ",
            oa: "MAX",
          }

          const phaseEffectTable: Record<string, TertiarySegmentName> = {
            ai: "PUN",
            au: "ITR",
            ei: "REP",
            eu: "ITM",
            ëu: "RCT",
            ou: "FRE",
            oi: "FRG",
            iu: "VAC",
            ui: "FLC",

            ia: "1:BEN",
            uä: "1:BEN",
            ie: "2:BEN",
            uë: "2:BEN",
            io: "3:BEN",
            üä: "3:BEN",
            iö: "SLF:BEN",
            üë: "SLF:BEN",
            eë: "UNK",
            uö: "SLF:DET",
            öë: "SLF:DET",
            uo: "3:DET",
            öä: "3:DET",
            ue: "2:DET",
            ië: "2:DET",
            ua: "1:DET",
            iä: "1:DET",
          }

          const aspectTable: Record<string, TertiarySegmentName> = {
            a: "RTR",
            ä: "PRS",
            e: "HAB",
            i: "PRG",
            ëi: "IMM",
            ö: "PCS",
            o: "REG",
            ü: "SMM",
            u: "ATP",

            ai: "RSM",
            au: "CSS",
            ei: "PAU",
            eu: "RGR",
            ëu: "PCL",
            ou: "CNT",
            oi: "ICS",
            iu: "EXP",
            ui: "IRP",

            ia: "PMP",
            uä: "PMP",
            ie: "CLM",
            uë: "CLM",
            io: "DLT",
            üä: "DLT",
            iö: "TMP",
            üë: "TMP",
            eë: "XPD",
            uö: "LIM",
            öë: "LIM",
            uo: "EPD",
            öä: "EPD",
            ue: "PTC",
            ië: "PTC",
            ua: "PPR",
            iä: "PPR",

            ao: "DCL",
            aö: "CCL",
            eo: "CUL",
            eö: "IMD",
            oë: "TRD",
            öe: "TNS",
            oe: "ITC",
            öa: "MTV",
            oa: "SQN",
          }

          const _throw = (x: string) => {
            throw new Error(x)
          }

          const valence =
            mid ?
              valenceTable[mid] || _throw(`Invalid Q3 valence ${mid}.`)
            : undefined

          const lowerEPA =
            bottom ?
              bottom.startsWith("A") ?
                aspectTable[bottom.slice(1)] ||
                _throw(`Invalid Q3 aspect ${bottom}.`)
              : phaseEffectTable[bottom.slice(1)] ||
                _throw(`Invalid Q3 phase/effect ${bottom}.`)
            : undefined

          const upperEPA =
            top ?
              top.endsWith("A") ?
                aspectTable[top.slice(0, -1)] ||
                _throw(`Invalid Q3 aspect ${top}.`)
              : phaseEffectTable[top.slice(0, -1)] ||
                _throw(`Invalid Q3 phase/effect ${top}.`)
            : undefined

          const lowerLevel =
            underposed ?
              levelTable[underposed] ||
              _throw(`Invalid Q3 level ${underposed}.`)
            : undefined

          const upperLevel =
            superposed ?
              levelTable[superposed] ||
              _throw(`Invalid Q3 level ${superposed}.`)
            : undefined

          output.push({
            construct: Tertiary,
            handwritten,
            absoluteLevel: upperLevel,
            top: upperEPA,
            valence,
            bottom: lowerEPA,
            relativeLevel: lowerLevel,
          })

          continue
        }

        // Q4(Hmood)?V(Hcasescope)?          V's stress determines case/ill+val
        if (word[1] == "4") {
          const match = word.match(
            /^Q4(h|hl|hr|hm|hn|hň)?([aáäâeéëêiíoóöôuúüû']{1,3})(h|hl|hr|hm|hn|hň)?$/,
          )

          if (!match) {
            return {
              ok: false,
              reason: `Q-quaternary ${word} is not a valid Q4 word.`,
            }
          }

          let isIllVal = false

          const vc = VowelForm.of(
            match[2]!.replace(/[áéíóúâêôû]/g, (x) => {
              isIllVal = true
              return (STRESSED_TO_UNSTRESSED_VOWEL_MAP as any)[x]
            }),
          )

          if (!vc) {
            return {
              ok: false,
              reason: `Q-quaternary ${word} doesn't have a valid Vc or Vk form.`,
            }
          }

          output.push({
            construct: Quaternary,
            handwritten,
            mood: match[1] ? parseMood(match[1])[0] : undefined,
            caseScope: match[3] ? parseCaseScope(match[3])[0] : undefined,
            value:
              isIllVal ?
                parseIllocutionValidation(vc)
              : parseCase(vc, vc.hasGlottalStop),
          })

          continue
        }

        // Q(A|IA?)[123]?[57]?V
        if (word[1] == "A" || word[1] == "I") {
          const match = word.match(
            /^Q(A|IA?)([123]?)([57]?)([aäeëioöuü']{1,3})$/,
          )

          if (!match) {
            return {
              ok: false,
              reason: `Q-accessor ${match} is not a valid QA-word.`,
            }
          }

          const vc = parseCase(VowelForm.parseOrThrow(match[4]!))

          output.push({
            construct: Quaternary,
            handwritten,
            type:
              match[2] == "2" ? 2
              : match[2] == "3" ? 3
              : 1,
            value: vc,
            isInverse: match[1] == "I" || match[1] == "IA",
            isSlotVIIAffix: match[3] == "7",
          })

          continue
        }

        if (word[1] == "N") {
          if (word.match(/^QN[0-9]+$/)) {
            output.push(
              ...numericAdjunctToNumerals(BigInt(word.slice(2)), handwritten),
            )

            continue
          } else {
            return {
              ok: false,
              reason: `Q-numeral ${word} is invalid.`,
            }
          }
        }

        return {
          ok: false,
          reason: `${word} starts with Q but isn't a valid Q-word.`,
        }
      }

      // Forced register adjuncts
      if (word.match(/^[hH][aeuoi]?[0123]$/)) {
        const [, mode, vowel, index] = word.match(/^([hH])([aeuoi]?)([0123])$/)!

        if (index == "0" && (vowel == "a" || vowel == "")) {
          return {
            ok: false,
            reason: "The registers h0 and ha0 don't exist.",
          }
        }

        output.push(
          attachConstructor<RegisterCharacter>(
            {
              handwritten,
              type: {
                a: "DSV" as const,
                e: "PNT" as const,
                i: "SPF" as const,
                o: "EXM" as const,
                u: "CGT" as const,
                "": "NRR" as const,
              }[vowel as "a" | "e" | "i" | "o" | "u" | ""],
              mode: (
                [
                  "standard",
                  "alphabetic",
                  "transcriptive",
                  "transliterative",
                ] as const
              )[index as "0" | "1" | "2" | "3"],
            },
            Register,
          ),
        )

        wordType = mode == "H" ? undefined : "forcedRegister"

        continue
      }

      // Forced register mode
      if (wordType == "forcedRegister") {
        output.push(
          ...textToSecondaries(word, {
            handwritten,
            placeholder: "ALPHABETIC_PLACEHOLDER",
          }).map((secondary) => attachConstructor(secondary, Secondary)),
        )

        continue
      }

      // Non-forced register mode
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

      if (
        parsingAdjunctIndex == index - 1 &&
        (parsingAdjunctStress == "ultimate" ||
          parsingAdjunctStress == "antepenultimate" ||
          parsingAdjunctStress == "penultimate")
      ) {
        try {
          if (parsingAdjunctStress == "penultimate") {
            word = transformWord(word).word
          } else {
            word = applyStress(
              transformWord(word).word,
              parsingAdjunctStress == "ultimate" ? -1 : -3,
            )
          }
        } catch {}
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
        } else if (has(ALL_PARSING_ADJUNCTS, result)) {
          parsingAdjunctStress = result
          parsingAdjunctIndex = index
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
              "vn1" in modifier ?
                modifier.type == "CONCAT"
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
 *
 * @param text The text to be converted.
 * @param options If a boolean, marks whether the outputted characters should be
 *   handwritten. Otherwise, an object marking properties about how to transform
 *   the text.
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
          (junctureAffix == "çç" ? "y" : (
            junctureAffix.slice(junctureAffix.startsWith("çë") ? 2 : 1)
          ))
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

/**
 * New script conversion norms
 *
 * {!flag} means {flag: false} or {flag: []} {=flag} means {flag: true} {flag?}
 * means {flag: flag} {flag¿} means {flag: !flag}
 *
 * Q(V?)(C?)(V?)([-~^:`'"¿]?)([/|><]{0,2}) Q1(formative whose primary will be
 * shown) Q2?(EVE|CVV|VVC|V?CV?|VV|V̀) Q3(VL)?(V[PEA])?V?([PEA]V)?(LV)?
 * Q4(Hmood)?V(Hcasescope)? V's stress determines case/ill+val
 * Q(A|IA?)[123]?[57]?V NV?\d{1,4}V?
 *
 * STATE: SELF (a list of self states based on current state)
 *
 * - STANDARD{carrier?, !adjuncts}
 * - SUPPLETIVE{register?}
 * - REGISTER
 *
 * STATE: GLOBAL (these are possible options in every state)
 *
 * - (word) (output) (next state)
 * - Q... adjuncts+alphabetic SELF
 * - Q1... adjuncts+primary SELF
 * - Q2?... adjuncts+secondary SELF
 * - Q3... adjuncts+tertiary SELF
 * - Q4... adjuncts+quaternary SELF
 * - Q(A|IA?)... adjuncts+accessor SELF
 * - QB... adjuncts+bias SELF
 * - (digits) adjuncts+numeral SELF
 * - N... adjuncts+numeral_adv SELF
 * - Hi adjuncts+register REGISTER_ONEWORD
 * - H[aeiou]?[0123]? adjuncts+register SELF
 * - H[aeiou]?[0123]? adjuncts+register REGISTER
 * - X[aeiou]?[0123]? adjuncts+register SUPPLETIVE{!register}
 * - X[aeiou]?[0123]? adjuncts+register SUPPLETIVE{=register}
 * - QS adjuncts STANDARD{!carrier, !adjuncts}
 * - QSC adjuncts STANDARD{=carrier, !adjuncts}
 * - QSS adjuncts SUPPLETIVE{!register}
 * - QSSR adjuncts SUPPLETIVE{=register}
 * - QSR adjuncts REGISTER
 *
 * STATE: STANDARD{carrier, adjuncts} (this is the default state)
 *
 * - (word) (output) (next state)
 * - Global states
 * - S... formative HUNT_REGISTER
 * - Hlas... formative STANDARD{=carrier}
 * - (child formative) formative+adjuncts STANDARD{carrier?, adjuncts?}
 * - (parent formative) formative+adjuncts STANDARD{!carrier, adjuncts?} if
 *   carrier=false
 * - (parent formative) formative HUNT_REGISTER if carrier=true
 * - (affix/mod adjunct) ———————— STANDARD{!carrier, adjuncts:
 *   adjuncts.with(this)}
 * - (bias adjunct) bias STANDARD{!carrier, adjuncts?}
 * - Hla/hmn/hna/hňa register REGISTER
 *
 * STATE: SUPPLETIVE{register}
 *
 * - Global states
 * - S... formative w/o -S- STANDARD{!carrier, !adjuncts} if register=false
 * - S... formative w/o -S- REGISTER if register=true
 * - STANDARD{!carrier, !adjuncts} if register=false
 * - REGISTER if register=false
 *
 * STATE: REGISTER (this state is for when writing alphabetics inside registers.
 * its goal is to write alphabetic characters while allowing global states to be
 * usable.)
 *
 * - @... secondaries REGISTER
 * - Global states
 * - ... secondaries REGISTER
 *
 * STATE: REGISTER_ONEWORD (this state is immediately after a lone "hi" adjunct.
 * its goal is to preserve the old just-one-word behavior.)
 *
 * - @... secondaries REGISTER
 * - Global states
 * - ... secondaries REGISTER
 *
 * STATE: HUNT_REGISTER (this state is immediately after carrier formatives. its
 * goal is to default to h1 but use other registers if provided)
 *
 * - Global states
 * - Register REGISTER
 */
