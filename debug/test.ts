import {
  affixualAdjunctToIthkuil,
  formativeToIthkuil,
  modularAdjunctToIthkuil,
  parsingAdjunctToIthkuil,
  referentialToIthkuil,
  registerAdjunctToIthkuil,
  suppletiveAdjunctToIthkuil,
} from "../generator/index.js"

function strictEqual(a: string, b: string) {
  if (a !== b) {
    throw new Error("Assertion failed: '" + a + "' !== '" + b + "'.")
  }
}

const result = formativeToIthkuil({
  type: "UNF/C",
  root: "c",
  specification: "CTE",
  vn: "PCL",
  slotVAffixes: [
    { type: 2, degree: 6, cs: "p" },
    { type: 3, degree: 3, cs: "kl" },
  ],
  slotVIIAffixes: [{ ca: { configuration: "MSS" } }],
  concatenatenationType: 2,
  case: "TSP",
  caseScope: "CCS",
})

strictEqual(result, "hwa'cäpoukliollüötëuhrwöë")

const result2 = formativeToIthkuil({
  type: "FRM",
  root: "c",
  version: "CPT",
  vn: "3:DET",
  ca: {
    affiliation: "COA",
    configuration: "DPX",
    extension: "PRX",
    perspective: "A",
    essence: "NRM",
  },
})

strictEqual(result2, "äcarstyúoha")

const result3 = referentialToIthkuil({
  referents: ["2p:BEN"],
  specification: "CSV",
  essence: "RPV",
  case: "IDP",
  case2: "INV",
  affixes: [{ type: 2, degree: 7, cs: "k" }, { ca: { configuration: "MSS" } }],
})

strictEqual(result3, "tiuxpoiküötu'ó")

const result4 = formativeToIthkuil({
  root: "l",
  type: "UNF/C",
  slotVIIAffixes: [{ referent: "1m:BEN", case: "ERG", perspective: "G" }],
})

strictEqual(result4, "laloerļ")

const result5 = affixualAdjunctToIthkuil({
  affixes: [
    {
      type: 1,
      degree: 1,
      cs: "c",
    },
    {
      type: 1,
      degree: 3,
      cs: "c",
    },
  ],
  appliesToConcatenatedStemOnly: true,
})

strictEqual(result5, "cahecái")

const result6 = modularAdjunctToIthkuil({
  type: "CONCAT",
  cn: "CCQ",
  vn1: "RTR",
  scope: "ADJACENT",
})

strictEqual(result6, "yahmwó")

const result7 = modularAdjunctToIthkuil({
  cn: "CCQ",
  vn1: "2:BEN",
  vn2: "DUP",
  vn3: "MNO",
})

strictEqual(result7, "iehmöňa")

const result8 = modularAdjunctToIthkuil({
  cn: "CCQ",
  vn1: "2:BEN",
  vn2: "DUP",
  scope: "CASE/MOOD",
})

strictEqual(result8, "iehmöňé")

const result9 = referentialToIthkuil({
  type: "CAR",
  specification: "CSV",
  essence: "RPV",
  case: "IDP",
  case2: "INV",
  affixes: [{ type: 2, degree: 7, cs: "k" }, { ca: { configuration: "MSS" } }],
})

strictEqual(result9, "ahliuxpoiküötu'ó")

const result10 = parsingAdjunctToIthkuil("monosyllabic")

strictEqual(result10, "a'")

const result11 = registerAdjunctToIthkuil("CGT")

strictEqual(result11[0], "hu")
strictEqual(result11[1], "hui")

const result12 = suppletiveAdjunctToIthkuil({
  type: "NAM",
  case: "AVR",
})

strictEqual(result12, "hnoe")

const result13 = formativeToIthkuil({
  type: "FRM",
  root: ["1m:BEN", "2m:DET"],
  ca: {
    essence: "RPV",
  },
  context: "FNC",
  vn: "SLF:BEN",
})

strictEqual(result13, "aežraitļíöha")

const result14 = formativeToIthkuil({
  type: "UNF/C",
  root: { cs: "c", degree: 3 },
  slotVIIAffixes: [{ referent: "1m:DET", case: "IND" }],
  vn: "CNT",
})

strictEqual(result14, "ëiceloařouwa")

const result15 = formativeToIthkuil({
  type: "UNF/C",
  root: "l",
  shortcut: true,
  version: "CPT",
  stem: 2,
  slotVAffixes: [{ type: 1, degree: 4, cs: "r" }],
})

strictEqual(result15, "wili'ra")

const result16 = formativeToIthkuil({
  type: "FRM",
  root: "l",
  shortcut: true,
  slotVAffixes: [{ cs: "c", degree: 3, type: 1 }],
  slotVIIAffixes: [{ cs: "k", degree: 8, type: 2 }],
})

console.log(result16)
