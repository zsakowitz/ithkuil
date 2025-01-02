import { deepFreeze } from "../helpers/deep-freeze.js"
import { fillDefaults } from "../helpers/fill-defaults.js"
import type {
  Formative,
  FramedVerbalFormative,
  NominalFormative,
  PartialFormative,
  UnframedVerbalFormative,
} from "./index.js"

/** The default nominal formative. */
export const DEFAULT_NOMINAL_FORMATIVE: NominalFormative =
  /* @__PURE__ */ deepFreeze({
    type: "UNF/C",

    concatenationType: "none",

    version: "PRC",
    stem: 1,

    root: "l",

    function: "STA",
    specification: "BSC",
    context: "EXS",

    slotVAffixes: [],

    ca: {
      affiliation: "CSL",
      configuration: "UPX",
      extension: "DEL",
      perspective: "M",
      essence: "NRM",
    },

    slotVIIAffixes: [],

    vn: "MNO",
    caseScope: "CCN",

    case: "THM",

    shortcut: false,
  })

/** The default unframed verbal formative. */
export const DEFAULT_UNFRAMED_VERBAL_FORMATIVE: UnframedVerbalFormative =
  /* @__PURE__ */ deepFreeze({
    type: "UNF/K",

    version: "PRC",
    stem: 1,

    root: "l",

    function: "STA",
    specification: "BSC",
    context: "EXS",

    slotVAffixes: [],

    ca: {
      affiliation: "CSL",
      configuration: "UPX",
      extension: "DEL",
      perspective: "M",
      essence: "NRM",
    },

    slotVIIAffixes: [],

    vn: "MNO",
    mood: "FAC",

    illocutionValidation: "OBS",

    shortcut: false,
  })

/** The default framed verbal formative. */
export const DEFAULT_FRAMED_VERBAL_FORMATIVE: FramedVerbalFormative =
  /* @__PURE__ */ deepFreeze({
    type: "FRM",

    version: "PRC",
    stem: 1,

    root: "l",

    function: "STA",
    specification: "BSC",
    context: "EXS",

    slotVAffixes: [],

    ca: {
      affiliation: "CSL",
      configuration: "UPX",
      extension: "DEL",
      perspective: "M",
      essence: "NRM",
    },

    slotVIIAffixes: [],

    vn: "MNO",
    caseScope: "CCN",

    case: "THM",

    shortcut: false,
  })

/** An object mapping from formative types to their default objects. */
export const DEFAULT_FORMATIVES_BY_TYPE = /* @__PURE__ */ deepFreeze({
  "UNF/C": DEFAULT_NOMINAL_FORMATIVE,
  "UNF/K": DEFAULT_UNFRAMED_VERBAL_FORMATIVE,
  FRM: DEFAULT_FRAMED_VERBAL_FORMATIVE,
})

/**
 * Completes a formative, filling in slots that are not passed in.
 *
 * @param formative The partial formative to be completed.
 * @returns A complete formative.
 */
export function fillInDefaultFormativeSlots(
  formative: PartialFormative,
): Formative {
  if (formative == null || formative.type == null) {
    throw new Error(
      "You must provide the type of a formative: UNF/C, UNF/K, or FRM.",
    )
  }

  if (formative.root == null) {
    throw new Error("You must provide the root of a formative.")
  }

  const defaultValue = DEFAULT_FORMATIVES_BY_TYPE[formative.type]

  // Safety: `output.ca` is assigned immediately below, so
  // `Omit<Formative, "ca"> as Formative` is okay.
  const output = fillDefaults<Omit<Formative, "ca">>(
    defaultValue,
    formative,
  ) as Formative

  // Safety: We own `output`, so mutation is okay.
  ;(output as any).ca =
    formative.ca ? fillDefaults(defaultValue.ca, formative.ca) : defaultValue.ca

  return output
}
