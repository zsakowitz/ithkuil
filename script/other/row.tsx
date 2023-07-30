import { AnchorX } from "../utilities/anchor.js"
import { forceGetBBox, getBBox } from "../utilities/get-bbox.js"
import { Point } from "../utilities/point.js"
import { Translate } from "../utilities/translate.js"
import { getVerticesOf } from "../utilities/vertices.js"

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

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

  function getRightmostPoint(): [x: number, y: number] {
    const mostRecentInsertion = row.children[row.children.length - 1]

    if (!mostRecentInsertion) {
      return [0, 0]
    }

    const paths = row.getElementsByTagName("path")

    let rightmostPoint: [x: number, y: number] = [-Infinity, 0]

    for (const path of paths) {
      const d = path.getAttribute("d") || ""

      for (const vertex of getVerticesOf(d)) {
        if (vertex[0] > rightmostPoint[0]) {
          rightmostPoint = vertex
        }
      }
    }

    return rightmostPoint
  }

  if (props.compact) {
    for (let el of rest || []) {
      el = <AnchorX at="l">{el}</AnchorX>

      const rightmostPoint = getRightmostPoint()

      row.appendChild(
        <Point
          x={rightmostPoint[0]}
          y={rightmostPoint[1]}
        />,
      )

      const rowBox = getBBox(row)

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
