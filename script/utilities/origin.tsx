export function getOrigin(path: string, offset = 0) {
  const el = (<path d={path} />) as SVGPathElement
  return el.getPointAtLength(offset)
}

export function Origin(props: {
  children: SVGElement
  color?: string
  offset?: number
  size?: number
}) {
  const d = props.children.getAttribute("d")

  if (!d) {
    return props.children
  }

  const origin = getOrigin(d, props.offset)

  props.children.setAttribute("d", "M " + origin.x + " " + origin.y + " z")

  return (
    <g
      stroke-width={props.size ?? 0.5}
      stroke-linecap="round"
      stroke={props.color || "blue"}
      opacity="0.5"
    >
      {props.children}
    </g>
  )
}
