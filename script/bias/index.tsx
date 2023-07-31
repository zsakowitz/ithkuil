import { ALL_BIAS_ADJUNCTS, deepFreeze, type BiasAdjunct } from "../../index.js"
import {
  Anchor,
  Diacritic,
  Secondary,
  debug,
  type ExtensionName,
} from "../index.js"

// We essentially treat bias adjuncts as specialized secondary characters. This
// lets us avoid recalculating the intersection points for each extension.

/** The extensions bias adjunct take. */
export const BIAS_EXTENSIONS = deepFreeze([
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

/**
 * Creates a bias adjunct as a group of SVG paths.
 * @param props Information about the bias adjunct.
 * @returns The constructed bias adjunct.
 */
export function Bias(props: {
  /** The bias to be shown. */
  readonly bias: BiasAdjunct
}) {
  debug(props.bias)

  const index = (ALL_BIAS_ADJUNCTS.indexOf(props.bias) + 1 || 1) - 1

  const shape = BIAS_EXTENSIONS[index % 16]
  const column = Math.floor(index / 16)

  const g = Secondary({
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
        <Diacritic name="DOT" />
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
        <Diacritic name="DOT" />
      </Anchor>,
    )
  }

  return g
}
