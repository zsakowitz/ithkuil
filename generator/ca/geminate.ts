import { isLegalConsonantForm } from "../phonotactics/index.js"

/**
 * Attempts to geminate a Ca form.
 * @param text The Ca form to be geminated.
 * @returns The (possibly) geminated Ca form.
 */
export function attemptGemination(text: string): string {
  if (text.length == 1) {
    return text + text
  }

  if (text == "tļ") {
    return "ttļ"
  }

  if (/^[tkpdgb][lrřwy]/.test(text)) {
    return text[0]! + text[0] + text.slice(1)
  }

  {
    const nextText = text.replace(/[sšzžçcčjż]/, (match) => match + match)

    if (nextText != text) {
      return nextText
    }
  }

  if (/^[fţvḑnmň]/.test(text)) {
    return text[0]! + text[0]! + text.slice(1)
  }

  if (/^[tkp][sšfţç]/.test(text)) {
    return text[0]! + text[1]! + text[1]! + text.slice(2)
  }

  if (text.endsWith("pt")) return text.replace(/pt$/, "bbḑ")
  if (text.endsWith("pk")) return text.replace(/pk$/, "bbv")
  if (text.endsWith("kt")) return text.replace(/kt$/, "ggḑ")
  if (text.endsWith("kp")) return text.replace(/kp$/, "ggv")
  if (text.endsWith("tk")) return text.replace(/tk$/, "ḑvv")
  if (text.endsWith("tp")) return text.replace(/tp$/, "ddv")

  if (text.endsWith("pm")) return text.replace(/pm$/, "vvm")
  if (text.endsWith("pn")) return text.replace(/pn$/, "vvn")
  if (text.endsWith("km")) return text.replace(/km$/, "xxm")
  if (text.endsWith("kn")) return text.replace(/kn$/, "xxn")
  if (text.endsWith("tm")) return text.replace(/tm$/, "ḑḑm")
  if (text.endsWith("tn")) return text.replace(/tn$/, "ḑḑn")
  if (text.endsWith("bm")) return text.replace(/bm$/, "mmw")
  if (text.endsWith("bn")) return text.replace(/bn$/, "mml")
  if (text.endsWith("gm")) return text.replace(/gm$/, "ňňw")
  if (text.endsWith("gn")) return text.replace(/gn$/, "ňňl")
  if (text.endsWith("dm")) return text.replace(/dm$/, "nnw")
  if (text.endsWith("dn")) return text.replace(/dn$/, "nnl")

  if (/^[lrř]/.test(text)) {
    const rest = attemptGemination(text.slice(1))

    const firstAttempt = text[0] + rest
    if (rest != text.slice(1) && isLegalConsonantForm(firstAttempt)) {
      return firstAttempt
    }

    return text[0]! + text[0] + text.slice(1)
  }

  return text
}
