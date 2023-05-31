import { deepFreeze } from "../helpers/deep-freeze.js"
import { Enum } from "../helpers/enum.js"

/** An extension. */
export type Extension = "DEL" | "PRX" | "ICP" | "ATV" | "GRA" | "DPL"

/** An array containing all extensions. */
export const ALL_EXTENSIONS: readonly Extension[] = /* @__PURE__ */ deepFreeze([
  "DEL",
  "PRX",
  "ICP",
  "ATV",
  "GRA",
  "DPL",
])

/** A Zod validator matching extensions. */
export const zodExtension = /* @__PURE__ */ new Enum(ALL_EXTENSIONS)

/** An object mapping from extensions to their names. */
export const EXTENSION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  DEL: "Delimitive",
  PRX: "Proximal",
  ICP: "Inceptive",
  ATV: "Attenuative",
  GRA: "Graduative",
  DPL: "Depletive",
})

/** An object mapping from extensions to their Ithkuilic translations. */
export const EXTENSION_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  DEL: ["", ""],
  PRX: ["t", "d"],
  ICP: ["k", "g"],
  ATV: ["p", "b"],
  GRA: ["g", "gz"],
  DPL: ["b", "bz"],
})

/**
 * Converts an extension into Ithkuil.
 * @param extension The extension to be converted.
 * @param isCAUniplex Whether the Ca affix complex is marked Uniplex.
 * @returns Romanized Ithkuilic text representing the extension.
 */
export function extensionToIthkuil(
  extension: Extension,
  isCAUniplex: boolean,
): string {
  return EXTENSION_TO_ITHKUIL_MAP[extension][+isCAUniplex as 0 | 1]
}
