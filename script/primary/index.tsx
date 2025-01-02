import {
  deepFreeze,
  deepFreezeAndNullPrototype,
  type Affiliation,
  type Configuration,
  type Context,
  type Essence,
  type Extension,
  type Function,
  type Perspective,
  type Specification,
  type Stem,
  type Version,
} from "../../generate/index.js"
import {
  EXTENSIONS,
  rotate180AndRotateStartingPoint,
  type ExtensionName,
} from "../index.js"
import { getBBox } from "../utilities/get-bbox.js"
import { Translate } from "../utilities/translate.js"
import { PrimaryBottomLeft } from "./bottom-left.js"
import { HANDWRITTEN_CORE_EXTENSIONS, PrimaryCore } from "./core.js"
import { PrimarySuperPosed } from "./super-posed.js"
import { PrimaryTopRight } from "./top-right.js"
import { PrimaryUnderPosed } from "./under-posed.js"

/** Information about a primary character. */
export interface PrimaryCharacter {
  /** Whether this item is handwritten. */
  readonly handwritten?: boolean | undefined

  /** Whether this primary character begins a sentence. */
  readonly isSentenceInitial?: boolean | undefined

  /** The specification of this character. */
  readonly specification?: Specification | undefined

  /** The context of this character. */
  readonly context?: Context | undefined

  /** The bottom value of this character. */
  readonly bottom?: "UNF/C" | "UNF/K" | "FRM" | 1 | 2 | undefined

  /** The perspective of this character. */
  readonly perspective?: Perspective | undefined

  /** The extension of this character. */
  readonly extension?: Extension | undefined

  /** The affiliation of this character. */
  readonly affiliation?: Affiliation | undefined

  /** The essence of this character. */
  readonly essence?: Essence | undefined

  /** The configuration of this character. */
  readonly configuration?: Configuration | undefined

  /** The function of this character. */
  readonly function?: Function | undefined

  /** The version of this character. */
  readonly version?: Version | undefined

  /** The stem of this character. */
  readonly stem?: Stem | undefined
}

const DIACRITIC_OFFSET = /* @__PURE__ */ deepFreezeAndNullPrototype({
  BSC: 0,
  CTE: 12.5,
  CSV: -2.5,
  OBJ: 5,
})

const HANDWRITTEN_DIACRITIC_OFFSET = /* @__PURE__ */ deepFreezeAndNullPrototype(
  {
    BSC: 0,
    CTE: 5,
    CSV: 0,
    OBJ: 0,
  },
)

/** An object mapping from perspective and extension into secondary extensions. */
export const PRIMARY_TOP_LEFT = /* @__PURE__ */ deepFreeze({
  M: {
    DEL: undefined,
    PRX: "s",
    ICP: "t",
    ATV: "d",
    GRA: "m",
    DPL: "n",
  },
  G: {
    DEL: "p",
    PRX: "g",
    ICP: "ž",
    ATV: "ḑ",
    GRA: "v",
    DPL: "x",
  },
  N: {
    DEL: "š",
    PRX: "EXTENSION_GEMINATE",
    ICP: "w",
    ATV: "h",
    GRA: "f",
    DPL: "ř",
  },
  A: {
    DEL: "b",
    PRX: "k",
    ICP: "c",
    ATV: "č",
    GRA: "ż",
    DPL: "j",
  },
} satisfies Record<Perspective, Record<Extension, ExtensionName | undefined>>)

/**
 * An object mapping from function, version, M/D, and stem into secondary
 * extensions.
 */
export const PRIMARY_BOTTOM_RIGHT = /* @__PURE__ */ deepFreeze({
  STA: {
    PRC: {
      M: ["b", undefined, "p", "š"],
      D: ["c", "z", "p_WITH_LINE", "w"],
    },
    CPT: {
      M: ["k", "l", "g", "EXTENSION_GEMINATE"],
      D: ["č", "r_FLIPPED", "g_WITH_LINE", "h"],
    },
  },
  DYN: {
    PRC: {
      M: ["d", "m", "CORE_GEMINATE", "t"],
      D: ["d_WITH_LINE", "n", "ň", "ž"],
    },
    CPT: {
      M: ["ţ", "s", "x", "f"],
      D: ["ḑ", "r", "ř", "v"],
    },
  },
} satisfies Record<
  Function,
  Record<
    Version,
    Record<
      "M" | "D",
      [ExtensionName, ExtensionName | undefined, ExtensionName, ExtensionName]
    >
  >
>)

/**
 * Assembles a primary character as an group of SVG paths.
 *
 * @param props Properties that modify the character.
 * @returns An `SVGGElement` containing the character.
 */
export function Primary(primary: PrimaryCharacter): SVGGElement {
  const specification = primary.specification || "BSC"
  const handwritten = !!primary.handwritten

  const core = PrimaryCore({ handwritten, specification })

  const coreBox = getBBox(core)

  const topLeft =
    PRIMARY_TOP_LEFT[primary.perspective || "M"][primary.extension || "DEL"]

  const bottomRight =
    PRIMARY_BOTTOM_RIGHT[primary.function || "STA"][primary.version || "PRC"][
      primary.configuration?.startsWith("D") ? "D" : "M"
    ][primary.stem ?? 1]

  const topLeftDirection =
    handwritten ? HANDWRITTEN_CORE_EXTENSIONS[specification][0] : "diag"

  const bottomRightDirection =
    handwritten ? HANDWRITTEN_CORE_EXTENSIONS[specification][1] : "diag"

  return (
    <g>
      {core}

      {topLeft && (
        <Translate
          x={coreBox.x + (handwritten ? 0 : 7.5)}
          y={-35}
        >
          <path d={EXTENSIONS[topLeft][topLeftDirection]} />
        </Translate>
      )}

      {bottomRight && (
        <Translate
          x={coreBox.x + coreBox.width - (handwritten ? 0 : 7.5)}
          y={35}
        >
          <path
            d={rotate180AndRotateStartingPoint(
              EXTENSIONS[bottomRight][bottomRightDirection],
            )}
          />
        </Translate>
      )}

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate
        x={
          coreBox.x -
          (handwritten ? HANDWRITTEN_DIACRITIC_OFFSET : DIACRITIC_OFFSET)[
            specification
          ]
        }
        y={35}
      >
        {PrimaryBottomLeft(primary)}
      </Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate
        x={
          coreBox.x +
          coreBox.width +
          (handwritten ? HANDWRITTEN_DIACRITIC_OFFSET : DIACRITIC_OFFSET)[
            specification
          ]
        }
        y={-35}
      >
        {PrimaryTopRight(primary)}
      </Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate y={-45}>{PrimarySuperPosed(primary)}</Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate
        x={-7.5}
        y={45}
      >
        {PrimaryUnderPosed(primary)}
      </Translate>
    </g>
  ) as SVGGElement
}
