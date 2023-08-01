const firstMoveRegex = /^M\s+([-+e.\d]+)\s+([-+e.\d]+)/

function translatePath(path: SVGPathElement, tx: number, ty: number) {
  const d = path.getAttribute("d")

  if (d && firstMoveRegex.test(d)) {
    path.setAttribute(
      "d",
      d.replace(
        firstMoveRegex,
        (_, x: string, y: string) => `M ${+x + tx} ${+y + ty}`,
      ),
    )
  }

  return path
}

export function Translate(props: {
  readonly children: SVGElement | SVGElement[]
  readonly x?: number | undefined
  readonly y?: number | undefined
}): SVGElement

export function Translate(props: {
  readonly children?: SVGElement | SVGElement[] | undefined
  readonly x?: number | undefined
  readonly y?: number | undefined
}): SVGElement | undefined

export function Translate(props: {
  readonly children?: SVGElement | SVGElement[] | undefined
  readonly x?: number | undefined
  readonly y?: number | undefined
}): SVGElement | undefined {
  const x = props.x || 0
  const y = props.y || 0

  if (!props.children) {
    return
  }

  if (props.children instanceof SVGPathElement) {
    return translatePath(props.children, x, y)
  }

  if (props.children instanceof SVGGElement) {
    const children = props.children.querySelectorAll("path")

    children.forEach((child) => {
      translatePath(child, x, y)
    })

    return props.children
  }

  return <g transform={`translate(${x},${y})`}>{props.children}</g>
}
