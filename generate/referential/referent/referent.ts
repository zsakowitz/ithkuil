import { deepFreeze } from "../../helpers/deep-freeze.js"
import { type ReferentEffect } from "./effect.js"
import { type ReferentTarget } from "./target.js"

/** A referent. */
export type Referent =
  | "1m:NEU"
  | "1m:BEN"
  | "1m:DET"
  | "2m:NEU"
  | "2m:BEN"
  | "2m:DET"
  | "2p:NEU"
  | "2p:BEN"
  | "2p:DET"
  | "ma:NEU"
  | "ma:BEN"
  | "ma:DET"
  | "pa:NEU"
  | "pa:BEN"
  | "pa:DET"
  | "mi:NEU"
  | "mi:BEN"
  | "mi:DET"
  | "pi:NEU"
  | "pi:BEN"
  | "pi:DET"
  | "Mx:NEU"
  | "Mx:BEN"
  | "Mx:DET"
  | "Rdp:NEU"
  | "Rdp:BEN"
  | "Rdp:DET"
  | "Obv:NEU"
  | "Obv:BEN"
  | "Obv:DET"
  | "PVS:NEU"
  | "PVS:BEN"
  | "PVS:DET"

/** An array containing all referents. */
export const ALL_REFERENTS: readonly Referent[] = /* @__PURE__ */ deepFreeze([
  "1m:NEU",
  "1m:BEN",
  "1m:DET",
  "2m:NEU",
  "2m:BEN",
  "2m:DET",
  "2p:NEU",
  "2p:BEN",
  "2p:DET",
  "ma:NEU",
  "ma:BEN",
  "ma:DET",
  "pa:NEU",
  "pa:BEN",
  "pa:DET",
  "mi:NEU",
  "mi:BEN",
  "mi:DET",
  "pi:NEU",
  "pi:BEN",
  "pi:DET",
  "Mx:NEU",
  "Mx:BEN",
  "Mx:DET",
  "Rdp:NEU",
  "Rdp:BEN",
  "Rdp:DET",
  "Obv:NEU",
  "Obv:BEN",
  "Obv:DET",
  "PVS:NEU",
  "PVS:BEN",
  "PVS:DET",
])

/** An object mapping referents into their Ithkuilic counterparts. */
export const REFERENT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  /**
   * The `false` branch is used in referentials and personal-reference roots.
   */
  false: {
    "1m:NEU": "l",
    "1m:BEN": "r",
    "1m:DET": "ř",
    "2m:NEU": "s",
    "2m:BEN": "š",
    "2m:DET": "ž",
    "2p:NEU": "n",
    "2p:BEN": "t",
    "2p:DET": "d",
    "ma:NEU": "m",
    "ma:BEN": "p",
    "ma:DET": "b",
    "pa:NEU": "ň",
    "pa:BEN": "k",
    "pa:DET": "g",
    "mi:NEU": "z",
    "mi:BEN": "ţ",
    "mi:DET": "ḑ",
    "pi:NEU": "ż",
    "pi:BEN": "f",
    "pi:DET": "v",
    "Mx:NEU": "c",
    "Mx:BEN": "č",
    "Mx:DET": "j",
    "Rdp:NEU": "th",
    "Rdp:BEN": "ph",
    "Rdp:DET": "kh",
    "Obv:NEU": "ll",
    "Obv:BEN": "rr",
    "Obv:DET": "řř",
    "PVS:NEU": "mm",
    "PVS:BEN": "nn",
    "PVS:DET": "ňň",
  },

  /** The `true` branch is used in referential affixes. */
  true: {
    "1m:NEU": "l",
    "1m:BEN": "r",
    "1m:DET": "ř",
    "2m:NEU": "s",
    "2m:BEN": "š",
    "2m:DET": "ž",
    "2p:NEU": "n",
    "2p:BEN": "t",
    "2p:DET": "d",
    "ma:NEU": "m",
    "ma:BEN": "p",
    "ma:DET": "b",
    "pa:NEU": "ň",
    "pa:BEN": "k",
    "pa:DET": "g",
    "mi:NEU": "z",
    "mi:BEN": "ţ",
    "mi:DET": "ḑ",
    "pi:NEU": "ż",
    "pi:BEN": "f",
    "pi:DET": "v",
    "Mx:NEU": "c",
    "Mx:BEN": "č",
    "Mx:DET": "j",
    "Rdp:NEU": "th",
    "Rdp:BEN": "ph",
    "Rdp:DET": "kh",
    "Obv:NEU": "lç",
    "Obv:BEN": "rç",
    "Obv:DET": "řç",
    "PVS:NEU": "mç",
    "PVS:BEN": "nç",
    "PVS:DET": "ňç",
  },
})

