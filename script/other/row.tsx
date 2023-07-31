import { AnchorX } from "../utilities/anchor.js"
import { Clone } from "../utilities/clone.js"
import { forceGetBBox, getBBox } from "../utilities/get-bbox.js"
import { doShapesIntersect } from "../utilities/intersection-check.js"
import { Translate } from "../utilities/translate.js"

const COMPACT_CHECKING_INTERVAL = 5

export function Row(props: {
  children?: SVGElement | SVGElement[] | undefined
  compact?: boolean
  space?: number
}) {
  const space = props.space ?? 10

  let row = (<g />) as SVGGElement

  let first, rest

  if (Array.isArray(props.children)) {
    ;[first, ...rest] = props.children
  } else {
    first = props.children
  }

  if (first) {
    row.appendChild(first)
  }

  if (props.compact) {
    outer: for (let el of rest || []) {
      el = <AnchorX at="l">{el}</AnchorX>

      const rowBox = getBBox(row)

      for (
        let x = -rowBox.width;
        x < rowBox.width;
        x += COMPACT_CHECKING_INTERVAL
      ) {
        if (
          !doShapesIntersect(
            <Translate
              x={rowBox.x + rowBox.width + x}
              y={0}
            >
              <Clone>{el}</Clone>
            </Translate>,
            row,
            space,
          )
        ) {
          row.appendChild(
            <Translate
              x={rowBox.x + rowBox.width + x}
              y={0}
            >
              {el}
            </Translate>,
          )

          continue outer
        }
      }

      row.appendChild(
        <Translate
          x={rowBox.x + rowBox.width + space}
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
