const firstMoveRegex = /^M\s+([-.\d]+)\s+([-.\d]+)/

export function Translate(props: {
  children: SVGElement | SVGElement[]
  x: number
  y: number
}) {
  if (props.children instanceof SVGPathElement) {
    const d = props.children.getAttribute("d")

    if (d && firstMoveRegex.test(d)) {
      props.children.setAttribute(
        "d",
        d.replace(
          firstMoveRegex,
          (_, x: string, y: string) => `M ${+x + props.x} ${+y + props.y}`,
        ),
      )

      return props.children
    }

    if (!d) {
      return props.children
    }
  }

  return <g transform={`translate(${props.x},${props.y})`}>{props.children}</g>
}
