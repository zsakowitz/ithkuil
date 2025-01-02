let svg: SVGSVGElement | undefined

/**
 * Gets the bounding box of an SVG graphics element.
 *
 * @param element The node to get the bounding box of.
 * @returns The bounding box (in SVG units) of the element.
 */
export function getBBox(element: SVGGraphicsElement) {
  if (!svg) {
    svg = (<svg />) as SVGSVGElement
  }

  const nextSibling = element.nextSibling
  const parent = element.parentNode

  svg.append(element)
  document.body.append(svg)

  const box = element.getBBox()

  svg.remove()

  if (parent) {
    parent.insertBefore(element, nextSibling)
  }

  return box
}

/**
 * Gets the bounding box of an SVG element.
 *
 * @param element The node to get the bounding box of.
 * @returns The bounding box (in SVG units) of the element.
 */
export function forceGetBBox(node: SVGElement) {
  if (node instanceof SVGGraphicsElement) {
    return getBBox(node)
  }

  return getBBox((<g>{node}</g>) as SVGGElement)
}
