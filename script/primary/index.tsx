import type {
  Affiliation,
  Configuration,
  Context,
  Essence,
  Extension,
  Function,
  Perspective,
  Specification,
  Stem,
  Version,
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

export function Primary(primary: PrimaryCharacter) {
  const core = PrimaryCore({ specification: primary.specification || "BSC" })

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
        x={coreBox.x}
        y={35}
      >
        {PrimaryBottomLeft(primary)}
      </Translate>

      <Translate
        x={coreBox.x + coreBox.width}
        y={-35}
      >
        {PrimaryTopRight(primary)}
      </Translate>

      <Translate
        x={0}
        y={-35}
      >
        {PrimarySuperPosed(primary)}
      </Translate>

      <Translate
        x={0}
        y={35}
      >
        {PrimaryUnderPosed(primary)}
      </Translate>
    </g>
  ) as SVGGElement
}
