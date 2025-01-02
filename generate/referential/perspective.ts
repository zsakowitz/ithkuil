import type { Perspective } from "../ca/index.js"
import { deepFreeze } from "../helpers/deep-freeze.js"

/** An object mapping from perspectives to letters used in referents. */
export const REFERENTIAL_PERSPECTIVE_TO_ITHKUIL_MAP =
  /* @__PURE__ */ deepFreeze({
    M: "",
    G: "ļ",
    N: "ç",
    A: "w",
  })

/** An object mapping from perspectives to alternate letters used in referents. */
export const REFERENTIAL_PERSPECTIVE_TO_ITHKUIL_MAP_ALT =
  /* @__PURE__ */ deepFreeze({
    M: "",
    G: "tļ",
    N: "x",
    A: "y",
  })

/**
 * Converts a perspective into a letter affixed onto a referential. This returns
 * the first perspective code (ļ, ç, or w).
 *
 * @param perspective The perspective to be converted.
 * @returns Romanized Ithkuilic text representing the perspective.
 */
export function referentialPerspectiveToIthkuil(
  perspective: Perspective,
): string {
  return REFERENTIAL_PERSPECTIVE_TO_ITHKUIL_MAP[perspective]
}

/**
 * Converts a perspective into a letter affixed onto a referential. This returns
 * the second perspective code (tļ, x, or y).
 *
 * @param perspective The perspective to be converted.
 * @returns Romanized Ithkuilic text representing the perspective.
 */
export function referentialPerspectiveToIthkuilAlt(
  perspective: Perspective,
): string {
  return REFERENTIAL_PERSPECTIVE_TO_ITHKUIL_MAP_ALT[perspective]
}
