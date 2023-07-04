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
  formativeToIthkuil,
  parseFormative,
  type Affix,
  type PartialCA,
  type PartialFormative,
  type SlotIII,
} from "../index.js"

const NUMBER_OF_TEST_CASES = 1e6

// The mode to run the test in.
// `short` = generate short formatives,
// `full` = generate long formatives.
const MODE: "short" | "full" = "full"

function randomItem<const T>(
  object: {
    readonly [x: number]: T
    readonly length: number
  } & Iterable<T>,
): T {
  const value = object[Math.floor(Math.random() * object.length)]

  if (value == null) {
    throw new Error("Not enough values to get an item from.")
  }

  return value
}

function biasedRandomItem<const T, const U>(
  defaultValue: T,
  object: {
    readonly [x: number]: U
    readonly length: number
  } & Iterable<U>,
): T | U {
  if (MODE == "full") {
    return randomItem([defaultValue, ...object])
  }

  if (Math.random() < 0.9) {
    return defaultValue
  }

  const value = object[Math.floor(Math.random() * object.length)]

  if (value == null) {
    throw new Error("Not enough values to get an item from.")
  }

  return value
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

    if (Math.random() < 0.75) {
      break
    }
  }

  return output
}

function randomFormative(): PartialFormative {
  const root: SlotIII =
    // Math.random() < 0.1
    //   ? [randomItem(ALL_REFERENTS)]
    //   : Math.random() < 0.1
    //   ? {
    //       cs: randomLetterSeries(5),
    //       degree: randomItem([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    //     }
    //   :
    randomLetterSeries(5)

  if (Math.random() < 30 / NUMBER_OF_TEST_CASES) {
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

    function: biasedRandomItem("STA", ALL_FUNCTIONS),
    specification: biasedRandomItem("BSC", ALL_SPECIFICATIONS),
    context: biasedRandomItem("EXS", ALL_CONTEXTS),

    slotVAffixes: MODE == "short" ? undefined : randomAffixList(),

    ca,

    ...ca,

    slotVIIAffixes: MODE == "short" ? undefined : randomAffixList(),

    vn:
      MODE == "short"
        ? biasedRandomItem(
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

console.time("creating formatives")

const testCases = Array.from({ length: NUMBER_OF_TEST_CASES }, () => {
  const formative = randomFormative()
  const source = formativeToIthkuil(formative)
  return [formative, source] as const
})

console.timeEnd("creating formatives")

function benchmark() {
  let index = 0

  console.time("performing benchmark")

  for (const [formative, source] of testCases) {
    index++

    try {
      const result = parseFormative(source)

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

    try {
      const result = parseFormative(source)

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
      const result = parseFormative(source)

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

  console.log(
    "Total failures: " + failures.length + " of " + testCases.length + ".",
  )
}

function findAllValidityFailures() {
  const failures = testCases
    .map(([formative, source]) => {
      try {
        const result = parseFormative(source)

        if (result == null) {
          return [formative, source, null] as const
        }

        const output = formativeToIthkuil(result)

        return [formative, source, output] as const
      } catch (err) {
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
