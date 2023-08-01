import { deepFreeze, type RegisterAdjunct } from "../../generate/index.js"

/** The mode of a register character. */
export type RegisterMode =
  | "standard"
  | "alphabetic"
  | "transcriptive"
  | "transliterative"

/** SVG paths for all register characters. */
export const REGISTERS = /* @__PURE__ */ deepFreeze({
  standard: {
    NRR: "",
    DSV: "",
    PNT: "M 10.65 -11.85 l 8.1 8.1 l -7.5 7.5 l -6.85 -6.85 l -15.05 14.95 l -8.1 -8.1 l 7.5 -7.5 l 6.85 6.85 l 15.05 -14.95 z",
    CGT: "M -1.2 6.3 l -6.3 -6.3 l 15 -15 l 1.2 1.2 l -7.5 7.5 l 6.3 6.3 l -15 15 l -1.2 -1.2 l 7.5 -7.5 z",
    EXM: "M 6.3 -1.2 l -6.3 -6.3 l -15 15 l 1.2 1.2 l 7.5 -7.5 l 6.3 6.3 l 15 -15 l -1.2 -1.2 l -7.5 7.5 z",
    SPF: "M -7.5 -7.5 l 6.95 6.95 l 7.45 -7.5 l 6.9 6.85 l 7.5 -7.5 l 1.2 1.2 l -15 15 l -6.85 -6.85 l -7.55 7.45 l -6.9 -6.9 l -7.5 7.5 l -1.2 -1.2 l 15 -15 z",
  },
  alphabetic: {
    NRR: "M -0.025 -15 l -7.5 7.5 l 6.9 6.9 l -7.45 7.5 l 0.55 0.55 l 0 0.05 l 7.5 7.5 l 7.5 -7.5 l -6.9 -6.9 l 7.5 -7.5 l -8.1 -8.1 z",
    DSV: "M 0.6 0.575 l 6.9 6.9 l 7.5 -7.5 l -8.1 -8.05 l -7.5 7.45 l -6.9 -6.9 l -7.5 7.5 l 8.1 8.1 l 7.5 -7.5 z",
    PNT: "M -11.85 10.65 l 8.1 8.1 l 7.5 -7.5 l -6.85 -6.85 l 14.95 -15.05 l -8.1 -8.1 l -7.5 7.5 l 6.85 6.85 l -14.95 15.05 z",
    CGT: "M -7.825 -3.75 l 6.95 6.95 l -7.5 7.45 l 8.05 8.1 l 7.5 -7.5 l -6.85 -6.85 l 7.45 -7.55 l -6.9 -6.9 l 7.5 -7.5 l -1.2 -1.2 l -15 15 z",
    EXM: "M 8.4 -10.65 l -8.1 -8.1 l -7.5 7.5 l 6.95 6.95 l -7.5 7.45 l 6.85 6.9 l -7.5 7.5 l 1.2 1.2 l 15 -15 l -6.85 -6.85 l 7.45 -7.55 z",
    SPF: "M -7.5 -7.5 l 6.95 6.95 l -7.5 7.45 l 6.85 6.9 l -7.5 7.5 l 1.2 1.2 l 15 -15 l -6.85 -6.85 l 7.45 -7.55 l -6.9 -6.9 l 7.5 -7.5 l -1.2 -1.2 l -15 15 z",
  },
  transcriptive: {
    NRR: "M -7.475 0 l -0.05 0 l 6.9 6.9 l -7.45 7.5 l 0.55 0.55 l 0 0.05 l 7.5 7.5 l 7.5 -7.5 l -6.9 -6.9 l 7.5 -7.5 l -7.45 -7.45 l 7.45 -7.55 l -8.1 -8.1 l -7.5 7.5 l 6.95 6.95 l -7.5 7.45 l 0.6 0.6 z",
    DSV: "M -8.05 -0.575 l 7.45 -7.5 l 7.5 7.45 l 7.5 -7.45 l 8.1 8.05 l -7.5 7.5 l -6.9 -6.9 l -7.5 7.5 l -7.45 -7.45 l -7.55 7.45 l -8.1 -8.1 l 7.5 -7.5 l 6.95 6.95 z",
    PNT: "M 7.5 14.7 l 7.5 -7.5 l -8.1 -8.05 l -7.45 7.5 l -6.95 -6.95 l -7.5 7.5 l 8.1 8.1 l 7.55 -7.45 l 6.85 6.85 m -0.3 -22.5 l -7.5 -7.5 l -7.5 7.5 l 7.5 7.5 l 7.5 -7.5 z",
    CGT: "M 15.6 -6.3 l -7.5 -7.5 l -7.5 7.5 l 7.5 7.5 l 7.5 -7.5 m -31.2 20.1 l 1.2 1.2 l 15 -15 l -6.3 -6.3 l 7.5 -7.5 l -1.2 -1.2 l -15 15 l 6.3 6.3 l -7.5 7.5 z",
    EXM: "M 6.3 -15.6 l 7.5 7.5 l -7.5 7.5 l -7.5 -7.5 l 7.5 -7.5 m -20.1 31.2 l -1.2 -1.2 l 15 -15 l 6.3 6.3 l 7.5 -7.5 l 1.2 1.2 l -15 15 l -6.3 -6.3 l -7.5 7.5 z",
    SPF: "M -8.05 -7.775 l 7.5 7.5 l 7.5 -7.5 l -7.5 -7.5 l -7.5 7.5 m 7.5 13.8 l -6.95 -6.95 l -15 15 l 1.2 1.2 l 7.5 -7.5 l 6.9 6.9 l 7.55 -7.45 l 6.85 6.85 l 15 -15 l -1.2 -1.2 l -7.5 7.5 l -6.9 -6.85 l -7.45 7.5 z",
  },
  transliterative: {
    NRR: "M -14.7 -7.5 l 7.5 -7.5 l 8.05 8.1 l -7.5 7.45 l 6.95 6.95 l -7.5 7.5 l -8.1 -8.1 l 7.45 -7.55 l -6.85 -6.85 m 22.5 0.3 l 7.5 7.5 l -7.5 7.5 l -7.5 -7.5 l 7.5 -7.5 z",
    DSV: "M 14.7 7.5 l -7.5 7.5 l -8.05 -8.1 l 7.5 -7.45 l -6.95 -6.95 l 7.5 -7.5 l 8.1 8.1 l -7.45 7.55 l 6.85 6.85 m -22.5 -0.3 l -7.5 -7.5 l 7.5 -7.5 l 7.5 7.5 l -7.5 7.5 z",
    PNT: "M -7.5 -14.7 l -7.5 7.5 l 8.1 8.05 l 7.45 -7.5 l 6.95 6.95 l 7.5 -7.5 l -8.1 -8.1 l -7.55 7.45 l -6.85 -6.85 m 0.3 22.5 l 7.5 7.5 l 7.5 -7.5 l -7.5 -7.5 l -7.5 7.5 z",
    CGT: "M -15.6 6.3 l 7.5 7.5 l 7.5 -7.5 l -7.5 -7.5 l -7.5 7.5 m 31.2 -20.1 l -1.2 -1.2 l -15 15 l 6.3 6.3 l -7.5 7.5 l 1.2 1.2 l 15 -15 l -6.3 -6.3 l 7.5 -7.5 z",
    EXM: "M -6.3 15.6 l -7.5 -7.5 l 7.5 -7.5 l 7.5 7.5 l -7.5 7.5 m 20.1 -31.2 l 1.2 1.2 l -15 15 l -6.3 -6.3 l -7.5 7.5 l -1.2 -1.2 l 15 -15 l 6.3 6.3 l 7.5 -7.5 z",
    SPF: "M 13.8 -7.775 l -6.9 -6.9 l -7.55 7.45 l -6.85 -6.85 l -15 15 l 1.2 1.2 l 7.5 -7.5 l 6.9 6.85 l 7.45 -7.5 l 6.95 6.95 l 15 -15 l -1.2 -1.2 l -7.5 7.5 m -5.75 15.55 l -7.5 -7.5 l -7.5 7.5 l 7.5 7.5 l 7.5 -7.5 z",
  },
})

/** Information about a register character. */
export interface RegisterCharacter {
  /** The type of this register adjunct. */
  type?: Exclude<RegisterAdjunct, "END"> | undefined

  /** The mode of this register adjunct. */
  mode?: RegisterMode | undefined
}

/**
 * Writes a register adjunct in Ithkuil script.
 * @param props Properties modifying this register adjunct.
 * @returns The register adjunct as an SVG path.
 */
export function Register(props: RegisterCharacter) {
  return (
    <path d={REGISTERS[props.mode || "standard"][props.type || "NRR"]} />
  ) as SVGPathElement
}