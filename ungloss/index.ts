import {
  ALL_AFFILIATIONS,
  ALL_ASPECTS,
  ALL_CASES,
  ALL_CASE_SCOPES,
  ALL_CONFIGURATIONS,
  ALL_CONTEXTS,
  ALL_EFFECTS,
  ALL_ESSENCES,
  ALL_EXTENSIONS,
  ALL_ILLOCUTION_OR_VALIDATIONS,
  ALL_LEVELS,
  ALL_MOODS,
  ALL_PERSPECTIVES,
  ALL_PHASES,
  ALL_REFERENTIAL_AFFIX_CASES,
  ALL_REFERENT_TARGETS,
  ALL_SPECIFICATIONS,
  ALL_VALENCES,
  deepFreeze,
  has,
  referentObjectToReferent,
  toAffix,
  type Affiliation,
  type Affix,
  type AffixShortcut,
  type AffixType,
  type CA,
  type Case,
  type CaseScope,
  type Configuration,
  type Context,
  type Essence,
  type Extension,
  type Function,
  type IllocutionOrValidation,
  type Mood,
  type PartialCA,
  type PartialFormative,
  type PartialReferential,
  type Perspective,
  type Referent,
  type ReferentEffect,
  type ReferentList,
  type SlotIII,
  type Specification,
  type Stem,
  type SuppletiveAdjunctType,
  type VN,
  type Version,
} from "../generate/index.js"
import { any, anyText, charIn, seq, text } from "../parse/index.js"

const Consonant = charIn("pbtdkgfvţḑszšžçxhļcżčjmnňrlwyř")

const consonantSequenceRegex = Consonant.oneOrMore().matchEntireText().compile()

// Referents

const ReferentTarget = anyText(...ALL_REFERENT_TARGETS)

const Referent = seq(
  ReferentTarget,
  anyText(
    ".BEN",
    ".NEU",
    ".DET",
    ":BEN",
    ":NEU",
    ":DET",
    ".ben",
    ".neu",
    ".det",
    ":ben",
    ":neu",
    ":det",
  ).optional(),
)

const ReferentList = any(
  Referent,
  seq(text("["), Referent, seq(text("+"), Referent).zeroOrMore(), text("]")),
)

const referentListRegex = ReferentList.matchEntireText().compile()

const referentRegex = seq(
  text("("),
  Referent,
  seq(text("+"), Referent).zeroOrMore(),
  anyText("+M", "+G", "+N").optional(),
  text("-"),
  anyText(...ALL_REFERENTIAL_AFFIX_CASES),
  text(")"),
)
  .matchEntireText()
  .compile()

// Affixes

const TypelessAffix = seq(
  Consonant.oneOrMore(),
  text("/"),
  charIn("0123456789"),
)

const typelessAffixRegex = TypelessAffix.matchEntireText().compile()

const Affix = seq(
  Consonant.oneOrMore(),
  text("/"),
  charIn("0123456789"),
  charIn("123₁₂₃").optional(),
)

const affixRegex = Affix.matchEntireText().compile()

// Ca

const Affiliation = anyText(...ALL_AFFILIATIONS)
const Configuration = anyText(...ALL_CONFIGURATIONS)
const Extension = anyText(...ALL_EXTENSIONS)
const Perspective = anyText(...ALL_PERSPECTIVES)
const Essence = anyText(...ALL_ESSENCES)

const AnyCaslot = any(
  Affiliation,
  Configuration,
  Extension,
  Perspective,
  Essence,
)

const Ca = any(
  seq(charIn("Cc"), charIn("Aa")),
  seq(text("{"), charIn("Cc"), charIn("Aa"), text("}")),
  seq(AnyCaslot, seq(text("."), AnyCaslot).zeroOrMore()),
)

const caRegex = Ca.matchEntireText().compile()

// Case-Stacking Affixes

const Case = anyText(...ALL_CASES)

const caseRelatedRegex = seq(
  anyText("(acc:", "(ia:", "(case:", "("),
  Case,
  text(")"),
  charIn("123₁₂₃").optional(),
)
  .matchEntireText()
  .compile()

// General

const segmentSplitterRegex = seq(
  text("-"),
  seq(anyText(...ALL_REFERENTIAL_AFFIX_CASES), text(")")).not(),
).compile("g")

function parseCaseRelatedGloss(gloss: string): Affix {
  const original = gloss

  let isInverse = false
  let isStacking = false

  if (gloss.startsWith("(acc:")) {
    gloss = gloss.slice(5)
  } else if (gloss.startsWith("(ia:")) {
    isInverse = true
    gloss = gloss.slice(4)
  } else if (gloss.startsWith("(case:")) {
    isStacking = true
    gloss = gloss.slice(6)
  } else {
    isStacking = true
    gloss = gloss.slice(1)
  }

  let type: AffixType | undefined

  if (gloss.endsWith("2") || gloss.endsWith("₂")) {
    type = 2
    gloss = gloss.slice(0, -2)
  } else if (gloss.endsWith("3") || gloss.endsWith("₃")) {
    type = 3
    gloss = gloss.slice(0, -2)
  } else if (gloss.endsWith("1") || gloss.endsWith("₁")) {
    type = 1
    gloss = gloss.slice(0, -2)
  } else {
    gloss = gloss.slice(0, -1)
  }

  if (has(ALL_CASES, gloss)) {
    if (isStacking) {
      if (type) {
        throw new Error("Cannot specify a type on a case-stacking affix.")
      }

      return { case: gloss }
    }

    return {
      case: gloss,
      type: type ?? 1,
      isInverse,
    }
  }

  throw new Error("Invalid case-accessor gloss: '" + original + "'.")
}

