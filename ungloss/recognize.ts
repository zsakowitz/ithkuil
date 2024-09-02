import { Searcher } from "fast-fuzzy"
import { type AffixEntry, type RootEntry } from "../data/index.js"
import type { AffixDegree, Stem } from "../generate/index.js"

export interface DataRoot {
  readonly stem: number
  readonly label: string
  readonly cr: string
}

export interface DataAffixByDegree {
  cs: string
  abbr: string
  value: string
  degree: AffixDegree
}

export type RecognizerIssueKind =
  | "root"
  | "affix by degree"
  | "affix by label"
  | "affix by abbreviation"

export type RecognizerIssue = { kind: RecognizerIssueKind; source: string }

export interface SomeReplacement<T, K extends string> {
  source: string
  kind: K
  actual: T
  alts: T[]
}

export type Replacement =
  | SomeReplacement<DataRoot, "root">
  | SomeReplacement<DataAffixByDegree, "affix by degree">
  | (SomeReplacement<AffixEntry, "affix by label" | "affix by abbreviation"> & {
      degree: AffixDegree
    })

export interface RecognizerOutput {
  source: string
  gloss: string
  replacements: Replacement[]
  issues: RecognizerIssue[]
}

export interface Recognizer {
  /**
   * Replaces instance of double quotes with corresponding roots, single quotes
   * with affixes, and `abbr/degree` segments with the proper affix.
   */
  (source: string): RecognizerOutput
}

/**
 * Creates a function which recognizes roots and affixes in a gloss. This is
 * designed to transform user input before passing to `ungloss`.
 */
export function createRecognizer(
  affixes: readonly AffixEntry[],
  roots: readonly RootEntry[],
): Recognizer {
  const rootsByStem: DataRoot[] = roots
    .flatMap((root) => [
      { stem: 0, label: root.stems[0], cr: root.cr },
      { stem: 1, label: root.stems[1], cr: root.cr },
      { stem: 2, label: root.stems[2], cr: root.cr },
      { stem: 3, label: root.stems[3], cr: root.cr },
    ])
    .filter((x): x is typeof x & { label: string } => !!x.label)

  const searcherAffixByDegree = new Searcher(
    affixes.flatMap<DataAffixByDegree>((affix) =>
      affix.degrees
        .map((value, degree) => ({
          cs: affix.cs,
          abbr: affix.abbreviation,
          degree: degree as AffixDegree,
          value,
        }))
        .filter((x): x is typeof x & { value: string } => x.value !== null),
    ),
    {
      keySelector(affix) {
        return affix.value
      },
    },
  )

  const searcherAffixByAbbr = new Searcher(affixes as AffixEntry[], {
    keySelector(s) {
      return s.abbreviation
    },
  })

  const searcherAffixByLabel = new Searcher(affixes as AffixEntry[], {
    keySelector(s) {
      return [s.description, ...s.degrees].filter((x): x is string => !!x)
    },
  })

  const searcherRoots = new Searcher(rootsByStem, {
    keySelector(root) {
      return root.label
    },
  })

  return function (source: string): RecognizerOutput {
    const replacements: Replacement[] = []
    const issues: RecognizerIssue[] = []

    const gloss = source
      .split(/-/g)
      .map((segment, index, array): string => {
        if (
          segment.length >= 3 &&
          (segment.startsWith('"') ||
            segment.startsWith("“") ||
            segment.startsWith("”")) &&
          (segment.endsWith('"') ||
            segment.endsWith("“") ||
            segment.endsWith("”"))
        ) {
          const prev = array[index - 1]?.match(/^S([0-3])$/)?.[1]
          const forcedStem = prev ? (+prev as Stem) : undefined
          let items = searcherRoots.search(segment.slice(1, -1))

          if (forcedStem != null) {
            items = items.filter((x) => x.stem == forcedStem)
          }

          if (items[0]) {
            replacements.push({
              kind: "root",
              source: segment.slice(1, -1),
              actual: items[0],
              alts: items.slice(1),
            })

            return forcedStem == null
              ? `S${items[0].stem}-${items[0].cr}`
              : items[0].cr
          } else {
            issues.push({
              kind: "root",
              source: segment.slice(1, -1),
            })
            return segment
          }
        }

        if (
          segment.length >= 3 &&
          (segment.startsWith("'") ||
            segment.startsWith("‘") ||
            segment.startsWith("’")) &&
          (segment.endsWith("'") ||
            segment.endsWith("‘") ||
            segment.endsWith("’"))
        ) {
          const items = searcherAffixByDegree.search(segment.slice(1, -1))

          if (items[0]) {
            replacements.push({
              kind: "affix by degree",
              source: segment.slice(1, -1),
              actual: items[0],
              alts: items.slice(1),
            })
            return items[0].cs + "/" + items[0].degree
          } else {
            issues.push({
              kind: "affix by degree",
              source: segment.slice(1, -1),
            })
            return segment
          }
        }

        if (
          segment.length >= 5 &&
          (segment.startsWith("'") ||
            segment.startsWith("‘") ||
            segment.startsWith("’")) &&
          (segment.at(-3) == "'" ||
            segment.at(-3) == "‘" ||
            segment.at(-3) == "’") &&
          segment.at(-2) == "/" &&
          "0" <= segment.at(-1)! &&
          segment.at(-1)! <= "9"
        ) {
          const items = searcherAffixByLabel.search(segment.slice(1, -3))

          if (items[0]) {
            replacements.push({
              kind: "affix by label",
              source: segment,
              actual: items[0],
              alts: items.slice(1),
              degree: +segment.at(-1)! as AffixDegree,
            })
            return items[0].cs + "/" + segment.at(-1)
          } else {
            issues.push({
              kind: "affix by degree",
              source: segment,
            })
            return segment
          }
        }

        if (
          segment.length == 5 &&
          /^[A-Z0-9]{3}$/.test(segment.slice(0, 3)) &&
          segment[3] == "/" &&
          "0" <= segment[4]! &&
          segment[4]! <= "9"
        ) {
          const abbr = segment.slice(0, 3)
          const degree = +segment[4]! as AffixDegree
          const items = searcherAffixByAbbr.search(abbr)

          if (items[0]) {
            replacements.push({
              kind: "affix by abbreviation",
              source: segment.slice(1, -1),
              actual: items[0],
              alts: items.slice(1),
              degree,
            })
            return items[0].cs + "/" + degree
          } else {
            issues.push({
              kind: "affix by abbreviation",
              source: segment.slice(1, -1),
            })
            return segment
          }
        }

        return segment
      })
      .join("-")

    return { source, gloss, issues, replacements }
  }
}
