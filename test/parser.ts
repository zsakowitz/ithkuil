import { ALL_MOOD_OR_CASE_SCOPES } from "../generate/formative/slot-8/mood-or-case-scope.js"
import {
  ALL_AFFILIATIONS,
  ALL_AFFIXUAL_ADJUNCT_SCOPES,
  ALL_ASPECTS,
  ALL_BIAS_ADJUNCTS,
  ALL_CASES,
  ALL_CASE_SCOPES,
  ALL_CONFIGURATIONS,
  ALL_CONTEXTS,
  ALL_EFFECTS,
  ALL_ESSENCES,
  ALL_EXTENSIONS,
  ALL_FUNCTIONS,
  ALL_ILLOCUTION_OR_VALIDATIONS,
  ALL_LEVELS,
  ALL_MODULAR_ADJUNCT_SCOPES,
  ALL_MODULAR_ADJUNCT_TYPES,
  ALL_MOODS,
  ALL_PARSING_ADJUNCTS,
  ALL_PERSPECTIVES,
  ALL_PHASES,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  ALL_SPECIFICATIONS,
  ALL_SUPPLETIVE_ADJUNCT_TYPES,
  ALL_VALENCES,
  wordToIthkuil,
  type Affix,
  type PartialCA,
  type PartialFormative,
  type PartialReferential,
  type PlainAdjunct,
  type ReferentList,
  type SlotIII,
  type Word,
  formativeToIthkuil,
} from "../generate/index.js"
import { ALL_REFERENTS } from "../generate/referential/referent/referent.js"
import { parseWord } from "../parse/index.js"

