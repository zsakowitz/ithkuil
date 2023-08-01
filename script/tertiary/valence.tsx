import type { Valence } from "../../generator/index.js"

/** An object containing all Valence segments. */
export const VALENCE: Record<Valence, string> = {
  MNO: "M 0 -5 l -10 10 l 50 0 l 10 -10 l -50 0 z",
  PRL: "M 0 -5 l -10 10 l 47.6 0 l -6.3 6.3 l 1.2 1.2 l 17.5 -17.5 l -50 0 z",
  CRO: "M 0 -5 l 6.3 -6.3 l -1.2 -1.2 l -17.5 17.5 l 50 0 l 10 -10 l -47.6 0 z",
  RCP: "M 0 -5 l 6.3 -6.3 l -1.2 -1.2 l -17.5 17.5 l 47.6 0 l -6.3 6.3 l 1.2 1.2 l 17.5 -17.5 l -47.6 0 z",
  CPL: "M 0 -5 l -17.5 17.5 l 1.2 1.2 l 8.7 -8.7 l 47.6 0 l 10 -10 l -50 0 z",
  DUP: "M 0 -5 l -10 10 l 50 0 l 17.5 -17.5 l -1.2 -1.2 l -8.7 8.7 l -47.6 0 z",
  DEM: "M 0 -5 l -10 10 l 50 0 q 3.305 -3.314 6.6 -6.65 l 2.25 -2.2 q 7.703 1.262 8.9 5.75 q 1.1 4.25 -3.5 11.9 q 10.7 -7.55 10.6 -16.15 q -0.05 -8.35 -9.7 -10.15 l -7.55 7.5 l -47.6 0 z",
  CNG: "M 0 5 l 8.8 -8.8 q 2.366 9.952 10.35 11.15 q 8 1.2 15.35 -7.1 q -12.8 7.2 -19.35 -12.75 l -7.55 7.5 l -47.6 0 l -10 10 l 50 0 z",
  PTI: "M 0 12.5 l 1.2 1.2 l 8.7 -8.7 l 47.6 0 l 8.85 -8.85 q 7.703 1.262 8.9 5.75 q 1.1 4.25 -3.5 11.9 q 10.7 -7.55 10.6 -16.15 q -0.05 -8.35 -9.7 -10.15 l -7.55 7.5 l -47.6 0 l -17.5 17.5 z",
}

/**
 * Constructs a Valence segment.
 * @param props Properties modifying this Valence segment.
 * @returns The constructed `SVGPathElement`.
 */
export function ValenceSegment(props: {
  /** The valence segment to construct. */
  readonly valence: Valence
}) {
  return (<path d={VALENCE[props.valence]} />) as SVGPathElement
}
