import {
  nonShortcutFormative,
  parseAffix,
  parseCaseScope,
  parseIllocutionValidation,
  parseMood,
  type Affix,
  type PartialFormative,
} from "../../index.js"
import { type Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"
import { parseCa, parseGeminatedCa } from "./ca.js"
import { parseCase } from "./case.js"
import { parseAspect, parseNonAspectualVn } from "./vn.js"

const VV_TO_STEM = [, 1, 1, 2, 2, , 0, 0, 3, 3] as const

const VV_TO_VERSION = [
  ,
  "PRC",
  "CPT",
  "PRC",
  "CPT",
  ,
  "CPT",
  "PRC",
  "CPT",
  "PRC",
] as const

const VV_TO_CA_SHORTCUT = {
  w: [
    ,
    {},
    { perspective: "G" },
    { perspective: "N" },
    { perspective: "G", essence: "RPV" },
  ],
  y: [
    ,
    { extension: "PRX" },
    { essence: "RPV" },
    { perspective: "A" },
    { extension: "PRX", essence: "RPV" },
  ],
} as const

const VV_TO_VII_SHORTCUT = [
  ,
  ,
  { cs: "r", type: 1, degree: 4 },
  { cs: "t", type: 1, degree: 4 },
  { cs: "t", type: 1, degree: 5 },
] as const

const VR_SEQUENCE_TO_CONTEXT = [, "EXS", "FNC", "RPS", "AMG"] as const

const VR_TO_SPECIFICATION = [
  ,
  "BSC",
  "CTE",
  "CSV",
  "OBJ",
  ,
  "OBJ",
  "CSV",
  "CTE",
  "BSC",
] as const

const AFFIX_REGEX = /([aeiouäëöü']+)([^aeiouäëöü']+)/g

function parseAffixes(text: string) {
  if (text == "") {
    return []
  }

  const output: Affix[] = []

  let match

  while ((match = AFFIX_REGEX.exec(text))) {
    output.push(
      parseAffix(
        VowelForm.parseOrThrow(match[1]!),
        match[2]!,
        output.length == 0 && AFFIX_REGEX.lastIndex == text.length,
      ),
    )
  }

  return output
}

const REVERSED_AFFIX_REGEX = /([^aeiouäëöü']+)([aeiouäëöü']+)/g

function parseReversedAffixes(text: string) {
  if (text == "") {
    return []
  }

  const output: Affix[] = []

  let match

  while ((match = REVERSED_AFFIX_REGEX.exec(text))) {
    output.push(
      parseAffix(
        VowelForm.parseOrThrow(match[2]!),
        match[1]!,
        output.length == 0 && AFFIX_REGEX.lastIndex == text.length,
      ),
    )
  }

  return output
}

export function buildNonShortcutFormative(
  word: string,
  stress: Stress,
): PartialFormative {
  const match = nonShortcutFormative.exec(word)

  if (!match) {
    throw new Error("Failed to parse " + match + ".")
  }

  const concatenationType =
    match[1] == "h" ? 1 : match[1] == "hw" ? 2 : undefined

  const type = concatenationType
    ? "UNF/C"
    : stress == "ultimate" || stress == "monosyllabic"
    ? "UNF/K"
    : stress == "antepenultimate"
    ? "FRM"
    : "UNF/C"

  const vv = match[2] ? VowelForm.of(match[2]) : undefined

  if (match[2] && vv == null) {
    throw new Error("Invalid Vv slot: " + match[2] + ".")
  }

  const affixShortcut = vv ? VV_TO_VII_SHORTCUT[vv.sequence] : undefined

  const vr = VowelForm.of(match[4]!)

  if (vr == null) {
    throw new Error("Invalid Vr slot: " + match[4] + ".")
  }

  const vn_ = match[9]
  const cn = match[10]

  let mood, caseScope, vn

  if (cn && vn_) {
    let isAspectual = false

    if (type == "UNF/K") {
      ;[mood, isAspectual] = parseMood(cn)
    } else {
      ;[caseScope, isAspectual] = parseCaseScope(cn)
    }

    const form = VowelForm.of(vn_)

    if (form == null) {
      throw new Error("Invalid Vn form: " + form + ".")
    }

    if (isAspectual) {
      vn = parseAspect(form)
    } else {
      vn = parseNonAspectualVn(form)
    }
  }

  let slotVIIAffixes = match[8] ? parseAffixes(match[8]) : undefined

  if (affixShortcut) {
    if (slotVIIAffixes) {
      slotVIIAffixes.push(affixShortcut)
    } else {
      slotVIIAffixes = [affixShortcut]
    }
  }

  return {
    type,

    concatenationType,

    stem: vv ? VV_TO_STEM[vv.degree] : 1,
    version: vv ? VV_TO_VERSION[vv.degree] : "PRC",

    root: match[3]!,

    context: VR_SEQUENCE_TO_CONTEXT[vr.sequence],
    specification: VR_TO_SPECIFICATION[vr.degree],
    function: vr.degree < 5 ? "STA" : "DYN",

    slotVAffixes: match[5] ? parseReversedAffixes(match[5]) : [],

    ca: match[6] ? parseGeminatedCa(match[6]) : parseCa(match[7]!),

    slotVIIAffixes,

    mood,
    caseScope,
    vn,

    case:
      type == "UNF/K"
        ? undefined
        : match[11]
        ? parseCase(
            VowelForm.parseOrThrow(match[11]),
            concatenationType
              ? stress == "ultimate"
              : match[11]?.includes("'") ||
                  vv?.hasGlottalStop ||
                  match[5]?.includes("'") ||
                  match[7]?.includes("'") ||
                  vn_?.includes("'") ||
                  vr.hasGlottalStop,
          )
        : undefined,

    illocutionValidation:
      type != "UNF/K"
        ? undefined
        : match[11]
        ? parseIllocutionValidation(VowelForm.parseOrThrow(match[11]))
        : undefined,
  }
}
