import { AFFIXES, SHEET } from "./constants.js"

/** A single affix. */
export interface AffixEntry {
  /** The affix's Cs form. */
  readonly cs: string

  /** The affix's abbreviation. */
  readonly abbreviation: string

  /** The affix's degrees. */
  readonly degrees: readonly [
    undefined?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
  ]

  /** A description of the affix. */
  readonly description?: string | undefined
}

/**
 * Gets all affixes described in the Collaborative Ithkuil IV Roots and Affixes
 * Spreadsheet.
 * @param apiKey The Google Sheets API key to use when fetching data.
 * @returns An array of affixes.
 */
export async function getAffixes(apiKey: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET}/values/${AFFIXES}?key=${apiKey}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch affixes.")
  }

  const data: unknown = await response.json()

  if (data == null || typeof data != "object") {
    throw new Error(
      "Unexpected result type: " + data == null ? "null" : typeof data + ".",
    )
  }

  if (!("values" in data)) {
    throw new Error("No 'values' key was found in the returned data.")
  }

  const values = data.values

  if (!Array.isArray(values)) {
    throw new Error("Expected 'values' to be an array.")
  }

  const output: AffixEntry[] = []

  for (const entry of values) {
    if (!Array.isArray(entry)) {
      throw new Error("Expected all elements of 'values' to be arrays.")
    }

    const cs: unknown = entry[0]

    if (typeof cs != "string") {
      throw new Error("Expected Cs form of affix to be a string.")
    }

    const abbreviation: unknown = entry[1]

    if (typeof abbreviation != "string") {
      throw new Error("Expected abbreviation of affix to be a string.")
    }

    const degrees: unknown[] = entry.slice(2, 11)

    if (
      !degrees.every(
        (x): x is string | null | undefined =>
          typeof x == "string" || x == null,
      )
    ) {
      throw new Error("Expected degrees of affix to be strings or null.")
    }

    const description: unknown = entry[12]

    if (typeof description != "string" && description != null) {
      throw new Error("Expected description of affix to be a string or null.")
    }

    output.push({
      cs: cs.replace(/ẓ/g, "ż"),
      abbreviation: abbreviation.replace(/ẓ/g, "ż"),
      degrees: [
        void 0,
        ...degrees.map((x) => x?.replace(/ẓ/g, "ż") || void 0),
      ] satisfies (string | undefined)[] as any,
      description: description?.replace(/ẓ/g, "ż") || void 0,
    })
  }

  return output
}
