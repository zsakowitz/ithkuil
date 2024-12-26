import { affixes } from "./affixes-latest.js"
import type { AffixEntry } from "./affixes.js"

export const affixesMap = /* @__PURE__ */ (() => {
  const map = new Map<string, AffixEntry>()

  for (const affix of affixes) {
    map.set(affix.cs, affix)
  }

  const numbers = {
    kż: 100000000,
    čg: "10000000000000000",
    pc: 10000,
    zc: 1,
    ks: 2,
    z: 3,
    pš: 4,
    st: 5,
    cp: 6,
    ns: 7,
    čk: 8,
    lż: 9,
    vr: 0,
    gz: 100,
    ţż: 15,
    bc: 14,
    ļj: 13,
    jd: 12,
    cg: 11,
    j: 10,
  }

  for (const [k, v] of Object.entries(numbers)) {
    const existing = map.get(k)
    if (existing) {
      map.set("" + v, existing)
    }
  }

  return map
})()

export function getIntegerCs(affix: number | bigint): string | undefined {
  return {
    100000000: "kż",
    "10000000000000000": "čg",
    10000: "pc",
    1: "zc",
    2: "ks",
    3: "z",
    4: "pš",
    5: "st",
    6: "cp",
    7: "ns",
    8: "čk",
    9: "lż",
    0: "vr",
    100: "gz",
    15: "ţż",
    14: "bc",
    13: "ļj",
    12: "jd",
    11: "cg",
    10: "j",
  }["" + affix]
}

export function getIntegerAffixEntry(affix: bigint): AffixEntry {
  const abbreviation =
    affix == 100000000n ? "XTM"
    : affix == 10000000000000000n ? "XTQ"
    : affix == 10000n ? "XTT"
    : affix == 100n ? "XOH"
    : 0n <= affix && affix <= 9n ? "XX" + affix
    : 10n <= affix && affix <= 99n ? "X" + affix
    : "X" + affix

  const abs = affix < 0n ? -affix : affix
  const lastDigit = abs % 10n

  const ending =
    10n <= abs && abs <= 19n ? "th"
    : lastDigit == 1n ? "st"
    : lastDigit == 2n ? "nd"
    : lastDigit == 3n ? "rd"
    : "th"

  return {
    cs: "" + affix,
    abbreviation,
    degrees: [
      ,
      `${affix}${ending} in physical arrangement`,
      `${affix}${ending} in agreed-upon order`,
      `${affix}${ending} in hierarchical order`,
      `${affix}${ending}`,
      `w/${affix} instances`,
      `w/${affix} or more instances`,
      `w/${affix} parts/sections`,
      `w/${affix} nodes/connections/points`,
      `w/${affix} hierarchical levels/tiers`,
    ],
    description: "Three",
  }
}
