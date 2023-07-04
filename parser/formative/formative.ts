import type { Affix } from "../../generator/affix/index.js"
import type {
  PartialFormative,
  SlotIII,
} from "../../generator/formative/index.js"
import {
  cnShortcutFormative,
  nonShortcutFormative,
  shortcutFormative,
} from "../lex/index.js"
import { parseReferentList } from "../referential/referent-list.js"
import { type Stress } from "../transform.js"
import { VowelForm } from "../vowel-form.js"
import { parseAffix } from "./affix.js"
import { parseCa, parseGeminatedCa } from "./ca.js"
import { parseCaseScope } from "./case-scope.js"
import { parseCase } from "./case.js"
import { parseIllocutionValidation } from "./illocution-validation.js"
import { parseMood } from "./mood.js"
import { parseAspect, parseNonAspectualVn } from "./vn.js"

const VV_TO_STEM = [undefined, 1, 1, 2, 2, undefined, 0, 0, 3, 3] as const

const VV_TO_VERSION = [
  undefined,
  "PRC",
  "CPT",
  "PRC",
  "CPT",
  undefined,
  "CPT",
  "PRC",
  "CPT",
  "PRC",
] as const

const VV_TO_CA_SHORTCUT = {
  w: [
    undefined,
    {},
    { perspective: "G" },
    { perspective: "N" },
    { perspective: "G", essence: "RPV" },
  ],
  y: [
    undefined,
    { extension: "PRX" },
    { essence: "RPV" },
    { perspective: "A" },
    { extension: "PRX", essence: "RPV" },
  ],
} as const

const VV_TO_VII_SHORTCUT = [
  undefined,
  undefined,
  { cs: "r", type: 1, degree: 4 },
  { cs: "t", type: 1, degree: 4 },
  { cs: "t", type: 1, degree: 5 },
] as const

const VR_SEQUENCE_TO_CONTEXT = [undefined, "EXS", "FNC", "RPS", "AMG"] as const

