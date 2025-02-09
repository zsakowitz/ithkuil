# `@zsnout/ithkuil`

`@zsnout/ithkuil` is a package containing several utilities for working with New
Ithkuil text. It can generate romanized text from JSON objects, parse text into
JSON objects, and write in Ithkuil's writing system using SVG paths.

## Custom Character Syntax

In addition to standard romanized Ithkuil, this package adds many new word kinds
for writing script characters. See [this Google Slide](https://docs.google.com/presentation/d/1Mw3mNznsiX0PTC9bA1vYvxOyCHliN6t2Veo7eL9cJas/edit#slide=id.g26f27f18900_0_0)
explaining the syntax for more information. Examples include `ho1` for forcing a
particlar kind of register, `Q2world` for forcing the transcription of "world" to
be included, and `QA27o'u` to force a particular quaternary character.

## Stability

This package is in active development, so expect change. That said, this package
is completely suitable for use, and has even been tested somewhat.

## Features

`@zsnout/ithkuil` can generate (as of May 29, 2023), parse (as of July 6, 2023),
create block script for (as of August 1, 2023), and gloss (as of August
25, 2023) every kind of word in Ithkuil, including:

- Formatives
- Specialized Cs-root formatives
- Specialized personal-reference formatives
- Single- and dual- referentials
- Combination referentials
- Affixual adjuncts
- Bias adjuncts
- Modular adjuncts
- Parsing adjuncts
- Register adjuncts
- Suppletive adjuncts
- Referentials with suppletive adjuncts as heads

It also has many, many more functions. It can:

- Map the values of various categories to their names
- Provide descriptions for certain forms
- Check whether a consonant form is phonotactically legal
- Insert glottal stops into vowel forms
- Compute Ca forms and their geminated counterparts
- Validate incoming objects containing Ithkuilic word data

`@zsnout/ithkuil` has many more functions. However, these are too numerous to
place into a single document. To experiment with all of `@zsnout/ithkuil`'s
functionality, install it and use your code editor's tools to see the available
functions it exports.

## Important Note

Unlike most packages available online, `@zsnout/ithkuil` does not have a
top-level export. That is, directly importing from `@zsnout/ithkuil` will fail.

```ts
// INCORRECT:
import { parseWord } from "@zsnout/ithkuil"
```

Instead, always make sure to import from the proper sub-package. Currently,
there are four sub-packages:

- **`@zsnout/ithkuil/data`**, which has JSON information about all roots and
  affixes.
- **`@zsnout/ithkuil/generate`**, which generates romanized text.
- **`@zsnout/ithkuil/gloss`**, which turns Ithkuil words from the JSON format
  into gloss strings.
- **`@zsnout/ithkuil/parse`**, which parses romanized text.
- **`@zsnout/ithkuil/script`**, which generates SVG block script.
- **`@zsnout/ithkuil/zod`**, which provides Zod validators for this project.

```ts
// CORRECT:
import { parseWord } from "@zsnout/ithkuil/parse"
```

## JSX

If you're generating block script using the `script` module, you may find it
helpful to use our mini JSX library to make things easier to work with. It's
completely optional, but it makes writing code much simpler. Here's an example
without JSX.

```ts
import {
  Anchor,
  CharacterRow,
  fitViewBox,
  textToScript,
} from "@zsnout/ithkuil/script"

function displayText(text: string) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  const result = textToScript(text)

  if (result.ok) {
    const row = CharacterRow({
      children: result.value,
      compact: true,
    })

    const anchored = Anchor({
      at: "cc",
      children: row,
    })

    svg.appendChild(anchored)
  } else {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")

    text.textContent = result.reason

    svg.appendChild(text)
  }

  document.body.append(svg)

  fitViewBox(svg)
}

displayText("Wattunkí ruyün")
```

And here's the same example with JSX:

```tsx
import {
  Anchor,
  CharacterRow,
  HandleResult,
  fitViewBox,
  textToScript,
} from "@zsnout/ithkuil/script"

function displayText(text: string) {
  const svg = (
    <svg>
      <HandleResult
        ok={(value) => (
          <Anchor at="cc">
            <CharacterRow compact>{value}</CharacterRow>
          </Anchor>
        )}
        error={(reason) => <text>{reason}</text>}
      >
        {textToScript(text)}
      </HandleResult>
    </svg>
  ) as SVGSVGElement

  document.body.append(svg)

  fitViewBox(svg)
}

displayText("Wattunkí ruyün")
```

Before setting up JSX, make sure you're in a TypeScript project.

If you don't already have a JSX transform, add these lines to your tsconfig's
`compilerOptions` to enable JSX:

```json
{
  "compilerOptions": {
    ...
    "jsx": "react-jsx",
    "jsxImportSource": "@zsnout/ithkuil/script"
    ...
  }
}
```

If you're already using a JSX transform, write this at the top of any files you
want to use `@zsnout/ithkuil`'s JSX in.

```ts
/* @jsx react-jsx */
/* @jsxRuntime automatic */
/* @jsxImportSource @zsnout/ithkuil/script */
```

That's it!

Note that the JSX runtime is intentionally very minimal. There are no event
listeners, no signals, no hooks, very few type definitions, and it only
generates SVG elements.

## Example 1

This example compiles a simple formative.

```ts
import { formativeToIthkuil } from "@zsnout/ithkuil/generate"

const result = formativeToIthkuil({
  root: "kš",
  type: "UNF/C",
})

console.log(result)
// kšala
```

Notice how the function `formativeToIthkuil` is able to infer default values for
most of its arguments.

## Example 2

Just being able to convert formative roots into Ithkuil isn't very exciting.
Let's try an example with many options.

```ts
import { formativeToIthkuil } from "@zsnout/ithkuil/generate"

const result = formativeToIthkuil({
  type: "UNF/C",

  // Type-2 concatenation
  concatenationType: 2,

  // Completive Version
  version: "CPT",

  // Stem II
  stem: 2,

  // "kš" root
  root: "kš",

  // Dynamic Function
  function: "DYN",

  // Objective Specification
  specification: "OBJ",

  // Amalgamative Context
  context: "AMG",

  slotVAffixes: [
    // Referential Affix
    {
      // 1m:BEN Referent
      referents: ["1m:BEN"],

      // Ergative Case
      case: "ERG",
    },
  ],

  ca: {
    // Multiplex/Fuzzy/Connected Configuration
    configuration: "MFC",

    // Coalescent Affiliation
    affiliation: "COA",

    // Graduative Extension
    extension: "GRA",
  },

  // Repetitive Phase
  vn: "REP",
})

console.log(result)
// hwikšöeroeržžgeiha
```

Notice that in the above example, we didn't have to say whether the Vn slot was
a Valence, Phase, etc. We simply specified "REP" as the Vn slot and
`@zsnout/ithkuil` figured out the appropriate category automatically.

In addition, we only specified part of the Ca complex. We left out Monadic
Perspective and Normal Essence, but `@zsnout/ithkuil` inferred those.

## Example 3

Not only can `@zsnout/ithkuil` generate formatives, but it can also parse them
using the `parseFormative` function. Let's try it out.

```ts
import { parseFormative } from "@zsnout/ithkuil/parse"

const result = parseFormative("malëuţřait")

console.log(result)

// {
//   type: "UNF/C",
//   concatenationType: undefined,
//   shortcut: false,
//   stem: 1,
//   version: "PRC",
//   root: "m",
//   context: "EXS",
//   specification: "BSC",
//   function: "STA",
//   slotVAffixes: [],
//   ca: {},
//   slotVIIAffixes: [
//     { type: 2, degree: 5, cs: "ţř" },
//     { type: 2, degree: 1, cs: "t" },
//   ],
//   mood: undefined,
//   caseScope: undefined,
//   vn: undefined,
//   case: undefined,
//   illocutionValidation: undefined,
// }
```

As you can see, `parseFormative` quickly turns formative strings into
programmatically analyzable objects.

Note that concatenated formatives must be parsed separately from their parents,
as shown below with the example "hlarrau-laza" (a tribe of people owned by a
cat).

```ts
import { parseFormative } from "@zsnout/ithkuil/parse"

// Correct:

const result1 = parseFormative("hlarrau")
const result2 = parseFormative("laza")

console.log(result1, result2) // { type: "UNF/C", ... }, { type: "UNF/C", ... }

// Incorrect:

const result = parseFormative("hlarrau-laza")

console.log(result) // undefined
```

Note that `parseFormative` can output three types of values.

1. If the formative doesn't have a valid slot structure (e.g. an invalid number
   of C and V forms), `undefined` is returned.

