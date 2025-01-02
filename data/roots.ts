import { ROOTS, SHEET } from "./constants.js"

/** A single root. */
export interface RootEntry {
  /** The root's Cr form. */
  readonly cr: string

  /** The root's stems. */
  readonly stems: readonly [
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
  ]

  /** The root's stems (in CPT version). */
  readonly CPT: readonly [
    undefined?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
  ]

  /** The root's BSC meaning. */
  readonly BSC?: string | undefined

  /** The root's CTE meaning. */
  readonly CTE?: string | undefined

  /** The root's CSV meaning. */
  readonly CSV?: string | undefined

  /** The root's OBJ meanings. */
  readonly OBJ: readonly [
    undefined?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
  ]

  /** The root's DYN meaning. */
  readonly DYN?: string | undefined

  /** Additional information about each stem. */
  readonly wikidata: readonly [
    undefined?,
    (string | undefined)?,
    (string | undefined)?,
    (string | undefined)?,
  ]
}

/**
 * Gets all roots described in the Collaborative Ithkuil IV Roots and Affixes
 * Spreadsheet.
 *
 * @param apiKey The Google Sheets API key to use when fetching data.
 * @returns An array of roots.
 */
export async function getRoots(apiKey: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET}/values/${ROOTS}?key=${apiKey}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch roots.")
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

  const output: RootEntry[] = []

  for (const entry of values) {
    if (!Array.isArray(entry)) {
      throw new Error("Expected all elements of 'values' to be arrays.")
    }

    if (
      !entry.every(
        (x): x is string | undefined => x === void 0 || typeof x == "string",
      )
    ) {
      throw new Error(
        "Expected all elements of entry to be strings or undefined.",
      )
    }

    const cr = entry[0]

    if (!cr) {
      continue
    }

    output.push({
      cr: cr.replace(/ẓ/g, "ż"),
      stems: entry
        .slice(1, 5)
        .map((x) => x?.replace(/ẓ/g, "ż") || void 0) as any,
      CPT: [
        void 0,
        ...entry.slice(6, 9).map((x) => x?.replace(/ẓ/g, "ż") || void 0),
      ] as any,
      BSC: entry[14]?.replace(/ẓ/g, "ż") || void 0,
      CTE: entry[15]?.replace(/ẓ/g, "ż") || void 0,
      CSV: entry[16]?.replace(/ẓ/g, "ż") || void 0,
      OBJ: [
        void 0,
        ...entry.slice(17, 20).map((x) => x?.replace(/ẓ/g, "ż") || void 0),
      ] as any,
      DYN: entry[21]?.replace(/ẓ/g, "ż") || void 0,
      wikidata: [
        void 0,
        ...entry.slice(22, 25).map((x) => x?.replace(/ẓ/g, "ż") || void 0),
      ] as any,
    })
  }

  return output
}