function parseCaGloss(ca: string): PartialCA {
  if (["ca", "cA", "Ca", "CA", "{ca}", "{cA}", "{Ca}", "{CA}"].includes(ca)) {
    return {}
  }

  const segments = ca.split(".")

  let affiliation: Affiliation | undefined
  let configuration: Configuration | undefined
  let extension: Extension | undefined
  let perspective: Perspective | undefined
  let essence: Essence | undefined

  for (const segment of segments) {
    if (has(ALL_AFFILIATIONS, segment)) {
      if (affiliation) {
        throw new Error("Affiliation is specified twice in '" + ca + "'.")
      }

      affiliation = segment
    } else if (has(ALL_CONFIGURATIONS, segment)) {
      if (configuration) {
        throw new Error("Configuration is specified twice in '" + ca + "'.")
      }

      configuration = segment
    } else if (has(ALL_EXTENSIONS, segment)) {
      if (extension) {
        throw new Error("Extension is specified twice in '" + ca + "'.")
      }

      extension = segment
    } else if (has(ALL_PERSPECTIVES, segment)) {
      if (perspective) {
        throw new Error("Perspective is specified twice in '" + ca + "'.")
      }

      perspective = segment
    } else if (has(ALL_ESSENCES, segment)) {
      if (essence) {
        throw new Error("Essence is specified twice in '" + ca + "'.")
      }

      essence = segment
    }
  }

  return { affiliation, configuration, extension, perspective, essence }
}

function parseReferentGloss(referent: string): Referent {
  let effect: ReferentEffect = "NEU"

  if (referent.endsWith(".BEN") || referent.endsWith(":BEN")) {
    referent = referent.slice(0, -4)
    effect = "BEN"
  } else if (referent.endsWith(".DET") || referent.endsWith(":DET")) {
    referent = referent.slice(0, -4)
    effect = "DET"
  } else if (referent.endsWith(".NEU") || referent.endsWith(":NEU")) {
    referent = referent.slice(0, -4)
  }

  if (has(ALL_REFERENT_TARGETS, referent)) {
    return referentObjectToReferent({ target: referent, effect })
  }

  throw new Error("Invalid referent: '" + referent + "'.")
}

function parseReferentListGloss(list: string) {
  if (list.startsWith("[")) {
    list = list.slice(1, -1)
  }

  const referents = list.split("+")

  const result = referents.map(parseReferentGloss)

  return result as [Referent, ...Referent[]] as ReferentList
}

function parseAffixGloss(affix: string) {
  const [, cs, degreeString, typeString] =
    affix.match(/^([^/]+)\/(\d)([123₁₂₃]?)$/) || []

  if (!cs || !degreeString) {
    throw new Error("Invalid affix: '" + affix + "'.")
  }

  const degree = +degreeString as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

  const type =
    typeString == "2" || typeString == "₂"
      ? 2
      : typeString == "3" || typeString == "₃"
      ? 3
      : 1

  return { cs, degree, type }
}

function parseReferentialAffixGloss(affix: string): Affix {
  const original = affix

  affix = affix.slice(1, -1)

  const case_ = affix.slice(-3)

  if (!has(ALL_REFERENTIAL_AFFIX_CASES, case_)) {
    throw new Error("Invalid referential affix: '" + original + "'.")
  }

  affix = affix.slice(0, -4)

  if (affix.startsWith("[")) {
    affix = affix.slice(1)
  }

  if (affix.endsWith("]")) {
    affix = affix.slice(0, -1)
  }

  let perspective: "M" | "G" | "N" = "M"

  if (affix.endsWith("+M")) {
    affix = affix.slice(0, -2)
  } else if (affix.endsWith("+G")) {
    perspective = "G"
    affix = affix.slice(0, -2)
  } else if (affix.endsWith("+N")) {
    perspective = "N"
    affix = affix.slice(0, -2)
  }

  if (affix.endsWith("]")) {
    affix = affix.slice(0, -1)
  }

  const referents = affix.split("+").map(parseReferentGloss) as [
    Referent,
    ...Referent[],
  ] as ReferentList

  return {
    referents,
    perspective,
    case: case_,
  }
}

type TailSegment =
  | { type: "affix"; affix: Affix }
  | { type: "emptyCa" }
  | { type: "ca"; ca: PartialCA }
  | { type: "vn"; vn: VN }
  | { type: "mood"; mood: Mood }
  | { type: "caseScope"; caseScope: CaseScope }
  | { type: "viMood"; mood: Exclude<Mood, "FAC"> }
  | { type: "viCaseScope"; caseScope: Exclude<CaseScope, "CCN"> }
  | { type: "case"; case: Case }
  | { type: "vk"; vk: IllocutionOrValidation }

