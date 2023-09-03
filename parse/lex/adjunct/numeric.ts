/**
 * A regular expression matching numeric adjuncts. Due to the simple structure
 * of numeric adjuncts, these do not have any capture groups. Instead, use the
 * entire result (`match[0]`) to get the relevant information.
 */
export const numericAdjunct = /^\d+$/
