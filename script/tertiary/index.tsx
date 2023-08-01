import { deepFreeze, type Level, type Valence } from "../../generate/index.js"
import {
  Anchor,
  AnchorX,
  Diacritic,
  getBBox,
  Row,
  type DiacriticName,
  type RowCompactModeOption,
} from "../index.js"
import { TERTIARY_SEGMENTS, type TertiarySegmentName } from "./segment.js"
import { ValenceSegment } from "./valence.js"

/** An object mapping levels to their corresponding diacritics. */
export const LEVEL_TO_DIACRITIC_MAP = /* @__PURE__ */ deepFreeze({
  MIN: "DOT",
  SBE: "HORIZ_WITH_TOP_LINE",
  IFR: "VERT_WITH_LEFT_LINE",
  DFC: "CURVE_TO_TOP",
  EQU: "DIAG_BAR",
  SUR: "CURVE_TO_BOTTOM",
  SPL: "VERT_WITH_RIGHT_LINE",
  SPQ: "HORIZ_WITH_BOTTOM_LINE",
  MAX: "HORIZ_BAR",
} satisfies Record<Level, DiacriticName>)

/** Information about a tertiary character. */
export interface TertiaryCharacter {
  /** The absolute level shown on the character. */
  readonly absoluteLevel?: Level | undefined

  /** The top segment of the character. */
  readonly top?: TertiarySegmentName | undefined

  /** The valence segment of the character. */
  readonly valence?: Valence | undefined

  /** The bottom segment of the character. */
  readonly bottom?: TertiarySegmentName | undefined

  /** The relative level shown on the character. */
  readonly relativeLevel?: Level | undefined

  /**
   * Whether compact mode should be used to place level diacritics, and options
   * applying to it if so.
   *
   * In compact mode, intersections are approximated so that letters appear
   * close together while still fully readable. Compact mode usually produces
   * better-looking output, but runs much slower.
   *
   * In traditional non-compact mode, the rightmost edge of a character and the
   * leftmost edge of the next character are placed with space between them.
   * However, this often leads to unusual-looking whitespace.
   */
  readonly compact?: RowCompactModeOption | undefined
}

/**
 * Renders a tertiary character as a group of SVG paths.
 * @param tertiary Information about the tertiary character.
 * @returns An `SVGGElement` containing the tertiary character's elements.
 */
export function Tertiary(tertiary: TertiaryCharacter) {
  let g = (<g />) as SVGGElement

  if (tertiary.top) {
    g.appendChild(
      <AnchorX
        at="c"
        y={-15}
        x={5}
      >
        <path d={TERTIARY_SEGMENTS[tertiary.top]} />
      </AnchorX>,
    )
  }

  g.appendChild(
    <AnchorX at="c">
      <ValenceSegment valence={tertiary.valence || "MNO"} />
    </AnchorX>,
  )

  if (tertiary.bottom) {
    g.appendChild(
      <Anchor
        at="tc"
        y={15}
        x={-5}
      >
        <path d={TERTIARY_SEGMENTS[tertiary.bottom]} />
      </Anchor>,
    )
  }

  if (tertiary.absoluteLevel) {
    if (!tertiary.top) {
      g.appendChild(
        <Anchor
          at="bc"
          y={-35}
        >
          <Diacritic name={LEVEL_TO_DIACRITIC_MAP[tertiary.absoluteLevel]} />
        </Anchor>,
      )
    } else if (tertiary.compact) {
      g = (
        <Row
          compact={tertiary.compact}
          intro={[...g.children] as SVGPathElement[]}
          vertical
          reverse
        >
          <AnchorX
            at="c"
            x={-2}
          >
            <Diacritic name={LEVEL_TO_DIACRITIC_MAP[tertiary.absoluteLevel]} />
          </AnchorX>
        </Row>
      ) as SVGGElement
    } else {
      const box = getBBox(g)

      g.appendChild(
        <Anchor
          at="bc"
          y={box.y - 10}
        >
          <Diacritic name={LEVEL_TO_DIACRITIC_MAP[tertiary.absoluteLevel]} />
        </Anchor>,
      )
    }
  }

  if (tertiary.relativeLevel) {
    if (!tertiary.bottom) {
      g.appendChild(
        <Anchor
          at="tc"
          y={35}
        >
          <Diacritic name={LEVEL_TO_DIACRITIC_MAP[tertiary.relativeLevel]} />
        </Anchor>,
      )
    } else if (tertiary.compact) {
      g = (
        <Row
          compact={tertiary.compact}
          intro={[...g.children] as SVGPathElement[]}
          vertical
        >
          <AnchorX
            at="c"
            x={-2}
          >
            <Diacritic name={LEVEL_TO_DIACRITIC_MAP[tertiary.relativeLevel]} />
          </AnchorX>
        </Row>
      ) as SVGGElement
    } else {
      const box = getBBox(g)

      g.appendChild(
        <Anchor
          at="tc"
          y={box.y + box.height + 10}
        >
          <Diacritic name={LEVEL_TO_DIACRITIC_MAP[tertiary.relativeLevel]} />
        </Anchor>,
      )
    }
  }

  return g
}
