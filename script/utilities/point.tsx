export function Point(props: {
  x: number
  y: number
  color?: string
  offset?: number
  size?: number
}) {
  return (
    <g
      stroke-width={props.size ?? 0.5}
      stroke-linecap="round"
      stroke={props.color || "blue"}
      opacity="0.5"
    >
      <path d={"M " + props.x + " " + props.y + " z"} />
    </g>
  )
}
