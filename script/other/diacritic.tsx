import { deepFreezeAndNullPrototype } from "../../index.js"

export const ALL_DIACRITICS = deepFreezeAndNullPrototype({
  DOT: "M 0 0 l 7.5 7.5 l 7.5 -7.5 l -7.5 -7.5 l -7.5 7.5 z",
  HORIZ_BAR: "M 0 0 l 10 -10 l -30 0 l -10 10 l 30 0 z",
  VERT_BAR: "M 0 0 l -10 10 l 0 25 l 10 -10 l 0 -25 z",
  DIAG_BAR: "M 0 0 l 20 20 l 7.5 -7.5 l -20 -20 l -7.5 7.5 z",
  TWO_PART_DIAG_BAR:
    "M 0 0 l 12.5 12.5 l -15 0 l -10 10 l 30 0 l 10 -10 l -20 -20 l -7.5 7.5 z",
  HORIZ_WITH_TOP_LINE:
    "M 0 0 l 8.8 -8.8 l -1.2 -1.2 l -20 20 l 30 0 l 10 -10 l -27.6 0 z",
  HORIZ_WITH_BOTTOM_LINE:
    "M 0 0 l -8.8 8.8 l 1.2 1.2 l 20 -20 l -30 0 l -10 10 l 27.6 0 z",
  VERT_WITH_LEFT_LINE:
    "M 0 0 l 0 -25 l -20 20 l 1.2 1.2 l 8.8 -8.8 l 0 22.6 l 10 -10 z",
  VERT_WITH_RIGHT_LINE:
    "M 0 0 l 0 25 l 20 -20 l -1.2 -1.2 l -8.8 8.8 l 0 -22.6 l -10 10 z",
  CURVE_TO_LEFT:
    "M 0 0 l -1.15 -1.25 q -6.55 11.7 -14.4 12.25 q -7.8 0.5 -17.45 -9.75 l -7.5 7.5 q 6.55 12.05 18.7 9.55 q 12.25 -2.5 21.8 -18.3 z",
  CURVE_TO_RIGHT:
    "M 0 0 l 1.15 1.25 q 6.55 -11.7 14.4 -12.25 q 7.8 -0.5 17.45 9.75 l 7.5 -7.5 q -6.55 -12.05 -18.7 -9.55 q -12.25 2.5 -21.8 18.3 z",
  CURVE_TO_TOP:
    "M 0 0 q -0.75 -5.3 -5.4 -8.4 q -4.9 -3.3 -12.95 -3.2 l -7.5 7.5 q 14.9 0.4 18.6 8.55 q 3.75 8.2 -7.45 16.9 l 1.25 1.15 q 7.35 -5.2 10.9 -11.4 q 3.3 -5.85 2.55 -11.1 z",
  CURVE_TO_BOTTOM:
    "M 0 0 q 0.75 5.3 5.4 8.4 q 4.9 3.3 12.95 3.2 l 7.5 -7.5 q -14.9 -0.4 -18.6 -8.55 q -3.75 -8.2 7.45 -16.9 l -1.25 -1.15 q -7.35 5.2 -10.9 11.4 q -3.3 5.85 -2.55 11.1 z",
  CURVE_TO_BOTTOM_WITH_LINE:
    "M 0 0 q -3.3 5.85 -2.55 11.1 q 0.75 5.3 5.4 8.4 q 4.162 2.803 10.6 3.15 l -8.85 8.85 l 1.2 1.2 l 17.5 -17.5 q -14.9 -0.4 -18.6 -8.55 q -3.75 -8.2 7.45 -16.9 l -1.25 -1.15 q -7.35 5.2 -10.9 11.4 z",
  CURVE_TO_LEFT_WITH_DOT:
    "M 0 0 l -1.15 -1.25 q -6.55 11.7 -14.4 12.25 q -7.8 0.5 -17.45 -9.75 l -7.5 7.5 q 6.55 12.05 18.7 9.55 q 12.25 -2.5 21.8 -18.3 m -9.6 -1.25 l -7.5 -7.5 l -7.5 7.5 l 7.5 7.5 l 7.5 -7.5 z",
  CURVE_TO_RIGHT_WITH_DOT:
    "M 0 0 l 1.15 1.25 q 6.55 -11.7 14.4 -12.25 q 7.8 -0.5 17.45 9.75 l 7.5 -7.5 q -6.55 -12.05 -18.7 -9.55 q -12.25 2.5 -21.8 18.3 m 9.6 1.25 l 7.5 7.5 l 7.5 -7.5 l -7.5 -7.5 l -7.5 7.5 z",
})

export type DiacriticName = keyof typeof ALL_DIACRITICS

export function Diacritic(props: { name: DiacriticName }): SVGPathElement {
  return (<path d={ALL_DIACRITICS[props.name]} />) as SVGPathElement
}