function tailSegmentToAffix(segment: TailSegment): Affix {
  if (segment.type == "affix") {
    return segment.affix
  }

  if (segment.type == "emptyCa") {
    return { ca: {} }
  }

  if (segment.type == "ca") {
    return { ca: segment.ca }
  }

  if (segment.type == "vn") {
    return toAffix(segment.vn)!
  }

  if (segment.type == "mood" || segment.type == "viMood") {
    if (segment.mood == "FAC") {
      throw new Error("FAC mood cannot be specified as an affix.")
    }

    return toAffix(segment.mood)!
  }

  if (segment.type == "caseScope" || segment.type == "viCaseScope") {
    if (segment.caseScope == "CCN") {
      throw new Error("CCN case-scope cannot be specified as an affix.")
    }

    return toAffix(segment.caseScope)!
  }

  if (segment.type == "case") {
    return { case: segment.case }
  }

  if (segment.type == "vk") {
    return toAffix(segment.vk)!
  }

  throw new Error("Invalid segment: '" + JSON.stringify(segment) + "'.")
}

const TYPE_3_REFERENTIAL_AFFIX_CASES = /* @__PURE__ */ deepFreeze([
  "POS",
  "PRP",
  "GEN",
  "ATT",
  "PDC",
  "ITP",
  "OGN",
  "IDP",
  "PAR",
])

function parseTailSegments(segments: readonly string[]) {
  return segments.map<TailSegment>((segment) => {
    if (
      segment.startsWith("{") &&
      segment.endsWith("}") &&
      has(ALL_MOODS, segment.slice(1, -1))
    ) {
      const mood = segment.slice(1, -1) as Mood

      if (mood == "FAC") {
        throw new Error("FAC mood cannot replace Slot VI.")
      }

      return { type: "viMood" as const, mood }
    }

    if (
      segment.startsWith("{") &&
      segment.endsWith("}") &&
      has(ALL_CASE_SCOPES, segment.slice(1, -1))
    ) {
      const caseScope = segment.slice(1, -1) as CaseScope

      if (caseScope == "CCN") {
        throw new Error("CCN case-scope cannot replace Slot VI.")
      }

      return { type: "viCaseScope" as const, caseScope }
    }

    if (segment.startsWith("(")) {
      segment = segment.slice(1, -1)

      if (caRegex.test(segment)) {
        return {
          type: "affix" as const,
          affix: { ca: parseCaGloss(segment) },
        }
      }

      if (
        has(ALL_VALENCES, segment) ||
        has(ALL_PHASES, segment) ||
        has(ALL_EFFECTS, segment) ||
        has(ALL_LEVELS, segment) ||
        has(ALL_ASPECTS, segment) ||
        has(ALL_MOODS, segment) ||
        has(ALL_CASE_SCOPES, segment) ||
        has(ALL_CASES, segment) ||
        has(ALL_ILLOCUTION_OR_VALIDATIONS, segment)
      ) {
        if (segment == "FAC") {
          throw new Error("FAC mood cannot be specified as an affix.")
        }

        if (segment == "CCN") {
          throw new Error("CCN case-scope cannot be specified as an affix.")
        }

        return {
          type: "affix" as const,
          affix: toAffix(segment)!,
        }
      }

      if (segment == "ASR") {
        return {
          type: "affix" as const,
          affix: toAffix("ASR")!,
        }
      }

      if (affixRegex.test(segment)) {
        return {
          type: "affix" as const,
          affix: parseAffixGloss(segment) as Affix,
        }
      }

      segment = "(" + segment + ")"

      if (caseRelatedRegex.test(segment)) {
        return {
          type: "affix" as const,
          affix: parseCaseRelatedGloss(segment),
        }
      }

      if (referentRegex.test(segment)) {
        return {
          type: "affix" as const,
          affix: parseReferentialAffixGloss(segment),
        }
      }

      throw new Error("Invalid formative tail segment: '" + segment + "'.")
    }

    if (caRegex.test(segment)) {
      if (
        ["ca", "cA", "Ca", "CA", "{ca}", "{cA}", "{Ca}", "{CA}"].includes(
          segment,
        )
      ) {
        return { type: "emptyCa" as const }
      }

      return {
        type: "ca" as const,
        ca: parseCaGloss(segment),
      }
    }

    if (
      has(ALL_VALENCES, segment) ||
      has(ALL_PHASES, segment) ||
      has(ALL_EFFECTS, segment) ||
      has(ALL_LEVELS, segment) ||
      has(ALL_ASPECTS, segment)
    ) {
      return {
        type: "vn" as const,
        vn: segment satisfies VN as VN,
      }
    }

    if (has(ALL_MOODS, segment)) {
      return {
        type: "mood" as const,
        mood: segment,
      }
    }

    if (has(ALL_CASE_SCOPES, segment)) {
      return {
        type: "caseScope" as const,
        caseScope: segment,
        priority: 1,
      }
    }

    if (has(ALL_CASES, segment)) {
      return {
        type: "case" as const,
        case: segment,
      }
    }

    if (has(ALL_ILLOCUTION_OR_VALIDATIONS, segment)) {
      return {
        type: "vk" as const,
        vk: segment,
      }
    }

    if (segment == "ASR") {
      return {
        type: "affix" as const,
        affix: toAffix("ASR")!,
      }
    }

    if (affixRegex.test(segment)) {
      return {
        type: "affix" as const,
        affix: parseAffixGloss(segment) as Affix,
      }
    }

    throw new Error("Invalid formative tail segment: '" + segment + "'.")
  })
}

