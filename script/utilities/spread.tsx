import { Translate } from "./translate.js"

/**
 * Shows a spread of several items.
 * @param props Properties modifying the spread.
 * @returns An `SVGGElement` containing all the items.
 */
export function Spread(props: {
  /** The number of columns to show. */
  readonly columns?: number | undefined

  /** The items to show. */
  readonly items: SVGElement[]

  /** The horizontal separation between the items. */
  readonly x?: number | undefined

  /** The vertical separation between the items. */
  readonly y?: number | undefined
}): SVGGElement {
  const g = (<g />) as SVGGElement

  const columns = props.columns ?? 5

  for (let index = 0; index < props.items.length; index++) {
    g.append(
      <Translate
        x={(index % columns) * (props.x ?? 100)}
        y={(index / columns) * (props.y ?? 100)}
      >
        {props.items[index]!}
      </Translate>,
    )
  }

  return g
}
