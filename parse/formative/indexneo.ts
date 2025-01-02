import { has, join } from "../../generate/index.js"
import { anyText, seq } from "../lex/builder.js"
import { geminate, H, R, V } from "../lex/forms.js"

/**
 * Capturing groups:
 *
 * 1. Cc?
 * 2. Vv?
 * 3. Cr
 * 4. (Vx Cs)*
 * 5. Vn?
 * 6. Cn?
 * 7. (Vx Cs)*
 * 8. Vc?
 */
const main = /* @__PURE__ */ seq(
  /* @__PURE__ */ seq(
    /* @__PURE__ */ H.asGroup().optional(), // Cc
    /* @__PURE__ */ V.asGroup(), // Vv
  ).optional(),

  /* @__PURE__ */ R.asGroup(), // Cr

  /* @__PURE__ */ seq(V, R).zeroOrMore().asGroup(), // VxCs
  /* @__PURE__ */ seq(
    /* @__PURE__ */ V.asGroup(), // Vn
    /* @__PURE__ */ H.asGroup(), // Cn
    /* @__PURE__ */ seq(V, R).zeroOrMore().asGroup(), // VxCs
  ).optional(),

  /* @__PURE__ */ V.optional().asGroup(), // Vc
)
  .matchEntireText()
  .compile()

const ccShortcut = /* @__PURE__ */ anyText("w", "y", "hl", "hr", "hm", "hn")
  .matchEntireText()
  .compile()

const cnShortcut = /* @__PURE__ */ anyText("hl", "hr", "hm", "hn", "hň")
  .matchEntireText()
  .compile()

const vc = seq(V.asGroup(), R.asGroup()).compile("g")

type Form = [vxcs: string, vx: string, cs: string]

function getForms(v: string) {
  const output: Form[] = []
  let match
  while ((match = vc.exec(v))) {
    output.push([match[0]!, match[1]!, match[2]!])
  }
  return output
}

function mapForms(forms: Form[]): AffixRaw[] {
  return forms.map(([, vx, cs]) => ({ vx, cs }))
}

function extractForms(forms: string): AffixRaw[] {
  return mapForms(getForms(forms))
}

type AffixRaw = { vx: string; cs: string }
type AffixesRaw = { 5: AffixRaw[]; 7: AffixRaw[] }

function tokenizeStandardInner(
  vx1: string,
): { vr: string; ca: string; vx: AffixesRaw } | undefined {
  const forms = getForms(vx1)
  if (forms.length == 0) return

  const vr = forms[0]![1]

  const geminateIndex = forms.findIndex((x) => geminate.test(x[2]))
  if (geminateIndex == -1) {
    const ca = forms[0]![2]
    if (ca == "x" || ca == "xt" || ca == "xp") {
      return
    }
    return {
      vr,
      ca,
      vx: { 5: [], 7: mapForms(forms.slice(1)) },
    }
  }

  const ca = forms[geminateIndex]![2]
  if (ca == "xx") {
    return
  }
  return {
    vr,
    ca,
    vx: {
      5: Array.from({ length: geminateIndex }, (_, i) => ({
        vx: forms[i + 1]![1],
        cs: forms[i]![2],
      })),
      7: mapForms(forms.slice(geminateIndex + 1)),
    },
  }
}

export function tokenize(word: string) {
  const match = word.match(main)
  if (!match) return

  const [, cc, vv, cr, vx1, vn, cn, vx2, vc] = match as any as [
    string,
    string | undefined,
    string | undefined,
    string,
    string,
    string | undefined,
    string | undefined,
    string,
    string,
  ]

  if (!cr) {
    return
  }

  if (has(["w", "y", "hl", "hr", "hm", "hn"], cc)) {
    if (vx2) {
      return
    }

    const vxs = getForms(vx1)
    const glottalStopIndex = vxs.findIndex((x) => x[1].includes("'"))
    const v5 = vxs.slice(0, glottalStopIndex + 1)
    const v7 = vxs.slice(glottalStopIndex + 1)
    const vx = { 5: mapForms(v5), 7: mapForms(v7) }

    return { shortcut: "iv/vi" as const, cc, vv: vv!, cr, vx, vn, cn, vc }
  }

  if (!(cc == null || cc == "h" || cc == "hw")) return
  const cc2 = cc

  if (!vx1 && cn) {
    const vx = { 5: [], 7: extractForms(vx2) } as AffixesRaw

    return { shortcut: "mcs" as const, cc: cc2, vv, cr, vr: vn!, vx, cn, vc }
  }

  if (vx2) return

  const inner = tokenizeStandardInner(vx1)
  if (!inner) return

  return { shortcut: null, cc: cc2, vv, cr, ...inner, vn, cn, vc }
}

export function testNeo(word: string) {
  const tokens = tokenize(word)
  if (!tokens) return

  if (tokens.shortcut == "iv/vi") {
    const { cc, vv, cr, vx, vn, cn, vc } = tokens

    return join(
      cc,
      vv,
      cr,
      vx[5].flatMap(({ vx, cs }) => [vx, cs]),
      vx[7].flatMap(({ vx, cs }) => [vx, cs]),
      vn ?? "",
      cn ?? "",
      vc,
    )
  }

  if (tokens.shortcut == "mcs") {
    const { cc, vv, cr, vr, cn, vx, vc } = tokens

    return join(
      cc,
      vv,
      cr,
      vr,
      cn,
      vx[7].flatMap(({ vx, cs }) => [vx, cs]),
      vc,
    )
  }

  const { cc, vv, cr, vr, vx, ca, vn, cn, vc } = tokens

  return join(
    cc,
    vv,
    cr,
    vr,
    vx[5].flatMap(({ vx, cs }) => [cs, vx]),
    ca,
    vx[7].flatMap(({ vx, cs }) => [vx, cs]),
    vn,
    cn,
    vc,
  )
}
