import { any, anyText, charIn, RegexPart, seq, text } from "./builder.js"

const vowel = /* @__PURE__ */ charIn("aeiouäëöü'")
const nonGlottalStopVowel = /* @__PURE__ */ charIn("aeiouäëöü")
const consonant = /* @__PURE__ */ charIn("pbtdkgfvţḑszšžçxhļcżčjmnňrlwyř_")
const standardConsonant = /* @__PURE__ */ charIn("pbtdkgfvţḑszšžçxļcżčjmnňrlř_")
const specialConsonant = /* @__PURE__ */ charIn("hwy")

const geminate = /* @__PURE__ */ anyText(
  "pp",
  "bb",
  "tt",
  "dd",
  "kk",
  "gg",
  "ff",
  "vv",
  "ţţ",
  "ḑḑ",
  "ss",
  "zz",
  "šš",
  "žž",
  "çç",
  "xx",
  "ļļ",
  "cc",
  "żż",
  "čč",
  "jj",
  "mm",
  "nn",
  "ňň",
  "rr",
  "ll",
  "řř",
)

/** A `RegexPart` matching a vowel form. */
export const V = /* @__PURE__ */ vowel.oneOrMore()

/** A `RegexPart` matching a vowel form that includes a glottal stop. */
export const VG = /* @__PURE__ */ seq(
  /* @__PURE__ */ vowel.zeroOrMore(),
  /* @__PURE__ */ text("'"),
  /* @__PURE__ */ vowel.zeroOrMore(),
)

/** A `RegexPart` matching a vowel form that does not include a glottal stop. */
export const VNG = /* @__PURE__ */ seq(
  /* @__PURE__ */ nonGlottalStopVowel.oneOrMore(),
  /* @__PURE__ */ text("'").not(),
)

/**
 * A `RegexPart` matching a standard consonant form (one not beginning with w-,
 * y-, or h-).
 */
export const C = /* @__PURE__ */ seq(
  standardConsonant,
  /* @__PURE__ */ consonant.zeroOrMore(),
)

/**
 * A `RegexPart` matching a numeric form (set of underscores and decimal digits
 * with at least one decimal digit).
 */
export const N = /* @__PURE__ */ new RegexPart("[\\d_]*\\d[\\d_]*")

/** A regex matching a complete numeric form. */
export const n = /* @__PURE__ */ N.matchEntireText().compile()

/** A `RegexPart` matching a root (either C or N). */
export const R = /* @__PURE__ */ any(C, N)

/**
 * A `RegexPart` matching a special consonant form (one beginning with w-, y-,
 * or h-).
 */
export const H = /* @__PURE__ */ seq(
  specialConsonant,
  /* @__PURE__ */ consonant.zeroOrMore(),
)

/**
 * A `RegexPart` matching a standard consonant form that includes a geminated
 * consonant.
 */
export const CG = /* @__PURE__ */ seq(
  /* @__PURE__ */ seq(standardConsonant, consonant.zeroOrMore()).optional(),
  geminate,
  /* @__PURE__ */ consonant.zeroOrMore(),
)

/**
 * A `RegexPart` matching a standard consonant form that does not include a
 * geminated consonant.
 */
export const CNG = /* @__PURE__ */ seq(
  /* @__PURE__ */ seq(consonant.zeroOrMore(), geminate).not(),
  standardConsonant,
  /* @__PURE__ */ consonant.zeroOrMore(),
)

/** Either `CNG` or `N`. */
export const RNG = /* @__PURE__ */ any(CNG, N)
