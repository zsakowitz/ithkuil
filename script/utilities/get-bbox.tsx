const svg = <svg />

export function getBBox(node: SVGGraphicsElement) {
  const nextSibling = node.nextSibling
  const parent = node.parentNode

  svg.append(node)
  document.body.append(svg)

  const box = node.getBBox()

  svg.remove()

  if (parent) {
    parent.insertBefore(node, nextSibling)
  }

  return box
}
