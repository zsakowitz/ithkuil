import { roots } from "./roots-latest.js"
import type { RootEntry } from "./roots.js"

export const rootsMap = new Map<string, RootEntry>()

for (const root of roots) {
  rootsMap.set(root.cr, root)
}
