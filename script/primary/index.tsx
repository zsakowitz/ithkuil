import {
  deepFreezeAndNullPrototype,
  type Affiliation,
  type Configuration,
  type Context,
  type Essence,
  type Extension,
  type Function,
  type Perspective,
  type Specification,
  type Stem,
  type Version,
} from "../../index.js"
import { getBBox } from "../utilities/get-bbox.js"
import { Translate } from "../utilities/translate.js"
import { PrimaryBottomLeft } from "./bottom-left.js"
import { PrimaryBottomRight } from "./bottom-right.js"
import { PrimaryCore } from "./core.js"
import { PrimarySuperPosed } from "./super-posed.js"
import { PrimaryTopLeft } from "./top-left.js"
import { PrimaryTopRight } from "./top-right.js"
import { PrimaryUnderPosed } from "./under-posed.js"

export interface PrimaryCharacter {
  // Core:
  readonly specification?: Specification | undefined

  // Super-posed:
  readonly context?: Context | undefined

  // Under-posed:
  readonly bottom?: "UNF/C" | "UNF/K" | "FRM" | 1 | 2 | undefined

  // Top left:
  readonly perspective?: Perspective | undefined
  readonly extension?: Extension | undefined

  // Top right:
  readonly affiliation?: Affiliation | undefined
  readonly essence?: Essence | undefined

  // Bottom:
  readonly configuration?: Configuration | undefined

  // Bottom right:
  readonly function?: Function | undefined
  readonly version?: Version | undefined
  readonly stem?: Stem | undefined
}

const DIACRITIC_OFFSET = deepFreezeAndNullPrototype({
  BSC: 0,
  CTE: 12.5,
  CSV: -2.5,
  OBJ: 5,
})

export function Primary(primary: PrimaryCharacter) {
  const specification = primary.specification || "BSC"

  const core = PrimaryCore({ specification })

  const coreBox = getBBox(core)

  return (
    <g>
      {core}

      <Translate
        x={coreBox.x}
        y={0}
      >
        <PrimaryTopLeft
          perspective={primary.perspective || "M"}
          extension={primary.extension || "DEL"}
        />
      </Translate>

      <Translate
        x={coreBox.x + coreBox.width}
        y={0}
      >
        <PrimaryBottomRight
          function={primary.function || "STA"}
          version={primary.version || "PRC"}
          stem={primary.stem ?? 1}
          plexity={primary.configuration?.startsWith("D") ? "D" : "M"}
        />
      </Translate>

      <Translate
        x={coreBox.x - DIACRITIC_OFFSET[specification]}
        y={35}
      >
        {PrimaryBottomLeft(primary)}
      </Translate>

      <Translate
        x={coreBox.x + coreBox.width + DIACRITIC_OFFSET[specification]}
        y={-35}
      >
        {PrimaryTopRight(primary)}
      </Translate>

      <Translate
        x={0}
        y={-45}
      >
        {PrimarySuperPosed(primary)}
      </Translate>

      <Translate
        x={0}
        y={45}
      >
        {PrimaryUnderPosed(primary)}
      </Translate>
    </g>
  ) as SVGGElement
}
