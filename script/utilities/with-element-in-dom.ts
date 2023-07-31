const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

export function placeElementInDOM(node: SVGElement) {
  const nextSibling = node.nextSibling
  const parent = node.parentNode

  svg.append(node)
  document.body.append(svg)

  return () => {
    svg.remove()

    if (parent) {
      parent.insertBefore(node, nextSibling)
    }
  }
}
