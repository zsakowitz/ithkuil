# `ithkuil`

`ithkuil` is an NPM package that is capable of generating romanized Ithkuilic
text from JSON objects, a task normally done either by looking up various slots
and putting them together, or by writing them into an online application.

This package allows Ithkuilic text to be generated without needing a UI, which
is helpful when writing tests, one's own automated tools (e.g. for learning), or
for verifying translations.

## Features

As of May 29, 2023, `ithkuil` can generate these types of words:

- Formatives
- Affixual root formatives
- Personal-reference root formatives
- Referentials
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

`ithkuil` has many more functions. However, these are too numerous to place into
a single document. To experiment with all of `ithkuil`'s functionality, install
it and use your code editor's tools to see the available functions it exports.

## IMPORTANT NOTE

Before using this project, be aware that **_arguments are not validated_**.
Objects passed into functions such as `formativeToIthkuil` are not automatically
validated, and will produce unexpected results or throw errors when given
invalid input.

If you're not 100% sure that you're passing in valid input, validate it with the
Zod validators provided, such as `zodFormative` and `zodAffixualAdjunct`.
Alternatively, enable TypeScript on your application, which will give you full
type safety when using `ithkuil` (and is probably good practice anyway).

The behavior of functions when invalid input is passed in is undefined. As of
0.1.5, this function call...

```ts
import { formativeToIthkuil } from "ithkuil"

const result = formativeToIthkuil({
  type: "UNF/C",
  root: "c",
  case: "greeting",
})

console.log(result)
```

...logs "calundefined", but it may change in the future.

---

Let us now see `ithkuil` in action. Note that all exports are documented using
JSDoc and types with TypeScript, so developers comfortable using those features
will have a wonderful editing experience.

## Example 1

This example compiles a simple formative.

```ts
import { formativeToIthkuil } from "ithkuil"

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
import { formativeToIthkuil } from "ithkuil"

const result = formativeToIthkuil({
  type: "UNF/C",

  // Type-2 concatenation
  concatenatenationType: 2,

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
// `ithkuil`: hwikšöeroeržžgeiha
//   Ithkapp: hwikšöeroeržžgeiha
```

Notice that in the above example, we didn't have to say whether the Vn slot was
a Valence, Phase, etc. We simply specified "REP" as the Vn slot and `ithkuil`
figured out the appropriate category automatically.

In addition, we only specified part of the Ca complex. We left out Monadic
Perspective and Normal Essence, but `ithkuil` inferred those.

## Example 3

`ithkuil` doesn't just handle formatives; it can work with all types of
Ithkuilic words. Let's try an affixual adjunct, as those are used frequently to
move affixes out of formatives.

```ts
import { affixualAdjunctToIthkuil } from "ithkuil"

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

## Example 4

This example creates a referential (1m.BEN-CTE-GID₁/3)

```ts
import { referentialToIthkuil } from "ithkuil"

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

## Example 5

This example validates that an object is, in fact, an Ithkuilic adjunct. This
can be useful when integrating this project with external sources.

```ts
import { adjunctToIthkuil, zodAdjunct } from "ithkuil"

const adjunct = getAdjunctFromSomeInternetSource()

const realAdjunct = zodAdjunct.parse(adjunct)

const result = adjunctToIthkuil(realAdjunct)

console.log(result)
```
