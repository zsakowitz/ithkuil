import { deepFreeze } from "../../generate/index.js"

// Note for testing secondaries:
// The ALPHABETIC_PLACEHOLDER has a reversed horizontal top.
// The letter Ļ is vert/diag.
// The letter Ř is diag/vert.
// The letter Č is horiz/horiz.

/** Directions a consonantal connection may be in. */
export type HandwrittenConnectionDirection = "horiz" | "vert"

/** Directions a consonantal connection may be in. */
export type ConnectionDirection = "horiz" | "vert" | "diag"

/** Information about a consonantal connection. */
export type Connection = readonly [
  /** The direction this connection points in. */
  direction: ConnectionDirection,

  /**
   * The X position of the corner of the connection closest to a baseline or
   * overline.
   */
  xPosition: number,

  /** Whether the connection is rotated 180 degrees. */
  isReversed?: boolean | undefined,
]

/** Information about a handwritten consonantal connection. */
export type HandwrittenConnection = readonly [
  /** The direction this connection points in. */
  direction: HandwrittenConnectionDirection,

  /**
   * The X position of the corner of the connection closest to a baseline or
   * overline.
   */
  xPosition: number,

  /** Whether the connection is rotated 180 degrees. */
  isReversed?: boolean | undefined,
]

/** A consonant core. */
export type Core = {
  /** An SVG path describing the consonant's shape. */
  readonly shape: string

  /** Information about the top connection. */
  readonly top: Connection

  /** Information about the bottom connection. */
  readonly bottom: Connection
}

/** A handwritten consonant core. */
export type HandwrittenCore = {
  /** An SVG path describing the consonant's shape. */
  readonly shape: string

  /** Information about the top connection. */
  readonly top: HandwrittenConnection

  /** Information about the bottom connection. */
  readonly bottom: HandwrittenConnection
}

/** The name of a consonant core. */
export type CoreName = keyof typeof CORES

