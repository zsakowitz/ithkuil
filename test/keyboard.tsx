import type { JSX } from "@zsnout/ithkuil/script/jsx-runtime"
import { deepFreeze, type Specification } from "../generate/index.js"
import {
  Anchor,
  HANDWRITTEN_CORES,
  HANDWRITTEN_DIACRITICS,
  HANDWRITTEN_PRIMARY_CORES,
  HANDWRITTEN_REGISTERS,
  HANDWRITTEN_VALENCE,
  Secondary,
  Tertiary,
  Translate,
  type CoreName,
  type DiacriticName,
  type ExtensionName,
} from "../script/index.js"
import { scale } from "../script/utilities/scale.js"

document.body.append(
  <script>
    {`new EventSource("/esbuild").addEventListener("change", () =>
    location.reload())`}
  </script>,
)

const img = document.createElement("img")

img.src =
  "https://m.media-amazon.com/images/I/610wqKEjAJL._AC_UF894,1000_QL80_.jpg"

const SCALING_FACTOR = 0.75
const KEY_WIDTH = 220 * SCALING_FACTOR
const KEY_HEIGHT = 210 * SCALING_FACTOR
const KEY_MARGIN = 10 * SCALING_FACTOR

type Key =
  | [number, number, "core", CoreName, CoreName?]
  | [number, number, "spec", Specification, Specification]
  | [number, number, "diacritic", DiacriticName, DiacriticName?]
  | [number, number, "ext", ExtensionName, ExtensionName?]
  | [number, number, "other", string]

const KEYS = deepFreeze({
  "`": [37, 212, "diacritic", "TWO_PART_DIAG_BAR", "CURVE_TO_BOTTOM_WITH_LINE"],
  "1": [282, 212, "diacritic", "DOT"],
  "2": [525, 212, "diacritic", "HORIZ_WITH_BOTTOM_LINE"],
  "3": [769, 212, "diacritic", "VERT_WITH_RIGHT_LINE"],
  "4": [1012, 212, "diacritic", "CURVE_TO_TOP"],
  "5": [1255, 212, "diacritic", "DIAG_BAR"],
  "6": [1497, 212, "diacritic", "CURVE_TO_BOTTOM"],
  "7": [1740, 212, "diacritic", "VERT_WITH_LEFT_LINE"],
  "8": [1983, 212, "diacritic", "HORIZ_WITH_TOP_LINE"],
  "9": [2226, 212, "diacritic", "HORIZ_BAR"],
  "0": [2468, 212, "diacritic", "VERT_BAR"],
  "-": [2712, 212, "diacritic", "CURVE_TO_LEFT", "CURVE_TO_LEFT_WITH_DOT"],
  "=": [2955, 212, "diacritic", "CURVE_TO_RIGHT", "CURVE_TO_RIGHT_WITH_DOT"],

  Q: [400, 445, "core", "p", "b"],
  W: [645, 445, "core", "t", "d"],
  E: [888, 445, "core", "k", "g"],
  R: [1132, 445, "core", "f", "v"],
  T: [1375, 445, "core", "ţ", "ḑ"],
  Y: [1618, 445, "core", "s", "z"],
  U: [1860, 445, "core", "š", "ž"],
  I: [2103, 445, "core", "ç", "h"],
  O: [2346, 445, "core", "c", "ż"],
  P: [2589, 445, "core", "č", "j"],
  "[": [2831, 445, "ext", "d_WITH_LINE", "g_WITH_LINE"],
  "]": [3075, 445, "ext", "'"],
  "|": [3318, 445, "ext", "EJECTIVE", "VELARIZED"],

  A: [461, 681, "other", "valence"], // valence
  S: [706, 681, "other", "phase"], // phase
  D: [949, 681, "other", "rotate"], // rotate
  F: [1193, 681, "spec", "BSC", "OBJ"],
  G: [1436, 681, "other", "up"], // up/left
  H: [1679, 681, "other", "down"], // down/right
  J: [1921, 681, "spec", "CTE", "CSV"],
  K: [2164, 681, "core", "STRESSED_SYLLABLE_PLACEHOLDER"],
  L: [2407, 681, "other", "effect"], // effect
  ";": [2650, 681, "other", "aspect"], // aspect
  "'": [2892, 681, "other", "register"], // register

  Z: [582, 914, "core", "l", "ļ"],
  X: [827, 914, "core", "x"],
  C: [1070, 914, "ext", "w", "y"],
  V: [1314, 914, "core", "m"],
  B: [1557, 914, "ext", "CORE_GEMINATE", "EXTENSION_GEMINATE"],
  N: [1800, 914, "core", "n", "ň"],
  M: [2042, 914, "core", "STANDARD_PLACEHOLDER", "TONAL_PLACEHOLDER"],
  ",": [2285, 914, "core", "ALPHABETIC_PLACEHOLDER", "BIAS"],
  ".": [2528, 914, "core", "r", "ř"],
  "/": [2771, 914, "ext", "p_WITH_LINE", "r_FLIPPED"],
} satisfies Record<string, Key>)

