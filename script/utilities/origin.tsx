export function Origin(props: { children: SVGElement }) {
  const d = props.children.getAttribute("d")

  if (!d) {
    return props.children
  }

  props.children.setAttribute("d", d.split(" ", 3).join(" ") + " z")

  return (
    <g
      stroke-width="0.5"
      stroke-linecap="round"
      stroke="blue"
      opacity="0.5"
    >
      {props.children}
    </g>
  )
}
