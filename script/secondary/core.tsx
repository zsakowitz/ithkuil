import { deepFreeze } from "../../index.js"

export type ConnectionDirection = "horiz" | "vert" | "diag" | "reverse_horiz"

export type Core = {
  readonly top: readonly [direction: ConnectionDirection, x: number]
  readonly bottom: readonly [direction: ConnectionDirection, x: number]
  readonly shape: string
}

export const CORES = deepFreeze({
  b: {
    shape:
      "M 29.675 -35 l -50 0 l -9.4 9.4 l 23.2 33.05 l 6.2 -6.25 l 0 33.8 l 10 -10 l 0 -36.15 l -1.1 1.1 q -2.967 2.977 -5.95 5.95 l -1.95 2 l -0.65 0.65 l -16.5 -23.5 l 36.2 0 l 10 -10 z",
    top: ["horiz", 29.725],
    bottom: ["vert", -0.325],
  },
  c: {
    shape: "M -15 -35 l -10 10 l 0 60 l 40 0 l 10 -10 l -40 0 l 0 -60 z",
    top: ["vert", -15],
    bottom: ["horiz", 15],
  },
  č: {
    shape:
      "M -15 -35 l -10 10 l 0 60 l 40 0 l 10 -10 l -40 0 l 0 -50 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 25],
    bottom: ["horiz", 15],
  },
  ç: {
    shape:
      "M -13.15 -35 l -10 10 l 17.5 17.5 l -15 0 l -16.2 16.15 l 26.35 26.35 l 7.5 -7.5 l -25 -25 l 32.35 0 l 7.5 -7.5 l -20 -20 l 35 0 l 10 -10 l -50 0 z",
    top: ["horiz", 36.85],
    bottom: ["diag", -10.5],
  },
  d: {
    shape:
      "M -15 -35 l -10 10 l 0 36.3 l 10 -10.05 l 0 33.75 l 10 -10 l 0 -36.15 l -10 10 l 0 -23.85 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 25],
    bottom: ["vert", -15],
  },
  ḑ: {
    shape:
      "M 30 -34.925 l -50 0 l -10 10 l 0 40 l 9.55 -9.55 l 20.65 29.4 l 7.65 -7.65 l -21.65 -30.8 l -6.2 6.2 l 0 -27.6 l 40 0 l 10 -10 z",
    top: ["horiz", 30],
    bottom: ["diag", 0.2],
  },
  f: {
    shape:
      "M 20 -25 l 10 -10 l -50 0 l -10 10 l 0 30 l 30 0 l 0 30 l 10 -10 l 0 -30 l -30 0 l 0 -20 l 40 0 z",
    top: ["horiz", 30],
    bottom: ["vert", 0],
  },
  g: {
    shape:
      "M 27.825 -24.925 l 10 -10 l -65.75 0 l -9.9 9.95 l 30.45 37.55 l 7.25 -7.3 l 24.15 29.65 l 7.45 -7.4 l -25.2 -31.05 l -7.5 7.45 l -23.1 -28.85 l 52.15 0 z",
    top: ["horiz", 37.825],
    bottom: ["diag", 24.025],
  },
  h: {
    shape:
      "M -12.5 -35 l -10 10 l 0 35 l 26.3 0 l 8.7 -8.75 l 0 33.75 l 10 -10 l 0 -36.15 l -11.15 11.15 l -23.85 0 l 0 -35 z",
    top: ["vert", -12.5],
    bottom: ["vert", 12.5],
  },
  j: {
    shape:
      "M -10 -35 l -10 10 l 0 50 l -10 10 l 45 0 l 10 -10 l -42.6 0 l 7.6 -7.6 l 0 -42.4 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 30],
    bottom: ["horiz", 15],
  },
  k: {
    shape:
      "M -27.925 -35.025 l -9.9 9.95 l 47.35 58.35 l 0.05 0 l 1.4 1.75 l 7.5 -7.5 l -42.7 -52.55 l 52.05 0 l 10 -10 l -65.75 0 z",
    top: ["horiz", 37.825],
    bottom: ["diag", 10.975],
  },
  l: {
    shape:
      "M -10 -35 l -10 10 l 0 35 l 19.95 0 l -24.95 25 l 40 0 l 10 -10 l -37.6 0 l 24.85 -25 l -22.25 0 l 0 -35 z",
    top: ["vert", -10],
    bottom: ["horiz", 15],
  },
  ļ: {
    shape:
      "M -11.225 -35 l -10 10 l 0 30 l 17.7 0 l -6.35 6.4 l 23.65 23.6 l 7.45 -7.5 l -22.5 -22.5 l 10.05 -10 l -20 0 l 0 -30 z",
    top: ["vert", -11.225],
    bottom: ["diag", 13.775],
  },
  m: {
    shape:
      "M -8.75 -35 l -10 10 l 0 30 l 30 30 l 7.5 -7.5 l -27.5 -27.5 l 0 -35 z",
    top: ["vert", -8.75],
    bottom: ["diag", 11.25],
  },
  n: {
    shape:
      "M -8.85 -34.925 l -10 10 l 0 40 l 9.55 -9.55 l 20.65 29.4 l 7.5 -7.5 l -21.6 -30.85 l -6.1 6.1 l 0 -37.6 z",
    top: ["vert", -8.85],
    bottom: ["diag", 11.35],
  },
  ň: {
    shape:
      "M -8.65 -25.05 l 0 25 l -8.45 8.45 l 26.7 26.65 l 7.5 -7.5 l -25.5 -25.5 l 9.75 -9.7 l 0 -27.4 l -10 10 z",
    top: ["vert", 1.35],
    bottom: ["diag", 9.6],
  },
  p: {
    shape:
      "M -14.95 -25 l 34.95 0 l 10 -10 l -50 0 l -10 10 l 25 25 l 0 35 l 10 -10 l 0 -30.05 l -19.95 -19.95 z",
    top: ["horiz", 30],
    bottom: ["vert", -5],
  },
  r: {
    shape:
      "M -17.5 -35 l -7.5 7.5 l 31.25 31.25 l -31.25 31.25 l 40 0 l 10 -10 l -37.6 0 l 27.5 -27.6 l -32.4 -32.4 z",
    top: ["diag", -17.5],
    bottom: ["horiz", 15],
  },
  ř: {
    shape:
      "M -16.55 -35.025 l -7.45 7.55 l 22.75 22.7 l -9.75 9.8 l 0 30 l 25 0 l 10 -10 l -25 0 l -0.1 -27.55 l 8.55 -8.5 l -24 -24 z",
    top: ["diag", -16.55],
    bottom: ["horiz", 14],
  },
  s: {
    shape:
      "M 27.5 -34.975 l -10 10 l 0 20 l -35 0 l -10 10 l 29.95 29.95 l 7.5 -7.5 l -22.45 -22.45 l 30 0 l 10 -10 l 0 -30 z",
    top: ["vert", 27.5],
    bottom: ["diag", 2.45],
  },
  š: {
    shape:
      "M 20 -35 l -10 10 l 0 20 l -20 0 l -10 10 l 0 30 l 30 0 l 10 -10 l -30 0 l 0 -20 l 20 0 l 10 -10 l 0 -30 z",
    top: ["vert", 20],
    bottom: ["horiz", 10],
  },
  t: {
    shape:
      "M -15 -35 l -10 10 l 0 60 l 10 -10 l 0 -50 l 30 0 l 10 -10 l -40 0 z",
    top: ["horiz", 25],
    bottom: ["vert", -25],
  },
  ţ: {
    shape:
      "M 30 -35.05 l -50 0 l -10 10 l 0 27 l 33.1 33.1 l 7.5 -7.5 l -30.6 -30.6 l 0 -22 l 40 0 l 10 -10 z",
    top: ["horiz", 30],
    bottom: ["diag", 3.1],
  },
  v: {
    shape:
      "M 20 -25 l 10 -10 l -50 0 l -10 10 l 0 35 l 10 -10 l 15 0 l 0 35 l 10 -10 l 0 -35 l -17.35 0 l -7.65 7.6 l 0 -22.6 l 40 0 z",
    top: ["horiz", 30],
    bottom: ["vert", -5],
  },
  x: {
    shape:
      "M 37.825 -35.025 l -65.75 0 l -9.9 9.95 l 25.7 25.7 l -7.5 7.5 l 26.9 26.9 l 7.5 -7.5 l -25.7 -25.7 l 7.45 -7.55 l -19.3 -19.3 l 50.6 0 l 10 -10 z",
    top: ["horiz", 37.825],
    bottom: ["diag", 7.275],
  },
  z: {
    shape:
      "M 15 4.625 l 10 -10 l -29.85 -29.85 l -7.5 7.5 l 22.35 22.35 l -20 0 l -15 15 l 25.6 25.6 l 7.5 -7.5 l -23.1 -23.1 l 30 0 z",
    top: ["diag", -4.85],
    bottom: ["diag", 0.6],
  },
  ż: {
    shape:
      "M -7.5 -35 l -10 10 l 0 50 l -10 10 l 45 0 l 10 -10 l -42.6 0 l 7.6 -7.6 l 0 -52.4 z",
    top: ["vert", -7.5],
    bottom: ["horiz", 17.5],
  },
  ž: {
    shape:
      "M -8.05 -35.025 l -7.5 7.5 l 22.55 22.55 l -14.4 0 l -17.6 17.65 l 0 22.35 l 40 0 l 10 -10 l -40 0 l 0 -20 l 30 0 l 8.5 -8.5 l -31.55 -31.55 z",
    top: ["diag", -8.05],
    bottom: ["horiz", 15],
  },
  ALPHABETIC_PLACEHOLDER: {
    shape:
      "M 10 -35 l -10 10 l 0 23.85 l -10 10 l 0 26.15 l 10 -10 l 0 -23.75 l 10 -10 l 0 -26.25 z",
    top: ["vert", 10],
    bottom: ["vert", -10],
  },
  STANDARD_PLACEHOLDER: {
    shape:
      "M 10 -11.15 l -10 10 l 0 -33.85 l -10 10 l 0 36.2 l 10 -9.95 l 0 33.75 l 10 -10 l 0 -36.15 z",
    top: ["vert", 0],
    bottom: ["vert", 0],
  },
  TONAL_PLACEHOLDER: {
    shape:
      "M 36.15 -35 l -52.3 0 l -10 10 l 50 0 l -60 60 l 52.4 0 l 9.9 -10 l -49.8 0 l 59.8 -60 z",
    top: ["reverse_horiz", -16.15],
    bottom: ["horiz", 16.25],
  },
  STRESSED_SYLLABLE_PLACEHOLDER: {
    shape: "M 5 -35 l -10 10 l 0 60 l 10 -10 l 0 -60 z",
    top: ["vert", 5],
    bottom: ["vert", -5],
  },
})
