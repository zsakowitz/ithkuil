import { object } from "zod"
import { attemptGemination, deepFreeze, fillDefaults } from "../index.js"
import {
  affiliationToIthkuil,
  zodAffiliation,
  type Affiliation,
} from "./affiliation.js"
import {
  configurationToIthkuil,
  zodConfiguration,
  type Configuration,
} from "./configuration.js"
import { zodEssence, type Essence } from "./essence.js"
import {
  extensionToIthkuil,
  zodExtension,
  type Extension,
} from "./extension.js"
import { perspectiveAndEssenceToIthkuil } from "./perspective-and-essence.js"
import { zodPerspective, type Perspective } from "./perspective.js"

export * from "./affiliation.js"
export * from "./configuration.js"
export * from "./essence.js"
export * from "./extension.js"
export * from "./geminate.js"
export * from "./perspective-and-essence.js"
export * from "./perspective.js"

/** A Ca affix complex. */
export type CA = {
  /** The affiliation of the Ca form. */
  readonly affiliation: Affiliation

  /** The configuration of the Ca form. */
  readonly configuration: Configuration

  /** The extension of the Ca form. */
  readonly extension: Extension

  /** The perspective of the Ca form. */
  readonly perspective: Perspective

  /** The essence of the Ca form. */
  readonly essence: Essence
}

/** A Zod validator matching Ca forms. */
export const zodCa = /* @__PURE__ */ object({
  affiliation: zodAffiliation,
  configuration: zodConfiguration,
  extension: zodExtension,
  perspective: zodPerspective,
  essence: zodEssence,
})

/** A partially filled Ca affix complex. */
export type PartialCA = {
  /** The affiliation of the Ca form. */
  readonly affiliation?: Affiliation | undefined

  /** The configuration of the Ca form. */
  readonly configuration?: Configuration | undefined

  /** The extension of the Ca form. */
  readonly extension?: Extension | undefined

  /** The perspective of the Ca form. */
  readonly perspective?: Perspective | undefined

  /** The essence of the Ca form. */
  readonly essence?: Essence | undefined
}

/** A Zod validator matching partial Ca forms. */
export const zodPartialCA = /* @__PURE__ */ zodCa.partial()

/**
 * Makes allomorphic substitutions within Ca forms to make the pronounceble and
 * conform to Ithkuil's phonotactic rules.
 * @param ca The Ca form which will have substitutions made in it.
 * @returns Romanized Ithkuilic text representing the finalized Ca form.
 */
export function makeCAAllomorphicSubstitutions(ca: string) {
  return ca
    .replace(/pp/g, "mp")
    .replace(/tt/g, "nt")
    .replace(/kk/g, "nk")
    .replace(/ll/g, "pļ")
    .replace(/pb/g, "mb")
    .replace(/kg/g, "ng")
    .replace(/çy/g, "nd")
    .replace(/rr/g, "ns")
    .replace(/rř/g, "nš")
    .replace(/řr/g, "ňs")
    .replace(/řř/g, "ňš")
    .replace(/(.)gm/g, "$1x")
    .replace(/(.)gn/g, "$1ň")
    .replace(/nň/g, "ňn")
    .replace(/(.)çx/g, "$1xw")
    .replace(/(.)bm/g, "$1v")
    .replace(/(.)bn/g, "$1ḑ")
    .replace(/fv/g, "vw")
    .replace(/tḑ/g, "ḑy")
}

/**
 * Converts a Ca form into Ithkuil.
 * @param ca The Ca form to be converted.
 * @returns Romanized Ithkuilic text representing the Ca form.
 */
export function caToIthkuil(ca: PartialCA) {
  const ca2 = fillInDefaultCAValues(ca)

  const configuration = configurationToIthkuil(ca2.configuration)

  const extension = extensionToIthkuil(
    ca2.extension,
    ca2.configuration == "UPX",
  )

  const affiliation = affiliationToIthkuil(
    ca2.affiliation,

    configuration == "" &&
      extension == "" &&
      ca2.perspective == "M" &&
      ca2.essence == "NRM",
  )

  const perspectiveAndEssence = perspectiveAndEssenceToIthkuil(
    ca2.perspective,
    ca2.essence,
    affiliation == "" && configuration == "" && extension == "",
    !!(affiliation + configuration + extension).match(/[kpt]$/),
  )

  const core = affiliation + configuration + extension + perspectiveAndEssence

  return makeCAAllomorphicSubstitutions(core)
}

/**
 * Converts a Ca form into Ithkuil, geminating the form throughout the process.
 * @param ca The Ca form to be converted.
 * @returns Romanized Ithkuilic text representing the geminated Ca form.
 */
export function geminatedCAToIthkuil(ca: PartialCA) {
  const ca2 = fillInDefaultCAValues(ca)

  const configuration = configurationToIthkuil(ca2.configuration)

  const extension = extensionToIthkuil(
    ca2.extension,
    ca2.configuration == "UPX",
  )

  const affiliation = affiliationToIthkuil(
    ca2.affiliation,

    configuration == "" &&
      extension == "" &&
      ca2.perspective == "M" &&
      ca2.essence == "NRM",
  )

  const perspectiveAndEssence = perspectiveAndEssenceToIthkuil(
    ca2.perspective,
    ca2.essence,
    affiliation == "" && configuration == "" && extension == "",
    !!(affiliation + configuration + extension).match(/[kpt]$/),
  )

  const core = affiliation + configuration + extension + perspectiveAndEssence

  const nonGeminate = makeCAAllomorphicSubstitutions(core)

  const geminate = attemptGemination(nonGeminate)

  if (nonGeminate == geminate) {
    return geminate[0] + geminate
  }

  return geminate
}

/** The default Ca form. */
export const DEFAULT_CA: CA = /* @__PURE__ */ deepFreeze({
  affiliation: "CSL",
  configuration: "UPX",
  extension: "DEL",
  perspective: "M",
  essence: "NRM",
})

/**
 * Fills a Ca form with default values (CSL, UPX, DEL, M, and NRM) in its empty
 * slots.
 * @param ca The Ca form to be filled.
 * @returns A completed Ca form with no empty slots.
 */
export function fillInDefaultCAValues(ca: PartialCA): CA {
  return fillDefaults(DEFAULT_CA, ca)
}
