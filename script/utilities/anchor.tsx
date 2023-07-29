import { getBBox } from "./get-bbox.js"
import { Translate } from "./translate.js"

export type AnchorLocation =
  | "tl"
  | "tc"
  | "tr"
  | "cl"
  | "cc"
  | "cr"
  | "bl"
  | "bc"
  | "br"

export function Anchor(props: {
  at: AnchorLocation
  children: SVGElement
  x?: number
  y?: number
}) {
  const children =
    props.children instanceof SVGGraphicsElement
      ? props.children
      : ((<g>{props.children}</g>) as SVGGElement)

  const box = getBBox(children)

  const y = props.at[0] as "t" | "c" | "b"
  const x = props.at[1] as "l" | "c" | "r"

  return (
    <Translate
      x={
        (x == "l"
          ? -box.x
          : x == "r"
          ? -box.x - box.width
          : -box.x - box.width / 2) + (props.x ?? 0)
      }
      y={
        (y == "t"
          ? -box.y
          : y == "b"
          ? -box.y - box.height
          : -box.y - box.height / 2) + (props.y ?? 0)
      }
    >
      {children}
    </Translate>
  )
}
