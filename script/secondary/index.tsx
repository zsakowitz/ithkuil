import { Blink } from "../utilities/blink.js"
import { Clone } from "../utilities/clone.js"
import { debug } from "../utilities/debug.js"
import { getBBox } from "../utilities/get-bbox.js"
import { Point } from "../utilities/point.js"
import { rotate180AndRotateStartingPoint } from "../utilities/rotate-180.js"
import { Translate } from "../utilities/translate.js"
import { CORES } from "./core.js"
import { EXTENSIONS } from "./extension.js"

export interface SecondaryCharacter {
  core: keyof typeof CORES
  top?: keyof typeof EXTENSIONS | undefined
  bottom?: keyof typeof EXTENSIONS | undefined
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

export function Secondary(props: SecondaryCharacter) {
  const core = CORES[props.core]

  const coreShape = (<path d={core.shape} />) as SVGPathElement

  const top = props.top ? (
    <g fill="red">
      <Translate
        x={core.top[1] + (core.top[2] ? -10 : 0)}
        y={getBBox(coreShape).y + (core.top[2] ? 10 : 0)}
      >
        <Extension
          name={props.top}
          direction={core.top[0]}
          reversed={!!core.top[2]}
        />
      </Translate>
    </g>
  ) : (
    <g />
  )

  // {
  //   const core = getBBox(coreShape)
  //   const ext = getBBox(top as SVGGElement)

  //   debug(core.x - ext.x)
  //   debug(core.x + 10 - (ext.x + ext.width))
  //   debug(core.y - ext.y)
  //   debug(core.y + 10 - (ext.y + ext.height))
  // }

  let x

  {
    const core = getBBox(coreShape)

    const ext2 = Snap.path.toRelative(top.children[0]?.getAttribute("d") || "")

    const ext = Snap.path.toAbsolute(top.children[0]?.getAttribute("d") || "")

    const qi = ext2.findIndex((x) => x[0] == "q" && (x[3] == 10 || x[3] == -10))

    if (qi == -1) {
      debug("No `qi` found.")
    }

    let [px, py]: [number, number] = ext.at(qi - 2).slice(-2)
    const [sx, sy]: [number, number] = ext.at(qi - 1).slice(-2)
    const [ex, ey]: [number, number] = ext.at(qi).slice(-2)
    let [nx, ny]: [number, number] = ext.at((qi + 1) % ext.length).slice(-2)

    if ("" + nx == "Z") {
      ;[nx, ny] = ext[1].slice(-2)
    }

    if (py < ny) {
      ;[nx, ny, px, py] = [px, py, nx, ny]
    }

    debug(" low X:", core.x - px)
    debug(" low Y:", core.y - py + 10)

    debug("high X:", core.x - nx + 10)
    debug("high Y:", core.y - ny)

    x = (
      <g>
        <Point
          x={px}
          y={py}
          color="blue"
          size={2}
        />

        <Point
          x={nx}
          y={ny}
          color="green"
          size={2}
        />
      </g>
    )
  }

  return (
    <g>
      {top}

      {coreShape}

      <Blink>
        <Clone>{top}</Clone>
      </Blink>

      {x}
    </g>
  )
}
