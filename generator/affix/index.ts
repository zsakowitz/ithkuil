import { boolean, object, oboolean, string, undefined, union } from "zod"
import { caToIthkuil, zodPartialCA, type PartialCA } from "../ca/index.js"
import { deepFreeze } from "../helpers/deep-freeze.js"
import { Enum } from "../helpers/enum.js"
import { ONE_INDEXED_STANDARD_VOWEL_TABLE } from "../helpers/vowel-table.js"
import {
  IA_UÄ,
  IE_UË,
  IO_ÜÄ,
  IÖ_ÜË,
  UA_IÄ,
  UE_IË,
  UO_ÖÄ,
  UÖ_ÖË,
  WithWYAlternative,
} from "../helpers/with-wy-alternative.js"
import {
  referentialAffixToIthkuil,
  zodReferent,
  type Referent,
} from "../referential/index.js"
import { zodAffixDegree, type AffixDegree } from "./degree.js"
import { zodAffixType, type AffixType } from "./type.js"

export * from "./degree.js"
export * from "./type.js"

/** Cases allowed in referential affixes. */
export type ReferentialAffixCase =
  | "THM"
  | "INS"
  | "ABS"
  | "AFF"
  | "STM"
  | "EFF"
  | "ERG"
  | "DAT"
  | "IND"
  | "POS"
  | "PRP"
  | "GEN"
  | "ATT"
  | "PDC"
  | "ITP"
  | "OGN"
  | "IDP"
  | "PAR"

/** An array containing all referential affix cases. */
export const ALL_REFERENTIAL_AFFIX_CASES = /* @__PURE__ */ deepFreeze([
  "THM",
  "INS",
  "ABS",
  "AFF",
  "STM",
  "EFF",
  "ERG",
  "DAT",
  "IND",

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

/** A Zod validator matching referential affix cases. */
export const zodReferentialAffixCase = /* @__PURE__ */ new Enum(
  ALL_REFERENTIAL_AFFIX_CASES,
)

/**
 * An object mapping from referential affix cases to their Ithkuilic
 * translations.
 */
const REFERENTIAL_AFFIX_CASE_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  THM: "ao",
  INS: "aö",
  ABS: "eo",
  AFF: "eö",
  STM: "oë",
  EFF: "öe",
  ERG: "oe",
  DAT: "öa",
  IND: "oa",

  POS: IA_UÄ,
  PRP: IE_UË,
  GEN: IO_ÜÄ,
  ATT: IÖ_ÜË,
  PDC: "eë",
  ITP: UÖ_ÖË,
  OGN: UO_ÖÄ,
  IDP: UE_IË,
  PAR: UA_IÄ,
})

/** An affix. */
export type Affix =
  | {
      /** The type of the affix. */
      readonly type: AffixType

      /** The degree of the affix. */
      readonly degree: AffixDegree

      /** The consonantal form of the affix. */
      readonly cs: string

      readonly ca?: undefined
      readonly referent?: undefined
    }
  | {
      /** The Ca complex of this affix. */
      readonly ca: PartialCA

      readonly referent?: undefined
    }
  | {
      /** The referent of this affix. */
      readonly referent: Referent

      /** The perspective of the referent. */
      readonly perspective?: "M" | "G" | "N" | undefined

      /** The case of the affix. */
      readonly case: ReferentialAffixCase

      readonly ca?: undefined
    }

/** A Zod validator matching affixes. */
export const zodAffix = /* @__PURE__ */ union([
  /* @__PURE__ */ object({
    type: zodAffixType,
    degree: zodAffixDegree,
    cs: /* @__PURE__ */ string(),
    ca: /* @__PURE__ */ undefined().optional(),
    referent: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    ca: zodPartialCA,
    referent: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    referent: zodReferent,
    perspective: /* @__PURE__ */ new Enum(["M", "G", "N"]).optional(),
    case: zodReferentialAffixCase,
    ca: /* @__PURE__ */ undefined().optional(),
  }),
])

/** Metadata about the affix. */
export type AffixMetadata = {
  /** Whether or not the affix is in reversed form. */
  reversed: boolean

  /** Whether to insert a glottal stop in the vowel form. */
  insertGlottalStop?: boolean

  /** Whether the inserted glottal stop will be in word-final position. */
  isGlottalStopWordFinal?: boolean
}

/** A Zod validator matching affixes. */
export const zodAffixMetadata = /* @__PURE__ */ object({
  reversed: /* @__PURE__ */ boolean(),
  insertGlottalStop: /* @__PURE__ */ oboolean(),
  isGlottalStopWordFinal: /* @__PURE__ */ oboolean(),
})

/**
 * Converts an affix into Ithkuil.
 * @param affix The affix to be converted.
 * @param metadata Metadata about the affix.
 * @returns Romanized Ithkuilic text representing the affix.
 */
export function affixToIthkuil(
  affix: Affix,
  metadata: AffixMetadata,
): WithWYAlternative {
  let vowel = WithWYAlternative.of(
    "ca" in affix && affix.ca
      ? "üö"
      : "referent" in affix && affix.referent
      ? REFERENTIAL_AFFIX_CASE_TO_ITHKUIL_MAP[affix.case ?? "THM"]
      : ONE_INDEXED_STANDARD_VOWEL_TABLE[(affix.type - 1) as 0 | 1 | 2][
          affix.degree
        ],
  )

  if (metadata.insertGlottalStop) {
    vowel = vowel.insertGlottalStop(metadata.isGlottalStopWordFinal ?? false)
  }

  const consonant =
    "ca" in affix && affix.ca
      ? caToIthkuil(affix.ca)
      : "referent" in affix && affix.referent
      ? referentialAffixToIthkuil(affix.referent, affix.perspective ?? "M")
      : affix.cs

  if (metadata.reversed) {
    return WithWYAlternative.of(consonant + vowel.withPreviousText(consonant))
  } else {
    return vowel.add(consonant)
  }
}
