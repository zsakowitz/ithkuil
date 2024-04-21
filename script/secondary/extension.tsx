import { deepFreeze } from "../../generate/index.js"

/** Information about an extension. */
export type Extension = {
  /** The SVG path describing this extension's vertical variant. */
  readonly vert: string

  /** This extension's vertical handwritten variant. */
  readonly vert2: string

  /** The SVG path describing this extension's diagonal variant. */
  readonly diag: string

  /** The SVG path describing this extension's horizontal variant. */
  readonly horiz: string

  /** This extension's horizontal handwritten variant. */
  readonly horiz2: string
}

/** The name of an extension. */
export type ExtensionName = keyof typeof EXTENSIONS

/** An object containing all extensions. */
export const EXTENSIONS = /* @__PURE__ */ deepFreeze({
  p: {
    vert: "M -9.65 12.1 q 0.375 -0.363 1.15 -1.15 q 6.261 -1.099 8.5 3.8 l 0 -14.75 l -10 10 l -10 -10 l -7.15 7.15 l 11.3 11.2 l 5.85 -5.9 q 0.04 -0.029 0.35 -0.35 z",
    vert2: "M 0 0 a 10 13 0 0 1 -20 0",
    diag: "M -2.5 2.5 l -5 5 l -10 -10 l -7.15 7.15 l 11.3 11.2 l 7 -7.1 l 1 -1 q 3.183 1.742 3.85 0 q 0.916 -1.293 0 -6.25 z",
    horiz:
      "M -14.55 10 l 4.55 0 l 8.8 -8.8 l 10 10 l 7.15 -7.15 l -11.3 -11.2 l -7.05 7.15 l -6.3 0 q 3.7 5 -5.85 10 z",
    horiz2: "M 0 0 c 5 10 -12 10 -15 -5",
  } satisfies Extension as Extension,
  // p_WITH_LINE is used in the primary extension for STA-PRC-D-S2.
  p_WITH_LINE: {
    vert: "M -9.65 12.1 q 0.375 -0.363 1.15 -1.15 q 6.261 -1.099 8.5 3.8 l 0 -14.75 l -10 10 l -8.8 -8.8 l 7.5 -7.5 l -1.2 -1.2 l -7.5 7.5 l -7.15 7.15 l 11.3 11.2 l 5.85 -5.9 q 0.04 -0.029 0.35 -0.35 z",
    vert2: "M 0 0 c -10 0 -10 -7.5 0 -7.5 c -10 0 -10 -7.5 0 -7.5",
    diag: "M -2.5 2.5 l -5 5 l -8.8 -8.8 l 7.5 -7.5 l -1.2 -1.2 l -7.5 7.5 l -7.15 7.15 l 11.3 11.2 l 7 -7.1 l 1 -1 q 3.183 1.742 3.85 0 q 0.916 -1.293 0 -6.25 z",
    horiz:
      "M -14.55 10 l 4.55 0 l 8.8 -8.8 l 8.8 8.8 l -7.5 7.5 l 1.2 1.2 l 7.5 -7.5 l 7.15 -7.15 l -11.3 -11.2 l -7.05 7.15 l -6.3 0 q 3.7 5 -5.85 10 z",
    horiz2: "M 0 0 c -10 0 -10 -7.5 0 -7.5 c -10 0 -10 -7.5 0 -7.5",
  } satisfies Extension as Extension,
  t: {
    vert: "M -10 10 l 0 5 q 6.25 -9 10 -5 l 0 -7.6 l 11.8 11.7 l 7 -7 l -12.95 -12.95 l -15.85 15.85 z",
    vert2: "M 0 0 c 0 7.5 3.75 10 15 10",
    diag: "M -6.3 8.7 q 6.486 1.216 4.75 -5 q -2.924 3.894 -5.95 3.8 l -8.8 8.8 l 0 15 l 10 -10 l 0 -12.6 z",
    horiz:
      "M -7.65 0 q 0.465 4.718 -7.9 10 l 5.55 0 l 17.6 -17.6 l 0 -15 l -10 10 l 0 12.6 l -5.25 0 z",
    horiz2: "M 0 0 a 10 10 0 0 1 -10 -10 v 15",
  } satisfies Extension as Extension,
  k: {
    vert: "M 12.4 -10 l -22.4 0 l -10 10.1 l 19.9 0 l 0.1 -0.1 l 0 0.1 l -0.05 0 l -9.95 9.9 l 0 5 q 5 -5.774 10 -5 l 0 -7.55 l 12.4 -12.4 z",
    vert2: "M 0 0 a 10 10 0 0 1 10 -10 h -15",
    diag: "M 0.9 1.6 l 11.2 -11.3 l -22.4 0 l -10 10.1 l 19.9 0 l -7.1 7.1 q 10.446 1.157 8.4 -5.9 z",
    horiz:
      "M -22.4 20 l 22.4 0 l 9.9 -10 l -19.9 0 l 10 -10 l -12.65 0 q 5.504 3.447 -5.3 10 l 5.5 0 l -9.95 10 z",
    horiz2: "M 0 0 a 5 5 0 0 1 0 -10 h -10",
  } satisfies Extension as Extension,
  b: {
    vert: "M -10 10 l -15 0 l -10 10 l 17.45 0 l 7.6 -7.6 l -0.05 5.05 q 4.6 -6.3 10 -4 l 0 -13.45 l -9.95 10 z",
    vert2: "M 0 0 a 7.5 7.5 0 0 0 -15 0 v -15",
    diag: "M -7.5 7.5 l -15.05 0 l -10 10 l 17.45 0 l 8.75 -8.8 q 6.9 0.2 3.8 -6.15 l -4.95 4.95 z",
    horiz:
      "M 0 0 l 15.05 0 l 10 -10 l -17.45 0 l -9.95 10 l -7.6 0 q 4.95 4.2 -6.25 10 l 6.25 0 l 9.95 -10 z",
    horiz2: "M 0 0 a 5 5 0 0 0 0 10 h -10",
  } satisfies Extension as Extension,
  d: {
    vert: "M 0.05 2.3 l 15 0 l 10 -10 l -17.4 0 l -17.65 17.7 l 0 7.3 q 5.4 -4.35 10 -2.75 l 0 -12.25 z",
    vert2: "M 0 0 a 10 10 0 0 0 -10 -10 h 15",
    diag: "M 1.15 1.15 l 15.05 0 l 10 -10 l -17.45 0 l -8.75 8.85 q -1.75 3.2 -4.85 7.2 q 5.7 0.35 6 -6.05 z",
    horiz:
      "M -10 0 q 2.55 4.45 -5 10 l 5 0 l 15.85 -15.9 l -13 -12.9 l -7 7 l 11.8 11.8 l -7.65 0 z",
    horiz2: "M 0 0 c 0 0 7.5 2.5 7.5 10",
  } satisfies Extension as Extension,
  // d_WITH_LINE is used in the primary extension for DYN-PRC-D-S0.
  d_WITH_LINE: {
    vert: "M 0.05 2.3 l 17.5 0 l -6.3 6.3 l 1.2 1.2 l 7.5 -7.5 l 10 -10 l -22.3 0 l -17.65 17.7 l 0 7.3 q 5.4 -4.35 10 -2.75 l 0 -12.25 z",
    vert2: "M 0 0 a 10 10 0 0 0 15 0 c 2.5 5 -3 10 -5 10",
    diag: "M 1.15 1.15 l 17.55 0 l -6.3 6.3 l 1.2 1.2 l 7.5 -7.5 l 10 -10 l -22.35 0 l -8.75 8.85 q -1.75 3.2 -4.85 7.2 q 5.7 0.35 6 -6.05 z",
    horiz:
      "M -10 0 q 2.55 4.45 -5 10 l 5 0 l 15.85 -15.9 l -13 -12.9 l -7 7 l -6.3 6.3 l 1.2 1.2 l 6.3 -6.3 l 10.6 10.6 l -7.65 0 z",
    horiz2: "M 0 0 a 10 12.5 0 0 0 10 -12.5 c 7.5 5 4.5 11 4.5 11",
  } satisfies Extension as Extension,
  g: {
    vert: "M -11.8 -11.8 l 11.8 11.8 l -10 10 l 0 5 q 5.188 -7.964 10 -5 l 0 -7.7 l 8.2 -8.2 l -13 -12.9 l -7 7 z",
    vert2: "M 0 0 c 0 -6 4 -10 10 -10 l -13 -9",
    diag: "M -11.8 -11.8 l 11.8 11.8 l -5 5 q 7.681 1.687 7.1 -0.5 l -0.95 -3.35 l 7.05 -7.05 l -13 -12.9 z",
    horiz:
      "M 1.8 21.8 l -11.8 -11.8 l 10 -10 l -11.15 0 q 3.75 5.2 -5.8 10 l 4.65 0 l -5.9 5.9 l 13 12.9 l 7 -7 z",
    horiz2: "M 0 0 a 7.5 7.5 0 0 0 0 -15",
  } satisfies Extension as Extension,
  // g_WITH_LINE is used in the primary extension for STA-CPT-D-S2.
  g_WITH_LINE: {
    vert: "M -11.8 -11.8 l 11.8 11.8 l -10 10 l 0 5 q 5.188 -7.964 10 -5 l 0 -7.7 l 8.2 -8.2 l -11.8 -11.7 l 7.5 -7.5 l -1.2 -1.2 z",
    vert2: "M 0 0 h 10 c -10 0 -10 -7.5 0 -7.5 c -10 0 -10 -7.5 0 -7.5",
    diag: "M -11.8 -11.8 l 11.8 11.8 l -5 5 q 7.681 1.687 7.1 -0.5 l -0.95 -3.35 l 7.05 -7.05 l -11.8 -11.7 l 7.5 -7.5 l -1.2 -1.2 z",
    horiz:
      "M 1.8 21.8 l -11.8 -11.8 l 10 -10 l -11.15 0 q 3.75 5.2 -5.8 10 l 4.65 0 l -5.9 5.9 l 11.8 11.7 l -7.5 7.5 l 1.2 1.2 z",
    horiz2: "M 0 0 h 10 c -10 0 -10 -7.5 0 -7.5 c -10 0 -10 -7.5 0 -7.5",
  } satisfies Extension as Extension,
  f: {
    vert: "M 0 15.65 l 0 -15.65 l -10 10.05 q -10.8 -2.6 -16.2 -18.85 q -0.35 21.9 9.85 27.5 l 6.35 -6.35 l 0 8.1 q 4.8 -9.5 10 -4.8 z",
    vert2: "M 0 0 c -10 5 -10 -10 0 -12",
    diag: "M -23.7 -11.35 q -0.35 21.9 9.85 27.5 l 6.3 -6.35 l 2 -2 q 8.054 2.82 4.35 -6.65 l -6.3 6.35 q -10.8 -2.6 -16.2 -18.85 z",
    horiz:
      "M -2.3 20 q 16 -9.8 7.5 -27.5 l -7.55 7.5 l -11.1 0 q 3.05 5.25 -1.5 10 l 5 0 l 8.8 -8.85 q 6.15 7.15 -1.15 18.85 z",
    horiz2: "M 0 0 c -5 20 -15 0 -5 -10",
  } satisfies Extension as Extension,
  ţ: {
    vert: "M 0 2.3 l 0 13.35 q -5.2 -4.7 -10 4.8 l 0 -10.45 l 16.35 -16.35 q 11.35 3.25 12.3 12.55 q 0.1 0.8 0.1 1.7 q 0 0.6 -0.05 1.2 q -3.4 -6.7 -18.7 -6.8 z",
    vert2: "M 0 0 c 15 -10 15 5 6 7.5",
    diag: "M -7.5 7.5 q 7.6 3.25 8.6 0 q 0.313 -1.95 -1.3 -6.2 l 1.3 -0.15 q 20.55 -3.2 16.1 6.3 q 12.35 -14.35 -9.75 -14.95 l -14.95 15 z",
    horiz:
      "M -2.3 0 l -13.35 0 q 4.7 5.2 -4.8 10 l 10.45 0 l 16.35 -16.35 q -3.25 -11.35 -12.55 -12.3 q -0.8 -0.1 -1.7 -0.1 q -0.6 0 -1.2 0.05 q 6.7 3.4 6.8 18.7 z",
    horiz2: "M 0 0 c -7.5 15 5 15 7.5 7.5",
  } satisfies Extension as Extension,
  x: {
    vert: "M -20 2.35 q 9.8 -16 27.5 -7.5 l -7.5 7.55 l 0 11.1 q -5.25 -3.05 -10 1.5 l 0 -5 l 8.85 -8.8 q -7.15 -6.15 -18.85 1.15 z",
    vert2: "M 0 0 c 20 -2.5 0 -15 -9 -5",
    diag: "M 1.15 1.2 l 7.5 -7.55 q -17.7 -8.5 -27.5 7.5 q 11.7 -7.3 18.85 -1.15 l -3.7 3.65 q 1.81 1.308 4.55 2.1 q 1.8 0.5 0.3 -4.55 z",
    horiz:
      "M -13.65 0 q 2.585 3.848 -6.35 10 l 7.65 0 l -6.3 6.35 q 5.6 10.2 27.5 9.85 q -16.25 -5.4 -18.85 -16.2 l 10 -10 l -13.65 0 z",
    horiz2: "M 0 0 c 5 -10 -10 -10 -12 0",
  } satisfies Extension as Extension,
  v: {
    vert: "M 0 15.65 l 0 -15.65 l -10 10 q -9.4 -17.75 -21.2 -6.85 q 12.25 -2.15 14.85 15.5 l 6.35 -6.3 l 0 8.1 q 4.8 -9.5 10 -4.8 z",
    vert2: "M 0 0 l -7.5 7.5 c 5 -10 0 -15 -5 -10",
    diag: "M -6.35 8.65 l 0 0.05 q 8.1 2.8 6.35 -8.7 l -6.35 6.3 q -9.4 -17.75 -21.2 -6.85 q 12.25 -2.15 14.85 15.5 l 6.35 -6.3 z",
    horiz:
      "M 5.15 -7.5 l -7.5 7.5 l -11.1 0 q 3.05 5.25 -1.5 10 l 5 0 l 8.8 -8.85 q 0.445 14.232 18.8 18.85 q -12.993 -10.704 -12.45 -27.5 z",
    horiz2: "M 0 0 a 7.5 7.5 0 0 1 -7.5 7.5 c 2.5 -7.5 2 -10 -3.75 -15",
  } satisfies Extension as Extension,
  ḑ: {
    vert: "M 21 0.75 q -10.61 0.709 -14.65 -7.1 l -16.35 16.35 l 0 10.45 q 4.8 -9.5 10 -4.8 l 0 -13.35 q 12.787 6.105 21 -1.55 z",
    vert2: "M 0 0 a 10 13 0 0 0 20 0",
    diag: "M 1.15 7.5 q 1.328 -4.078 -0.8 -6.7 l 0.8 0.35 q 19.05 9.15 23.7 -6.2 q -7.65 9.4 -17.35 -2.45 l -15 15 q 4.648 1.323 8.65 0 z",
    horiz:
      "M -20.45 10 l 10.45 0 l 16.35 -16.35 q -8.942 -4.256 -7.9 -14.9 q -8.313 8.782 -0.75 21.25 l -13.35 0 q 4.7 5.2 -4.8 10 z",
    horiz2: "M 0 0 a 7.5 7.5 0 0 1 0 15",
  } satisfies Extension as Extension,
  ř: {
    vert: "M 0 2.4 l 7.5 -7.55 q -16.8 0.55 -27.5 -12.45 q 4.6 18.35 18.85 18.8 l -8.85 8.8 l 0 5 q 4.75 -4.55 10 -1.5 l 0 -11.1 z",
    vert2: "M 0 0 a 7.5 7.5 0 0 0 7.5 -7.5 c -7.5 2.5 -10 2 -15 -3.75",
    diag: "M 0 0 l -7.05 7.05 q 4.298 1.674 7.9 -0.9 q 1.089 -2.895 0.3 -4.95 l 7.5 -7.55 q -16.8 0.55 -27.5 -12.45 q 4.6 18.35 18.85 18.8 z",
    horiz:
      "M -15.65 0 l 15.65 0 l -10 10 q 17.75 9.4 6.85 21.2 q 2.15 -12.25 -15.5 -14.85 l 6.3 -6.35 l -8.1 0 q 9.5 -4.8 4.8 -10 z",
    horiz2: "M 0 0 l 7.5 -7.5 c -7.5 2.5 -10 2 -15 -3.75",
  } satisfies Extension as Extension,
  m: {
    vert: "M 0 15 l 0 -15 l -15 0 l -10 10 l 15 0 l 0 10 q 3.874 -7.753 10 -5 z",
    vert2: "M 0 0 h -10",
    diag: "M 2.6 10 q 1.655 -2.716 -2.6 -10 l -15 0 l -10 10 l 20 0 q 7.015 2.931 7.6 0 z",
    horiz:
      "M -20 0 q 6.368 3.408 0 10 l 10 0 l 10 -10 l 0 -15 l -10 10 l 0 5 l -10 0 z",
    horiz2: "M 0 0 c -15 0 -3.75 22.5 11.25 -7.5",
  } satisfies Extension as Extension,
  n: {
    vert: "M 0 15 l 0 -15 l -12.6 0 l 7.5 -7.5 l -1.2 -1.2 l -18.7 18.7 l 15 0 l 0 10 q 3.85 -7.75 10 -5 z",
    vert2: "M 0 0 h -10 l 6 -9",
    diag: "M 2.6 10 q 1.65 -2.7 -2.6 -10 l -12.6 0 l 7.5 -7.5 l -1.2 -1.2 l -18.7 18.7 l 20 0 q 7 2.95 7.6 0 z",
    horiz:
      "M 0 0 l -15 0 q 2.75 6.15 -5 10 l 10 0 l 0 12.6 l -7.5 7.5 l 1.2 1.2 l 16.3 -16.3 l 0 -15 z",
    horiz2: "M 0 0 a 7 5 0 0 1 0 -10 v -8",
  } satisfies Extension as Extension,
  ň: {
    vert: "M 0 15 l 0 -15 l -15 0 l -17.5 17.5 l 1.2 1.2 l 8.7 -8.7 l 12.6 0 l 0 10 q 3.85 -7.75 10 -5 z",
    vert2: "M 0 0 a 5 7 0 0 0 -10 0 h -7",
    diag: "M 2.6 10 q 1.65 -2.7 -2.6 -10 l -15 0 l -17.5 17.5 l 1.2 1.2 l 8.7 -8.7 l 17.6 0 q 7 2.95 7.6 0 z",
    horiz:
      "M 6.3 6.3 l -6.3 6.3 l 0 -12.6 l -15 0 q 2.75 6.15 -5 10 l 10 0 l 0 15 l 17.5 -17.5 l -1.2 -1.2 z",
    horiz2: "M 0 0 v -10 l -9 6",
  } satisfies Extension as Extension,
  l: {
    vert: "M 0 -20 l -10 10 l 0 20 q 7.3 5 10 -10 l 0 -20 z",
    vert2: "M 0 0 c 0 -5 0 -7 -3 -10 c 3 10 -3 12 -2 12",
    diag: "M -15 -15 l -7.5 7.5 l 15 15 q 6.8 -0.5 7.5 -7.5 l -15 -15 z",
    horiz:
      "M -5 10 l 12.5 12.5 l 7.5 -7.5 l -15 -15 q -8.65 2.75 -10 10 l 5 0 z",
    horiz2: "M 0 0 c -5 0 -7 0 -10 -3 c 10 3 12 -3 12 -2",
  } satisfies Extension as Extension,
  r: {
    vert: "M -10 -7.6 l 0 17.6 q 7.3 5 10 -10 l 0 -20 l -17.5 17.5 l 1.2 1.2 l 6.3 -6.3 z",
    vert2: "M 0 0 c 0 -5 2.5 -8 5 -10 l -12 12",
    diag: "M -7.5 7.5 q 6.8 -0.5 7.5 -7.5 l -15 -15 l -15 15 l 1.2 1.2 l 7.5 -7.5 l 13.8 13.8 z",
    horiz:
      "M 22.5 7.5 l -1.2 -1.2 l -7.5 7.5 l -13.8 -13.8 q -8.65 2.75 -10 10 l 5 0 l 12.5 12.5 l 15 -15 z",
    horiz2: "M 0 0 c -5 0 -8 -2.5 -10 -5 l 12 12",
  } satisfies Extension as Extension,
  // r_FLIPPED is used in the primary extension for STA-CPT-D-S1.
  r_FLIPPED: {
    vert: "M -10 -10 v 20 q 7.3 5 10 -10.1 v -17.5 l 7.5 -7.5 l -1.2 -1.2 z",
    vert2: "M 0 0 c 0 -5 -10 -7.5 -10 -7.5 c 10 0 15 -5 17.5 -10",
    diag: "M -7.5 7.5 q 6.8 -0.5 7.5 -7.5 l -13.8 -13.8 l 7.5 -7.5 l -1.2 -1.2 l -15 15 l 15 15 z",
    horiz:
      "M 15 15 l -15 -15 q -8.65 2.75 -10 10 l 5 0 l 11.3 11.3 l -7.5 7.5 l 1.2 1.2 l 15 -15 z",
    horiz2: "M 0 0 a 10 7.5 0 0 1 -10 -7.5 a 6 6 0 0 0 10 -5",
  } satisfies Extension as Extension,
  ļ: {
    vert: "M 0 0 l -10 10 l 0 10 q 3.499 -7.753 10 -5 l 0 -5 l 10 0 l 10 -10 l -20 0 z",
    vert2: "M 0 0 h 10",
    diag: "M 5 -5 l -5 5 q -4.682 11.683 2.5 5 l 12.5 0 l 10 -10 l -20 0 z",
    horiz:
      "M -10 0 l -5 0 q 4.15 4.6 -2.45 10 l 7.45 0 l 10 -10 l 0 -5 l 10 10 l 7.5 -7.5 l -17.5 -17.5 l -10 10 l 0 10 z",
    horiz2: "M 0 0 a 7.5 7.5 0 0 0 -7.5 7.5 l -7.5 -10",
  } satisfies Extension as Extension,
  s: {
    vert: "M -10 21.2 q 5 -12.14 10 -11.2 l 0 -10 l -17.5 17.5 l 1.2 1.2 l 6.3 -6.3 l 0 8.8 z",
    vert2: "M 0 0 c 0 -10 -7 -12 -10 -5",
    diag: "M -1.1 3.05 q -3.28 1.825 -6.4 4.45 l -7.5 7.5 l 1.2 1.2 l 7.5 -7.5 q 4.106 1.688 4.55 0.35 q 0.6 -1.45 0.65 -6 z",
    horiz:
      "M -20 10 l 10 0 l 17.5 -17.5 l -1.2 -1.2 l -8.7 8.7 l -7.6 0 q 0.83 5.4 -10 10 z",
    horiz2: "M 0 0 c -10 0 -12 7 -5 10",
  } satisfies Extension as Extension,
  z: {
    vert: "M 7.5 -5.1 l -1.2 -1.2 l -16.3 16.3 l 0 7.75 q 5 -9.444 10 -6.55 l 0 -8.8 l 7.5 -7.5 z",
    vert2: "M 0 0 a 7.5 10 0 0 1 7.5 -10",
    diag: "M -4.45 6.4 q 1.825 -3.28 4.45 -6.4 l 7.5 -7.5 l 1.2 1.2 l -7.5 7.5 q 1.688 4.106 0.35 4.55 q -1.45 0.6 -6 0.65 z",
    horiz:
      "M -19.9 17.5 l 1.2 1.2 l 18.7 -18.7 l -10 0 q 0.85 5.4 -10 10 l 7.6 0 l -7.5 7.5 z",
    horiz2: "M 0 0 a 7.5 7.5 0 0 1 -7.5 -7.5",
  } satisfies Extension as Extension,
  š: {
    vert: "M 0 15 l 0 -15 l -10 10 l 0 -20 l -10 9.9 l 0 22.4 l 10 -9.95 l 0 5.15 q 5 -6.1 10 -2.5 z",
    vert2: "M 0 0 c 0 -5 2.5 -8 5 -10 l -12 12 v -17",
    diag: "M -6.3 8.7 q 4.2 0.65 6.3 -2.7 q 0.8 -1 0 -6 l -6.3 6.3 l 0 -19.95 l -10 10.1 l 0 22.35 l 10 -10.1 z",
    horiz:
      "M -15 10 l 5 0 l 7.6 -7.6 l 0 19.95 l 10 -9.9 l 0 -22.45 l -10 10 l -12.6 0 q 3.5 4 0 10 z",
    horiz2: "M 0 0 a 10 10 0 0 0 -10 10 v -17",
  } satisfies Extension as Extension,
  ž: {
    vert: "M -10 -10 l -10 9.9 l 0 0.1 l -7.5 7.5 l 1.2 1.2 l 6.3 -6.3 l 0 19.95 l 10 -10 l 0 5.15 q 5 -6.1 10 -2.5 l 0 -15 l -10 10 l 0 -20 z",
    vert2: "M 0 0 c 0 -10 -7.5 -10 -7.5 0 c 0 -10 -7.5 -10 -7.5 0",
    diag: "M 0 6 q 0.8 -1 0 -6 l -6.3 6.3 l 0 -19.95 l -17.5 17.5 l 1.2 1.2 l 6.3 -6.3 l 0 20.05 l 10 -10.1 q 4.2 0.65 6.3 -2.7 z",
    horiz:
      "M -15 10 l 5 0 l 7.6 -7.65 l 0 20 l 10 -9.9 l 0 -0.1 l 7.5 -7.5 l -1.2 -1.2 l -6.3 6.3 l 0 -19.95 l -10 10 l -12.6 0 q 3.5 4 0 10 z",
    horiz2:
      "M 0 0 c 0 -10 -7.5 -10 -7.5 0 c 0 -10 -7.5 -10 -7.5 -2.5 a 2.5 2.5 0 0 0 1.5 2.5",
  } satisfies Extension as Extension,
  c: {
    vert: "M -9.95 12.4 l -0.05 5.05 q 4.6 -6.3 10 -4 l 0 -13.45 l -9.95 10 l -12.65 0 l 7.5 -7.5 l -1.2 -1.2 l -18.7 18.7 l 17.45 0 l 7.6 -7.6 z",
    vert2:
      "M 0 0 c 0 10 -7.5 10 -7.5 0 c 0 10 -7.5 10 -7.5 2.5 a 2.5 2.5 0 0 1 1.5 -2.5",
    diag: "M -7.5 7.5 l -12.65 0 l 7.5 -7.5 l -1.2 -1.2 l -18.7 18.7 l 17.45 0 l 8.75 -8.8 q 6.9 0.2 3.8 -6.15 l -4.95 4.95 z",
    horiz:
      "M 0 0 l 12.65 0 l -7.5 7.5 l 1.2 1.2 l 18.7 -18.7 l -17.45 0 l -9.95 10 l -7.6 0 q 4.95 4.2 -6.25 10 l 6.25 0 l 9.95 -10 z",
    horiz2:
      "M 0 0 c 0 10 -7.5 10 -7.5 0 c 0 10 -7.5 10 -7.5 2.5 a 2.5 2.5 0 0 1 1.5 -2.5",
  } satisfies Extension as Extension,
  ż: {
    vert: "M -42.5 27.5 l 1.2 1.2 l 8.7 -8.7 l 15.05 0 l 7.6 -7.6 l -0.05 5.05 q 4.6 -6.3 10 -4 l 0 -13.45 l -9.95 10 l -15.05 0 l -17.5 17.5 z",
    vert2: "M 0 0 c 0 10 -7 15 -10 5 c -3 -10 -10 -5 -10 5",
    diag: "M -7.5 7.5 l -15.05 0 l -17.5 17.5 l 1.2 1.2 l 8.7 -8.7 l 15.05 0 l 8.75 -8.8 q 6.9 0.2 3.8 -6.15 l -4.95 4.95 z",
    horiz:
      "M -8.7 -3.9 l 6.3 -6.3 l 0 10.2 l -13.5 0 q 5.808 4.7 0.35 10 l 5.55 0 l 17.6 -17.6 l 0 -15 l -17.5 17.5 l 1.2 1.2 z",
    horiz2: "M 0 0 c 10 0 15 7 5 10 c -10 3 -5 10 5 10",
  } satisfies Extension as Extension,
  č: {
    vert: "M 0 0 l 0 0.1 l -0.05 0 l -9.95 9.9 l 0 5 q 5 -5.75 10 -5 l 0 -7.55 l 12.4 -12.45 l -19.9 0 l 7.4 -7.4 l -1.2 -1.2 l -8.6 8.6 l -0.1 0 l -10 10.1 l 19.9 0 l 0.1 -0.1 z",
    vert2: "M 0 0 a 7.5 7.5 0 0 1 7.5 -7.5 c -5 0 -20 2 -9 -5",
    diag: "M -10.3 -9.7 l -10 10.1 l 19.9 0 l -7.1 7.1 q 10.45 1.15 8.4 -5.9 l 11.2 -11.3 l -19.9 0 l 7.4 -7.4 l -1.2 -1.2 l -8.6 8.6 l -0.1 0 z",
    horiz:
      "M 0 20 l 0.1 0 l 9.9 -10 l -19.9 0 l 10 -10 l -12.65 0 q 5.5 3.45 -5.3 10 l 5.5 0 l -9.95 10 l 19.9 0 l -7.5 7.5 l 1.2 1.2 l 8.7 -8.7 z",
    horiz2: "M 0 0 c -12 0 -9 -5 -6 -7.5 h -9 l 4.5 -8",
  } satisfies Extension as Extension,
  j: {
    vert: "M 0 0 l 0 0.1 l -0.05 0 l -9.95 9.9 l 0 5 q 5 -5.75 10 -5 l 0 -7.55 l 12.4 -12.45 l -22.4 0 l -17.5 17.5 l 1.2 1.2 l 8.6 -8.6 l 17.6 0 l 0.1 -0.1 z",
    vert2: "M 0 0 a 7.5 9 0 0 1 7.5 -9 c -10 -5 -17 2.5 -16 5.5",
    diag: "M -18 0.4 l 17.6 0 l -7.1 7.1 q 10.45 1.15 8.4 -5.9 l 11.2 -11.3 l -22.4 0 l -17.5 17.5 l 1.2 1.2 l 8.6 -8.6 z",
    horiz:
      "M -22.4 20 l 22.4 0 l 17.5 -17.5 l -1.2 -1.2 l -8.7 8.7 l -17.6 0 l 10 -10 l -12.65 0 q 5.5 3.45 -5.3 10 l 5.5 0 l -9.95 10 z",
    horiz2: "M 0 0 a 5 5 0 0 1 0 -10 h -5 a 10 10 0 0 0 -10 10",
  } satisfies Extension as Extension,
  w: {
    vert: "M -3.7 -16.4 l -16.3 16.3 l 0 22.45 l 10 -10 l 0 5.15 q 5 -6.1 10 -2.5 l 0 -15 l -10 10 l 0 -17.7 l 7.5 -7.5 l -1.2 -1.2 z",
    vert2: "M 0 0 a 5 6 0 0 0 -10 0 v -6 a 10 10 0 0 1 10 -10",
    diag: "M -6.3 -11.15 l 7.5 -7.5 l -1.2 -1.2 l -16.3 16.3 l 0 22.35 l 10 -10.1 q 4.2 0.65 6.3 -2.7 q 0.8 -1 0 -6 l -6.3 6.3 l 0 -17.45 z",
    horiz:
      "M -8.7 28.75 l 16.3 -16.3 l 0 -22.45 l -10 10 l -12.6 0 q 3.5 4 0 10 l 5 0 l 7.6 -7.65 l 0 17.7 l -7.5 7.5 l 1.2 1.2 z",
    horiz2: "M 0 0 a 9 8 0 0 0 -9 8 c -5 -10 2.5 -17 5.5 -16",
  } satisfies Extension as Extension,
  y: {
    vert: "M -30 0 l 15 0 l -10 10 l 15 0 l 0 10 q 3.85 -7.75 10 -5 l 0 -15 l -12.55 0 l 9.95 -10 l -17.4 0 l -10 10 z",
    vert2: "M 0 0 a 5 5 0 0 0 -5 -5 c 5 -2.5 0 -7 -4 -6",
    diag: "M -2.6 -10 l -17.4 0 l -10 10 l 15 0 l -10 10 l 20 0 q 7 2.95 7.6 0 q 1.65 -2.7 -2.6 -10 l -12.55 0 l 9.95 -10 z",
    horiz:
      "M -10 10 l 0 14.9 l 10 -10.1 l 0 14.9 l 9.9 -9.9 l 0 -17.4 l -9.9 9.9 l 0 -12.3 l -15 0 q 2.75 6.15 -5 10 l 10 0 z",
    horiz2: "M 0 0 a 5 5 0 0 1 -5 -5 c -2.5 5 -7 0 -6 -4",
  } satisfies Extension as Extension,
  h: {
    vert: "M -10 10 l 0 7.3 q 4.546 -5.888 10 -3.05 l 0 -11.95 l 15.05 0 l 17.5 -17.5 l -1.2 -1.2 l -8.7 8.7 l -15 0 l -17.65 17.7 z",
    vert2: "M 0 0 c 0 -10 7 -15 10 -5 c 3 10 10 5 10 -5",
    diag: "M 17.5 -30.15 l -1.2 -1.2 l -16.3 16.3 l 0 15.05 l -7.5 7.5 q 11.45 4.9 8.7 -6.3 l 8.8 -8.9 l 0 -14.95 l 7.5 -7.5 z",
    horiz:
      "M -27.5 40.2 l 1.2 1.2 l 16.3 -16.3 l 0 -15.1 l 10 -10 l -18.3 0 q 4.75 2.3 -1.7 10 l 7.6 0 l 0.25 -0.2 l -7.85 7.85 l 0 15.05 l -7.5 7.5 z",
    horiz2: "M 0 0 c -10 0 -15 -7 -5 -10 c 10 -3 5 -10 -5 -10",
  } satisfies Extension as Extension,
  ç: {
    vert: "M 26.3 -0.4 l -1.2 -1.2 l -7.5 7.5 l -11.75 -11.75 l -15.85 15.85 l 0 5 q 6.25 -9 10 -5 l 0 -7.6 l 11.8 11.7 l 14.5 -14.5 z",
    vert2: "M 0 0 l 12.5 10 l 5 -7",
    diag: "M 33.7 -16.35 l -1.2 -1.2 l -8.7 8.7 l -15.05 0 l -8.75 8.85 q -1.75 3.2 -4.85 7.2 q 5.7 0.35 6 -6.05 l 15.05 0 l 17.5 -17.5 z",
    horiz:
      "M -2.5 0 l -7.65 0 q 2.55 4.45 -5 10 l 5 0 l 15.85 -15.9 l -11.8 -11.7 l 7.5 -7.5 l -1.2 -1.2 l -14.5 14.5 l 11.8 11.8 z",
    horiz2: "M 0 0 l 10 12.5 l -7 5",
  } satisfies Extension as Extension,
  CORE_GEMINATE: {
    vert: "M 0 0 l -15 0 l 0 -15 l -10 10 l 0 15 l 15 0 l 0 10 q 3.85 -7.75 10 -5 l 0 -15 z",
    vert2: "M 0 0 h -10 v -7.5",
    diag: "M -20 10 l 15 0 q 7 2.95 7.6 0 q 1.65 -2.7 -2.6 -10 l -10 0 l 0 -15 l -10 10 l 0 15 z",
    horiz:
      "M -15 0 l 15 0 l 0 15 l -10 10 l 0 -15 l -10 0 q 7.753 -3.874 5 -10 z",
    horiz2: "M 0 0 c -15 0 -3.75 -22.5 11.25 7.5",
  } satisfies Extension as Extension,
  EXTENSION_GEMINATE: {
    vert: "M 10 -25 l -10 10 l 0 15 l -10 10 l 0 7.5 q 5 -6.1 10 -2.5 l 0 -12.65 l 10 -10 l 0 -17.35 z",
    vert2: "M 0 0 a 5 7.5 0 0 1 10 0 v -15",
    diag: "M 0 0 l -7.5 7.5 q 11.45 4.9 8.7 -6.3 l 8.8 -8.9 l 0 -17.35 l -10 10 l 0 15.05 z",
    horiz:
      "M -20 35.1 l 10 -10 l 0 -15.1 l 10 -10 l -18.3 0 q 4.75 2.3 -1.7 10 l 7.6 0 l 0.25 -0.2 l -7.85 7.85 l 0 17.45 z",
    horiz2: "M 0 0 c 0 0 7.5 -2.5 7.5 -10",
  } satisfies Extension as Extension,
  "'": {
    vert: "M -16.55 -1.15 l -7.5 7.5 q 16.18 0.94 7.3 10.4 l -0.75 0.75 l 1.2 1.2 l 6.3 -6.3 l 0 8.8 q 5 -12.15 10 -11.2 l 0 -10 l -9.35 9.4 q 1.826 -6.478 -7.2 -10.55 z",
    vert2: "M 0 0 a 7.5 7.5 0 1 0 -12.8 5.3 c 5.3 5.3 6.3 -10.3 5.3 -20.3",
    diag: "M -5.7 5.65 q 1.9 -6.45 -7.15 -10.5 l -7.5 7.5 q 16.2 0.95 7.3 10.35 l -0.75 0.8 l 1.2 1.2 l 6.3 -6.3 q 12.446 2.958 6.3 -8.7 l -5.7 5.65 z",
    horiz:
      "M 6.7 -6.7 l 0.75 -0.8 l -1.2 -1.2 l -8.7 8.7 l -7.6 0 q 2.44 6.14 -5 10 l 5 0 l 9.4 -9.35 q -1.9 6.45 7.15 10.5 l 7.5 -7.5 q -16.2 -0.95 -7.3 -10.35 z",
    horiz2: "M 0 0 a 7.5 7.5 0 1 0 5.3 12.8 c 5.3 -5.3 -10.3 -6.3 -20.3 -5.3",
  } satisfies Extension as Extension,
  EJECTIVE: {
    vert: "M 5.25 -5.25 q -10.2 9.7 -17.8 0.15 l -7.5 7.55 q 8.75 7.55 16.5 1.05 l -6.45 6.5 l 0 5 q 5 -4.896 10 -3.45 l 0 -9.15 l 7.45 -7.45 l -1.2 -1.2 q -0.35 0.35 -0.75 0.7 q -0.1 0.15 -0.25 0.3 z",
    vert2: "M 0 0 c -20 10 4 16 10 0",
    diag: "M -11.35 -6.3 l -7.5 7.55 q 8.75 7.55 16.5 1.05 l -5.15 5.2 q 12.971 4.534 8.7 -6.3 l 7.45 -7.45 l -1.2 -1.2 q -0.35 0.35 -0.75 0.7 q -0.1 0.15 -0.25 0.3 q -10.2 9.7 -17.8 0.15 z",
    horiz:
      "M 0 0 l -17.35 0 q 4.3 6.2 -5 10 l 10 0 l -7.45 7.45 l 1.2 1.2 q 0.35 -0.35 0.75 -0.7 q 0.1 -0.15 0.25 -0.3 q 10.2 -9.7 17.8 -0.15 l 7.5 -7.55 q -8.75 -7.55 -16.5 -1.05 l 8.8 -8.9 z",
    horiz2: "M 0 0 c 10 20 16 -4 0 -10",
  } satisfies Extension as Extension,
  VELARIZED: {
    vert: "M -9.2 9.2 q -2.75 1.9 -6.4 0.25 q -3.6 -1.6 -5.7 -5.4 l -7.5 7.55 q 4.95 5.2 10.15 4.85 q 4.3 -0.25 8.65 -4.25 l 0 5.25 l 10 -4.35 l 0 -13.1 l -9.15 9.2 z",
    vert2: "M 0 0 c 20 10 -4 16 -10 0",
    diag: "M -26.05 8.9 q 4.95 5.2 10.15 4.85 q 4.85 -0.3 9.75 -5.3 q 12.131 3.167 6.15 -8.45 l -6.45 6.5 q -1.8 1.65 -5.3 0.65 q -4.15 -1.2 -6.8 -5.8 l -7.5 7.55 z",
    horiz:
      "M -0.8 0.8 q 2.75 -1.9 6.4 -0.25 q 3.6 1.6 5.7 5.4 l 7.5 -7.55 q -4.95 -5.2 -10.15 -4.85 q -4.85 0.3 -9.75 5.3 l -1.15 1.15 l -12.1 0 q 5.15 6.2 -0.65 10 l 5.05 0 l 9.15 -9.2 z",
    horiz2: "M 0 0 c 10 -20 16 4 0 10",
  } satisfies Extension as Extension,
  '"': {
    vert: "M 5.25 -5.25 q -10.2 9.7 -17.8 0.15 l -7.5 7.55 q 8.75 7.55 16.5 1.05 l -6.45 6.5 l 0 5 q 5 -4.896 10 -3.45 l 0 -9.15 l 7.45 -7.45 l -1.2 -1.2 q -0.35 0.35 -0.75 0.7 q -0.1 0.15 -0.25 0.3 z",
    vert2: "M 0 0 c -20 10 4 16 10 0",
    diag: "M -11.35 -6.3 l -7.5 7.55 q 8.75 7.55 16.5 1.05 l -5.15 5.2 q 12.971 4.534 8.7 -6.3 l 7.45 -7.45 l -1.2 -1.2 q -0.35 0.35 -0.75 0.7 q -0.1 0.15 -0.25 0.3 q -10.2 9.7 -17.8 0.15 z",
    horiz:
      "M 0 0 l -17.35 0 q 4.3 6.2 -5 10 l 10 0 l -7.45 7.45 l 1.2 1.2 q 0.35 -0.35 0.75 -0.7 q 0.1 -0.15 0.25 -0.3 q 10.2 -9.7 17.8 -0.15 l 7.5 -7.55 q -8.75 -7.55 -16.5 -1.05 l 8.8 -8.9 z",
    horiz2: "M 0 0 c 10 20 16 -4 0 -10",
  } satisfies Extension as Extension,
  "¿": {
    vert: "M -9.2 9.2 q -2.75 1.9 -6.4 0.25 q -3.6 -1.6 -5.7 -5.4 l -7.5 7.55 q 4.95 5.2 10.15 4.85 q 4.3 -0.25 8.65 -4.25 l 0 5.25 l 10 -4.35 l 0 -13.1 l -9.15 9.2 z",
    vert2: "M 0 0 c 20 10 -4 16 -10 0",
    diag: "M -26.05 8.9 q 4.95 5.2 10.15 4.85 q 4.85 -0.3 9.75 -5.3 q 12.131 3.167 6.15 -8.45 l -6.45 6.5 q -1.8 1.65 -5.3 0.65 q -4.15 -1.2 -6.8 -5.8 l -7.5 7.55 z",
    horiz:
      "M -0.8 0.8 q 2.75 -1.9 6.4 -0.25 q 3.6 1.6 5.7 5.4 l 7.5 -7.55 q -4.95 -5.2 -10.15 -4.85 q -4.85 0.3 -9.75 5.3 l -1.15 1.15 l -12.1 0 q 5.15 6.2 -0.65 10 l 5.05 0 l 9.15 -9.2 z",
    horiz2: "M 0 0 c 10 -20 16 4 0 10",
  } satisfies Extension as Extension,
})
