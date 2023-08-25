import { roots } from "./roots-latest.js"
import type { RootEntry } from "./roots.js"

export const rootsMap = /* @__PURE__ */ (() => {
  const map = new Map<string, RootEntry>()

  for (const root of roots) {
    map.set(root.cr, root)
  }

  return map
})()
