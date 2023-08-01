export interface BreakCharacter {
  readonly size?: number
}

export function Break(props: BreakCharacter): SVGGElement {
  const size = props.size ?? 50

  return (
    <g>
      <path
        fill="transparent"
        d={`M -${size / 2} -35 v 70 h ${size} v -70 h -${size} z`}
      />
    </g>
  ) as SVGGElement
}