2. If the formative has a valid slot structure but its slots are filled with
   invalid values (such as üö in the Vc slot), an error is thrown.

3. If the formative is a valid formative, the parsed formative is returned.

## Example 4

`@zsnout/ithkuil` doesn't just handle formatives; it can work with all types of
Ithkuilic words. Let's try generating an affixual adjunct, as those are used
frequently to move affixes out of formatives.

```ts
import { affixualAdjunctToIthkuil } from "@zsnout/ithkuil/generate"

const result = affixualAdjunctToIthkuil({
  affixes: [
    {
      type: 1,
      degree: 2,
      cs: "c",
    },
  ],
  scope: "VII:DOM",
})

console.log(result)
// äce
```

## Example 5

This example creates a referential (1m.BEN-CTE-GID₁/3).

```ts
import { referentialToIthkuil } from "@zsnout/ithkuil/generate"

const result = referentialToIthkuil({
  referents: ["1m:BEN"],
  specification: "CTE",
  affixes: [
    {
      type: 1,
      degree: 3,
      cs: "c",
    },
  ],
})

console.log(result)
// raxtec
```

## Example 6

This example shows the glossing capabilities of `@zsnout/ithkuil`.

```ts
import { glossWord } from "@zsnout/ithkuil/gloss/index.js"
import { parseWord } from "@zsnout/ithkuil/parse/index.js"

const result2 = parseWord("wetace")

if (result2) {
  const { short, full } = glossWord(result2)

  // S2-‘that one’-‘female’₁-ABS
  console.log(short)

  // stem_two-‘that one’-‘female’₁-absolutive
  console.log(full)
}
```

