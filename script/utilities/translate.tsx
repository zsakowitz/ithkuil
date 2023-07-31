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
  children: SVGElement | SVGElement[]
  x: number
  y: number
}) {
  if (props.children instanceof SVGPathElement) {
    return translatePath(props.children, props.x, props.y)
  }

  if (props.children instanceof SVGGElement) {
    const children = props.children.querySelectorAll("path")

    children.forEach((child) => {
      translatePath(child, props.x, props.y)
    })

    return props.children
  }

  // if (
  //   props.children instanceof SVGGElement &&
  //   !props.children.getAttribute("transform")
  // ) {
  //   const children = []

  //   for (const el of props.children.children) {
  //     if (el instanceof SVGElement) {
  //       const result = (
  //         <Translate
  //           x={props.x}
  //           y={props.y}
  //         >
  //           {el}
  //         </Translate>
  //       )

  //       children.push(result)
  //     }
  //   }

  //   const g = <g />
  //   g.append(...children)
  //   return g
  // }

  // if (
  //   props.children instanceof SVGGElement &&
  //   !props.children.getAttribute("transform")
  // ) {
  //   for (const el of props.children.children) {
  //     ;<Translate
  //       x={props.x}
  //       y={props.y}
  //     >
  //       {el}
  //     </Translate>
  //   }

  //   return props.children
  // }

  return <g transform={`translate(${props.x},${props.y})`}>{props.children}</g>
}
