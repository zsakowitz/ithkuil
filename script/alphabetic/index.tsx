import {
  EXTENSIONS,
  type Core,
  type ExtensionName,
  HANDWRITTEN_CORES,
  CORES,
} from "../index.js"
import { Diacritic, type DiacriticName } from "../other/diacritic.js"
import { Row } from "../other/row.js"
import { Anchor } from "../utilities/anchor.js"
import { getBBox } from "../utilities/get-bbox.js"
import { rotate180AndRotateStartingPoint } from "../utilities/rotate-180.js"
import { Translate } from "../utilities/translate.js"

/** Information about an advanced alphabetic character. */
export interface AdvancedAlphabeticCharacter {
  /** Whether this character is handwritten. */
  readonly handwritten?: boolean | undefined

  /** The top extension of the character. */
  readonly top?: ExtensionName | undefined

  /** The bottom extension of the character. */
  readonly bottom?: ExtensionName | undefined

  /** The diacritic superposed above the character. */
  readonly superposed?: DiacriticName | undefined

  /** The diacritic underposed below the character. */
  readonly underposed?: DiacriticName | undefined

  /** The diacritic posed to the left of the character. */
  readonly left?: DiacriticName | undefined

  /** The diacritic posed to the right of the character. */
  readonly right?: DiacriticName | undefined
}

function noop(x: string) {
  return x
}

function Extension({
  handwritten,
  name,
  direction,
  reversed,
}: {
  readonly handwritten?: boolean | undefined
  readonly name: ExtensionName
  readonly direction: "vert" | "diag" | "horiz"
  readonly reversed: boolean
}) {
  const top = EXTENSIONS[name]

  const check = reversed ? rotate180AndRotateStartingPoint : noop

  if (direction == "horiz") {
    return <path d={check(handwritten ? top.horiz2 : top.horiz)} />
  }

  if (direction == "vert") {
    return <path d={check(handwritten ? top.vert2 : top.vert)} />
  }

  if (direction == "diag") {
    return <path d={check(top.diag)} />
  }

  throw new Error("Invalid direction: " + direction + ".")
}

function TopExtension({
  core,
  coreShape,
  handwritten,
  name,
}: {
  readonly handwritten?: boolean | undefined
  readonly core: Core
  readonly coreShape: SVGPathElement
  readonly name: ExtensionName
}) {
  return (
    <g>
      <Translate
        x={
          core.top[1] +
          (handwritten ? 0
          : core.top[2] ? -10
          : 0)
        }
        y={
          getBBox(coreShape).y +
          (handwritten ? 0
          : core.top[2] ? 10
          : 0)
        }
      >
        <Extension
          name={name}
          handwritten={handwritten}
          direction={core.top[0]}
          reversed={
            handwritten ?
              (core.top[0] == "horiz") == !core.top[2]
            : !!core.top[2]
          }
        />
      </Translate>
    </g>
  )
}

function BottomExtension({
  core,
  coreShape,
  handwritten,
  name,
}: {
  readonly handwritten?: boolean | undefined
  readonly core: Core
  readonly coreShape: SVGPathElement
  readonly name: ExtensionName
}) {
  const reversed = !core.bottom[2]

  return (
    <g>
      <Translate
        x={
          core.bottom[1] +
          (handwritten ? 0
          : reversed ? 0
          : 10)
        }
        y={
          getBBox(coreShape).y +
          getBBox(coreShape).height +
          (handwritten ? 0
          : reversed ? 0
          : -10)
        }
      >
        <Extension
          name={name}
          direction={core.bottom[0]}
          handwritten={handwritten}
          reversed={reversed}
        />
      </Translate>
    </g>
  )
}

/**
 * Assembles an advanced alphabetic character as an group of SVG paths.
 * @param alphabetic Properties that modify the character.
 * @returns An `SVGGElement` containing the character.
 */
export function AdvancedAlphabetic(
  alphabetic: AdvancedAlphabeticCharacter,
): SVGGElement {
  const handwritten = !!alphabetic.handwritten

  const core = (handwritten ? HANDWRITTEN_CORES : CORES).TONAL_PLACEHOLDER

  const coreShape = (<path d={core.shape} />) as SVGPathElement

  let main = (
    <g>
      {coreShape}

      {alphabetic.top ?
        <TopExtension
          core={core}
          coreShape={coreShape}
          handwritten={handwritten}
          name={alphabetic.top}
        />
      : undefined}

      {alphabetic.bottom ?
        <BottomExtension
          core={core}
          coreShape={coreShape}
          handwritten={handwritten}
          name={alphabetic.bottom}
        />
      : undefined}
    </g>
  ) as SVGGElement

  if (alphabetic.superposed) {
    const diacritic = (
      <Anchor
        at="bc"
        x={alphabetic.handwritten ? 7.5 : 10}
        y={-45}
      >
        <Diacritic
          handwritten={handwritten}
          name={alphabetic.superposed}
        />
      </Anchor>
    )

    main.appendChild(diacritic)
  }

  if (alphabetic.underposed) {
    const diacritic = (
      <Anchor
        at="tc"
        x={alphabetic.handwritten ? -7.5 : -10}
        y={45}
      >
        <Diacritic
          handwritten={handwritten}
          name={alphabetic.underposed}
        />
      </Anchor>
    )

    main.appendChild(diacritic)
  }

  if (alphabetic.right) {
    main = (
      <Row
        compact={true}
        space={handwritten ? 15 : 10}
        intro={[...main.querySelectorAll("path")]}
      >
        <Anchor at="cl">
          <Diacritic
            handwritten={handwritten}
            name={alphabetic.right}
          />
        </Anchor>
      </Row>
    ) as SVGGElement
  }

  if (alphabetic.left) {
    main = (
      <Row
        compact={true}
        space={handwritten ? 15 : 10}
        reverse
        intro={[...main.querySelectorAll("path")]}
      >
        <Anchor at="cr">
          <Diacritic
            handwritten={handwritten}
            name={alphabetic.left}
          />
        </Anchor>
      </Row>
    ) as SVGGElement
  }

  return main
}
