import { deepFreeze } from "../../helpers/deep-freeze.js"
import { Enum } from "../../helpers/enum.js"
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

/** An aspect. */
export type Aspect =
  | "RTR"
  | "PRS"
  | "HAB"
  | "PRG"
  | "IMM"
  | "PCS"
  | "REG"
  | "SMM"
  | "ATP"
  | "RSM"
  | "CSS"
  | "PAU"
  | "RGR"
  | "PCL"
  | "CNT"
  | "ICS"
  | "EXP"
  | "IRP"
  | "PMP"
  | "CLM"
  | "DLT"
  | "TMP"
  | "XPD"
  | "LIM"
  | "EPD"
  | "PTC"
  | "PPR"
  | "DCL"
  | "CCL"
  | "CUL"
  | "IMD"
  | "TRD"
  | "TNS"
  | "ITC"
  | "MTV"
  | "SQN"

/** An array containing all aspects. */
export const ALL_ASPECTS: readonly Aspect[] = /* @__PURE__ */ deepFreeze([
  "RTR",
  "PRS",
  "HAB",
  "PRG",
  "IMM",
  "PCS",
  "REG",
  "SMM",
  "ATP",

  "RSM",
  "CSS",
  "PAU",
  "RGR",
  "PCL",
  "CNT",
  "ICS",
  "EXP",
  "IRP",

  "PMP",
  "CLM",
  "DLT",
  "TMP",
  "XPD",
  "LIM",
  "EPD",
  "PTC",
  "PPR",

  "DCL",
  "CCL",
  "CUL",
  "IMD",
  "TRD",
  "TNS",
  "ITC",
  "MTV",
  "SQN",
])

/** A Zod validator matching aspects. */
export const zodAspect = /* @__PURE__ */ new Enum(ALL_ASPECTS)

/** An object mapping aspects to their Ithkuilic translations. */
export const ASPECT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  RTR: "a",
  PRS: "ä",
  HAB: "e",
  PRG: "i",
  IMM: "ëi",
  PCS: "ö",
  REG: "o",
  SMM: "ü",
  ATP: "u",

  RSM: "ai",
  CSS: "au",
  PAU: "ei",
  RGR: "eu",
  PCL: "ëu",
  CNT: "ou",
  ICS: "oi",
  EXP: "iu",
  IRP: "ui",

  PMP: IA_UÄ,
  CLM: IE_UË,
  DLT: IO_ÜÄ,
  TMP: IÖ_ÜË,
  XPD: "eë",
  LIM: UÖ_ÖË,
  EPD: UO_ÖÄ,
  PTC: UE_IË,
  PPR: UA_IÄ,

  DCL: "ao",
  CCL: "aö",
  CUL: "eo",
  IMD: "eö",
  TRD: "oë",
  TNS: "öe",
  ITC: "oe",
  MTV: "öa",
  SQN: "oa",
})

/** An object mapping aspects to their names. */
export const ASPECT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  RTR: "Retrospective",
  PRS: "Prospective",
  HAB: "Habitual",
  PRG: "Progressive",
  IMM: "Imminent",
  PCS: "Precessive",
  REG: "Regulative",
  SMM: "Summative",
  ATP: "Anticipatory",

  RSM: "Resumptive",
  CSS: "Cessative",
  PAU: "Pausal",
  RGR: "Regressive",
  PCL: "Preclusive",
  CNT: "Continuative",
  ICS: "Incessative",
  EXP: "Experiential",
  IRP: "Interruptive",

  PMP: "Preemptive",
  CLM: "Climactic",
  DLT: "Dilatory",
  TMP: "Temporary",
  XPD: "Expenditive",
  LIM: "Limitative",
  EPD: "Expeditive",
  PTC: "Protractive",
  PPR: "Preparatory",

  DCL: "Disclusive",
  CCL: "Conclusive",
  CUL: "Culminative",
  IMD: "Intermediative",
  TRD: "Tardative",
  TNS: "Transitional",
  ITC: "Intercommutative",
  MTV: "Motive",
  SQN: "Sequential",
})

/**
 * Converts an aspect into Ithkuil.
 * @param aspect The aspect to be converted.
 * @returns A string or `WithWYAlternative` containing romanized Ithkuilic text
 * representing the aspect.
 */
export function aspectToIthkuil(aspect: Aspect): string | WithWYAlternative {
  return ASPECT_TO_ITHKUIL_MAP[aspect]
}