As you can see, `@zsnout/ithkuil` provides simple glossing functionality for
Ithkuil words.

## Example 7

Every data form has a corresponding Zod parser for it, which allows for quick
and easy validation of it.

This example validates that an object is, in fact, an Ithkuilic adjunct. This
can be useful when integrating this project with external sources.

```ts
import { adjunctToIthkuil } from "@zsnout/ithkuil/generate"
import { adjunct } from "@zsnout/ithkuil/zod"

const myAdjunct = getAdjunctFromSomeInternetSource()

try {
  const realAdjunct = adjunct.parse(myAdjunct)

  const result = adjunctToIthkuil(realAdjunct)

  console.log(result)
} catch (error) {
  console.error("The adjunct was malformed.", { cause: error })
}
```

## Changelog

### 0.1.52

- **Breaking change:** Multiple referents may now be stored in a referential
  affix. As such, all referential affixes now use the `referents` property
  instead of the singular `referent` property, and take a `ReferentList` instead
  of a single `Referent`.

- **Breaking change:** `parseReferentialAffixCs` has been merged into
  `parseReferentListAndPerspective`. As such, `parseReferentListAndPerspective`
  now takes a boolean argument indicating whether it is parsing a referential
  affix.

- **Breaking change:** The `vnToAffix`, `toAffix`, and
  `mergeAdjunctsAndFormative` functions have been moved from
  `@zsnout/ithkuil/script` to `@zsnout/ithkuil/generate` to allow for them to be
  imported without needing an SVG document in place.

### 0.1.20

- Fixed issues with examples.

### 0.1.19

- **Massive breaking change:** `@zsnout/ithkuil/generator`'s exports are now
  only available under `@zsnout/ithkuil/generate`. They are no longer exported
  from `@zsnout/ithkuil`.

- **Massive breaking change:** `@zsnout/ithkuil/parser`'s exports are now only
  available under `@zsnout/ithkuil/parse`. They are no longer exported from
  `@zsnout/ithkuil`.

- **Breaking change:** The `DFT` level has been correctly updated to `DFC`.

- **New feature:** The `@zsnout/ithkuil/script` sub-package has been created,
  and may be used to generate Ithkuil script as SVG paths.

### 0.1.18

- Fixed punctuation in README.

### 0.1.17

- **Output change and bug fix:** Referentials that have multiple referents are
  now parsed correctly.

### 0.1.16

- **Breaking change:** The `Referent` type, the `ALL_REFERENTS` array, and the
  `REFERENT_TO_ITHKUIL_MAP` and `REFERENT_TO_REFERENT_OBJECT_MAP` objects have
  all been reordered. Where their unions, elements, and keys were previously
  ordered `1m:NEU`, `2m:NEU`, `2p:NEU`, ..., `1m:BEN`, `2m:BEN`, ..., `1m:DET`,
  ..., they are now ordered `1m:NEU`, `1m:BEN`, `1m:DET`, `2m:NEU`, `2m:BEN`,
  etc.

- **Breaking change:** Referentials can now take multiple referents in their
  second referent slot. As such, the `referent2` property of referentials has
  now been pluralized and changed to the `referents2` property.

- **Breaking type-level change:** The `CN` type union now includes
  `MoodOrCaseScope` instances. As such, it no longer only contains string
  literals.

