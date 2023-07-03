import {
  ALL_AFFILIATIONS,
  ALL_ASPECTS,
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
  ALL_MOODS,
  ALL_PERSPECTIVES,
  ALL_PHASES,
  ALL_SPECIFICATIONS,
  ALL_VALENCES,
  VowelForm,
  buildNonShortcutFormative,
  buildShortcutFormative,
  formativeToIthkuil,
  transformWord,
  type Affix,
  type PartialCA,
  type PartialFormative,
  type Stress,
} from "../index.js"

const NUMBER_OF_TEST_CASES = 1e6

function randomItem<const T>(object: {
  readonly [x: number]: T
  readonly length: number
}): T {
  const value = object[Math.floor(Math.random() * object.length)]

  if (value == null) {
    throw new Error("Not enough values to get an item from.")
  }

  return value
}

function assert(x: boolean, message = "Failed assertion."): asserts x {
  if (!x) {
    // @ts-ignore
    if (typeof process == "object") {
      // @ts-ignore
      process.exitCode = 1
    }
  }
}

function randomCA(): PartialCA {
  return {
    affiliation: randomItem(ALL_AFFILIATIONS),
    configuration: randomItem(ALL_CONFIGURATIONS),
    extension: randomItem(ALL_EXTENSIONS),
    perspective: randomItem(ALL_PERSPECTIVES),
    essence: randomItem(ALL_ESSENCES),
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

function randomAffixList() {
  const output: Affix[] = []

  while (true) {
    output.push(randomAffix())

    if (Math.random() < 0.5) {
      return output
    }
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

    if (Math.random() < 0.5) {
      break
    }
  }

  return output
}

function randomFormative(): PartialFormative {
  const root = randomLetterSeries(5)

  if (Math.random() < 10 / NUMBER_OF_TEST_CASES) {
    return {
      type: randomItem(["UNF/C", "UNF/K", "FRM"]),
      root,
    }
  }

  const ca = randomCA()

  return {
    type: randomItem(["UNF/C", "UNF/K", "FRM"]),

    concatenationType: randomItem(["none", "none", 1, 2]),

    shortcut: true,
    version: randomItem(["PRC", "CPT"]),
    stem: randomItem([1, 2, 3, 0]),

    root,

    function: randomItem(ALL_FUNCTIONS),
    specification: randomItem(ALL_SPECIFICATIONS),
    context: randomItem(ALL_CONTEXTS),

    slotVAffixes: randomAffixList(),

    ca,

    slotVIIAffixes: randomAffixList(),

    vn: randomItem(
      randomItem([
        ALL_VALENCES,
        ALL_PHASES,
        ALL_EFFECTS,
        ALL_LEVELS,
        ALL_ASPECTS,
      ]),
    ),

    caseScope: randomItem(ALL_CASE_SCOPES),
    mood: randomItem(ALL_MOODS),

    case: randomItem(ALL_CASES),
    illocutionValidation: randomItem(ALL_ILLOCUTION_OR_VALIDATIONS),
  }
}

console.time("creating formatives")

const testCases = Array.from({ length: NUMBER_OF_TEST_CASES }, () => {
  const formative = randomFormative()
  const source = formativeToIthkuil(formative)
  return [formative, source] as const
})

console.timeEnd("creating formatives")

function _throw(x: unknown): never {
  throw x
}

function buildFormative(word: string, stress: Stress) {
  return (
    buildNonShortcutFormative(word, stress) ||
    buildShortcutFormative(word, stress)
  )
}

function benchmark() {
  let index = 0

  console.time("performing benchmark")

  for (const [formative, source] of testCases) {
    index++

    const { stress, word } = transformWord(source)

    try {
      const result = buildFormative(word, stress)

      if (result == null) {
        throw new Error("Failed to tokenize.")
      }
    } catch (error) {
      console.error(`Failed on input #${index} '${source}':`)

      console.error("Transformed word: " + word)

      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error("Error: " + String(error))
      }

      console.error(formative)

      return false
    }
  }

  console.timeEnd("performing benchmark")

  return true
}

function checkValidity() {
  let index = 0

  console.time("checking validity")

  for (const [formative, source] of testCases) {
    index++

    const { stress, word } = transformWord(source)

    try {
      const result = buildFormative(word, stress)

      if (result == null) {
        throw new Error("Failed to tokenize.")
      }

      const output = formativeToIthkuil(result)

      if (source != output) {
        throw new Error(
          `Output '${output}' is different from input '${source}'.`,
        )
      }
    } catch (error) {
      console.error(`Failed on input #${index} '${source}':`)

      console.error("Transformed word: " + word)

      if (error instanceof Error) {
        console.error(error)
      } else {
        console.error("Error: " + String(error))
      }

      console.error(formative)

      return false
    }
  }

  console.timeEnd("checking validity")

  return true
}

function findAllBenchmarkFailures() {
  const failures = testCases.filter(([, source]) => {
    try {
      const { stress, word } = transformWord(source)

      const result = buildFormative(word, stress)

      if (result == null) {
        return true
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : err)
      return true
    }
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
    .sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0))
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
    "\nHere are some failed formatives:\n" +
      failures
        .slice(0, 10)
        .map((x) => x[1])
        .join("\n"),
  )
}

function findAllValidityFailures() {
  const failures = testCases
    .map(([formative, source]) => {
      try {
        const { stress, word } = transformWord(source)

        const result = buildFormative(word, stress)

        if (result == null) {
          return [formative, source, null] as const
        }

        const output = formativeToIthkuil(result)

        return [formative, source, output] as const
      } catch (err) {
        // console.log(err instanceof Error ? err.message : err)

        return [formative, source, false] as const
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
    .sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0))
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
    "\nHere are some failed formatives:\n\n" +
      failures
        .slice(0, 10)
        .map((x) => {
          const v1 = VowelForm.parseOrThrow(
            x[1].match(/[aeiouäëöü]+/)?.[0] || "",
          )

          const v2 = x[2]
            ? VowelForm.parseOrThrow(x[2].match(/[aeiouäëöü]+/)?.[0] || "")
            : { sequence: "UNK", degree: "UNK" }

          return (
            `${x[1]} ${v1.toString(false)} ${v1.sequence}:${v1.degree}\n` +
            `${x[2]} ${v2.toString(false)} ${v2.sequence}:${v2.degree}\n` +
            `${JSON.stringify(x[0].slotVIIAffixes?.at(-1))}\n` +
            `${JSON.stringify(x[0].ca)}`
          )
        })
        .join("\n\n"),
  )

  console.error(
    "\nTotal failures: " + failures.length + " of " + testCases.length,
  )
}

if (!benchmark()) {
  findAllBenchmarkFailures()
} else if (!checkValidity()) {
  findAllValidityFailures()
} else {
  console.log("All tests passed!")
}
