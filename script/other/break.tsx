/** Information describing a break character. */
export interface BreakCharacter {
  /** The width of this character. */
  readonly size?: number | undefined
}

/**
 * Constructs a `BreakCharacter`.
 * @param props Properties modifying this character's behavior.
 * @returns An `SVGGElement` representing the character.
 */
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
