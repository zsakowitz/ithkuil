import { isLegalConsonantForm } from "./general.js"

/**
 * A regular expression matching legal single-letter word-initial consonant
 * forms.
 */
export const LEGAL_WORD_INITIAL_1_CONSONANT_FORMS =
  /^[bcçčdḑfghjklmnňprřsštţvwyxzžż]$/

/** A regular expression matching legal two-letter word-initial consonant forms. */
export const LEGAL_WORD_INITIAL_2_CONSONANT_FORMS =
  /^(?:[pbtdkg][rlřwy]|[pk][sšç]|[bg][zž]|[kg][mn]|[sš][ptkfţxcčř]|[zž][bdgvḑżjmnňrwyl]|[szšž][mnňlrwyřv]|[cżčj][rlmnňwv]|[cč][ptkfţh]|[żj][bdgvḑx]|x[ptcčmnlrw]|ç[ptcčkmnňlrřw]|[fvţḑ][rlmnňwyř]|[fţ][ptkcčç]|[vḑ][bdgżj]|ļ[pktcčçmnňwy]|h[lrmnw]|[mn][lrwyř]|ň[lrw]|[lr][wy]|bv|bḑ|dv|gv|gḑ|kf|kh|kç|kţ|pf|ph|px|pç|pļ|pţ|tf|th|tx|tç|tļ)$/

/**
 * A regular expression matching legal three-letter word-initial consonant
 * forms.
 */
export const LEGAL_WORD_INITIAL_3_CONSONANT_FORMS =
  /^(?:[pk][sš].|[bd][zž].|[ptk][fţhļ][wy]|[bdg][vḑ][wy]|[tkpbdg][lr][wy]|[ptk]ç[mnň]|[pk][fţ][wy]|[pt]ļ[wy]|[sšç][ptk][wyřlr]|[zž][bdg][wyřlr]|[sšzžç][mnň][wy]|hlw|hrw|hmw|hnw|hmy|hny|hll|hrr|hmm|hnn|[cč][ptk][rlwyř]|[żj][bdg][rlwyř]|[cčżj][mnň][wy]|[fţ]l[wy]|x[pt][lrwy]|x[mn][wy]|x[cč]w)$/

/**
 * Checks whether a consonant form is allowed in word-initial position.
 *
 * @param consonantForm The consonant form to check.
 * @returns A boolean indicating whether the consonant form is a legal
 *   word-initial consonant form.
 */
export function isLegalWordInitialConsonantForm(text: string) {
  if (!isLegalConsonantForm(text)) {
    return false
  }

  if (text.length == 1) {
    return text != "ļ"
  }

  if (text.length == 2) {
    return LEGAL_WORD_INITIAL_2_CONSONANT_FORMS.test(text)
  }

  if (text.length == 3) {
    return LEGAL_WORD_INITIAL_3_CONSONANT_FORMS.test(text)
  }

  if (text.length == 4) {
    return (
      ("tkp".includes(text[2]!) &&
        "lrřwy".includes(text[3]!) &&
        LEGAL_WORD_INITIAL_3_CONSONANT_FORMS.test(text.slice(0, 3))) ||
      ("szšžcżčjç".includes(text[0]!) &&
        "tkpbdg".includes(text[1]!) &&
        text[2] == "l" &&
        text[3] == "y" &&
        LEGAL_WORD_INITIAL_3_CONSONANT_FORMS.test(text.slice(0, 3)))
    )
  }

  return false
}
