import { caToIthkuil, type PartialCA } from "../ca/index.js"
import {
  ALL_CASES,
  CASE_AFFIX_TO_CS_MAP,
  caseToIthkuil,
  type Case,
} from "../formative/slot-9/case.js"
import { deepFreeze } from "../helpers/deep-freeze.js"
import { STANDARD_VOWEL_TABLE } from "../helpers/vowel-table.js"
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
  type ReferentList,
} from "../referential/referent/index.js"
import { type AffixDegree } from "./degree.js"
import { type AffixType } from "./type.js"

export * from "./affixes.js"
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
      readonly referents?: undefined
      readonly case?: undefined
    }
  | {
      /** The Ca complex of this affix. */
      readonly ca: PartialCA

      readonly cs?: undefined
      readonly referents?: undefined
      readonly case?: undefined
    }
  | {
      /** The referents of this affix. */
      readonly referents: ReferentList

      /** The perspective of the referent. */
      readonly perspective?: "M" | "G" | "N" | undefined

      /** The case of the affix. */
      readonly case: ReferentialAffixCase

      readonly cs?: undefined
      readonly ca?: undefined
    }
  | {
      /** The case used in this case accessor affix. */
      readonly case: Case

      /** The type of the case accessor affix. */
      readonly type: AffixType

      /** Whether this affix is an inverse case-accessor affix. */
      readonly isInverse: boolean

      readonly cs?: undefined
      readonly ca?: undefined
      readonly referents?: undefined
    }
  | {
      /** The case used in this case accessor affix. */
      readonly case: Case

      readonly cs?: undefined
      readonly ca?: undefined
      readonly referents?: undefined
      readonly type?: undefined
    }

/** Metadata about the affix. */
export type AffixMetadata = {
  /** Whether or not the affix is in reversed form. */
  readonly reversed: boolean

  /** Whether to insert a glottal stop in the vowel form. */
  readonly insertGlottalStop?: boolean | undefined

  /** Whether the inserted glottal stop will be in word-final position. */
  readonly isGlottalStopWordFinal?: boolean | undefined
}

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
      : "referents" in affix && affix.referents
      ? REFERENTIAL_AFFIX_CASE_TO_ITHKUIL_MAP[affix.case ?? "THM"]
      : "case" in affix && affix.case
      ? caseToIthkuil(affix.case, false, true)
      : STANDARD_VOWEL_TABLE[affix.type][affix.degree],
  )

  if (metadata.insertGlottalStop) {
    vowel = vowel.insertGlottalStop(metadata.isGlottalStopWordFinal ?? false)
  }

  const consonant =
    "ca" in affix && affix.ca
      ? caToIthkuil(affix.ca)
      : "referents" in affix && affix.referents
      ? referentialAffixToIthkuil(affix.referents, affix.perspective ?? "M")
      : "case" in affix && affix.case
      ? ("type" in affix && affix.type
          ? CASE_AFFIX_TO_CS_MAP[`${affix.isInverse}`][affix.type]
          : "l") + (ALL_CASES.indexOf(affix.case) >= 36 ? "y" : "w")
      : affix.cs

  if (metadata.reversed) {
    return WithWYAlternative.of(consonant + vowel.withPreviousText(consonant))
  } else {
    return vowel.add(consonant)
  }
}
