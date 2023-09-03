import { deepFreeze, type BiasAdjunct } from "../../generate/index.js"
import { Anchor, Diacritic, Secondary, type ExtensionName } from "../index.js"

// We essentially treat bias adjuncts as specialized secondary characters. This
// lets us avoid recalculating the intersection points for each extension.

/** The extensions bias adjunct take. */
export const BIAS_EXTENSIONS = /* @__PURE__ */ deepFreeze([
  undefined,
  "l",
  "z",
  "s",
  "k",
  "g",
  "EXTENSION_GEMINATE",
  "CORE_GEMINATE",
  "d",
  "t",
  "š",
  "p",
  "x",
  "ř",
  "ţ",
  "f",
] satisfies (ExtensionName | undefined)[])

/** Information about a bias character. */
export interface BiasCharacter {
  /** Whether this character is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The bias to be shown. */
  readonly bias: BiasAdjunct
}

/**
 * This is required because MNF bias is treated as its old name, EXP in the
 * script.
 */
export const ALL_BIAS_ADJUNCTS_BY_SCRIPT_INDEX = /* @__PURE__ */ deepFreeze([
  "ACC",
  "ACH",
  "ADS",
  "ANN",
  "ANP",
  "APB",
  "APH",
  "ARB",
  "ATE",
  "CMD",
  "CNV",
  "COI",
  "CRP",
  "CRR",
  "CTP",
  "CTV",
  "DCC",
  "DEJ",
  "DES",
  "DFD",
  "DIS",
  "DLC",
  "DOL",
  "DPB",
  "DRS",
  "DUB",
  "EUH",
  "EUP",
  "EXA",
  "EXG",
  "MNF",
  "FOR",
  "FSC",
  "GRT",
  "IDG",
  "IFT",
  "IPL",
  "IPT",
  "IRO",
  "ISP",
  "IVD",
  "MAN",
  "OPT",
  "PES",
  "PPT",
  "PPX",
  "PPV",
  "PSC",
  "PSM",
  "RAC",
  "RFL",
  "RSG",
  "RPU",
  "RVL",
  "SAT",
  "SGS",
  "SKP",
  "SOL",
  "STU",
  "TRP",
  "VEX",
])

/**
 * Creates a bias character as a group of SVG paths.
 * @param props Information about the bias character.
 * @returns The constructed bias character.
 */
export function Bias(props: BiasCharacter): SVGGElement {
  const index = ALL_BIAS_ADJUNCTS_BY_SCRIPT_INDEX.indexOf(props.bias)

  if (index == -1) {
    return Secondary({
      handwritten: props.handwritten,
      core: "BIAS",
      rotated: true,
    })
  }

  const shape = BIAS_EXTENSIONS[index % 16]
  const column = Math.floor(index / 16)

  const g = Secondary({
    handwritten: props.handwritten,
    top: column % 2 ? shape : undefined,
    core: "BIAS",
    rotated: index < 32,
    bottom: column % 2 ? undefined : shape,
  })

  if (props.bias == "DCC") {
    g.appendChild(
      <Anchor
        at="cc"
        x={-12.5}
        y={-12.5}
      >
        <Diacritic
          handwritten={props.handwritten}
          name="DOT"
        />
      </Anchor>,
    )
  }

  if (props.bias == "PSM") {
    g.appendChild(
      <Anchor
        at="cc"
        x={12.5}
        y={-12.5}
      >
        <Diacritic
          handwritten={props.handwritten}
          name="DOT"
        />
      </Anchor>,
    )
  }

  return g
}