/**
 * Converts a referent into Ithkuil.
 * @param referent The referent to be converted.
 * @param isReferentialAffix Whether this referent is used in a referential
 * affix.
 * @returns Romanized Ithkuilic text representing the referent.
 */
export function referentToIthkuil(
  referent: Referent,
  isReferentialAffix: boolean,
): string {
  return REFERENT_TO_ITHKUIL_MAP[`${isReferentialAffix}`][referent]
}

/** A deconstructed referent expressed as an object. */
export type ReferentObject = {
  /** The target of the referent. */
  readonly target: ReferentTarget

  /** The effect of the referent. */
  readonly effect: ReferentEffect
}

/** An object mapping from referents to their referent objects. */
export const REFERENT_TO_REFERENT_OBJECT_MAP = /* @__PURE__ */ deepFreeze({
  "1m:NEU": { target: "1m", effect: "NEU" },
  "1m:BEN": { target: "1m", effect: "BEN" },
  "1m:DET": { target: "1m", effect: "DET" },
  "2m:NEU": { target: "2m", effect: "NEU" },
  "2m:BEN": { target: "2m", effect: "BEN" },
  "2m:DET": { target: "2m", effect: "DET" },
  "2p:NEU": { target: "2p", effect: "NEU" },
  "2p:BEN": { target: "2p", effect: "BEN" },
  "2p:DET": { target: "2p", effect: "DET" },
  "ma:NEU": { target: "ma", effect: "NEU" },
  "ma:BEN": { target: "ma", effect: "BEN" },
  "ma:DET": { target: "ma", effect: "DET" },
  "pa:NEU": { target: "pa", effect: "NEU" },
  "pa:BEN": { target: "pa", effect: "BEN" },
  "pa:DET": { target: "pa", effect: "DET" },
  "mi:NEU": { target: "mi", effect: "NEU" },
  "mi:BEN": { target: "mi", effect: "BEN" },
  "mi:DET": { target: "mi", effect: "DET" },
  "pi:NEU": { target: "pi", effect: "NEU" },
  "pi:BEN": { target: "pi", effect: "BEN" },
  "pi:DET": { target: "pi", effect: "DET" },
  "Mx:NEU": { target: "Mx", effect: "NEU" },
  "Mx:BEN": { target: "Mx", effect: "BEN" },
  "Mx:DET": { target: "Mx", effect: "DET" },
  "Rdp:NEU": { target: "Rdp", effect: "NEU" },
  "Rdp:BEN": { target: "Rdp", effect: "BEN" },
  "Rdp:DET": { target: "Rdp", effect: "DET" },
  "Obv:NEU": { target: "Obv", effect: "NEU" },
  "Obv:BEN": { target: "Obv", effect: "BEN" },
  "Obv:DET": { target: "Obv", effect: "DET" },
  "PVS:NEU": { target: "PVS", effect: "NEU" },
  "PVS:BEN": { target: "PVS", effect: "BEN" },
  "PVS:DET": { target: "PVS", effect: "DET" },
})

/** An object mapping from referent targets to their names. */
export const REFERENT_TARGET_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  "1m": "Speaker",
  "2m": "Monadic Addressee",
  "2p": "Polyadic Addressee",
  ma: "Animate Third Party",
  pa: "Animate Third Parties",
  mi: "Inanimate Third Party",
  pi: "Inanimate Third Parties",
  Mx: "Mixed Third Parties",
  Rdp: "Reduplicative",
  Obv: "Obviative",
  PVS: "Provisional",
} satisfies Record<ReferentTarget, string>)

/**
 * Deconstructs an referent into its separate components.
 * @param referent The referent to be deconstructed.
 * @returns An object containing the effect and target of the original
 * referent.
 */
export function referentToReferentObject(referent: Referent): ReferentObject {
  return REFERENT_TO_REFERENT_OBJECT_MAP[referent]
}

/**
 * Reconstructs a referent object into a single referent.
 * @param referentObject The referent to be reconstructed.
 * @returns A string representing the effect and target of the object.
 */
export function referentObjectToReferent(
  referentObject: ReferentObject,
): Referent {
  return `${referentObject.target}:${referentObject.effect}`
}
