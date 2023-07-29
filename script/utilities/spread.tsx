import { Translate } from "./translate.js"

export function Spread(props: {
  columns?: number
  items: SVGElement[]
  x?: number
  y?: number
}) {
  const g = (<g></g>) as SVGGElement

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
