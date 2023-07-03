import { deepFreeze } from "./deep-freeze.js"

/** A dipthong permissible in Ithkuil. */
export type Dipthong =
  | "ai"
  | "ei"
  | "ëi"
  | "oi"
  | "ui"
  | "au"
  | "eu"
  | "ëu"
  | "ou"
  | "iu"

/** An array containing all permissible dipthongs in Ithkuil. */
export const ALL_DIPTHONGS: readonly Dipthong[] = /* @__PURE__ */ deepFreeze([
  "ai",
  "ei",
  "ëi",
  "oi",
  "ui",
  "au",
  "eu",
  "ëu",
  "ou",
  "iu",
])
