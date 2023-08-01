import { deepFreeze } from "../../helpers/deep-freeze.js"

/** A validation. */
export type Validation =
  | "OBS"
  | "REC"
  | "PUP"
  | "RPR"
  | "USP"
  | "IMA"
  | "CVN"
  | "ITU"
  | "INF"

/** An array containing all validations. */
export const ALL_VALIDATIONS: readonly Validation[] =
  /* @__PURE__ */ deepFreeze([
    "OBS",
    "REC",
    "PUP",
    "RPR",
    "USP",
    "IMA",
    "CVN",
    "ITU",
    "INF",
  ])

/** An object mapping from validations to their names. */
export const VALIDATION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  OBS: "Observational",
  REC: "Recollective",
  PUP: "Purportive",
  RPR: "Reportive",
  USP: "Unspecified",
  IMA: "Imaginary",
  CVN: "Conventional",
  ITU: "Intuitive",
  INF: "Inferential",
})
