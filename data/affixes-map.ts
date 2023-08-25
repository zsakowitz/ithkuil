import { affixes } from "./affixes-latest.js"
import type { AffixEntry } from "./affixes.js"

export const affixesMap = /* @__PURE__ */ (() => {
  const map = new Map<string, AffixEntry>()

  for (const affix of affixes) {
    map.set(affix.cs, affix)
  }

  return map
})()