function unglossTailSegments(
  segments: readonly string[],
  type: "UNF/C" | "UNF/K" | "FRM",
) {
  const affixes = parseTailSegments(segments)

  let case_: Case | undefined
  let illocutionValidation: IllocutionOrValidation | undefined

  const finalAffix = affixes.pop()

  if (type == "UNF/C" && finalAffix?.type == "vk") {
    type = "UNF/K"
    illocutionValidation = finalAffix.vk
  } else if (finalAffix?.type == "case") {
    case_ = finalAffix.case
  } else if (finalAffix) {
    affixes.push(finalAffix)
  }

  if (
    type == "UNF/C" &&
    !case_ &&
    affixes.some((x) => x.type == "mood" || x.type == "viMood") &&
    !affixes.some((x) => x.type == "viCaseScope" || x.type == "caseScope")
  ) {
    type = "UNF/K"
  }

  let mood: Mood | undefined
  let caseScope: CaseScope | undefined

  const secondToFinalAffix = affixes.pop()

  if (type == "UNF/K") {
    if (secondToFinalAffix?.type == "mood") {
      mood = secondToFinalAffix.mood
    } else if (secondToFinalAffix) {
      affixes.push(secondToFinalAffix)
    }
  } else {
    if (secondToFinalAffix?.type == "caseScope") {
      caseScope = secondToFinalAffix.caseScope
    } else if (secondToFinalAffix) {
      affixes.push(secondToFinalAffix)
    }
  }

  let vn: VN | undefined

  const thirdToFinalAffix = affixes.pop()

  if (thirdToFinalAffix?.type == "vn") {
    vn = thirdToFinalAffix.vn
  } else if (thirdToFinalAffix) {
    affixes.push(thirdToFinalAffix)
  }
  return { affixes, vn, mood, caseScope, case_, illocutionValidation, type }
}

