import { deepFreeze } from "../../helpers/deep-freeze.js"
import { type ReferentEffect } from "./effect.js"
import { type ReferentTarget } from "./target.js"

/** A referent. */
export type Referent =
  | "1m:NEU"
  | "2m:NEU"
  | "2p:NEU"
  | "ma:NEU"
  | "pa:NEU"
  | "mi:NEU"
  | "pi:NEU"
  | "Mx:NEU"
  | "Rdp:NEU"
  | "Obv:NEU"
  | "PVS:NEU"
  | "1m:BEN"
  | "2m:BEN"
  | "2p:BEN"
  | "ma:BEN"
  | "pa:BEN"
  | "mi:BEN"
  | "pi:BEN"
  | "Mx:BEN"
  | "Rdp:BEN"
  | "Obv:BEN"
  | "PVS:BEN"
  | "1m:DET"
  | "2m:DET"
  | "2p:DET"
  | "ma:DET"
  | "pa:DET"
  | "mi:DET"
  | "pi:DET"
  | "Mx:DET"
  | "Rdp:DET"
  | "Obv:DET"
  | "PVS:DET"

/** An array containing all referents. */
export const ALL_REFERENTS: readonly Referent[] = /* @__PURE__ */ deepFreeze([
  "1m:NEU",
  "2m:NEU",
  "2p:NEU",
  "ma:NEU",
  "pa:NEU",
  "mi:NEU",
  "pi:NEU",
  "Mx:NEU",
  "Rdp:NEU",
  "Obv:NEU",
  "PVS:NEU",
  "1m:BEN",
  "2m:BEN",
  "2p:BEN",
  "ma:BEN",
  "pa:BEN",
  "mi:BEN",
  "pi:BEN",
  "Mx:BEN",
  "Rdp:BEN",
  "Obv:BEN",
  "PVS:BEN",
  "1m:DET",
  "2m:DET",
  "2p:DET",
  "ma:DET",
  "pa:DET",
  "mi:DET",
  "pi:DET",
  "Mx:DET",
  "Rdp:DET",
  "Obv:DET",
  "PVS:DET",
])

/** An object mapping referents into their Ithkuilic counterparts. */
export const REFERENT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  /**
   * The `false` branch is used in referentials and personal-reference roots.
   */
  false: {
    "1m:NEU": "l",
    "2m:NEU": "s",
    "2p:NEU": "n",
    "ma:NEU": "m",
    "pa:NEU": "ň",
    "mi:NEU": "z",
    "pi:NEU": "ż",
    "Mx:NEU": "c",
    "Rdp:NEU": "th",
    "Obv:NEU": "ll",
    "PVS:NEU": "mm",
    "1m:BEN": "r",
    "2m:BEN": "š",
    "2p:BEN": "t",
    "ma:BEN": "p",
    "pa:BEN": "k",
    "mi:BEN": "ţ",
    "pi:BEN": "f",
    "Mx:BEN": "č",
    "Rdp:BEN": "ph",
    "Obv:BEN": "rr",
    "PVS:BEN": "nn",
    "1m:DET": "ř",
    "2m:DET": "ž",
    "2p:DET": "d",
    "ma:DET": "b",
    "pa:DET": "g",
    "mi:DET": "ḑ",
    "pi:DET": "v",
    "Mx:DET": "j",
    "Rdp:DET": "kh",
    "Obv:DET": "řř",
    "PVS:DET": "ňň",
  },

  /** The `true` branch is used in referential affixes. */
  true: {
    "1m:NEU": "l",
    "2m:NEU": "s",
    "2p:NEU": "n",
    "ma:NEU": "m",
    "pa:NEU": "ň",
    "mi:NEU": "z",
    "pi:NEU": "ż",
    "Mx:NEU": "c",
    "Rdp:NEU": "th",
    "Obv:NEU": "lç",
    "PVS:NEU": "mç",
    "1m:BEN": "r",
    "2m:BEN": "š",
    "2p:BEN": "t",
    "ma:BEN": "p",
    "pa:BEN": "k",
    "mi:BEN": "ţ",
    "pi:BEN": "f",
    "Mx:BEN": "č",
    "Rdp:BEN": "ph",
    "Obv:BEN": "rç",
    "PVS:BEN": "nç",
    "1m:DET": "ř",
    "2m:DET": "ž",
    "2p:DET": "d",
    "ma:DET": "b",
    "pa:DET": "g",
    "mi:DET": "ḑ",
    "pi:DET": "v",
    "Mx:DET": "j",
    "Rdp:DET": "kh",
    "Obv:DET": "řç",
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
  "2m:NEU": { target: "2m", effect: "NEU" },
  "2p:NEU": { target: "2p", effect: "NEU" },
  "ma:NEU": { target: "ma", effect: "NEU" },
  "pa:NEU": { target: "pa", effect: "NEU" },
  "mi:NEU": { target: "mi", effect: "NEU" },
  "pi:NEU": { target: "pi", effect: "NEU" },
  "Mx:NEU": { target: "Mx", effect: "NEU" },
  "Rdp:NEU": { target: "Rdp", effect: "NEU" },
  "Obv:NEU": { target: "Obv", effect: "NEU" },
  "PVS:NEU": { target: "PVS", effect: "NEU" },
  "1m:BEN": { target: "1m", effect: "BEN" },
  "2m:BEN": { target: "2m", effect: "BEN" },
  "2p:BEN": { target: "2p", effect: "BEN" },
  "ma:BEN": { target: "ma", effect: "BEN" },
  "pa:BEN": { target: "pa", effect: "BEN" },
  "mi:BEN": { target: "mi", effect: "BEN" },
  "pi:BEN": { target: "pi", effect: "BEN" },
  "Mx:BEN": { target: "Mx", effect: "BEN" },
  "Rdp:BEN": { target: "Rdp", effect: "BEN" },
  "Obv:BEN": { target: "Obv", effect: "BEN" },
  "PVS:BEN": { target: "PVS", effect: "BEN" },
  "1m:DET": { target: "1m", effect: "DET" },
  "2m:DET": { target: "2m", effect: "DET" },
  "2p:DET": { target: "2p", effect: "DET" },
  "ma:DET": { target: "ma", effect: "DET" },
  "pa:DET": { target: "pa", effect: "DET" },
  "mi:DET": { target: "mi", effect: "DET" },
  "pi:DET": { target: "pi", effect: "DET" },
  "Mx:DET": { target: "Mx", effect: "DET" },
  "Rdp:DET": { target: "Rdp", effect: "DET" },
  "Obv:DET": { target: "Obv", effect: "DET" },
  "PVS:DET": { target: "PVS", effect: "DET" },
})

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
