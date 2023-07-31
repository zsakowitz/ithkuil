import { Diacritic, type DiacriticName } from "../other/diacritic.js"
import { Row } from "../other/row.js"
import { Anchor } from "../utilities/anchor.js"
import { getBBox } from "../utilities/get-bbox.js"
import { rotate180AndRotateStartingPoint } from "../utilities/rotate-180.js"
import { Translate } from "../utilities/translate.js"
import { CORES, type Core, type CoreName } from "./core.js"
import { EXTENSIONS, type ExtensionName } from "./extension.js"

/** Information about a secondary character. */
export interface SecondaryCharacter {
  /** The top extension of the character. */
  readonly top?: ExtensionName | undefined

  /**
   * The core shape of the character.
   *
   * @default "STANDARD_PLACEHOLDER"
   */
  readonly core?: CoreName | undefined

  /** Whether the core shape should be rotated. */
  readonly rotated?: boolean | undefined

  /** The bottom extension of the character. */
  readonly bottom?: ExtensionName | undefined

  /** The diacritic superposed above the character. */
  readonly superposed?: DiacriticName | undefined

  /** The diacritic posed to the right of the character. */
  readonly right?: DiacriticName | undefined

  /** The diacritic underposed below the character. */
  readonly underposed?: DiacriticName | undefined
}

function noop(x: string) {
  return x
}

function Extension({
  name,
  direction,
  reversed,
}: {
  name: keyof typeof EXTENSIONS
  direction: "vert" | "diag" | "horiz"
  reversed: boolean
}) {
  const top = EXTENSIONS[name]

  const check = reversed ? rotate180AndRotateStartingPoint : noop

  if (direction == "horiz") {
    return <path d={check(top.horiz)} />
  }

  if (direction == "vert") {
    return <path d={check(top.vert)} />
  }

  if (direction == "diag") {
    return <path d={check(top.diag)} />
  }

  return <path />
}

function TopExtension({
  core,
  coreShape,
  name,
}: {
  core: Core
  coreShape: SVGPathElement
  name: ExtensionName
}) {
  return (
    <Translate
      x={core.top[1] + (core.top[2] ? -10 : 0)}
      y={getBBox(coreShape).y + (core.top[2] ? 10 : 0)}
    >
      <Extension
        name={name}
        direction={core.top[0]}
        reversed={!!core.top[2]}
      />
    </Translate>
  )
}

function BottomExtension({
  core,
  coreShape,
  name,
}: {
  core: Core
  coreShape: SVGPathElement
  name: ExtensionName
}) {
  const reversed = !core.bottom[2]

  return (
    <Translate
      x={core.bottom[1] + (reversed ? 0 : 10)}
      y={
        getBBox(coreShape).y + getBBox(coreShape).height + (reversed ? 0 : -10)
      }
    >
      <Extension
        name={name}
        direction={core.bottom[0]}
        reversed={reversed}
      />
    </Translate>
  )
}

function rotate(core: Core): Core {
  return {
    top: [
      core.bottom[0],
      -core.bottom[1],
      (core.bottom[0] == "horiz") === !!core.bottom,
    ],
    bottom: [core.top[0], -core.top[1], !core.top],
    shape: rotate180AndRotateStartingPoint(core.shape),
  }
}

/**
 * Assembles a secondary character as an group of SVG paths.
 * @param secondary Properties that modify the character.
 * @returns An `SVGGElement` containing the character.
 */
export function Secondary(secondary: SecondaryCharacter) {
  const core = secondary.rotated
    ? rotate(CORES[secondary.core || "STANDARD_PLACEHOLDER"])
    : CORES[secondary.core || "STANDARD_PLACEHOLDER"]

  const coreShape = (<path d={core.shape} />) as SVGPathElement

  let main = (
    <g>
      {coreShape}

      {secondary.top ? (
        <TopExtension
          core={core}
          coreShape={coreShape}
          name={secondary.top}
        />
      ) : undefined}

      {secondary.bottom ? (
        <BottomExtension
          core={core}
          coreShape={coreShape}
          name={secondary.bottom}
        />
      ) : undefined}
    </g>
  ) as SVGGElement

  if (secondary.superposed) {
    const box = getBBox(main)

    const diacritic = (
      <Anchor
        at="bc"
        y={box.y - 10}
      >
        <Diacritic name={secondary.superposed} />
      </Anchor>
    )

    main.appendChild(diacritic)
  }

  if (secondary.underposed) {
    const box = getBBox(main)

    const diacritic = (
      <Anchor
        at="tc"
        y={box.y + box.height + 10}
      >
        <Diacritic name={secondary.underposed} />
      </Anchor>
    )

    main.appendChild(diacritic)
  }

  if (secondary.right) {
    main = (
      <Row
        compact={true}
        space={10}
        intro={[...main.querySelectorAll("path")]}
      >
        <Anchor at="cl">
          <Diacritic name={secondary.right} />
        </Anchor>
      </Row>
    ) as SVGGElement
  }

  return main
}
