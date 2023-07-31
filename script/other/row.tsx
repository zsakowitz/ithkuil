import { AnchorX } from "../utilities/anchor.js"
import { Clone } from "../utilities/clone.js"
import { debug } from "../utilities/debug.js"
import { forceGetBBox, getBBox } from "../utilities/get-bbox.js"
import { doShapesIntersect } from "../utilities/intersection-check.js"
import { Translate } from "../utilities/translate.js"

/** Properties that modify the output of a `Row`. */
export interface RowProps {
  /** The element(s) to be arranged. */
  children?: SVGElement | SVGElement[] | undefined

  /**
   * Whether compact mode should be used, and options applying to it if so.
   *
   * In compact mode, intersections are approximated so that letters appear
   * close together while still fully readable. Compact mode usually produces
   * better-looking output, but runs much slower.
   *
   * In traditional non-compact mode, the rightmost edge of a character and the
   * leftmost edge of the next character are placed with space between them.
   * However, this often leads to unusual-looking whitespace.
   */
  compact?:
    | {
        /**
         * The interval to start approximations with when finding intersections in
         * compact mode. Lower values give more precision but slower performance,
         * with both inversely proportional to the value of this property.
         *
         * For example, a value of `2` will take five times longer but give five
         * times better results than a value of `10`.
         *
         * It is recommended to use values no smaller than `1`. If additional
         * precision is needed, adjust `spacingImprovements` instead; it has much
         * better performance.
         *
         * @default 10
         */
        baseSpacingInterval?: number

        /**
         * The number of improvements to make when finding intersections in compact
         * mode. Higher values give exponentially more precision but linearly slower
         * performance.
         *
         * For example, a value of `6` will give 4 times better results than a value
         * of `2`, but will take three times as long.
         *
         * It is recommended to use values no larger than `10`, as doing so will
         * result in changes so small they are hardly visible to the human eye.
         *
         * @default 5
         */
        spacingImprovements?: number
      }
    | (boolean & {
        baseSpacingInterval?: undefined
        spacingImprovements?: undefined
      })
    | undefined

  /** Elements which should precede the `children`. */
  intro?: SVGElement | SVGElement[] | undefined

  /**
   * The amount of space between elements.
   *
   * @default 10
   */
  space?: number | undefined
}

/**
 * Combines several shapes into a single row.
 * @param props Properties that modify the output of this `Row`.
 * @returns An `SVGGElement` containing the elements.
 */
export function Row(props: RowProps): SVGGElement {
  const INITIAL_CHECKING_INTERVAL = Math.abs(
    props.compact?.baseSpacingInterval || 10,
  )

  const SPACING_IMPROVEMENT_COUNT = props.compact?.spacingImprovements ?? 5

  const space = props.space ?? 10

  let row = (<g />) as SVGGElement

  let first
  let rest: SVGElement[] | undefined

  if (Array.isArray(props.children)) {
    ;[first, ...rest] = props.children
  } else {
    first = props.children
  }

  if (props.intro) {
    if (Array.isArray(props.intro)) {
      row.append(...props.intro)
    } else {
      row.append(props.intro)
    }

    if (first) {
      ;(rest ??= []).unshift(first)
    }
  } else if (first) {
    row.appendChild(first)
  }

  if (props.compact) {
    outer: for (const el of rest || []) {
      AnchorX({ at: "l", children: el })

      const comparedBase =
        el == rest![0] ? row : row.children[row.children.length - 1] || row

      const compared =
        comparedBase instanceof SVGGraphicsElement
          ? comparedBase
          : ((<g>{comparedBase as any}</g>) as SVGGElement)

      const comparedBox = getBBox(compared)

      let CHECKING_INTERVAL = INITIAL_CHECKING_INTERVAL

      const makeShape = (x: number) => (
        <Translate x={comparedBox.x + comparedBox.width + x}>
          <Clone>{el}</Clone>
        </Translate>
      )

      for (
        let x = -comparedBox.width;
        x < comparedBox.width;
        x += CHECKING_INTERVAL
      ) {
        if (!doShapesIntersect(makeShape(x), compared, space)) {
          // Intersects at lower bound.
          let lower = x - CHECKING_INTERVAL

          // Does not intersect at upper bound.
          let upper = x

          for (let i = 0; i < SPACING_IMPROVEMENT_COUNT; i++) {
            const x = (lower + upper) / 2

            if (doShapesIntersect(makeShape(x), compared, space)) {
              lower = x
            } else {
              upper = x
            }
          }

          const position = (lower + upper) / 2

          row.appendChild(makeShape(position))

          continue outer
        }
      }

      debug("hi")

      row.appendChild(
        <Translate x={comparedBox.x + comparedBox.width + space}>
          {el}
        </Translate>,
      )
    }
  } else {
    for (const el of rest || []) {
      const box = getBBox(row)

      row.appendChild(
        <Translate x={box.x + box.width - forceGetBBox(el).x + space}>
          {el}
        </Translate>,
      )
    }
  }

  return row
}
