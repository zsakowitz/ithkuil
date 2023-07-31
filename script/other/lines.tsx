export function Lines(props: { width?: number; height?: number }) {
  const width = props.width ?? 250
  const height = props.height ?? 250

  return (
    <path
      d={`M -${width} 35 l ${2 * width} 0 M 0 -215 l 0 ${2 * height}
M -${width} 0 l ${2 * width} 0 M 0 -${height} l 0 ${2 * height}
M -${width} -35 l ${2 * width} 0 M 0 -285 l 0 ${2 * height}`}
      stroke="#ccc"
      stroke-width="0.5"
    />
  )
}