/**
 * Parses a formative gloss string. Note that the syntax supported here is
 * different from that outputted by `glossWord`, as it is difficult to parse
 * something with that much complexity.
 * @param gloss The gloss to be parsed.
 * @returns The parsed formative.
 *
 * ## Supported Syntax
 *
 * The gloss should be several "segments" separated by hyphens, like so:
 * `DYN-l-CSV-c/3-ACT`.
 *
 * The segments should be separated into two parts: the head and the tail.
 *
 * ### The Head
 *
 * The head contains all slot I, II, III, and IV information. That is, it can
 * contain the following items (which may be written before or after the root).
 *
 * - Concatenation type, marked with `T1` or `T2`
 * - Version, marked with `PRC` or `CPT`
 * - Stem, marked with `S1`, `S2`, `S3`, or `S0`
 * - Function, marked with `STA` or `DYN`
 * - Specification, marked with `BSC`, `CTE`, `CSV`, or `OBJ`
 * - Context, marked with `EXS`, `RPS`, `FNC`, or `AMG`
 *
 * It must also contain a root for the formative, which can look like:
 *
 * - A plain root, such as `l` or `rr`
 * - An affixual root, such as `żč/3` or `çk/1`
 * - A single-referent root, such as `1m` or `Mx`
 * - A multi-referent root, such as `[1m+2m]` or `[Mx+Obv]`
 *
 * It may also have these items, but only before the root:
 *
 * - Affix shortcuts, marked with `(NEG/4)`, `(DCD/4)`, or `(DCD/5)`
 * - Ca shortcuts, marked with `Ca` (for a default Ca), `PRX`, `G`, `RPV`, `N`,
 * `A`, `PRX.RPV`, or `G.RPV`.
 *
 * The standard morphological restrictions apply, meaning that...
 *
 * - you may not specify a Ca shortcut with non-BSC specification, non-STA
 *   function, or non-EXS context.
 * - you may not specify an affixual-root formative with a Ca shortcut, non-BSC
 *   specification, or non-Stem 1.
 * - you may not specify a personal-reference root formative with a Ca shortcut
 *   other than [default] or PRX, non-STA function, or non-Stem 1.
 * - you may not specify a Ca shortcut and an affix shortcut.
 *
 * ### The Tail
 *
 * The tail contains all slot V, VI, VII, VIII, and IX information. That is, it
 * can contain the following items, which may be written _in any order_.
 *
 * - Affixes, such as `r/2`, `çk/1`, or `xč/7`. To specify affix type, add a
 *   second number, as in `r/23`, `çk/12`, or `xč/71`. Affix type defaults to 1.
 * - Ca information, such as `MSF`, `DFC.G.RPV`, or `COA.PRX`. To specify where
 *   the split between slot V and VII affixes should be when no Ca is present,
 *   or when it is specified as a Ca shortcut, write `Ca`, as in
 *   `G-l-r/2-Ca-cč/1`.
 * - Vn information, such as `2:BEN`, `RTR`, or `FLC`.
 * - Cn information, such as `CCA` or `HYP`.
 * - Case information, such as `ACT`, `ERG`, or `LOC`.
 * - Illocution information, such as `DIR` or `CNJ`.
 * - Validation information, such as `OBS` or `ITU`.
 * - Case-accessors, such as `(acc:ACT)`, `(acc:ERG)`, or `(acc:LOC)`.
 * - Inverse-accessors, such as `(ia:ACT)`, `(ia:ERG)`, or `(ia:LOC)`.
 * - Referential shortcuts, such as `(1m-THM)`, `(1m+2p-ERG)`, or
 *   `(ma.BEN+G-IND)`.
 *
 * To specify case-stacking affixes, just write multiple cases in the gloss.
 *
 * To force Ca, Vn, Cn, case, illocution, or validation information to be
 * represented as affixes, wrap them in parentheses. Case-accessors,
 * inverse-accessors, and referential shortcuts must always be wrapped in
 * parentheses.
 *
 * Scoping information will be inferred from the order of tail segments. That
 * is, writing `r/2-MSF` will first specify the `r/2` affix in slot V, followed
 * by MSF in slot VI. However, affixes will _not_ be reordered according to the
 * morphological restrictions on formatives. Instead, if segments are in an
 * order that cannot be accomodated using slot VIII and IX, they will instead be
 * rewritten to be affixes. For example, the gloss `l-OBS-c/1-ERG` will be
 * rewritten as `l-nļ/1-c/1-ERG`.
 *
 * If a Ca shortcut is present, the split between slots V and VII is determined
 * by the first "{Ca}" segment (that is, an empty Ca slot). If none is present,
 * all affixes are assumed to be in Slot VII.
 *
 * If no Ca shortcut is present, the split between slots V and VII is determined
 * by the following, in order of precedence:
 *
 * 1. The first curly-bracketed mood/case-scope (if no Vn is present).
 * 1. The first segment labeled "Ca" (that is, an empty Ca slot).
 * 2. The first unparenthesized non-empty Ca segment.
 *
 * If none of the above apply, all affixes are assumed to be in Slot VII.
 *
 * ## Shortcuts
 *
 * To specify a Ca shortcut, write the Ca before the main root. To specify an
 * affix shortcut, write (NEG/4), (DCD/4), or (DCD/5) before the main root. To
 * specify a mood/case-scope shortcut, surround the mood or case-scope with
 * curly brackets, as in `{HYP}` or `{CCV}`.
 *
 * ## Additional Notes
 *
 * We will assume that formative glosses are split into two main chunks: the
 * head and the tail. The head of a formative includes its concatenation type,
 * version, stem, root, specification, function, and context. The tail of a
 * formative includes affixes, Ca information, valence, phase, effect, level,
 * aspect, mood, case-scope, case, illocution, and validation.
 *
 * Why do we require this? All the information categorized as the head of a
 * formative is required to be there, and cannot be shifted in the word in an
 * way, whereas all the information categorized as the tail of a formative can
 * be rearranged using affixes. For ease of use, we allow all the information in
 * the head to be presented in any order, and they will be sorted properly, but
 * the information in the tail will attempt to keep the scoping order as close
 * to the input text as possible. That is, inputting a gloss of "ACT-G" will NOT
 * result in a formative with a Ca of G and a case of ACT, but a case-stacking
 * affix of ACT followed by a Ca of G.
 *
 * In addition, the algorithm for determining the placement of slot V vs. VII
 * affixes depends on having a main Ca slot. The main Ca slot is marked by a
 * standard Ca that is NOT surrounded by parentheses. The first such Ca is
 * treated as the main Ca. If a slot that says "{Ca}" is present, it is treated
 * as the main Ca. Ca forms can be marked as Ca-stacking through the use of
 * parentheses. If no main Ca form or "{Ca}" marking is present and a
 * non-default case-scope or mood is present which has not been placed into the
 * Cn slot, it will be treated as the main Ca slot, replacing the unmarked Ca.
 */
