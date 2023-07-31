import { AnchorX } from "../utilities/anchor.js"
import { Clone } from "../utilities/clone.js"
import { debug } from "../utilities/debug.js"
import { forceGetBBox, getBBox } from "../utilities/get-bbox.js"
import { doShapesIntersect } from "../utilities/intersection-check.js"
import { Translate } from "../utilities/translate.js"

export function Row(props: {
  children?: SVGElement | SVGElement[] | undefined
  intro?: SVGElement | SVGElement[]
  compact?: boolean
  space?: number
  baseSpacingInterval?: number
  spacingImprovements?: number
}) {
  const INITIAL_CHECKING_INTERVAL = Math.abs(props.baseSpacingInterval || 10)
  const SPACING_IMPROVEMENT_COUNT = props.spacingImprovements ?? 5

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
        <Translate
          x={comparedBox.x + comparedBox.width + x}
          y={0}
        >
          <Clone>{el}</Clone>
        </Translate>
      )

      for (
        let x = -comparedBox.width;
        x < comparedBox.width;
        x += CHECKING_INTERVAL
      ) {
        if (!doShapesIntersect(makeShape(x), compared, space)) {
          // intersects at lower
          let lower = x - CHECKING_INTERVAL

          // does not intersect at upper
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
        <Translate
          x={comparedBox.x + comparedBox.width + space}
          y={0}
        >
          {el}
        </Translate>,
      )

      // const box = getBBox(g)
      // const elBox = forceGetBBox(el)
      // const right = elBox.x + elBox.width

      // const paths = [...el.getElementsByTagName("path")]
      // if (el instanceof SVGPathElement) paths.push(el)

      // let x = elBox.x

      // outer: for (; x <= right; x += 0.1) {
      //   const point = svg.createSVGPoint()
      //   point.x = x
      //   point.y = rightmostPoint[1]

      //   for (const path of paths) {
      //     if (path.isPointInFill(point)) {
      //       break outer
      //     }
      //   }
      // }

      // g.insertBefore(
      //   <Translate
      //     y={0}
      //     x={box.x + box.width - elBox.x - x + space * 1.414}
      //   >
      //     {el}
      //   </Translate>,
      //   g.children[0] || null,
      // )
    }
  } else {
    for (const el of rest || []) {
      const box = getBBox(row)

      row.appendChild(
        <Translate
          y={0}
          x={box.x + box.width - forceGetBBox(el).x + space}
        >
          {el}
        </Translate>,
      )
    }
  }

  return row
}
