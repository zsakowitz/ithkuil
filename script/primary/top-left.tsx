import {
  deepFreeze,
  type Extension,
  type Perspective,
} from "../../generate/index.js"

const PATHS = /* @__PURE__ */ deepFreeze({
  M: {
    DEL: "",
    PRX: "M 6.4 -31.95 q -3.28 1.825 -6.4 4.45 l -7.5 7.5 l 1.2 1.2 l 7.5 -7.5 q 4.106 1.688 4.55 0.35 q 0.6 -1.45 0.65 -6 z",
    ICP: "M 1.2 -26.3 q 6.486 1.216 4.75 -5 q -2.924 3.894 -5.95 3.8 l -8.8 8.8 l 0 15 l 10 -10 l 0 -12.6 z",
    ATV: "M 8.6 -33.8 l 15.05 0 l 10 -10 l -17.45 0 l -8.75 8.85 q -1.75 3.2 -4.85 7.2 q 5.7 0.35 6 -6.05 z",
    GRA: "M 10.1 -25 q 1.655 -2.716 -2.6 -10 l -15 0 l -10 10 l 20 0 q 7.015 2.931 7.6 0 z",
    DPL: "M 10.1 -25 q 1.65 -2.7 -2.6 -10 l -12.6 0 l 7.5 -7.5 l -1.2 -1.2 l -18.7 18.7 l 20 0 q 7 2.95 7.6 0 z",
  },
  G: {
    DEL: "M 5 -32.5 l -5 5 l -10 -10 l -7.15 7.15 l 11.3 11.2 l 7 -7.1 q 3.2 1.75 3.85 0 q 0.9 -1.3 0 -6.25 z",
    PRX: "M -4.3 -46.8 l 11.8 11.8 l -5 5 q 7.681 1.687 7.1 -0.5 l -1 -3.3 l 7.05 -7.05 l -13 -12.9 l -7 7 z",
    ICP: "M 7.45 -28.95 q 0.8 -1 0 -6 l -6.3 6.3 l 0 -19.95 l -17.5 17.5 l 1.2 1.2 l 6.3 -6.3 l 0 20.05 l 10 -10.1 q 4.2 0.65 6.3 -2.7 z",
    ATV: "M 8.65 -27.5 q 1.328 -4.078 -0.8 -6.7 l 0.8 0.35 q 19.05 9.15 23.7 -6.2 q -7.65 9.4 -17.35 -2.45 l -15 15 q 4.648 1.323 8.65 0 z",
    GRA: "M 1.15 -26.35 l 0 0.05 q 8.1 2.8 6.35 -8.7 l -6.35 6.3 q -9.4 -17.75 -21.2 -6.85 q 12.25 -2.15 14.85 15.5 l 6.35 -6.3 z",
    DPL: "M 8.65 -33.75 l 7.5 -7.55 q -17.7 -8.5 -27.5 7.5 q 11.7 -7.3 18.85 -1.15 l -3.7 3.65 q 1.81 1.308 4.55 2.1 q 1.8 0.5 0.3 -4.55 z",
  },
  N: {
    DEL: "M -8.8 -38.55 l 0 22.35 l 10 -10.1 q 4.22 0.66 6.3 -2.7 q 0.793 -0.99 0 -6 l -6.3 6.3 l 0 -19.95 l -10 10.1 z",
    PRX: "M 7.5 -35 l -7.5 7.5 q 11.45 4.9 7.7 -5.3 l 1 -1 l 8.8 -8.9 l 0 -17.35 l -10 10 l 0 15.05 z",
    ICP: "M 7.5 -29 q 0.8 -1 0 -6 l -6.3 6.3 l 0 -17.45 l 7.5 -7.5 l -1.2 -1.2 l -6.3 6.3 l -10 10.1 l 0 22.35 l 10 -10.1 q 4.2 0.65 6.3 -2.7 z",
    ATV: "M 25 -65.15 l -1.2 -1.2 l -16.3 16.3 l 0 15.05 l -7.5 7.5 q 11.45 4.9 7.7 -5.3 l 1 -1 l 8.8 -8.9 l 0 -14.95 l 7.5 -7.5 z",
    GRA: "M -15 -47.5 q -0.35 21.9 9.85 27.5 l 6.3 -6.35 l 0.05 0.05 q 8.054 2.82 6.3 -8.7 l -6.3 6.35 q -10.8 -2.6 -16.2 -18.85 z",
    DPL: "M 7.5 -35 l -7.05 7.05 q 4.298 1.674 7.9 -0.9 q 1.089 -2.895 0.3 -4.95 l 7.5 -7.55 q -16.8 0.55 -27.5 -12.45 q 4.6 18.35 18.85 18.8 z",
  },
  A: {
    DEL: "M -15.05 -27.5 l -10 10 l 17.45 0 l 8.75 -8.8 q 6.9 0.2 3.8 -6.15 l -4.95 4.95 l -15.05 0 z",
    PRX: "M 8.8 -33.8 l 11.2 -11.3 l -22.4 0 l -10 10.1 l 19.9 0 l -7.1 7.1 q 10.446 1.157 7.4 -4.9 l 1 -1 z",
    ICP: "M 0 -27.5 l -12.65 0 l 7.5 -7.5 l -1.2 -1.2 l -18.7 18.7 l 17.45 0 l 8.75 -8.8 q 6.9 0.2 3.8 -6.15 l -4.95 4.95 z",
    ATV: "M -2.4 -45.1 l -10 10.1 l 19.9 0 l -7.1 7.1 q 10.45 1.15 7.4 -4.9 l 1 -1 l 11.1 -11.3 l -19.9 0 l 7.4 -7.4 l -1.2 -1.2 l -8.6 8.6 z",
    GRA: "M 0 -27.5 l -15.05 0 l -17.5 17.5 l 1.2 1.2 l 8.7 -8.7 l 15.05 0 l 8.75 -8.8 q 6.9 0.2 3.8 -6.15 l -4.95 4.95 z",
    DPL: "M -10.1 -35 l 17.6 0 l -7.1 7.1 q 10.45 1.15 7.4 -4.9 l 1 -1 l 11.2 -11.3 l -22.4 0 l -17.5 17.5 l 1.2 1.2 l 8.6 -8.6 z",
  },
})

/**
 * Creates the bottom-left shape of a primary character as an SVG path.
 * @param props Properties that modify the shape.
 * @returns An `SVGPathElement` containing the shape, or `undefined` if no shape
 * is needed.
 */
export function PrimaryTopLeft(props: {
  /** The perspective of this character. */
  readonly perspective: Perspective

  /** The extension of this character. */
  readonly extension: Extension
}): SVGPathElement {
  return (
    <path d={PATHS[props.perspective][props.extension]} />
  ) as SVGPathElement
}
