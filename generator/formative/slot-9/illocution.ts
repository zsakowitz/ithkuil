import { deepFreeze } from "../../helpers/deep-freeze.js"

/** An illocution. */
export type Illocution =
  | "ASR"
  | "DIR"
  | "DEC"
  | "IRG"
  | "VRF"
  | "ADM"
  | "POT"
  | "HOR"
  | "CNJ"

/** An array containing all illocutions. */
export const ALL_ILLOCUTIONS: readonly Illocution[] =
  /* @__PURE__ */ deepFreeze([
    "ASR",
    "DIR",
    "DEC",
    "IRG",
    "VRF",
    "ADM",
    "POT",
    "HOR",
    "CNJ",
  ])

/** An object mapping from illocutuons to their names. */
export const ILLOCUTION_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  ASR: "Assertive",
  DIR: "Directive",
  DEC: "Declarative",
  IRG: "Interrogative",
  VRF: "Verificative",
  ADM: "Admonitive",
  POT: "Potentiative",
  HOR: "Hortative",
  CNJ: "Conjectural",
})
