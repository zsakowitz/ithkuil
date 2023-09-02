/**
 * Modifies an SVG element's view box to be equal to the size of its contents.
 * @param svg The SVG element whose view box will be adjusted.
 * @param margin The size of the margin placed around the SVG.
 * @param options Options to pass to `svg.getBBox()`.
 */
export function fitViewBox(
  svg: SVGSVGElement,
  margin = 0,
  options?: SVGBoundingBoxOptions,
) {
  const nextSibling = svg.nextSibling
  const parent = svg.parentNode

  svg.remove()

  document.body.append(svg)

  const box = svg.getBBox(options)

  svg.setAttribute(
    "viewBox",
    [
      box.x - margin,
      box.y - margin,
      box.width + 2 * margin,
      box.height + 2 * margin,
    ].join(" "),
  )

  svg.remove()

  if (parent) {
    parent.insertBefore(svg, nextSibling)
  }
}
