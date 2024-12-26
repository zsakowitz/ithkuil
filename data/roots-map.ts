import { roots } from "./roots-latest.js"
import type { RootEntry } from "./roots.js"

export const rootsMap = /* @__PURE__ */ (() => {
  const map = new Map<string, RootEntry>()

  for (const root of roots) {
    map.set(root.cr, root)
  }

  const numbers = {
    kż: 100000000,
    čg: "10000000000000000",
    pc: 10000,
    ll: 1,
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

export function getIntegerCr(root: number | bigint): string | undefined {
  return {
    100000000: "kż",
    "10000000000000000": "čg",
    10000: "pc",
    1: "ll",
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
  }["" + root]
}

export function getIntegerRootEntry(root: bigint): RootEntry {
  const cr = getIntegerCr(root) ?? "" + root

  const cardinal =
    {
      0: "zero",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      10: "ten",
      11: "eleven",
      12: "twelve",
      13: "thirteen",
      14: "fourteen",
      15: "fifteen",
      100: "hundred",
      10000: "myriad",
      100000000: "hundred million",
      "10000000000000000": "ten quadrillion",
    }["" + root] ?? "" + root

  const lastDigit = (root < 0n ? -root : root) % 10n

  const ordinal =
    {
      0: "zeroth",
      1: "first",
      2: "second",
      3: "third",
      4: "fourth",
      5: "fifth",
      6: "sixth",
      7: "seventh",
      8: "eighth",
      9: "ninth",
      10: "tenth",
      11: "eleventh",
      12: "twelfth",
      13: "thirteenth",
      14: "fourteenth",
      15: "fifteenth",
      100: "hundredth",
      10000: "ten-thousandth",
      100000000: "100⁴-",
      "10000000000000000": "100⁸-",
    }["" + root] ??
    root +
      (lastDigit == 1n ? "st"
      : lastDigit == 2n ? "nd"
      : lastDigit == 3n ? "rd"
      : "th")

  return {
    cr,
    stems: [
      cardinal,
      root == 0n ? "empty set/group" : `set/group of ${cardinal} entities`,
      root == 0n ? "zero-dimension"
      : root == 1n ? "indivisible/unified"
      : `something with ${cardinal} aspects/facets`,
      root == 0n ?
        "baseline state in a sequence"
      : `${ordinal} entity in a sequence`,
    ],
    CPT: [],
    OBJ: [],
    wikidata: [],
  }
}
