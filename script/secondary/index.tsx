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
    <g fill="#888">
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

  const debugPoints = (<g />) as SVGGElement

  {
    const core = getBBox(coreShape)

    const ext = Snap.path.toAbsolute(top.children[0]?.getAttribute("d") || "")

    const [, srx, sry] = EXTENSIONS[props.top!].diag.split(" ", 3)
    const rx = +(srx || 0)
    const ry = +(sry || 0)

    debug("      rx:", rx)
    debug("      ry:", ry)

    const round = (x: number) => Math.round(x * 1e4) / 1e4

    function subDebugAt(color: string, x: number, y: number) {
      debug(
        `${color} X:`.padStart(12),
        (x < 0 ? "" + round(x) : "+" + round(x)).padEnd(6),
        "=>",
        rx + x,
      )

      debug(
        `${color} Y:`.padStart(12),
        (y < 0 ? "" + round(y) : "+" + round(y)).padEnd(6),
        "=>",
        ry + y,
      )
    }

    function debugAt(
      color: string,
      [x, y]: [number, number] = ["Z", ""] as any,
    ) {
      if ("" + x == "Z") {
        debug()
        debug(`<no ${color} dot available>`)
        return
      }

      debug()
      subDebugAt("↙ " + color, core.x - x, core.y - y + 7.5)
      debug()
      subDebugAt("↗ " + color, core.x - x + 7.5, core.y - y)

      debugPoints.appendChild(
        <Point
          x={x}
          y={y}
          color={color}
          size={2}
        />,
      )
    }

    debugAt("blue", ext[0]?.slice(-2))
    debugAt("green", ext[1]?.slice(-2))
    debugAt("red", ext[2]?.slice(-2))
    debugAt("purple", ext[3]?.slice(-2))
    debugAt("orange", ext[4]?.slice(-2))
    debugAt("yellow", ext[5]?.slice(-2))
    debugAt("magenta", ext[7]?.slice(-2))
  }

  return (
    <g>
      {top}

      {coreShape}

      <Blink>
        <Clone>{top}</Clone>
      </Blink>

      {debugPoints}
    </g>
  )
}
