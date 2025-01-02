import { deepFreeze } from "../../generate/index.js"

/** An object containing all diacritics and their SVG paths. */
export const CORE_DIACRITICS = /* @__PURE__ */ deepFreeze({
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
  a: "M 0 0 l 7.5 7.5 l 7.5 -7.5 l -7.5 -7.5 l -7.5 7.5 z",
  ä: "M 0 0 l 10 -10 l -30 0 l -10 10 l 30 0 z",
  e: "M 0 0 l -8.8 8.8 l 1.2 1.2 l 20 -20 l -30 0 l -10 10 l 27.6 0 z",
  ë: "M 0 0 l 8.8 -8.8 l -1.2 -1.2 l -20 20 l 30 0 l 10 -10 l -27.6 0 z",
  i: "M 0 0 l 20 20 l 7.5 -7.5 l -20 -20 l -7.5 7.5 z",
  o: "M 0 0 q -0.75 -5.3 -5.4 -8.4 q -4.9 -3.3 -12.95 -3.2 l -7.5 7.5 q 14.9 0.4 18.6 8.55 q 3.75 8.2 -7.45 16.9 l 1.25 1.15 q 7.35 -5.2 10.9 -11.4 q 3.3 -5.85 2.55 -11.1 z",
  ö: "M 0 0 q 0.75 5.3 5.4 8.4 q 4.9 3.3 12.95 3.2 l 7.5 -7.5 q -14.9 -0.4 -18.6 -8.55 q -3.75 -8.2 7.45 -16.9 l -1.25 -1.15 q -7.35 5.2 -10.9 11.4 q -3.3 5.85 -2.55 11.1 z",
  u: "M 0 0 l 0 25 l 20 -20 l -1.2 -1.2 l -8.8 8.8 l 0 -22.6 l -10 10 z",
  ü: "M 0 0 l 0 -25 l -20 20 l 1.2 1.2 l 8.8 -8.8 l 0 22.6 l 10 -10 z",
})

/** An object containing all handwritten diacritics. */
export const HANDWRITTEN_DIACRITICS = /* @__PURE__ */ deepFreeze({
  DOT: "M 0 0 a -0.75 -0.75 0 0 0 -0.75 -0.75 a -0.75 -0.75 0 0 0 -0.75 0.75 a -0.75 -0.75 0 0 0 0.75 0.75 a -0.75 -0.75 0 0 0 0.75 -0.75",
  HORIZ_BAR: "M 0 0 h 20",
  VERT_BAR: "M 0 0 v 20",
  DIAG_BAR: "M 0 0 l 20 20",
  TWO_PART_DIAG_BAR: "M 0 0 h 20 l -12.5 -15",
  HORIZ_WITH_TOP_LINE: "M 0 0 h -15 a 2.5 2.5 0 0 1 0 -5",
  HORIZ_WITH_BOTTOM_LINE: "M 0 0 h 15 a 2.5 2.5 0 0 1 0 5",
  VERT_WITH_LEFT_LINE: "M 0 0 v -15 a 2.5 2.5 0 0 0 -5 0",
  VERT_WITH_RIGHT_LINE: "M 0 0 v 15 a 2.5 2.5 0 0 0 5 0",
  CURVE_TO_LEFT: "M 0 0 a 12.5 12.5 0 0 1 -20 0",
  CURVE_TO_RIGHT: "M 0 0 a 12.5 12.5 0 0 0 -20 0",
  CURVE_TO_TOP: "M 0 0 c 7.5 -7.5 3.75 -17.25 -11.25 -15",
  CURVE_TO_BOTTOM: "M 0 0 c -7.5 7.5 -3.75 17.25 11.25 15",
  CURVE_TO_BOTTOM_WITH_LINE: "M 0 0 c -7.5 7.5 -3.75 17.25 11.25 15 l -10 15",
  CURVE_TO_LEFT_WITH_DOT:
    "M 0 0 a 12.5 12.5 0 0 1 -20 0 m 9.25 -4.25 a 0.75 0.75 0 0 0 0.75 0.75 a 0.75 0.75 0 0 0 0.75 -0.75 a 0.75 0.75 0 0 0 -0.75 -0.75 a 0.75 0.75 0 0 0 -0.75 0.75",
  CURVE_TO_RIGHT_WITH_DOT:
    "M 0 0 a -12.5 -12.5 0 0 1 20 0 m -9.25 4.25 a -0.75 -0.75 0 0 0 -0.75 -0.75 a -0.75 -0.75 0 0 0 -0.75 0.75 a -0.75 -0.75 0 0 0 0.75 0.75 a -0.75 -0.75 0 0 0 0.75 -0.75",
  a: "M 0 0 a -0.75 -0.75 0 0 0 -0.75 -0.75 a -0.75 -0.75 0 0 0 -0.75 0.75 a -0.75 -0.75 0 0 0 0.75 0.75 a -0.75 -0.75 0 0 0 0.75 -0.75",
  ä: "M 0 0 h 20",
  e: "M 0 0 h 15 a 2.5 2.5 0 0 1 0 5",
  ë: "M 0 0 h -15 a 2.5 2.5 0 0 1 0 -5",
  i: "M 0 0 l 20 20",
  o: "M 0 0 c 7.5 -7.5 3.75 -17.25 -11.25 -15",
  ö: "M 0 0 c -7.5 7.5 -3.75 17.25 11.25 15",
  u: "M 0 0 v 15 a 2.5 2.5 0 0 0 5 0",
  ü: "M 0 0 v -15 a 2.5 2.5 0 0 0 -5 0",
} satisfies Record<DiacriticName, string>)

/** The name of a diacritic. */
export type DiacriticName = keyof typeof CORE_DIACRITICS

/**
 * Instantiates a diacritic into an SVG path.
 *
 * @param props Properties that modify the output of this `Diacritic`.
 * @returns An `SVGPathElement` containing the diacritic.
 */
export function Diacritic(props: {
  /** Whether this diacritic is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The name of the diacritic to draw. */
  readonly name: DiacriticName
}): SVGPathElement {
  return (
    <path
      d={
        (props.handwritten ? HANDWRITTEN_DIACRITICS : CORE_DIACRITICS)[
          props.name
        ]
      }
    />
  ) as SVGPathElement
}
