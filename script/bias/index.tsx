import {
  ALL_BIAS_ADJUNCTS,
  deepFreeze,
  type BiasAdjunct,
} from "../../generate/index.js"
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
 * Creates a bias character as a group of SVG paths.
 * @param props Information about the bias character.
 * @returns The constructed bias character.
 */
export function Bias(props: BiasCharacter): SVGGElement {
  const index = (ALL_BIAS_ADJUNCTS.indexOf(props.bias) + 1 || 1) - 1

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
