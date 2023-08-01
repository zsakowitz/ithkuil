import type { Essence } from "./essence.js"
import type { Perspective } from "./perspective.js"

/**
 * Converts a perspective and essence pair into Ithkuil.
 * @param perspective The perspective to be converted.
 * @param essence The essence to be converted.
 * @param isStandalone Whether or not Perspective & Essence are the only slots
 * present in the Ca affix complex.
 * @param isPrecededByKPT Whether or not this slot is preceded by K, P, or T.
 * @returns Romanized Ithkuilic text representing the perspective and essence.
 */
export function perspectiveAndEssenceToIthkuil(
  perspective: Perspective,
  essence: Essence,
  isStandalone: boolean,
  isPrecededByKPT: boolean,
): string {
  if (perspective == "G") {
    return essence == "RPV" ? "ř" : "r"
  }

  if (perspective == "M") {
    return essence == "RPV"
      ? isStandalone
        ? "tļ"
        : "l"
      : isStandalone
      ? "l"
      : ""
  }

  if (essence == "NRM") {
    return perspective == "N"
      ? isStandalone
        ? "v"
        : "w"
      : isStandalone
      ? "j"
      : "y"
  }

  return perspective == "N"
    ? isPrecededByKPT
      ? "h"
      : "m"
    : isPrecededByKPT
    ? "ç"
    : "n"
}
