import { deepFreeze } from "../helpers/deep-freeze.js"

/** A configuration. */
export type Configuration =
  | "UPX"
  | "DPX"
  | "MSS"
  | "MSC"
  | "MSF"
  | "MDS"
  | "MDC"
  | "MDF"
  | "MFS"
  | "MFC"
  | "MFF"
  | "DSS"
  | "DSC"
  | "DSF"
  | "DDS"
  | "DDC"
  | "DDF"
  | "DFS"
  | "DFC"
  | "DFF"

/** An array containing all configurations. */
export const ALL_CONFIGURATIONS: readonly Configuration[] =
  /* @__PURE__ */ deepFreeze([
    "UPX",
    "DPX",
    "MSS",
    "MSC",
    "MSF",
    "MDS",
    "MDC",
    "MDF",
    "MFS",
    "MFC",
    "MFF",
    "DSS",
    "DSC",
    "DSF",
    "DDS",
    "DDC",
    "DDF",
    "DFS",
    "DFC",
    "DFF",
  ])

/** An object mapping from configurations to their Ithkuilic translations. */
export const CONFIGURATION_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  UPX: "",
  DPX: "s",

  DSS: "c",
  DSC: "ks",
  DSF: "ps",

  DDS: "ţs",
  DDC: "fs",
  DDF: "š",

  DFS: "č",
  DFC: "kš",
  DFF: "pš",

  MSS: "t",
  MSC: "k",
  MSF: "p",

  MDS: "ţ",
  MDC: "f",
  MDF: "ç",

  MFS: "z",
  MFC: "ž",
  MFF: "ż",
})

/** An object mapping from configurations to their names. */
export const CONFIGURATION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  UPX: "Uniplex",
  DPX: "Duplex",

  DSS: "Duplex Similar Separate",
  DSC: "Duplex Similar Connected",
  DSF: "Duplex Similar Fused",

  DDS: "Duplex Dissimilar Separate",
  DDC: "Duplex Dissimilar Connected",
  DDF: "Duplex Dissimilar Fused",

  DFS: "Duplex Fuzzy Separate",
  DFC: "Duplex Fuzzy Connected",
  DFF: "Duplex Fuzzy Fused",

  MSS: "Multiplex Similar Separate",
  MSC: "Multiplex Similar Connected",
  MSF: "Multiplex Similar Fused",

  MDS: "Multiplex Dissimilar Separate",
  MDC: "Multiplex Dissimilar Connected",
  MDF: "Multiplex Dissimilar Fused",

  MFS: "Multiplex Fuzzy Separate",
  MFC: "Multiplex Fuzzy Connected",
  MFF: "Multiplex Fuzzy Fused",
})

/**
 * Converts a configuration into Ithkuil.
 *
 * @param configuration The configuration to be converted.
 * @returns Romanized Ithkuilic text representing the configuration.
 */
export function configurationToIthkuil(configuration: Configuration): string {
  return CONFIGURATION_TO_ITHKUIL_MAP[configuration]
}