export function unglossFormative(gloss: string): PartialFormative {
  if (gloss.endsWith("\\FRM")) {
    gloss = gloss.slice(0, -4) + "-FRM"
  }

  const segments = gloss.split(segmentSplitterRegex)

  let concatenationType: 1 | 2 | undefined
  let version: Version | undefined
  let stem: Stem | undefined
  let affixShortcut: AffixShortcut | undefined
  let caShortcut: PartialCA | undefined
  let root: SlotIII | undefined
  let specification: Specification | undefined
  let function_: Function | undefined
  let context: Context | undefined

  let segment: string

  while ((segment = segments.shift()!)) {
    if (segment == null) {
      break
    }

    if (segment == "T1" || segment == "T2") {
      if (concatenationType) {
        throw new Error("Concatenation type is specified twice.")
      }

      concatenationType = segment[1] == "2" ? 2 : 1
    } else if (segment == "PRC" || segment == "CPT") {
      if (version) {
        throw new Error("Version is specified twice.")
      }

      version = segment
    } else if (
      segment == "S0" ||
      segment == "S1" ||
      segment == "S2" ||
      segment == "S3"
    ) {
      if (stem != null) {
        throw new Error("Stem is specified twice.")
      }

      stem = +segment[1]! as 0 | 1 | 2 | 3
    } else if (
      segment == "(NEG/4)" ||
      segment == "(DCD/4)" ||
      segment == "(DCD/5)"
    ) {
      if (affixShortcut || caShortcut) {
        if (root) {
          segments.unshift(segment)
          break
        }

        if (caShortcut) {
          throw new Error("Cannot specify a Ca shortcut and an affix shortcut.")
        } else {
          throw new Error("Affix shortcuts are specified twice.")
        }
      }

      affixShortcut =
        segment == "(DCD/4)"
          ? "DCD/4"
          : segment == "(DCD/5)"
          ? "DCD/5"
          : "NEG/4"
    } else if (has(ALL_SPECIFICATIONS, segment)) {
      if (specification) {
        throw new Error("Specification is specified twice.")
      }

      specification = segment
    } else if (segment == "STA" || segment == "DYN") {
      if (function_) {
        throw new Error("Function is specified twice.")
      }

      function_ = segment
    } else if (has(ALL_CONTEXTS, segment)) {
      if (context) {
        throw new Error("Context is specified twice.")
      }

      context = segment
    } else {
      if (caRegex.test(segment)) {
        if (root != null) {
          segments.unshift(segment)
          break
        }

        if (function_ == "DYN") {
          throw new Error("Cannot specify a Ca shortcut and non-STA function.")
        }

        if ((specification || "BSC") != "BSC") {
          throw new Error(
            "Cannot specify a Ca shortcut and non-BSC specification.",
          )
        }

        if ((context || "EXS") != "EXS") {
          throw new Error("Cannot specify a Ca shortcut and non-EXS context.")
        }

        if (affixShortcut) {
          throw new Error("Cannot specify a Ca shortcut and an affix shortcut.")
        }

        if (caShortcut) {
          throw new Error("Ca shortcuts are specified twice.")
        }

        const ca = parseCaGloss(segment)

        if (
          Array.isArray(root)
            ? // Specialized personal-reference formatives can only take [default] and PRX shortcuts.
              (ca.affiliation || "CSL") == "CSL" &&
              (ca.configuration || "UPX") == "UPX" &&
              (ca.perspective || "M") == "M" &&
              ca.essence != "RPV" &&
              (ca.extension == null ||
                ca.extension == "DEL" ||
                ca.extension == "PRX")
            : typeof root == "object"
            ? // Specialized Cs-root formatives cannot take Ca shortcuts.
              false
            : ((ca.affiliation || "CSL") == "CSL" &&
                (ca.configuration || "UPX") == "UPX" &&
                ((ca.extension || "DEL") == "DEL" || ca.extension == "PRX") &&
                (ca.perspective || "M") == "M") ||
              ((ca.affiliation || "CSL") == "CSL" &&
                (ca.configuration || "UPX") == "UPX" &&
                (ca.extension || "DEL") == "DEL" &&
                (ca.essence || "NRM") == "NRM") ||
              ((ca.affiliation || "CSL") == "CSL" &&
                (ca.configuration || "UPX") == "UPX" &&
                (ca.extension || "DEL") == "DEL" &&
                ca.perspective == "G" &&
                ca.essence == "RPV")
        ) {
          caShortcut = ca
        } else {
          throw new Error("Invalid Ca shortcut: '" + segment + "'.")
        }
      } else if (referentListRegex.test(segment)) {
        if (root) {
          segments.unshift(segment)
          break
        }

        root = parseReferentListGloss(segment)
      } else if (typelessAffixRegex.test(segment)) {
        if (root) {
          segments.unshift(segment)
          break
        }

        root = parseAffixGloss(segment)
      } else if (consonantSequenceRegex.test(segment)) {
        if (root) {
          throw new Error("Root was specified twice.")
        }

        root = segment
      } else {
        segments.unshift(segment)
        break
      }
    }
  }

  if (!root) {
    throw new Error("No root detected.")
  }

  if (caShortcut && function_ == "DYN") {
    throw new Error("Cannot specify a Ca shortcut and non-STA function.")
  }

  if (caShortcut && (specification || "BSC") != "BSC") {
    throw new Error("Cannot specify a Ca shortcut and non-BSC specification.")
  }

  if (caShortcut && (context || "EXS") != "EXS") {
    throw new Error("Cannot specify a Ca shortcut and non-EXS context.")
  }

  if (Array.isArray(root)) {
    if ((stem ?? 1) != 1) {
      throw new Error(
        "Cannot specify non-stem 1 on a specialized personal-reference root formative.",
      )
    }

    if (function_ == "DYN") {
      throw new Error(
        "Cannot specify non-STA function on a specialized personal-reference root formative.",
      )
    }

    if (caShortcut) {
      if (
        (caShortcut.affiliation || "CSL") != "CSL" ||
        (caShortcut.configuration || "UPX") != "UPX" ||
        (caShortcut.perspective || "M") != "M" ||
        caShortcut.essence == "RPV" ||
        !(
          caShortcut.extension == null ||
          caShortcut.extension == "DEL" ||
          caShortcut.extension == "PRX"
        )
      ) {
        throw new Error(
          "Invalid Ca shortcut on a specialized personal-reference root formative. Only [default] and PRX are allowed.",
        )
      }
    }
  } else if (typeof root == "object") {
    if (stem != null) {
      throw new Error(
        "Cannot specify stem on a specialized affixual-root formative.",
      )
    }

    if ((specification || "BSC") != "BSC") {
      throw new Error(
        "Cannot specify non-BSC specification on a specialized affixual-root formative.",
      )
    }

    if (caShortcut) {
      throw new Error(
        "Cannot specify a Ca shortcut on a specialized affixual-root formative.",
      )
    }
  }

  if (affixShortcut && caShortcut) {
    throw new Error("Cannot specify an affix shortcut and a Ca shortcut.")
  }

  let type: "UNF/C" | "UNF/K" | "FRM" = "UNF/C"

  if (segments[segments.length - 1] == "FRM") {
    type = "FRM"
    segments.pop()
  }

  const tail = unglossTailSegments(segments, type)
  let { affixes, vn, mood, caseScope, case_, illocutionValidation } = tail
  ;({ type } = tail)

  let isUsingSlotVIIIShortcut = false
  let slotVAffixes: Affix[] | undefined
  let ca: PartialCA
  let slotVIIAffixes: Affix[] | undefined

  if (caShortcut) {
    ca = caShortcut

    const splitIndex = affixes.findIndex((x) => x.type == "emptyCa")

    if (splitIndex == -1) {
      slotVIIAffixes = affixes.map(tailSegmentToAffix)
    } else {
      slotVAffixes = affixes.slice(0, splitIndex).map(tailSegmentToAffix)
      slotVIIAffixes = affixes.slice(splitIndex + 1).map(tailSegmentToAffix)
    }
  } else {
    let splitIndex

    const emptyCaSplitIndex = affixes.findIndex((x) => x.type == "emptyCa")

    if (emptyCaSplitIndex != -1) {
      splitIndex = emptyCaSplitIndex
      ca = {}
    } else {
      const caSplitIndex = affixes.findIndex((x) => x.type == "ca")

      if (caSplitIndex != -1) {
        splitIndex = caSplitIndex
        ca = (affixes[caSplitIndex] as { ca: CA }).ca
      } else {
        ca = {}

        if (type == "UNF/K") {
          if (!vn && !mood) {
            const moodSplitIndex = affixes.findIndex((x) => x.type == "viMood")

            if (moodSplitIndex != -1) {
              splitIndex = moodSplitIndex
              isUsingSlotVIIIShortcut = true
              mood = (affixes[moodSplitIndex] as { mood: Mood }).mood
            }
          }
        } else {
          if (!vn && !caseScope) {
            const caseScopeSplitIndex = affixes.findIndex(
              (x) => x.type == "viCaseScope",
            )

            if (caseScopeSplitIndex != -1) {
              splitIndex = caseScopeSplitIndex
              isUsingSlotVIIIShortcut = true
              caseScope = (
                affixes[caseScopeSplitIndex] as { caseScope: CaseScope }
              ).caseScope
            }
          }
        }
      }
    }

    if (splitIndex == -1 || splitIndex == null) {
      slotVIIAffixes = affixes.map(tailSegmentToAffix)
    } else {
      slotVAffixes = affixes.slice(0, splitIndex).map(tailSegmentToAffix)
      slotVIIAffixes = affixes.slice(splitIndex + 1).map(tailSegmentToAffix)
    }
  }

  if (
    slotVAffixes &&
    slotVAffixes.length != 1 &&
    slotVAffixes.some(
      (affix) =>
        affix.referents && has(TYPE_3_REFERENTIAL_AFFIX_CASES, affix.case),
    )
  ) {
    throw new Error(
      "Cannot mix a referential affix with " +
        slotVAffixes.find(
          (affix) =>
            affix.referents && has(TYPE_3_REFERENTIAL_AFFIX_CASES, affix.case),
        )?.case +
        " case with other affixes in slot V.",
    )
  }

  if (
    slotVIIAffixes &&
    slotVIIAffixes.length != 1 &&
    slotVIIAffixes.some(
      (affix) =>
        affix.referents && has(TYPE_3_REFERENTIAL_AFFIX_CASES, affix.case),
    )
  ) {
    throw new Error(
      "Cannot mix a referential affix with " +
        slotVIIAffixes.find(
          (affix) =>
            affix.referents && has(TYPE_3_REFERENTIAL_AFFIX_CASES, affix.case),
        )?.case +
        " case with other affixes in slot VII.",
    )
  }

  return {
    type,
    shortcut: caShortcut
      ? "IV/VI"
      : affixShortcut && isUsingSlotVIIIShortcut
      ? "VII+VIII"
      : affixShortcut
      ? "VII"
      : isUsingSlotVIIIShortcut
      ? "VIII"
      : false,
    concatenationType,
    version,
    stem,
    root,
    specification,
    function: function_,
    context,
    slotVAffixes,
    ca,
    slotVIIAffixes,
    vn,
    mood,
    caseScope,
    case: case_,
    illocutionValidation,
  }
}

