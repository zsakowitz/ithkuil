# `@zsnout/ithkuil`

`@zsnout/ithkuil` is an NPM package that is capable of generating romanized
Ithkuilic text from JSON objects, a task normally done either by looking up
various slots and putting them together, or by writing them into an online
application.

This package allows Ithkuilic text to be generated without needing a UI, which
is helpful when writing tests, one's own automated tools (e.g. for learning), or
for verifying translations.

## Stability

This package is in active development, so expect change. That said, this package
is completely suitable for use as of now

## Features

As of May 29, 2023, `@zsnout/ithkuil` can generate every single kind of word in
Ithkuil. And as of July 6, 2023, it can parse every single kind of word in
Ithkuil. These word types include:

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

## IMPORTANT NOTE

Before using this project, be aware that **_arguments are not validated_**.
Objects passed into functions such as `formativeToIthkuil` are not automatically
validated, and will produce unexpected results or throw errors when given
invalid input.

If you're not 100% sure that you're passing in valid input, validate it with the
Zod validators provided, such as `zodFormative` and `zodAffixualAdjunct`.
Alternatively, enable TypeScript on your application, which will give you full
type safety when using `@zsnout/ithkuil` (and is probably good practice anyway).

The behavior of functions when invalid input is passed in is undefined. As of
0.1.5, this function call...

```ts
import { formativeToIthkuil } from "@zsnout/ithkuil"

const result = formativeToIthkuil({
  type: "UNF/C",
  root: "c",
  case: "greeting",
})

console.log(result)
```

...logs "calundefined", but it may change in the future.

---

Let us now see `@zsnout/ithkuil` in action. Note that all exports are documented
using JSDoc and types with TypeScript, so developers comfortable using those
features will have a wonderful editing experience.

## Example 1

This example compiles a simple formative.

```ts
import { formativeToIthkuil } from "@zsnout/ithkuil"

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
import { formativeToIthkuil } from "@zsnout/ithkuil"

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
      referent: "1m:BEN",

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
import { parseFormative } from "@zsnout/ithkuil"

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
import { parseFormative } from "@zsnout/ithkuil"

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
import { affixualAdjunctToIthkuil } from "@zsnout/ithkuil"

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

This example creates a referential (1m.BEN-CTE-GID₁/3)

```ts
import { referentialToIthkuil } from "@zsnout/ithkuil"

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

Every data form has a corresponding Zod parser for it,

This example validates that an object is, in fact, an Ithkuilic adjunct. This
can be useful when integrating this project with external sources.

```ts
import { adjunctToIthkuil } from "@zsnout/ithkuil"
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