function Handwritten(props: {
  stroke?: string
  strokeWidth?: number
  children: JSX.Element | (JSX.Element | null | undefined)[] | null | undefined
}) {
  return (
    <g
      stroke-width={props.strokeWidth ?? 5}
      fill="none"
      stroke={props.stroke || "black"}
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {props.children}
    </g>
  )
}

function Calligraphic(props: {
  fill?: string
  children: JSX.Element | (JSX.Element | null | undefined)[] | null | undefined
}) {
  return (
    <g
      stroke-width={0}
      fill={props.fill ?? "black"}
    >
      {props.children}
    </g>
  )
}

const svg = (
  <svg viewBox={`0 0 ${3576 * SCALING_FACTOR} ${1400 * SCALING_FACTOR}`}>
    {Object.values(KEYS).map(([x, y, type, a, b]) => (
      <Translate
        x={x * SCALING_FACTOR}
        y={y * SCALING_FACTOR}
      >
        <g fill="white">
          <path
            d={`M ${KEY_MARGIN} ${KEY_MARGIN} h ${
              KEY_WIDTH - 2 * KEY_MARGIN
            } v ${KEY_HEIGHT - 2 * KEY_MARGIN} h ${2 * KEY_MARGIN - KEY_WIDTH}`}
            opacity={1}
            fill="rgb(37,37,41)"
          />

          <g>
            <Handwritten
              stroke="white"
              strokeWidth={5}
            >
              <Translate
                x={KEY_WIDTH / 2}
                y={KEY_HEIGHT / 2}
              >
                {type == "ext" ? (
                  <Secondary
                    bottom={a}
                    core="STRESSED_SYLLABLE_PLACEHOLDER"
                    handwritten
                  />
                ) : type == "core" ? (
                  <Anchor at="cc">
                    <path d={HANDWRITTEN_CORES[a].shape} />
                  </Anchor>
                ) : type == "diacritic" ? (
                  b ? (
                    <Anchor at="cc">
                      <g>
                        <Anchor at="bc">
                          <path d={scale(HANDWRITTEN_DIACRITICS[b], 2)} />
                        </Anchor>

                        <Anchor
                          at="tc"
                          y={a == "TWO_PART_DIAG_BAR" ? 20 : 40}
                        >
                          <path d={scale(HANDWRITTEN_DIACRITICS[a], 2)} />
                        </Anchor>
                      </g>
                    </Anchor>
                  ) : (
                    <Anchor at="cc">
                      <path d={scale(HANDWRITTEN_DIACRITICS[a], 2)} />
                    </Anchor>
                  )
                ) : type == "spec" ? (
                  <Anchor at="cc">
                    <path d={HANDWRITTEN_PRIMARY_CORES[a]} />
                  </Anchor>
                ) : a == "register" ? (
                  <Anchor at="cc">
                    <path d={scale(HANDWRITTEN_REGISTERS.alphabetic.NRR, 2)} />
                  </Anchor>
                ) : a == "valence" ? (
                  <Anchor at="cc">
                    <path d={HANDWRITTEN_VALENCE.MNO} />
                  </Anchor>
                ) : a == "phase" ? (
                  <Tertiary
                    top="PUN"
                    handwritten
                  />
                ) : a == "effect" ? (
                  <Tertiary
                    top="1:BEN"
                    handwritten
                  />
                ) : a == "aspect" ? (
                  <Tertiary
                    top="RTR"
                    handwritten
                  />
                ) : a == "up" ? (
                  <Anchor at="cc">
                    <path d="M 0 0 l 20 -20 l 20 20" />
                  </Anchor>
                ) : a == "down" ? (
                  <Anchor at="cc">
                    <path d="M 0 0 l 20 20 l 20 -20" />
                  </Anchor>
                ) : a == "rotate" ? (
                  <Anchor at="cc">
                    <path d="M 0 0 a 30 30 0 1 0 -30 -30 l -10 -20 m 10 20 l 20 -10" />
                  </Anchor>
                ) : (
                  <g />
                )}
              </Translate>
            </Handwritten>
          </g>
        </g>
      </Translate>
    ))}
  </svg>
)

// @ts-ignore
img.style =
  // @ts-ignore
  svg.style = `display: block; position: absolute; top: 0; left: 0; width: ${
    3576 * SCALING_FACTOR
  }px; height: ${1400 * SCALING_FACTOR}px`

document.body.append(img, svg)