const PlusPerspective = anyText("+M", "+G", "+N", "+A")

const referentialReferentRegex = any(
  seq(Referent, PlusPerspective.optional()),
  seq(
    text("["),
    Referent,
    seq(text("+"), Referent).zeroOrMore(),
    PlusPerspective.optional(),
    text("]"),
  ),
  seq(
    text("["),
    Referent,
    seq(text("+"), Referent).zeroOrMore(),
    text("]"),
    PlusPerspective.optional(),
  ),
)
  .matchEntireText()
  .compile()

function parseReferentialReferentGloss(gloss: string) {
  let perspective: Perspective | undefined

  if (gloss.startsWith("[")) {
    gloss = gloss.slice(1)
  }

  if (gloss.endsWith("]")) {
    gloss = gloss.slice(0, -1)
  }

  if (
    gloss.endsWith("+M") ||
    gloss.endsWith("+G") ||
    gloss.endsWith("+N") ||
    gloss.endsWith("+A")
  ) {
    perspective = gloss.slice(-1) as Perspective
    gloss = gloss.slice(0, -2)
  }

  if (gloss.endsWith("]")) {
    gloss = gloss.slice(0, -1)
  }

  const referents = gloss.split("+").map(parseReferentGloss) as [
    Referent,
    ...Referent[],
  ]

  return [referents as ReferentList, perspective] as const
}

