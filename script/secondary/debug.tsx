import { CORES } from "./core.js"

const WIDTH = 10
const LENGTH = 20

export function DebugCore(props: { letter: keyof typeof CORES }) {
  const {
    shape,
    top: [top, topX],
    bottom: [bottom, bottomX],
  } = CORES[props.letter]

  return (
    <g>
      <path d={shape} />

      <path
        d={
          "M " +
          topX +
          " -35" +
          (top == "horiz"
            ? ` l ${LENGTH} 0`
            : top == "reverse_horiz"
            ? ` l -${LENGTH} 0`
            : top == "vert"
            ? ` l 0 -${LENGTH}`
            : ` l -${LENGTH / Math.SQRT2} -${LENGTH / Math.SQRT2}`)
        }
        stroke="red"
        stroke-linecap="round"
        stroke-width={WIDTH}
        opacity={0.2}
      />

      <path
        d={"M " + topX + " -35 z"}
        stroke="red"
        stroke-linecap="round"
        stroke-width={WIDTH}
      />

      <path
        d={
          "M " +
          bottomX +
          " 35" +
          (bottom == "horiz"
            ? ` l ${LENGTH} 0`
            : top == "reverse_horiz"
            ? ` l -${LENGTH} 0`
            : bottom == "vert"
            ? ` l 0 ${LENGTH}`
            : ` l ${LENGTH / Math.SQRT2} ${LENGTH / Math.SQRT2}`)
        }
        stroke="blue"
        stroke-linecap="round"
        stroke-width={WIDTH}
        opacity={0.2}
      />

      <path
        d={"M " + bottomX + " 35 z"}
        stroke="blue"
        stroke-linecap="round"
        stroke-width={WIDTH}
      />
    </g>
  )
}
