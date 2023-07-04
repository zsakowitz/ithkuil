import {
  ALL_AFFILIATIONS,
  ALL_CONFIGURATIONS,
  ALL_ESSENCES,
  ALL_EXTENSIONS,
  ALL_PERSPECTIVES,
  caToIthkuil,
  geminatedCAToIthkuil,
  type PartialCA,
} from "../../generator/ca/index.js"

function makeCaForms() {
  const ALL_CA_FORMS = new Map<string, PartialCA>()
  const ALL_GEMINATED_CA_FORMS = new Map<string, PartialCA>()

  for (const affiliation of ALL_AFFILIATIONS) {
    for (const configuration of ALL_CONFIGURATIONS) {
      for (const extension of ALL_EXTENSIONS) {
        for (const perspective of ALL_PERSPECTIVES) {
          for (const essence of ALL_ESSENCES) {
            const ca: { -readonly [K in keyof PartialCA]: PartialCA[K] } = {}

            if (affiliation != "CSL") ca.affiliation = affiliation
            if (configuration != "UPX") ca.configuration = configuration
            if (extension != "DEL") ca.extension = extension
            if (perspective != "M") ca.perspective = perspective
            if (essence != "NRM") ca.essence = essence

            ALL_CA_FORMS.set(caToIthkuil(ca), ca)
            ALL_GEMINATED_CA_FORMS.set(geminatedCAToIthkuil(ca), ca)
          }
        }
      }
    }
  }

  return [ALL_CA_FORMS, ALL_GEMINATED_CA_FORMS] as const
}

const CA_FORMS = /* @__PURE__ */ makeCaForms()

/**
 * Parses a non-geminated Ca form into an object.
 * @param ca The Ca form to be parsed.
 * @returns A `PartialCA` object containing the details of the Ca form.
 */
export function parseCa(ca: string): PartialCA {
  const form = CA_FORMS[0].get(ca)

  if (form != null) {
    return form
  }

  throw new Error("Invalid Ca form: " + form + ".")
}

/**
 * Parses a geminated Ca form into an object.
 * @param ca The Ca form to be parsed.
 * @returns A `PartialCA` object containing the details of the Ca form.
 */
export function parseGeminatedCa(ca: string): PartialCA {
  const form = CA_FORMS[1].get(ca)

  if (form != null) {
    return form
  }

  throw new Error("Invalid geminated Ca form: " + form + ".")
}