/**
 * Parses a referential gloss string. Note that the syntax supported here is
 * different from that outputted by `glossWord`, as it is difficult to parse
 * something with that much complexity.
 * @param gloss The gloss to be parsed.
 * @returns The parsed referential.
 *
 * ## Syntax
 *
 * The referential should be a list of segments separated by hyphens. The first
 * segment must either be a referent, `[CAR]`, `[QUO]`, `[NAM]`, or `[PHR]`. The
 * exact details of referent syntax are below.
 *
 * Because there are three different kinds of referentials, there is a different
 * "layout" for each.
 *
 * To create a single referential, specify an initial segment and two optional
 * cases. Examples include `1m`, `[2m+ma]+A-ERG`, and `Rdp-ERG-EFF`.
 *
 * To create a dual referential, specify an initial segment, two cases, and
 * another referent. Examples include `1m-ERG-AFF-2m` and `ma+N-LOC-IND-1m`.
 *
 * To create a combination referential, specify an initial segment, an optional
 * case, an optional specification, and then any formative tail segments, such
 * as affixes or Ca, Vn, Cn, Vc, or Vk information.
 *
 * ## Referent Syntax
 *
 * A single referent is a target, such as `1m`, `2m`, `2p`, `ma`, `mi`, `pa`,
 * `pi`, `Mx`, `Rdp`, `Obv`, or `PVS`, optionally followed by `.BEN` or `.DET`.
 * Examples include `1m`, `2m.DET`, and `Obv.BEN`.
 *
 * A referent list is multiple referents enclosed in square brackets separated
 * by plus signs, as in `[1m+2m]` and `[Mx.BEN+Obv.DET+ma]`.
 *
 * A full referent may either be a referent list or a referent list with an
 * optional perspective inside square brackets, such as `1m`, `[1m+2m]`,
 * `[ma.BEN+G]`, or `[2m+pi.DET+N]`.
 */
export function unglossReferential(gloss: string): PartialReferential {
  let essence: Essence = "NRM"

  if (gloss.endsWith("\\RPV")) {
    gloss = gloss.slice(0, -4)
    essence = "RPV"
  }

  const segments = gloss.split(segmentSplitterRegex)

  const firstSegment = segments.shift()!

  let type: SuppletiveAdjunctType | undefined
  let referents: ReferentList | undefined
  let perspective: Perspective | undefined

  if (
    firstSegment == "[CAR]" ||
    firstSegment == "[QUO]" ||
    firstSegment == "[NAM]" ||
    firstSegment == "[PHR]"
  ) {
    type = firstSegment.slice(1, -1) as SuppletiveAdjunctType
  } else {
    ;[referents, perspective] = parseReferentialReferentGloss(firstSegment)
  }

  const core = type ? { type } : { referents: referents!, perspective }

  const secondSegment = segments.shift()

  if (!secondSegment) {
    return { ...core, essence }
  }

  let case_: Case | undefined

  if (has(ALL_CASES, secondSegment)) {
    case_ = secondSegment

    if (segments.length == 1 && has(ALL_CASES, segments[0])) {
      return {
        ...core,
        case: case_,
        case2: segments[0],
        essence,
      }
    }

    if (
      segments.length == 2 &&
      has(ALL_CASES, segments[0]) &&
      segments[1] &&
      referentialReferentRegex.test(segments[1])
    ) {
      const [referents2, perspective2] = parseReferentialReferentGloss(
        segments[1],
      )

      return {
        ...core,
        essence,
        case: case_,
        case2: segments[0],
        referents2,
        perspective2,
      }
    }
  } else {
    segments.unshift(secondSegment)
  }

  let case2: Case | undefined
  let specification: Specification | undefined

  const thirdSegment = segments.shift()

  if (has(ALL_SPECIFICATIONS, thirdSegment)) {
    specification = thirdSegment
  } else if (thirdSegment) {
    segments.unshift(thirdSegment)
  }

  const finalSegment = segments.pop()

  if (has(ALL_CASES, finalSegment)) {
    case2 = finalSegment
  } else if (finalSegment) {
    segments.push(finalSegment)
  }

  return {
    ...core,
    essence,
    case: case_,
    specification,
    affixes: parseTailSegments(segments).map(tailSegmentToAffix),
    case2,
  }
}
