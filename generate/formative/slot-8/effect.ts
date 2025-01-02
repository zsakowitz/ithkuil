import { deepFreeze } from "../../helpers/deep-freeze.js"
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
} from "../../helpers/with-wy-alternative.js"

/** An effect. */
export type Effect =
  | "1:BEN"
  | "2:BEN"
  | "3:BEN"
  | "SLF:BEN"
  | "UNK"
  | "SLF:DET"
  | "3:DET"
  | "2:DET"
  | "1:DET"

/** An array containing all effects. */
export const ALL_EFFECTS: readonly Effect[] = /* @__PURE__ */ deepFreeze([
  "1:BEN",
  "2:BEN",
  "3:BEN",
  "SLF:BEN",
  "UNK",
  "SLF:DET",
  "3:DET",
  "2:DET",
  "1:DET",
])

/**
 * An object mapping effects to their `WithWYAlternative` Ithkuilic
 * translations.
 */
export const EFFECT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  "1:BEN": IA_UÄ,
  "2:BEN": IE_UË,
  "3:BEN": IO_ÜÄ,
  "SLF:BEN": IÖ_ÜË,
  UNK: /* @__PURE__ */ WithWYAlternative.of("eë"),
  "SLF:DET": UÖ_ÖË,
  "3:DET": UO_ÖÄ,
  "2:DET": UE_IË,
  "1:DET": UA_IÄ,
})

/** An object mapping effects to their names. */
export const EFFECT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  "1:BEN": "Beneficial to Speaker",
  "2:BEN": "Beneficial to Addressee",
  "3:BEN": "Beneficial to 3rd Party",
  "SLF:BEN": "Beneficial to Self",
  UNK: "Unknown",
  "SLF:DET": "Detrimental to Self",
  "3:DET": "Detrimental to Third Party",
  "2:DET": "Detrimental to Addressee",
  "1:DET": "Detrimental to Speaker",
})

/**
 * Converts an effect into Ithkuil.
 *
 * @param effect The effect to be converted.
 * @returns A `WithWYAlternative` containing romanized Ithkuilic text
 *   representing the effect.
 */
export function effectToIthkuil(effect: Effect) {
  return EFFECT_TO_ITHKUIL_MAP[effect]
}

/** An effect represented as an object. */
export type EffectObject =
  | {
      /** The effect: beneficial, detrimental, or unknown. */
      readonly effect: "BEN" | "DET"

      /** The target of the effect. */
      readonly target: 1 | 2 | 3 | "SLF"
    }
  | {
      /** The effect: beneficial, detrimental, or unknown. */
      readonly effect: "UNK"

      readonly target?: undefined
    }

/** An object mapping from effects to their deconstructed objects. */
export const EFFECT_TO_EFFECT_OBJECT_MAP = /* @__PURE__ */ deepFreeze({
  "1:BEN": { effect: "BEN", target: 1 },
  "2:BEN": { effect: "BEN", target: 2 },
  "3:BEN": { effect: "BEN", target: 3 },
  "SLF:BEN": { effect: "BEN", target: "SLF" },
  UNK: { effect: "UNK" },
  "SLF:DET": { effect: "DET", target: "SLF" },
  "3:DET": { effect: "DET", target: 3 },
  "2:DET": { effect: "DET", target: 2 },
  "1:DET": { effect: "DET", target: 1 },
})

/**
 * Deconstructs an effect into its separate components.
 *
 * @param effect The effect to be deconstructed.
 * @returns An object containing the effect and target of the original effect.
 */
export function effectToEffectObject(effect: Effect): EffectObject {
  return EFFECT_TO_EFFECT_OBJECT_MAP[effect]
}

/**
 * Reconstructs an effect object into a single effect.
 *
 * @param effectObject The effect to be reconstructed.
 * @returns A string representing the effect and target of the object.
 */
export function effectObjectToEffect(effectObject: EffectObject): Effect {
  if (effectObject.effect == "UNK") {
    return "UNK"
  }

  return `${effectObject.target}:${effectObject.effect}`
}
