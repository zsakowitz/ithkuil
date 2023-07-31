import { Diacritic, type DiacriticName } from "../other/diacritic.js"
import { Row } from "../other/row.js"
import { Anchor } from "../utilities/anchor.js"
import { getBBox } from "../utilities/get-bbox.js"
import { rotate180AndRotateStartingPoint } from "../utilities/rotate-180.js"
import { Translate } from "../utilities/translate.js"
import { CORES, type Core, type CoreName } from "./core.js"
import { EXTENSIONS, type ExtensionName } from "./extension.js"

export interface SecondaryCharacter {
  readonly top?: ExtensionName | undefined
  readonly core?: CoreName | undefined
  readonly bottom?: ExtensionName | undefined

  readonly superposed?: DiacriticName | undefined
  readonly right?: DiacriticName | undefined
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
  const reversed =
    core.bottom[0] == "horiz" ? !!core.bottom[2] : !core.bottom[2]

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

export function Secondary(props: SecondaryCharacter) {
  const core = CORES[props.core || "STANDARD_PLACEHOLDER"]

  const coreShape = (<path d={core.shape} />) as SVGPathElement

  let main = (
    <g>
      {coreShape}

      {props.top ? (
        <TopExtension
          core={core}
          coreShape={coreShape}
          name={props.top}
        />
      ) : undefined}

      {props.bottom ? (
        <BottomExtension
          core={core}
          coreShape={coreShape}
          name={props.bottom}
        />
      ) : undefined}
    </g>
  ) as SVGGElement

  if (props.superposed) {
    const box = getBBox(main)

    const diacritic = (
      <Anchor
        at="bc"
        y={box.y - 10}
      >
        <Diacritic name={props.superposed} />
      </Anchor>
    )

    main.appendChild(diacritic)
  }

  if (props.underposed) {
    const box = getBBox(main)

    const diacritic = (
      <Anchor
        at="tc"
        y={box.y + box.height + 10}
      >
        <Diacritic name={props.underposed} />
      </Anchor>
    )

    main.appendChild(diacritic)
  }

  if (props.right) {
    main = (
      <Row
        compact={true}
        space={10}
      >
        {main}

        <Anchor at="cl">
          <Diacritic name={props.right} />
        </Anchor>
      </Row>
    ) as SVGGElement
  }

  return main
}
