import { caToIthkuil, type PartialCA } from "../ca/index.js"
import { deepFreeze } from "../helpers/deep-freeze.js"
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
  type Referrent,
} from "../referential/index.js"
import type { AffixDegree } from "./degree.js"
import type { AffixType } from "./type.js"

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
      readonly referrent?: undefined
    }
  | {
      /** The Ca complex of this affix. */
      readonly ca: PartialCA

      readonly referrent?: undefined
    }
  | {
      /** The referrent of this affix. */
      readonly referrent: Referrent

      /** The perspective of the referrent. */
      readonly perspective?: "M" | "G" | "N" | undefined

      /** The case of the affix. */
      readonly case: ReferentialAffixCase

      readonly ca?: undefined
    }

/** Metadata about the affix. */
export type AffixMetadata = {
  /** Whether or not the affix is in reversed form. */
  reversed: boolean
}

/**
 * Converts an affix into Ithkuil.
 * @param affix The affix to be converted.
 * @param metadata Metadata about the affix.
 * @returns Romanized Ithkuilic text representing the affix.
 */
export function affixToIthkuil(
  affix: Affix,
  metadata: AffixMetadata
): WithWYAlternative {
  let vowel = WithWYAlternative.of(
    "ca" in affix && affix.ca
      ? "üö"
      : "referrent" in affix && affix.referrent
      ? REFERENTIAL_AFFIX_CASE_TO_ITHKUIL_MAP[affix.case ?? "THM"]
      : ONE_INDEXED_STANDARD_VOWEL_TABLE[(affix.type - 1) as 0 | 1 | 2][
          affix.degree
        ]
  )

  const consonant =
    "ca" in affix && affix.ca
      ? caToIthkuil(affix.ca)
      : "referrent" in affix && affix.referrent
      ? referentialAffixToIthkuil(affix.referrent, affix.perspective ?? "M")
      : affix.cs

  if (metadata.reversed) {
    return WithWYAlternative.of(consonant + vowel.withPreviousText(consonant))
  } else {
    return vowel.add(consonant)
  }
}
