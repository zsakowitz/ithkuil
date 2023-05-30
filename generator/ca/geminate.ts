import { isLegalConsonantForm } from "../phonotactics/index.js"

/**
 * Geminates a Ca form.
 * @param text The Ca form to be geminated.
 * @returns The geminated Ca form.
 */
export function geminateCA(text: string): string {
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
    const nextText = text.replace(/[sšzžçcč]/, (match) => match + match)

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

  if (text.includes("pt")) return text.replace("pt", "bbḑ")
  if (text.includes("pk")) return text.replace("pk", "bbv")
  if (text.includes("kt")) return text.replace("kt", "ggḑ")
  if (text.includes("kp")) return text.replace("kp", "ggv")
  if (text.includes("tk")) return text.replace("tk", "ḑvv")
  if (text.includes("tp")) return text.replace("tp", "ddv")

  if (text.includes("pm")) return text.replace("pm", "vvm")
  if (text.includes("pn")) return text.replace("pn", "vvn")
  if (text.includes("km")) return text.replace("km", "xxm")
  if (text.includes("kn")) return text.replace("kn", "xxn")
  if (text.includes("tm")) return text.replace("tm", "ḑḑm")
  if (text.includes("tn")) return text.replace("tn", "ḑḑn")
  if (text.includes("bm")) return text.replace("bm", "mmw")
  if (text.includes("bn")) return text.replace("bn", "mml")
  if (text.includes("gm")) return text.replace("gm", "ňňw")
  if (text.includes("gn")) return text.replace("gn", "ňňl")
  if (text.includes("dm")) return text.replace("dm", "nnw")
  if (text.includes("dn")) return text.replace("dn", "nnl")

  if (/^[lrř]/.test(text)) {
    const a = text[0] + geminateCA(text.slice(1))

    if (isLegalConsonantForm(a)) {
      return a
    }

    return text[0]! + text[0] + text.slice(1)
  }

  throw new Error("Cannot geminate CA form '" + text + "'.")
}
