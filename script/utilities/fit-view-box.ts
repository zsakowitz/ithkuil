export function fitViewBox(svg: SVGSVGElement, extraSpace = 0) {
  const box = svg.getBBox()

  svg.setAttribute(
    "viewBox",
    [
      box.x - extraSpace,
      box.y - extraSpace,
      box.width + 2 * extraSpace,
      box.height + 2 * extraSpace,
    ].join(" "),
  )
}
