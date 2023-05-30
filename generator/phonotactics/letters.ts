/** A global regular expression matching Ithkuilic consonants. */
export const CONSONANT = /[^aeiouäëöü]/g

/**
 * Extracts the vowels from a given text.
 * @param text The text to extract vowels from.
 * @returns The vowels of the given text.
 */
export function extractAllVowels(text: string): string {
  return text.replace(CONSONANT, "")
}

/** A global regular expression matching Ithkuilic vowels. */
export const VOWEL = /[aeiouäëöü]/g

/**
 * Extracts the consonants from a given text.
 * @param text The text to extract consonants from.
 * @returns The consonants of the given text.
 */
export function extractAllConsonants(text: string): string {
  return text.replace(VOWEL, "")
}

/** A regular expression matching an initial consonant cluster. */
export const INITIAL_CONSONANT_CLUSTER = /^[^aeiouäëöü]+/

/**
 * Extracts the initial consonant cluster of a word.
 * @param text The text to extract a cluster from.
 * @returns The matched cluster, or `undefined` is no such cluster exists.
 */
export function extractInitialConsonantCluster(
  text: string,
): string | undefined {
  return text.match(INITIAL_CONSONANT_CLUSTER)?.[0]
}

/** A regular expression matching a final consonant cluster. */
export const FINAL_CONSONANT_CLUSTER = /[^aeiouäëöü]+$/

/**
 * Extracts the final consonant cluster of a word.
 * @param text The text to extract a cluster from.
 * @returns The matched cluster, or `undefined` is no such cluster exists.
 */
export function extractFinalConsonantCluster(text: string): string | undefined {
  return text.match(FINAL_CONSONANT_CLUSTER)?.[0]
}

/** A regular expression matching an initial vowel cluster. */
export const INITIAL_VOWEL_CLUSTER = /^[aeiouäëöü]+/

/**
 * Extracts the initial vowel cluster of a word.
 * @param text The text to extract a cluster from.
 * @returns The matched cluster, or `undefined` is no such cluster exists.
 */
export function extractInitialVowelCluster(text: string): string | undefined {
  return text.match(INITIAL_VOWEL_CLUSTER)?.[0]
}

/** A regular expression matching a final vowel cluster. */
export const FINAL_VOWEL_CLUSTER = /[aeiouäëöü]+$/

/**
 * Extracts the final vowel cluster of a word.
 * @param text The text to extract a cluster from.
 * @returns The matched cluster, or `undefined` is no such cluster exists.
 */
export function extractFinalVowelCluster(text: string): string | undefined {
  return text.match(FINAL_VOWEL_CLUSTER)?.[0]
}