const VR_TO_SPECIFICATION = [
  undefined,
  "BSC",
  "CTE",
  "CSV",
  "OBJ",
  undefined,
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

/**
 * Builds a non-shortcut formative.
 * @param word The word to be built.
 * @param stress The stress of the formative.
 * @returns Either a parsed `PartialFormative` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the formative was
 * successfully tokenized but had another error in it (e.g. invalid Vn slot,
 * invalid referential affix, etc.).
 */
export function buildNonShortcutFormative(
  word: string,
  stress: Stress,
): PartialFormative | undefined {
  const match = nonShortcutFormative.exec(word)

  if (!match) {
    return
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

  let root: SlotIII
  let affixShortcut

  const vr = VowelForm.of(match[4]!)

  if (vr == null) {
    throw new Error("Invalid Vr slot: " + match[4] + ".")
  }

  if (vv?.degree == 5) {
    root = {
      cs: match[3]!,
      degree: vr.degree,
    }
  } else if (vv?.degree == 0 && (vv.sequence == 1 || vv.sequence == 2)) {
    root = parseReferentList(match[3]!)
  } else if (vv?.degree == 0) {
    throw new Error("Invalid Vv slot: " + vv + ".")
  } else {
    root = match[3]!

    if (vv) {
      affixShortcut = VV_TO_VII_SHORTCUT[vv.sequence]
    }
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

    shortcut: affixShortcut ? "VII" : false,
    stem: typeof root == "object" ? undefined : vv ? VV_TO_STEM[vv.degree] : 1,
    version: Array.isArray(root)
      ? vv?.sequence == 1
        ? "PRC"
        : "CPT"
      : typeof root == "object"
      ? undefined
      : vv
      ? VV_TO_VERSION[vv.degree]
      : "PRC",

    root,

    context: VR_SEQUENCE_TO_CONTEXT[vr.sequence],
    specification:
      typeof root == "object" ? undefined : VR_TO_SPECIFICATION[vr.degree],
    function:
      typeof root == "object" ? undefined : vr.degree < 5 ? "STA" : "DYN",

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

/**
 * Builds a formative with a Cn shortcut (where Cn replaces Ca).
 * @param word The word to be built.
 * @param stress The stress of the formative.
 * @returns Either a parsed `PartialFormative` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the formative was
 * successfully tokenized but had another error in it (e.g. invalid Vn slot,
 * invalid referential affix, etc.).
 */
export function buildCnShortcutFormative(
  word: string,
  stress: Stress,
): PartialFormative | undefined {
  const match = cnShortcutFormative.exec(word)

  if (!match) {
    return
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

  let root: SlotIII
  let affixShortcut

  const vr = VowelForm.of(match[4]!)

  if (vr == null) {
    throw new Error("Invalid Vr slot: " + match[4] + ".")
  }

  if (vv?.degree == 5) {
    root = {
      cs: match[3]!,
      degree: vr.degree,
    }
  } else if (vv?.degree == 0 && (vv.sequence == 1 || vv.sequence == 2)) {
    root = parseReferentList(match[3]!)
  } else if (vv?.degree == 0) {
    throw new Error("Invalid Vv slot: " + vv + ".")
  } else {
    root = match[3]!

    if (vv) {
      affixShortcut = VV_TO_VII_SHORTCUT[vv.sequence]
    }
  }

  const cn = match[5]!

  const mood = type == "UNF/K" ? parseMood(cn)[0] : undefined
  const caseScope = type != "UNF/K" ? parseCaseScope(cn)[0] : undefined

  let slotVIIAffixes = match[6] ? parseAffixes(match[6]) : undefined

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

    shortcut: affixShortcut ? "VII+VIII" : "VIII",
    stem: typeof root == "object" ? undefined : vv ? VV_TO_STEM[vv.degree] : 1,
    version: vv
      ? Array.isArray(root)
        ? vv.sequence == 1
          ? "PRC"
          : "CPT"
        : VV_TO_VERSION[vv.degree]
      : "PRC",

    root,

    context: VR_SEQUENCE_TO_CONTEXT[vr.sequence],
    specification:
      typeof root == "object" ? undefined : VR_TO_SPECIFICATION[vr.degree],
    function:
      typeof root == "object" ? undefined : vr.degree < 5 ? "STA" : "DYN",

    slotVIIAffixes,

    mood,
    caseScope,

    case:
      type == "UNF/K"
        ? undefined
        : match[7]
        ? parseCase(
            VowelForm.parseOrThrow(match[7]),
            concatenationType
              ? stress == "ultimate"
              : match[7]?.includes("'") ||
                  match[6]?.includes("'") ||
                  vr.hasGlottalStop,
          )
        : undefined,

    illocutionValidation:
      type != "UNF/K"
        ? undefined
        : match[7]
        ? parseIllocutionValidation(VowelForm.parseOrThrow(match[7]))
        : undefined,
  }
}

/**
 * Builds a shortcut formative.
 * @param word The word to be built.
 * @param stress The stress of the formative.
 * @returns Either a parsed `PartialFormative` indicating a success, or
 * `undefined` indicating a tokenization failure. Throws if the formative was
 * successfully tokenized but had another error in it (e.g. invalid Vn slot,
 * invalid referential affix, etc.).
 */
export function buildShortcutFormative(
  word: string,
  stress: Stress,
): PartialFormative | undefined {
  const match = shortcutFormative.exec(word)

  if (!match) {
    return
  }

  const concatenationType =
    match[1] == "hl" || match[1] == "hm"
      ? 1
      : match[1] == "hr" || match[1] == "hn"
      ? 2
      : undefined

  const shortcutType =
    match[1] == "w" || match[1] == "hl" || match[1] == "hr" ? "w" : "y"

  const type = concatenationType
    ? "UNF/C"
    : stress == "ultimate" || stress == "monosyllabic"
    ? "UNF/K"
    : stress == "antepenultimate"
    ? "FRM"
    : "UNF/C"

  const vv = VowelForm.of(match[2]!)

  if (
    vv == null ||
    vv.degree == 5 ||
    (vv.degree == 0 && (vv.sequence == 3 || vv.sequence == 4))
  ) {
    throw new Error("Invalid Vv slot: " + match[2] + ".")
  }

  let root: SlotIII

  if (vv.degree == 0) {
    root = parseReferentList(match[3]!)
  } else {
    root = match[3]!
  }

  const vn_ = match[6]
  const cn = match[7]

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

  const slotVIIAffixes = match[5] ? parseAffixes(match[5]) : undefined

  return {
    type,

    concatenationType,

    shortcut: "IV/VI",
    stem: Array.isArray(root) ? undefined : VV_TO_STEM[vv.degree],
    version: Array.isArray(root)
      ? vv.sequence == 1
        ? "PRC"
        : "CPT"
      : VV_TO_VERSION[vv.degree],

    root,

    slotVAffixes: match[4] ? parseAffixes(match[4]) : [],

    ca: {
      ...VV_TO_CA_SHORTCUT[shortcutType][Array.isArray(root) ? 1 : vv.sequence],
    },

    slotVIIAffixes,

    mood,
    caseScope,
    vn,

    case:
      type == "UNF/K"
        ? undefined
        : match[8]
        ? parseCase(
            VowelForm.parseOrThrow(match[8]),
            concatenationType ? stress == "ultimate" : match[8].includes("'"),
          )
        : undefined,

    illocutionValidation:
      type != "UNF/K"
        ? undefined
        : match[8]
        ? parseIllocutionValidation(VowelForm.parseOrThrow(match[8]))
        : undefined,
  }
}
