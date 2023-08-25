import { affixes } from "./affixes-latest.js"
import type { AffixEntry } from "./affixes.js"

export const affixesMap = new Map<string, AffixEntry>()

for (const affix of affixes) {
  affixesMap.set(affix.cs, affix)
}
