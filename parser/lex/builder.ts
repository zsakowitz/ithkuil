/** A generic part of a regular expression. */
export class RegexPart {
  constructor(
    /** The source text for this RegexPart. */
    readonly source: string,
  ) {
    Object.freeze(this)
  }

  /**
   * Creates a new RegexPart matching the contents of this one in a capture
   * group.
   * @returns The new RegexPart.
   */
  asGroup() {
    return new AtomicRegexPart("(" + this.source + ")")
  }

  /**
   * Creates a new RegexPart matching the contents of this one in a named
   * capture group.
   * @returns The new RegexPart.
   */
  asNamedGroup(name: string) {
    return new AtomicRegexPart("(?<" + name + ">" + this.source + ")")
  }

  /**
   * Creates a new RegexPart that matches the same content as this one, but is
   * optional.
   * @returns The new RegexPart.
   */
  optional() {
    return new RegexPart("(?:" + this.source + ")?")
  }

  /**
   * Creates a new RegexPart that matches zero or more repetitions of this
   * pattern.
   * @returns The new RegexPart.
   */
  zeroOrMore() {
    return new RegexPart("(?:" + this.source + ")*")
  }

  /**
   * Creates a new RegexPart that matches one or more repetitions of this
   * pattern.
   * @return The new RegexPart.
   */
  oneOrMore() {
    return new RegexPart("(?:" + this.source + ")+")
  }

  /**
   * Creates a new RegexPart that matches this part's content, but only if it
   * will match the entire source string.
   * @returns The new RegexPart.
   */
  matchEntireText() {
    return new RegexPart("^(?:" + this.source + ")$")
  }

  /**
   * Creates a new RegexPart that is a negative lookahead that prevents the
   * future text from matching the current pattern.
   * @returns The new RegexPart.
   */
  not() {
    return new AtomicRegexPart("(?!" + this.source + ")")
  }

  /**
   * Creates a regular expression matching the contents of this RegexPart.
   * @param flags The flags to compile with.
   * @returns A regular expression.
   */
  compile(flags = "") {
    return new RegExp(this.source, flags)
  }

  /**
   * Gets the source text of this RegexPart.
   * @returns The source text of this RegexPart.
   */
  toString() {
    return this.source
  }
}

/**
 * A subclass of `RegexPart` used for atomic matchers such as single characters,
 * character classes, groups, and so on.
 */
export class AtomicRegexPart extends RegexPart {
  /**
   * Creates a new RegexPart that matches the same content as this one, but is
   * optional.
   * @returns The new RegexPart.
   */
  override optional() {
    return new RegexPart(this.source + "?")
  }

  /**
   * Creates a new RegexPart that matches zero or more repetitions of this
   * pattern.
   * @returns The new RegexPart.
   */
  override zeroOrMore() {
    return new RegexPart(this.source + "*")
  }

  /**
   * Creates a new RegexPart that matches one or more repetitions of this
   * pattern.
   * @return The new RegexPart.
   */
  override oneOrMore() {
    return new RegexPart(this.source + "+")
  }
}

/** A subclass of `RegexPart` used for matchers that include multiple paths. */
export class RegexPartWithAlternates extends RegexPart {}

/**
 * Escapes text for use in a regular expression (e.g. `hello$world.` becomes
 * `hello\$world\.`).
 * @param text The text to be escaped.
 * @returns The escaped text.
 */
export function escapeRegex(text: string) {
  return text.replace(/[\^$\\.*+?()[\]{}|-]/g, "\\$&")
}

/** A `RegexPart` matching the start of the source text. */
export const start = /* @__PURE__ */ new RegexPart("^")

/** A `RegexPart` matching the end of the source text. */
export const end = /* @__PURE__ */ new RegexPart("$")

/**
 * Creates a `RegexPart` matching a specified piece of text.
 * @param text The text to be matched.
 * @returns A `RegexPart` matching the specified text.
 */
export function text(text: string) {
  text = escapeRegex(text)

  if (text.length == 1) {
    return new AtomicRegexPart(text)
  } else {
    return new RegexPart(text)
  }
}

/**
 * Creates a `RegexPart` matching any of the specified characters.
 * @param chars The characters that may be matched.
 * @returns A `RegexPart` matching one of the specified characters.
 */
export function charIn(chars: string) {
  return new AtomicRegexPart("[" + escapeRegex(chars) + "]")
}

/**
 * Creates a `RegexPart` matching any character except for those specified.
 * @param chars The characters that may NOT be matched.
 * @returns A `RegexPart` matching any character except those specified.
 */
export function charNotIn(chars: string) {
  return new AtomicRegexPart("[^" + escapeRegex(chars) + "]")
}

/**
 * Creates a `RegexPart` matching any of a list of parts, giving precedence to
 * matching the first one.
 * @param parts The parts that may be matched.
 * @returns A `RegexPart` matching any of the passed parts.
 */
export function any(...parts: [RegexPart, RegexPart, ...RegexPart[]]) {
  return new RegexPartWithAlternates(parts.join("|"))
}

/**
 * Creates a `RegexPart` matching any of the passed texts, giving precedence to
 * the first one.
 * @param texts The texts that may be matched.
 * @returns A `RegexPart` matching any of the passed texts.
 */
export function anyText(...texts: [string, string, ...string[]]) {
  return new RegexPartWithAlternates(texts.map((x) => escapeRegex(x)).join("|"))
}

/**
 * Creates a `RegexPart` matching each of the passed parts in order.
 * @param parts The parts that will be matched.
 * @returns A `RegexPart` matching all of the passed parts in order.
 */
export function seq(...parts: [RegexPart, RegexPart, ...RegexPart[]]) {
  return new RegexPart(
    parts
      .map((x) =>
        x instanceof RegexPartWithAlternates
          ? "(?:" + x.source + ")"
          : x.source,
      )
      .join(""),
  )
}
