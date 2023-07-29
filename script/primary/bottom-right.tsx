import {
  deepFreeze,
  type Function,
  type Stem,
  type Version,
} from "../../index.js"

const PATHS = deepFreeze({
  STA: {
    PRC: {
      M: [
        "M 15.0525 27.5 l 10 -10 l -17.45 0 l -8.75 8.8 q -6.9 -0.2 -3.8 6.15 l 4.95 -4.95 l 15.05 0 z",
        "",
        "M -5 32.5 l 5 -5 l 10 10 l 7.15 -7.15 l -11.3 -11.2 l -7 7.1 q -3.183 -1.742 -3.85 0 q -0.916 1.293 0 6.25 z",
        "M 8.85 38.5 l 0 -22.35 l -10 10.1 q -4.22 -0.66 -6.3 2.7 q -0.793 0.99 0 6 l 6.3 -6.3 l 0 19.95 l 10 -10.1 z",
      ],
      D: [
        "M 0 27.5 l 12.65 0 l -7.5 7.5 l 1.2 1.2 l 18.7 -18.7 l -17.45 0 l -8.75 8.8 q -6.9 -0.2 -3.8 6.15 l 4.95 -4.95 z",
        "M -3 28.55 q -1.825 3.28 -4.45 6.4 l -7.5 7.5 l -1.2 -1.2 l 7.5 -7.5 q -1.688 -4.106 -0.35 -4.55 q 1.45 -0.6 6 -0.65 z",
        "M 17.15 30.35 l -11.3 -11.2 l -7 7.1 q -3.2 -1.75 -3.85 0 q -0.9 1.3 0 6.25 l 5 -5 l 8.8 8.8 l -7.5 7.5 l 1.2 1.2 l 14.65 -14.65 z",
        "M -7.5 29 q -0.8 1 0 6 l 6.3 -6.3 l 0 17.45 l -7.5 7.5 l 1.2 1.2 l 16.3 -16.3 l 0 -22.35 l -10 10.1 q -4.2 -0.65 -6.3 2.7 z",
      ],
    },
    CPT: {
      M: [
        "M -8.8 33.8 l -11.2 11.3 l 22.4 0 l 10 -10.1 l -19.9 0 l 7.1 -7.1 q -10.446 -1.157 -7.4 4.9 l -1 1 z",
        "M 0 27.5 q -6.8 0.5 -7.5 7.5 l 15 15 l 7.5 -7.5 l -15 -15 z",
        "M 4.3 46.8 l -11.8 -11.8 l 5 -5 q -7.681 -1.687 -7.1 0.5 l 1 3.3 l -7.05 7.05 l 13 12.9 l 7 -7 z",
        "M -7.5 35 l 7.5 -7.5 q -11.45 -4.9 -8.7 6.3 l -8.8 8.9 l 0 17.45 l 10 -10 l 0 -15.15 z",
      ],
      D: [
        "M 12.4 35 l -19.9 0 l 7.1 -7.1 q -10.45 -1.15 -7.4 4.9 l -1 1 l -11.2 11.3 l 19.9 0 l -7.4 7.4 l 1.2 1.2 l 18.7 -18.7 z",
        "M -7.5 35 l 13.8 13.8 l -7.5 7.5 l 1.2 1.2 l 15 -15 l -15 -15 q -6.8 0.5 -7.5 7.5 z",
        "M 4.3 46.8 l -11.8 -11.8 l 5 -5 q -7.7 -1.7 -7.1 0.5 l 1 3.3 l -0.05 0.05 l -7.05 7.05 l 11.8 11.7 l -7.5 7.5 l 1.2 1.2 l 14.5 -14.5 z",
        "M -7.5 35 l 7.5 -7.5 q -11.45 -4.9 -7.7 5.3 l -1 1 l -8.8 8.9 l 0 15.05 l -7.5 7.5 l 1.2 1.2 l 16.3 -16.3 l 0 -15.15 z",
      ],
    },
  },
  DYN: {
    PRC: {
      M: [
        "M -16.2 43.8 l 8.75 -8.85 q 1.75 -3.2 4.85 -7.2 q -5.7 -0.35 -6 6.05 l -19.95 0 l -10 10 l 22.35 0 z",
        "M -10.1 25 q -1.655 2.716 2.6 10 l 15 0 l 10 -10 l -20 0 q -7.015 -2.931 -7.6 0 z",
        "M 12.5 25 l -15 0 q -7 -2.95 -7.6 0 q -1.65 2.7 2.6 10 l 10 0 l 0 15 l 10 -10 l 0 -15 z",
        "M -1.2 26.3 q -6.486 -1.216 -4.75 5 q 2.924 -3.894 5.95 -3.8 l 8.8 -8.8 l 0 -15 l -10 10 l 0 12.6 z",
      ],
      D: [
        "M -16.2 43.8 l 8.75 -8.85 q 1.75 -3.2 4.85 -7.2 q -5.7 -0.35 -6 6.05 l -17.55 0 l 6.3 -6.35 l -1.2 -1.2 l -17.5 17.55 l 22.35 0 z",
        "M -2.4 42.5 l 1.2 1.2 l 18.7 -18.7 l -20 0 q -7 -2.95 -7.6 0 q -1.65 2.7 2.6 10 l 12.6 0 l -7.5 7.5 z",
        "M 23.8 16.31 l -8.7 8.7 l -17.6 0 q -7 -2.95 -7.6 0 q -1.65 2.7 2.6 10 l 15 0 l 17.5 -17.5 l -1.2 -1.2 z",
        "M 16.35 31.1 l -1.2 -1.2 l -6.3 6.3 l 0 -20.05 l -10 10.1 q -4.2 -0.65 -6.3 2.7 q -0.8 1 0 6 l 6.3 -6.3 l 0 19.95 l 17.5 -17.5 z",
      ],
    },
    CPT: {
      M: [
        "M 0 27.5 q -7.6 -3.25 -8.6 0 q -0.313 1.95 1.3 6.2 l -1.3 0.15 q -20.55 3.2 -16.1 -6.3 q -12.35 14.35 9.75 14.95 l 14.95 -15 z",
        "M -6.45 32 q 3.28 -1.825 6.4 -4.45 l 7.5 -7.5 l -1.2 -1.2 l -7.5 7.5 q -4.106 -1.688 -4.55 -0.35 q -0.6 1.45 -0.65 6 z",
        "M -8.65 33.8 l -7.5 7.55 q 17.7 8.5 27.5 -7.5 q -11.7 7.3 -18.85 1.15 l 3.7 -3.7 q -1.81 -1.308 -4.55 -2.1 q -1.8 -0.5 0.7 3.55 z",
        "M 15.05 47.45 q 0.35 -21.9 -9.85 -27.5 l -6.3 6.35 l -0.05 -0.05 q -8.054 -2.82 -6.3 8.7 l 6.3 -6.3 q 10.8 2.6 16.2 18.85 z",
      ],
      D: [
        "M -8.65 27.5 q -1.328 4.078 0.8 6.7 l -0.8 -0.35 q -19.05 -9.15 -23.7 6.2 q 7.65 -9.4 17.35 2.45 l 15 -15 q -4.648 -1.323 -8.65 0 z",
        "M 0 27.5 q -6.8 0.5 -7.5 7.5 l 15 15 l 15 -15 l -1.2 -1.2 l -7.5 7.5 l -13.8 -13.8 z",
        "M -7.5 35 l 7.05 -7.05 q -4.298 -1.674 -7.9 0.9 q -1.089 2.895 -0.3 4.95 l -7.5 7.55 q 16.8 -0.55 27.5 12.45 q -4.6 -18.35 -18.85 -18.8 z",
        "M -1.15 26.35 l 0 -0.05 q -8.1 -2.8 -6.35 8.7 l 6.3 -6.3 q 9.4 17.75 21.2 6.85 q -12.25 2.15 -14.85 -15.5 l -6.35 6.3 z",
      ],
    },
  },
})

export function PrimaryBottomRight(props: {
  function: Function
  version: Version
  plexity: "M" | "D"
  stem: Stem
}) {
  return (
    <path d={PATHS[props.function][props.version][props.plexity][props.stem]} />
  ) as SVGPathElement
}