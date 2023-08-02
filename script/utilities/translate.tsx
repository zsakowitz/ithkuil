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

function translateText(text: SVGTextElement, tx: number, ty: number) {
  const x = +(text.getAttribute("x") || 0)
  const y = +(text.getAttribute("y") || 0)

  text.setAttribute("x", "" + (x + tx))
  text.setAttribute("y", "" + (y + ty))

  return text
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

    const texts = props.children.querySelectorAll("text")

    texts.forEach((child) => {
      translateText(child, x, y)
    })

    return props.children
  }

  return <g transform={`translate(${x},${y})`}>{props.children}</g>
}