function runTests(numberOfTestCases: number, mode: "short" | "full") {
  function randomItem<const T>(object: {
    readonly [x: number]: T
    readonly length: number
  }): T {
    if (object.length == 0) {
      throw new Error("Not enough items to pick a value from.")
    }

    const value = object[Math.floor(Math.random() * object.length)]

    return value!
  }

  function biasedRandomItem<const T, const U>(
    defaultValue: T,
    object: {
      readonly [x: number]: U
      readonly length: number
    } & Iterable<U>,
  ): T | U {
    if (mode == "full") {
      return randomItem([defaultValue, ...object])
    }

    if (Math.random() < 0.9) {
      return defaultValue
    }

    return randomItem(object)
  }

  function randomCA(): PartialCA {
    return {
      affiliation: biasedRandomItem("CSL", ALL_AFFILIATIONS),
      configuration: biasedRandomItem("UPX", ALL_CONFIGURATIONS),
      extension: biasedRandomItem("DEL", ALL_EXTENSIONS),
      perspective: biasedRandomItem("M", ALL_PERSPECTIVES),
      essence: biasedRandomItem("NRM", ALL_ESSENCES),
    }
  }

  function randomAffix(): Affix {
    if (Math.random() < 0.4) {
      return {
        cs: randomLetterSeries(3),
        type: randomItem([1, 2]),
        degree: randomItem([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      }
    }

    if (Math.random() < 0.4) {
      return {
        case: randomItem(ALL_CASES),
      }
    }

    if (Math.random() < 0.5) {
      return {
        case: randomItem(ALL_CASES),
        isInverse: randomItem([true, false]),
        type: randomItem([1, 2]),
      }
    }

    return { ca: randomCA() }
  }

  function randomAffixList(force: true): [Affix, ...Affix[]]
  function randomAffixList(force?: false): Affix[]
  function randomAffixList(force = false): Affix[] {
    const output: Affix[] = []

    while (true) {
      if ((output.length == 0 ? !force : true) && Math.random() < 0.5) {
        return output
      }

      output.push(randomAffix())
    }
  }

  function randomLetterSeries(maxLength: number) {
    let output = ""

    for (let index = 0; index < maxLength; index++) {
      const char = randomItem("pbtdkgfvţḑszšžxcżčjmnňrlř")

      if (char == output.slice(-1)) {
        index--
        continue
      }

      output += char

      if (Math.random() < 0.75) {
        break
      }
    }

    return output
  }

  const randomVN = () =>
    biasedRandomItem(
      "MNO",
      randomItem([
        ALL_VALENCES,
        ALL_PHASES,
        ALL_EFFECTS,
        ALL_LEVELS,
        ALL_ASPECTS,
      ]),
    )

  const randomNonAspectualVN = () =>
    biasedRandomItem(
      "MNO",
      randomItem([ALL_VALENCES, ALL_PHASES, ALL_EFFECTS, ALL_LEVELS]),
    )

  function randomFormative(): PartialFormative {
    const root: SlotIII =
      Math.random() < 0.1 ?
        Math.random() < 0.5 ?
          BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
        : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      : Math.random() < 0.1 ? [randomItem(ALL_REFERENTS)]
      : Math.random() < 0.1 ?
        {
          cs: randomLetterSeries(5),
          degree: randomItem([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
        }
      : randomLetterSeries(5)

    if (Math.random() < 30 / numberOfTestCases) {
      return {
        type: randomItem(["UNF/C", "UNF/K", "FRM"]),
        root,
      }
    }

    const ca = randomCA()

    return {
      type: biasedRandomItem("UNF/C", ["UNF/K", "FRM"]),

      concatenationType: biasedRandomItem("none", [1, 2]),

      shortcut: true,
      version: biasedRandomItem("PRC", ["CPT"]),
      stem: biasedRandomItem(1, [2, 3, 0]),

      root,

      get rootType() {
        return (
          Array.isArray(this.root) ? "referential"
          : typeof this.root == "object" ? "affix"
          : "standard"
        )
      },

      function: biasedRandomItem("STA", ALL_FUNCTIONS),
      specification: biasedRandomItem("BSC", ALL_SPECIFICATIONS),
      context: biasedRandomItem("EXS", ALL_CONTEXTS),

      slotVAffixes: mode == "short" ? undefined : randomAffixList(),

      ca,

      ...ca,

      slotVIIAffixes: mode == "short" ? undefined : randomAffixList(),

      vn:
        mode == "short" ?
          biasedRandomItem(
            "MNO",
            randomItem([
              ALL_VALENCES,
              ALL_PHASES,
              ALL_EFFECTS,
              ALL_LEVELS,
              ALL_ASPECTS,
            ]),
          )
        : randomItem(
            randomItem([
              ALL_VALENCES,
              ALL_PHASES,
              ALL_EFFECTS,
              ALL_LEVELS,
              ALL_ASPECTS,
            ]),
          ),

      caseScope: biasedRandomItem("CCN", ALL_CASE_SCOPES),
      mood: biasedRandomItem("FAC", ALL_MOODS),

      case: biasedRandomItem("THM", ALL_CASES),
      illocutionValidation: biasedRandomItem(
        "OBS",
        ALL_ILLOCUTION_OR_VALIDATIONS,
      ),
    }
  }

  function randomReferentList(): ReferentList {
    return [randomItem(ALL_REFERENTS)]
  }

  function randomReferential(): PartialReferential {
    const core =
      Math.random() < 0.2 ?
        { type: randomItem(["CAR", "QUO", "NAM", "PHR"]) }
      : {
          referents: randomReferentList(),
          perspective: biasedRandomItem("M", ["G", "N", "A"]),
        }

    if (Math.random() < 0.33) {
      return {
        ...core,
        specification: biasedRandomItem("BSC", ["CTE", "CSV", "OBJ"]),
        affixes: randomAffixList(),
        case: biasedRandomItem("THM", ALL_CASES),
        case2: biasedRandomItem("THM", ALL_CASES),
        essence: biasedRandomItem("NRM", ["RPV"]),
      }
    }

    if (Math.random() < 0.5) {
      const second =
        Math.random() < 0.5 ?
          undefined
        : {
            referents2: randomReferentList(),
            perspective2: biasedRandomItem("M", ["G", "N", "A"]),
          }

      return {
        ...core,
        ...second,
        case: biasedRandomItem("THM", ALL_CASES),
        case2: biasedRandomItem("THM", ALL_CASES),
        essence: biasedRandomItem("NRM", ["RPV"]),
      }
    }

    return {
      ...core,
      case: biasedRandomItem("THM", ALL_CASES),
      essence: biasedRandomItem("NRM", ["RPV"]),
    }
  }

  function randomAdjunct(): PlainAdjunct {
    switch (randomItem([1, 2, 3, 4, 5, 6])) {
      case 1:
        return randomItem(ALL_BIAS_ADJUNCTS)

      case 2:
        return randomItem(ALL_PARSING_ADJUNCTS)

      case 3:
        return randomItem(ALL_SINGLE_REGISTER_ADJUNCTS)

      case 4:
        return {
          type: randomItem(ALL_SUPPLETIVE_ADJUNCT_TYPES),
          case: biasedRandomItem("THM", ALL_CASES),
        }

      case 5:
        return {
          affixes: randomAffixList(true),
          scope: biasedRandomItem(undefined, ALL_AFFIXUAL_ADJUNCT_SCOPES),
          scope2: biasedRandomItem(undefined, ALL_AFFIXUAL_ADJUNCT_SCOPES),
        }
    }

    const type = biasedRandomItem("WHOLE", ALL_MODULAR_ADJUNCT_TYPES)

    switch (randomItem([1, 2, 3])) {
      case 1:
        return {
          type,
          vn1: randomItem(ALL_ASPECTS),
        }

      case 2:
        return {
          type,
          cn: randomItem(ALL_MOOD_OR_CASE_SCOPES),
          vn1: randomVN(),
          vn2: Math.random() < 0.5 ? randomVN() : undefined,
          vn3: randomNonAspectualVN(),
        }

      case 3:
        return {
          type,
          cn: randomItem(ALL_MOOD_OR_CASE_SCOPES),
          vn1: randomVN(),
          vn2: Math.random() < 0.5 ? randomVN() : undefined,
          scope: randomItem(ALL_MODULAR_ADJUNCT_SCOPES),
        }
    }
  }

  console.time("creating words")

  const testCases = Array.from(
    { length: numberOfTestCases },
    (): [Word, string] => {
      const word =
        Math.random() < 0.3333 ? randomAdjunct()
        : Math.random() < 0.5 ? randomReferential()
        : randomFormative()

      if (typeof word != "string")
        Object.defineProperty(word, "wordType", {
          get() {
            return (
              "root" in this ? "formative"
              : "referents" in this ? "referential"
              : "adjunct"
            )
          },
        })

      const source = wordToIthkuil(word)

      return [word, source]
    },
  )

  console.timeEnd("creating words")

  function benchmark() {
    let index = 0

    console.time("performing benchmark")

    for (const [word, source] of testCases) {
      index++

      try {
        const result = parseWord(source)

        if (result == null) {
          throw new Error("Failed to tokenize.")
        }
      } catch (error) {
        console.error(`Failed on input #${index} '${source}':`)

        if (error instanceof Error) {
          console.error(error.message)
        } else {
          console.error("Error: " + String(error))
        }

        console.error(word)

        return false
      }
    }

    console.timeEnd("performing benchmark")

    return true
  }

  function checkValidity() {
    let index = 0

    console.time("checking validity")

    for (const [word, source] of testCases) {
      index++

      try {
        const result = parseWord(source)

        if (result == null) {
          throw new Error("Failed to tokenize.")
        }

        const output = wordToIthkuil(result)

        if (source != output) {
          throw new Error(
            `Output '${output}' is different from input '${source}'.`,
          )
        }
      } catch (error) {
        console.error(`Failed on input #${index} '${source}':`)

        if (error instanceof Error) {
          console.error(error)
        } else {
          console.error("Error: " + String(error))
        }

        console.error(word)

        return false
      }
    }

    console.timeEnd("checking validity")

    return true
  }

  function findAllBenchmarkFailures() {
    const failures = testCases.filter(([, source]) => {
      try {
        const result = parseWord(source)

        if (result == null) {
          return true
        }
      } catch (err) {
        console.log(err instanceof Error ? err.message : err)
        return true
      }

      return false
    })

    if (failures.length == 0) {
      console.log("No benchmark failures found!")
      return
    }

    Object.keys(failures[0]![0])
      .map((key) => {
        const value = failures[0]![0][key as keyof (typeof failures)[0][0]]

        const percentageThatHadThisKey =
          failures.filter(
            (x) => x[0][key as keyof (typeof failures)[0][0]] == value,
          ).length / failures.length

        return [value, percentageThatHadThisKey, key] as const
      })
      .sort((a, b) =>
        a[1] < b[1] ? -1
        : a[1] > b[1] ? 1
        : 0,
      )
      .map(([value, percentageThatHadThisKey, key]) => {
        console.log(
          (Math.round(percentageThatHadThisKey * 1000) / 10 + "%").padEnd(5) +
            " of failures had " +
            key +
            " = " +
            value,
        )
      })

    console.error(
      "\nHere are some failed words:\n" +
        failures
          .slice(0, 10)
          .map((x) => x[1])
          .join("\n"),
    )

    console.log(
      "Total benchmark failures: " +
        failures.length +
        " of " +
        testCases.length +
        ".",
    )
  }

  function findAllValidityFailures() {
    const failures = testCases
      .map(([word, source]) => {
        try {
          const result = parseWord(source)

          if (result == null) {
            return [word, source, null] as const
          }

          const output = wordToIthkuil(result)

          return [word, source, output] as const
        } catch (err) {
          return [word, source, false] as const
        }
      })
      .filter(
        ([, source, output]) =>
          output == null || output == false || source != output,
      )

    if (failures.length == 0) {
      console.log("No validity failures found!")
      return
    }

    Object.keys(failures[0]![0])
      .map((key) => {
        const value = failures[0]![0][key as keyof (typeof failures)[0][0]]

        const percentageThatHadThisKey =
          failures.filter(
            (x) => x[0][key as keyof (typeof failures)[0][0]] == value,
          ).length / failures.length

        return [value, percentageThatHadThisKey, key] as const
      })
      .sort((a, b) =>
        a[1] < b[1] ? -1
        : a[1] > b[1] ? 1
        : 0,
      )
      .map(([value, percentageThatHadThisKey, key]) => {
        console.log(
          (Math.round(percentageThatHadThisKey * 1000) / 10 + "%").padEnd(5) +
            " of failures had " +
            key +
            " = " +
            value,
        )
      })

    console.error(
      "\nHere are some failed words:\n\n" +
        failures
          .slice(0, 10)
          .map((x) => {
            return x[1] + "\n" + x[2]
          })
          .join("\n\n"),
    )

    console.error(
      "\nTotal validity failures: " +
        failures.length +
        " of " +
        testCases.length,
    )
  }

  if (!benchmark()) {
    findAllBenchmarkFailures()
    return false
  } else if (!checkValidity()) {
    findAllValidityFailures()
    return false
  } else {
    console.log("All tests passed!")
    return true
  }
}

function containedRunTests(numberOfTestCases: number, mode: "short" | "full") {
  console.log()

  try {
    console.group(`Testing in ${mode} mode ${numberOfTestCases} times...`)
    return runTests(numberOfTestCases, mode)
  } catch (error) {
    console.error("An error occurred.")
    console.error(error)
    return false
  } finally {
    console.groupEnd()
  }
}

if (
  containedRunTests(1e5, "short") &&
  containedRunTests(1e5, "full") &&
  containedRunTests(1e6, "short") &&
  containedRunTests(1e6, "full")
) {
  console.log()
  console.log("All tests passed!")
  console.log()
} else {
  console.log()
  throw new Error("Tests failed.")
}
