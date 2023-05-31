import { deepFreeze } from "./deep-freeze.js"
import { Enum } from "./enum.js"

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
export const ALL_DIPTIONGS: readonly Dipthong[] = /* @__PURE__ */ deepFreeze([
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

/** A Zod validator matching dipthongs. */
export const zodDipthong = /* @__PURE__ */ new Enum(ALL_DIPTIONGS)
