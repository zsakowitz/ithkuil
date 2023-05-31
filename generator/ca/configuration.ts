import { deepFreeze } from "../helpers/deep-freeze.js"
import { Enum } from "../helpers/enum.js"

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

/** A Zod validator matching configurations. */
export const zodConfiguration = /* @__PURE__ */ new Enum(ALL_CONFIGURATIONS)

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

/**
 * Converts a configuration into Ithkuil.
 * @param configuration The configuration to be converted.
 * @returns Romanized Ithkuilic text representing the configuration.
 */
export function configurationToIthkuil(configuration: Configuration): string {
  return CONFIGURATION_TO_ITHKUIL_MAP[configuration]
}