/** An object containing all consonantal cores. */
export const CORES = /* @__PURE__ */ deepFreeze({
  b: {
    shape:
      "M 29.675 -35 l -50 0 l -9.4 9.4 l 23.2 33.05 l 6.2 -6.25 l 0 33.8 l 10 -10 l 0 -36.15 l -1.1 1.1 q -2.967 2.977 -5.95 5.95 l -1.95 2 l -0.65 0.65 l -16.5 -23.5 l 36.2 0 l 10 -10 z",
    top: ["horiz", 29.725],
    bottom: ["vert", -0.325],
  } satisfies Core as Core,
  c: {
    shape: "M -15 -35 l -10 10 l 0 60 l 40 0 l 10 -10 l -40 0 l 0 -60 z",
    top: ["vert", -15],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
  č: {
    shape:
      "M -15 -35 l -10 10 l 0 60 l 40 0 l 10 -10 l -40 0 l 0 -50 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 25],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
  ç: {
    shape:
      "M -13.15 -35 l -10 10 l 17.5 17.5 l -15 0 l -16.2 16.15 l 26.35 26.35 l 7.5 -7.5 l -25 -25 l 32.35 0 l 7.5 -7.5 l -20 -20 l 35 0 l 10 -10 l -50 0 z",
    top: ["horiz", 36.85],
    bottom: ["diag", -10.5],
  } satisfies Core as Core,
  d: {
    shape:
      "M -15 -35 l -10 10 l 0 36.3 l 10 -10.05 l 0 33.75 l 10 -10 l 0 -36.15 l -10 10 l 0 -23.85 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 25],
    bottom: ["vert", -15],
  } satisfies Core as Core,
  ḑ: {
    shape:
      "M 30 -34.925 l -50 0 l -10 10 l 0 40 l 9.55 -9.55 l 20.65 29.4 l 7.65 -7.65 l -21.65 -30.8 l -6.2 6.2 l 0 -27.6 l 40 0 l 10 -10 z",
    top: ["horiz", 30],
    bottom: ["diag", 0.2],
  } satisfies Core as Core,
  f: {
    shape:
      "M 20 -25 l 10 -10 l -50 0 l -10 10 l 0 30 l 30 0 l 0 30 l 10 -10 l 0 -30 l -30 0 l 0 -20 l 40 0 z",
    top: ["horiz", 30],
    bottom: ["vert", 0],
  } satisfies Core as Core,
  g: {
    shape:
      "M 27.825 -24.925 l 10 -10 l -65.75 0 l -9.9 9.95 l 30.45 37.55 l 7.25 -7.3 l 24.15 29.65 l 7.45 -7.4 l -25.2 -31.05 l -7.5 7.45 l -23.1 -28.85 l 52.15 0 z",
    top: ["horiz", 37.825],
    bottom: ["diag", 24.025],
  } satisfies Core as Core,
  h: {
    shape:
      "M -12.5 -35 l -10 10 l 0 35 l 26.3 0 l 8.7 -8.75 l 0 33.75 l 10 -10 l 0 -36.15 l -11.15 11.15 l -23.85 0 l 0 -35 z",
    top: ["vert", -12.5],
    bottom: ["vert", 12.5],
  } satisfies Core as Core,
  j: {
    shape:
      "M -10 -35 l -10 10 l 0 50 l -10 10 l 45 0 l 10 -10 l -42.6 0 l 7.6 -7.6 l 0 -42.4 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 30],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
  k: {
    shape:
      "M -27.925 -35.025 l -9.9 9.95 l 47.35 58.35 l 0.05 0 l 1.4 1.75 l 7.5 -7.5 l -42.7 -52.55 l 52.05 0 l 10 -10 l -65.75 0 z",
    top: ["horiz", 37.825],
    bottom: ["diag", 10.975],
  } satisfies Core as Core,
  l: {
    shape:
      "M -10 -35 l -10 10 l 0 35 l 19.95 0 l -24.95 25 l 40 0 l 10 -10 l -37.6 0 l 24.85 -25 l -22.25 0 l 0 -35 z",
    top: ["vert", -10],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
  ļ: {
    shape:
      "M -11.225 -35 l -10 10 l 0 30 l 17.7 0 l -6.35 6.4 l 23.65 23.6 l 7.45 -7.5 l -22.5 -22.5 l 10.05 -10 l -20 0 l 0 -30 z",
    top: ["vert", -11.225],
    bottom: ["diag", 13.775],
  } satisfies Core as Core,
  m: {
    shape:
      "M -8.75 -35 l -10 10 l 0 30 l 30 30 l 7.5 -7.5 l -27.5 -27.5 l 0 -35 z",
    top: ["vert", -8.75],
    bottom: ["diag", 11.25],
  } satisfies Core as Core,
  n: {
    shape:
      "M -8.85 -34.925 l -10 10 l 0 40 l 9.55 -9.55 l 20.65 29.4 l 7.5 -7.5 l -21.6 -30.85 l -6.1 6.1 l 0 -37.6 z",
    top: ["vert", -8.85],
    bottom: ["diag", 11.35],
  } satisfies Core as Core,
  ň: {
    shape:
      "M -8.65 -25.05 l 0 25 l -8.45 8.45 l 26.7 26.65 l 7.5 -7.5 l -25.5 -25.5 l 9.75 -9.7 l 0 -27.4 l -10 10 z",
    top: ["vert", 1.35],
    bottom: ["diag", 9.6],
  } satisfies Core as Core,
  p: {
    shape:
      "M -14.95 -25 l 34.95 0 l 10 -10 l -50 0 l -10 10 l 25 25 l 0 35 l 10 -10 l 0 -30.05 l -19.95 -19.95 z",
    top: ["horiz", 30],
    bottom: ["vert", -5],
  } satisfies Core as Core,
  r: {
    shape:
      "M -17.5 -35 l -7.5 7.5 l 31.25 31.25 l -31.25 31.25 l 40 0 l 10 -10 l -37.6 0 l 27.5 -27.6 l -32.4 -32.4 z",
    top: ["diag", -17.5],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
  ř: {
    shape:
      "M -16.55 -34.975 l -7.5 7.5 l 22.75 22.7 l -9.75 9.8 l 0 30 l 25 0 l 10 -10 l -25 0 l -0.1 -27.55 l 8.55 -8.5 l -24 -24 z",
    top: ["diag", -16.5],
    bottom: ["horiz", 14, true],
  } satisfies Core as Core,
  s: {
    shape:
      "M 27.5 -34.975 l -10 10 l 0 20 l -35 0 l -10 10 l 29.95 29.95 l 7.5 -7.5 l -22.45 -22.45 l 30 0 l 10 -10 l 0 -30 z",
    top: ["vert", 27.5],
    bottom: ["diag", 2.45],
  } satisfies Core as Core,
  š: {
    shape:
      "M 20 -35 l -10 10 l 0 20 l -20 0 l -10 10 l 0 30 l 30 0 l 10 -10 l -30 0 l 0 -20 l 20 0 l 10 -10 l 0 -30 z",
    top: ["vert", 20],
    bottom: ["horiz", 10, true],
  } satisfies Core as Core,
  t: {
    shape:
      "M -15 -35 l -10 10 l 0 60 l 10 -10 l 0 -50 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 25],
    bottom: ["vert", -25],
  } satisfies Core as Core,
  ţ: {
    shape:
      "M 30 -35.05 l -50 0 l -10 10 l 0 27 l 33.1 33.1 l 7.5 -7.5 l -30.6 -30.6 l 0 -22 l 40 0 l 10 -10 z",
    top: ["horiz", 30],
    bottom: ["diag", 3.1],
  } satisfies Core as Core,
  v: {
    shape:
      "M 20 -25 l 10 -10 l -50 0 l -10 10 l 0 35 l 10 -10 l 15 0 l 0 35 l 10 -10 l 0 -35 l -17.35 0 l -7.65 7.6 l 0 -22.6 l 40 0 z",
    top: ["horiz", 30],
    bottom: ["vert", -5],
  } satisfies Core as Core,
  x: {
    shape:
      "M 37.825 -35.025 l -65.75 0 l -9.9 9.95 l 25.7 25.7 l -7.5 7.5 l 26.9 26.9 l 7.5 -7.5 l -25.7 -25.7 l 7.45 -7.55 l -19.3 -19.3 l 50.6 0 l 10 -10 z",
    top: ["horiz", 37.825],
    bottom: ["diag", 7.275],
  } satisfies Core as Core,
  z: {
    shape:
      "M 15 4.625 l 10 -10 l -29.85 -29.85 l -7.5 7.5 l 22.35 22.35 l -20 0 l -15 15 l 25.6 25.6 l 7.5 -7.5 l -23.1 -23.1 l 30 0 z",
    top: ["diag", -4.85],
    bottom: ["diag", 0.6],
  } satisfies Core as Core,
  ż: {
    shape:
      "M -7.5 -35 l -10 10 l 0 50 l -10 10 l 45 0 l 10 -10 l -42.6 0 l 7.6 -7.6 l 0 -52.4 z",
    top: ["vert", -7.5],
    bottom: ["horiz", 17.5, true],
  } satisfies Core as Core,
  ž: {
    shape:
      "M -8.05 -35.025 l -7.5 7.5 l 22.55 22.55 l -14.4 0 l -17.6 17.65 l 0 22.35 l 40 0 l 10 -10 l -40 0 l 0 -20 l 30 0 l 8.5 -8.5 l -31.55 -31.55 z",
    top: ["diag", -8.05],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
  ALPHABETIC_PLACEHOLDER: {
    shape:
      "M 10 -35 l -10 10 l 0 23.85 l -10 10 l 0 26.15 l 10 -10 l 0 -23.75 l 10 -10 l 0 -26.25 z",
    top: ["vert", 10],
    bottom: ["vert", -10],
  } satisfies Core as Core,
  STANDARD_PLACEHOLDER: {
    shape:
      "M 10 -11.15 l -10 10 l 0 -33.85 l -10 10 l 0 36.2 l 10 -9.95 l 0 33.75 l 10 -10 l 0 -36.15 z",
    top: ["vert", 0],
    bottom: ["vert", 0],
  } satisfies Core as Core,
  TONAL_PLACEHOLDER: {
    shape:
      "M 36.15 -35 l -52.3 0 l -10 10 l 50 0 l -60 60 l 52.4 0 l 9.9 -10 l -49.8 0 l 59.8 -60 z",
    top: ["horiz", -16.15, true],
    bottom: ["horiz", 16.25, true],
  } satisfies Core as Core,
  STRESSED_SYLLABLE_PLACEHOLDER: {
    shape: "M 5 -35 l -10 10 l 0 60 l 10 -10 l 0 -60 z",
    top: ["vert", 5],
    bottom: ["vert", -5],
  } satisfies Core as Core,
  BIAS: {
    shape:
      "M -26.15 -18.8 l 24.95 24.95 l -28.8 28.85 l 45 0 l 10 -10 l -42.6 0 l 25.05 -25.2 l -24.8 -24.8 l 37.35 0 l 10 -10 l -40 0 l -16.15 16.2 z",
    top: ["horiz", 30],
    bottom: ["horiz", 15, true],
  } satisfies Core as Core,
})

export const HANDWRITTEN_CORES = /* @__PURE__ */ deepFreeze({
  b: {
    shape: "M 25 -35 h -50 c 0 20 15 40 35 30 l -10 -10 v 50",
    top: ["horiz", 25],
    bottom: ["vert", 0],
  } satisfies HandwrittenCore as HandwrittenCore,
  c: {
    shape: "M -25 -35 v 70 h 50",
    top: ["vert", -25],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  č: {
    shape: "M 20.625 -35 c -55 0 -55 70 0 70",
    top: ["horiz", 20.625],
    bottom: ["horiz", 20.625],
  } satisfies HandwrittenCore as HandwrittenCore,
  ç: {
    shape: "M 25 -35 h -42.5 c 0 35 30 35 30 35 h -37.5 c 0 35 30 35 30 35",
    top: ["horiz", 25],
    bottom: ["horiz", 5],
  } satisfies HandwrittenCore as HandwrittenCore,
  d: {
    shape: "M 25 -35 h -50 v 35 l 10 -10 v 45",
    top: ["horiz", 25],
    bottom: ["vert", -15],
  } satisfies HandwrittenCore as HandwrittenCore,
  ḑ: {
    shape: "M 30 -35 c -50 0 -50 20 -50 40 l -10 -10 c 40 -10 40 40 40 40",
    top: ["horiz", 30],
    bottom: ["vert", 10],
  } satisfies HandwrittenCore as HandwrittenCore,
  f: {
    shape: "M 25 -35 c -40 0 -50 5 -50 15 c 0 20 30 15 30 15 v 40",
    top: ["horiz", 25],
    bottom: ["vert", 5],
  } satisfies HandwrittenCore as HandwrittenCore,
  g: {
    shape:
      "M 30 -35 h -60 c 0 35 25 35 25 35 a 7.5 7.5 0 0 1 7.5 -7.5 c 20 0 17.5 42.5 17.5 42.5",
    top: ["horiz", 30],
    bottom: ["vert", 20],
  } satisfies HandwrittenCore as HandwrittenCore,
  h: {
    shape: "M -20 -35 v 40 h 40 l -10 -10 v 40",
    top: ["vert", -20],
    bottom: ["vert", 10],
  } satisfies HandwrittenCore as HandwrittenCore,
  j: {
    shape: "M 25 -35 c -100 0 0 70 -50 70 h 50",
    top: ["horiz", 25],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  k: {
    shape: "M 30 -35 h -60 c -10 50 20 70 40 70",
    top: ["horiz", 30],
    bottom: ["horiz", 10],
  } satisfies HandwrittenCore as HandwrittenCore,
  l: {
    shape: "M -25 -35 v 35 c 60 0 0 35 0 35 h 50",
    top: ["vert", -25],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  ļ: {
    shape: "M -25 -35 c 0 40 10 41 30 40 l -10 -10 c -2 40 10 40 30 40",
    top: ["vert", -25],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  m: {
    shape: "M -17.5 -35 v 35 c 35 0 35 25 35 35",
    top: ["vert", -17.5],
    bottom: ["vert", 17.5],
  } satisfies HandwrittenCore as HandwrittenCore,
  n: {
    shape:
      "M -17.5 -35 v 30 a 10 10 0 0 0 10 10 a 7.5 10 0 0 1 7.5 -10 c 15 0 17.5 20 17.5 40",
    top: ["vert", -17.5],
    bottom: ["vert", 17.5],
  } satisfies HandwrittenCore as HandwrittenCore,
  ň: {
    shape: "M -10 -35 v 45 l -10 -10 c 40 -4 40 35 40 35",
    top: ["vert", -10],
    bottom: ["vert", 20],
  } satisfies HandwrittenCore as HandwrittenCore,
  p: {
    shape: "M 25 -35 h -50 c 0 20 10 30 30 30 v 40",
    top: ["horiz", 25],
    bottom: ["vert", 5],
  } satisfies HandwrittenCore as HandwrittenCore,
  r: {
    shape: "M -25 -35 c 40 0 40 50 0 70 h 50",
    top: ["horiz", -25, true],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  ř: {
    shape: "M -25 -35 c 30 0 32.5 15 32.5 40 l 10 -12 c -60 0 -20.5 42 7.5 42",
    top: ["horiz", -25, true],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  s: {
    shape: "M 25 -35 c -10 55 -50 20 -50 20 c 0 45 30 50 40 50",
    top: ["vert", 25],
    bottom: ["horiz", 15],
  } satisfies HandwrittenCore as HandwrittenCore,
  š: {
    shape: "M 25 35 c -40 0 -50 -5 -50 -15 c 0 -20 30 -15 30 -15 v -40",
    top: ["vert", 5],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  t: {
    shape: "M 25 -35 h -50 v 70",
    top: ["horiz", 25],
    bottom: ["vert", -25],
  } satisfies HandwrittenCore as HandwrittenCore,
  ţ: {
    shape: "M 25 -35 c -50 0 -50 25 -50 35 c 35 0 35 25 35 35",
    top: ["horiz", 25],
    bottom: ["vert", 10],
  } satisfies HandwrittenCore as HandwrittenCore,
  v: {
    shape:
      "M 25 -35 c -30 0 -32.5 15 -32.5 40 l -10 -12 c 60 0 20.5 42 -7.5 42",
    top: ["horiz", 25],
    bottom: ["horiz", -25, true],
  } satisfies HandwrittenCore as HandwrittenCore,
  x: {
    shape: "M 30 -35 h -60 c 0 35 15 35 30 35 c 0 35 15 35 30 35",
    top: ["horiz", 30],
    bottom: ["horiz", 30],
  } satisfies HandwrittenCore as HandwrittenCore,
  z: {
    shape: "M -20 -35 c 40 0 40 35 40 35 h -50 l 10 -10 c 0 40 25 45 40 45",
    top: ["horiz", -20, true],
    bottom: ["horiz", 20],
  } satisfies HandwrittenCore as HandwrittenCore,
  ż: {
    shape: "M -10 -35 v 58 a 15 12 0 0 1 -15 12 h 50",
    top: ["vert", -10],
    bottom: ["horiz", 25],
  } satisfies HandwrittenCore as HandwrittenCore,
  ž: {
    shape: "M -15 -35 c 0 20 10 35 30 35 c -40 0 -40 35 0 35",
    top: ["vert", -15],
    bottom: ["horiz", 15],
  } satisfies HandwrittenCore as HandwrittenCore,
  ALPHABETIC_PLACEHOLDER: {
    shape: "M -5 35 v -25 c 0 -10 10 -10 10 -20 v -25",
    top: ["vert", 5],
    bottom: ["vert", -5],
  } satisfies HandwrittenCore as HandwrittenCore,
  STANDARD_PLACEHOLDER: {
    shape: "M -5 -35 v 42.5 l 10 -15 v 42.5",
    top: ["vert", -5],
    bottom: ["vert", 5],
  } satisfies HandwrittenCore as HandwrittenCore,
  TONAL_PLACEHOLDER: {
    shape: "M -20 -35 h 55 c 0 30 -50 65 -70 70 h 55",
    top: ["horiz", -20, true],
    bottom: ["horiz", 20],
  } satisfies HandwrittenCore as HandwrittenCore,
  STRESSED_SYLLABLE_PLACEHOLDER: {
    shape: "M 0 -35 v 70",
    top: ["vert", 0],
    bottom: ["vert", 0],
  } satisfies HandwrittenCore as HandwrittenCore,
  BIAS: {
    shape: "M 27.5 35 h -55 l 30 -35 c -60 -15 -20 -35 20 -35",
    top: ["horiz", 22.5],
    bottom: ["horiz", 27.5],
  } satisfies HandwrittenCore as HandwrittenCore,
} satisfies Record<CoreName, HandwrittenCore> as Record<CoreName, HandwrittenCore>)