- **Output change:** Passing differently ordered lists to
  `referentListToIthkuil` now gives the same output.

- Added `MoodOrCaseScope` class to represent Cn forms in Modular Adjuncts.

- Added functions to lex and parse adjuncts

- Added `parseWord` to parse formatives, referentials, and adjuncts all at once

- Added `wordToIthkuil` to turn generic words into Ithkuil

- Added `word` Zod parser to validate generic JSON objects representing words

- Fix several issues involving the parsing of formatives with specialized
  Cs-roots and specialized personal-reference roots

- Allow multiple referents in C2 of dual referentials

- Added `SingleRegisterAdjunct` to indicate individual registers, such as
  `DSV:START`, `CGT:END`, and so on. Note that `SingleRegisterAdjunct` does not
  include `NRR:START`, `NRR:END`, or `END:START`.

### 0.1.15

- **Output change:** Formatives with specialized personal-reference roots now
  properly take a+Ca shortcuts

- **Bug fix and output change:** Formatives with specialized Cs-roots or
  personal-reference roots whose final Slot VII affix is NEG/4, DCD/4, or DCD/5
  keep their proper Vv values instead of having them replaced with Slot VII
  affix shortcut values

- `parseFormative` now successfully parses formatives with specialized Cs-roots
  and specialized personal-reference roots

### 0.1.14

- **Breaking change:** Changed `WithWYAlternative.precededByW` to
  `WithWYAlternative.valueAfterW`

- **Breaking change:** Changed `WithWYAlternative.precededByY` to
  `WithWYAlternative.valueAfterY`

- **Breaking change:** Renamed export `ALL_DIPTIONGS` to `ALL_DIPTHONGS`

- **Breaking change:** Zod validators are now only exported from
  `@zsnout/ithkuil/zod` under the direct names `aspect`, `caseScope`,
  `partialFormative`, etc., and are no longer available from the core
  `@zsnout/ithkuil`.

- **Output change:** All generated words now end in a vowel form, fixing issues
  with External Juncture.

- **Output change and bug fix:** Vv forms are now properly generated.
  Previously, a Stem 3 PRC word may have outputted a Stem 0 CPT Vv form, and
  vice versa.

- **Bug fix:** Moved Zod validators into a separate file. This fixes an issue
  where imports were resolved in an order that caused many Zod validators to be
  `undefined` or in a TDZ when they were expected to have values.

- Added `STANDARD_VOWEL_TABLE`, an array of vowel forms indexed as would be
  appropriate for humans. Where the previous tables had unexpected behavior
  (`ZERO_INDEXED_VOWEL_TABLE[2][9]` = degree 0 of sequence 3), the new table
  behaves exactly as would be expected (`STANDARD_VOWEL_TABLE[3][0]` = degree 0
  of sequence 3). The old tables `ZERO_INDEXED_VOWEL_TABLE` and
  `ONE_INDEXED_VOWEL_TABLE` will remain for performance- and TypeScript-related
  reasons.

- Use `STANDARD_VOWEL_TABLE` instead of `ONE_INDEXED_VOWEL_TABLE` in
  `generator/affix/index.ts`.

- Add `deepFreezeAndNullPrototype` helper

- Add `insertGlottalStopIntoPossiblyWithWYAlternative` helper

- Change formatting to insert commas at the end of multiline function calls

- Add regular expression builder

- Add basic regular expression forms such as V, C, H, CG, CNG, VG, and VNG

- Add regular expression for non-shortcut formatives

- Add parsers for affixes, Ca forms, case scopes, cases, formatives, illocutions
  and validations, moods, referential affixes, and Vn forms

- Add `transformWord`

- Add `VowelForm` for systematic parsing and stringification of vowel forms

- Add `parseFormative` to parse formatives

- Add Slot VIII Mood/Case-Scope shortcut generation

### 0.1.13

- **Breaking change:** Fixed spelling mistake (`concatenatenationType` -->
  `concatenationType`)

### 0.1.12

- Added case-accessor and inverse case-accessor affixes

### 0.1.11

- Added an array constant that contains all cases arranged in order and that
  properly skips the 8th degree of the last four case categories. This new
  array, `ALL_CASES_SKIPPING_DEGREE_8`, has a length of `72` and contains four
  empty cells: one before each of the `RLT`, `VOC`, `NAV`, and `PLM` cases.

- Fixed Ca gemination algorithm (geminates involving N/RPV and A/RPV are
  complicated, and many Ca forms simply cannot be geminated according to
  Ithkuil's rules)
