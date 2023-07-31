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

/** Information about a primary character. */
export interface PrimaryCharacter {
  /** The specification of this character. */
  readonly specification?: Specification | undefined

  /** The context of this character. */
  readonly context?: Context | undefined

  /** The bottom value of this character. */
  readonly bottom?: "UNF/C" | "UNF/K" | "FRM" | 1 | 2 | undefined

  /** The perspective of this character. */
  readonly perspective?: Perspective | undefined

  /** The extension of this character. */
  readonly extension?: Extension | undefined

  /** The affiliation of this character. */
  readonly affiliation?: Affiliation | undefined

  /** The essence of this character. */
  readonly essence?: Essence | undefined

  /** The configuration of this character. */
  readonly configuration?: Configuration | undefined

  /** The function of this character. */
  readonly function?: Function | undefined

  /** The version of this character. */
  readonly version?: Version | undefined

  /** The stem of this character. */
  readonly stem?: Stem | undefined
}

const DIACRITIC_OFFSET = deepFreezeAndNullPrototype({
  BSC: 0,
  CTE: 12.5,
  CSV: -2.5,
  OBJ: 5,
})

/**
 * Assembles a primary character as an group of SVG paths.
 * @param props Properties that modify the character.
 * @returns An `SVGGElement` containing the character.
 */
export function Primary(primary: PrimaryCharacter): SVGGElement {
  const specification = primary.specification || "BSC"

  const core = PrimaryCore({ specification })

  const coreBox = getBBox(core)

  return (
    <g>
      {core}

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate x={coreBox.x}>
        <PrimaryTopLeft
          perspective={primary.perspective || "M"}
          extension={primary.extension || "DEL"}
        />
      </Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate x={coreBox.x + coreBox.width}>
        {PrimaryBottomRight(primary)}
      </Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate
        x={coreBox.x - DIACRITIC_OFFSET[specification]}
        y={35}
      >
        {PrimaryBottomLeft(primary)}
      </Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate
        x={coreBox.x + coreBox.width + DIACRITIC_OFFSET[specification]}
        y={-35}
      >
        {PrimaryTopRight(primary)}
      </Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate y={-45}>{PrimarySuperPosed(primary)}</Translate>

      {/* @ts-ignore: This can be `undefined`, as we're not using it. */}
      <Translate y={45}>{PrimaryUnderPosed(primary)}</Translate>
    </g>
  ) as SVGGElement
}
