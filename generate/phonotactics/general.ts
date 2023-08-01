/** A regular expression matching illegal consonant forms. */
export const ILLEGAL_CONSONANT_FORMS =
  /[dt][szšžcżčjḑţ]|[kg][xň]|[cżčj][szšžç]|ç[szšžżjļh]|[szšžcżčjxļh]ç|m[pb][fvtd]|(?:m[pb]|n[tdkg]|ň[kg])[szšžcżčjç]|ň[kgxy]|x[szšžçgļňyhř]|[bdghç]ļ|ļ[hļszšžç]|[ļxç]h$|[rh]ř|s[šzž]|z[šžs]|š[zžs]|ž[šzs]|bp|pb|kg|gk|dp|pd|fv|ţḑ|sz|šž|vf|ḑţ|zs|žš|cż|żc|čj|jč|čc|jc|čż|jż|šc|šż|žc|žż|sż|nc|nč|nż|nj|ngḑ|np|nb|řr|nf(?!$)|nv(?!$)|[wy](?!$)/

/**
 * Checks whether a consonant form is phonotactically legal.
 * @param consonantForm The consonant form to check.
 * @returns A boolean indicating whether the consonant form is legal.
 */
export function isLegalConsonantForm(consonantForm: string) {
  return !ILLEGAL_CONSONANT_FORMS.test(consonantForm)
}
