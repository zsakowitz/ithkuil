// const svgElements = new Set([
//   "a",
//   "animate",
//   "animateMotion",
//   "animateTransform",
//   "circle",
//   "clipPath",
//   "defs",
//   "desc",
//   "ellipse",
//   "feBlend",
//   "feColorMatrix",
//   "feComponentTransfer",
//   "feComposite",
//   "feConvolveMatrix",
//   "feDiffuseLighting",
//   "feDisplacementMap",
//   "feDistantLight",
//   "feDropShadow",
//   "feFlood",
//   "feFuncA",
//   "feFuncB",
//   "feFuncG",
//   "feFuncR",
//   "feGaussianBlur",
//   "feImage",
//   "feMerge",
//   "feMergeNode",
//   "feMorphology",
//   "feOffset",
//   "fePointLight",
//   "feSpecularLighting",
//   "feSpotLight",
//   "feTile",
//   "feTurbulence",
//   "filter",
//   "foreignObject",
//   "g",
//   "image",
//   "line",
//   "linearGradient",
//   "marker",
//   "mask",
//   "metadata",
//   "mpath",
//   "path",
//   "pattern",
//   "polygon",
//   "polyline",
//   "radialGradient",
//   "rect",
//   "script",
//   "set",
//   "stop",
//   "style",
//   "svg",
//   "symbol",
//   "switch",
//   "text",
//   "textPath",
//   "title",
//   "tspan",
//   "use",
//   "view",
// ])

export function jsx(
  tag: string | ((...args: any) => SVGElement | HTMLElement),
  props?: Record<string, any> | null | undefined,
  ...children: any[]
) {
  if (typeof tag == "function") {
    let ref

    if (props && typeof props.ref == "function") {
      ref = props.ref
      delete props.ref
    }

    if (props && !("children" in props)) {
      if (children.length == 1) {
        props.children = children[0]
      } else if (children.length > 1) {
        props.children = children
      }
    }

    const el = tag(props)

    if (ref) {
      ref(el)
    }

    return el
  }

  const el = document.createElementNS("http://www.w3.org/2000/svg", tag)

  if (props && "children" in props) {
    children = Array.isArray(props.children) ? props.children : [props.children]
  }

  for (const key in props) {
    if (key != "children" && key != "ref") {
      el.setAttribute(key, props[key])
    }
  }

  el.append(...children)

  if (props?.ref) {
    props.ref(el)
  }

  return el
}

export { jsx as jsxs }

export namespace JSX {
  export type Element = SVGElement

  export type CoreIntrinsicElements = {
    g: {
      fill?: string
      opacity?: `${number}`
      stroke?: string
      "stroke-linecap"?: "round"
      "stroke-width"?: `${number}`
      transform?: string
    }

    path: {
      d?: string
      stroke?: string
      "stroke-width"?: `${number}`
      "stroke-linejoin"?: "round"
      "stroke-linecap"?: "round"
      transform?: string
    }

    script: {
      src?: string
    }

    svg: {
      viewBox?: `${number} ${number} ${number} ${number}`
    }
  }

  export type IntrinsicElements = {
    [K in keyof CoreIntrinsicElements]: CoreIntrinsicElements[K] & {
      ref?(el: SVGElementTagNameMap[K]): unknown
      children?: string | SVGElement | (string | SVGElement)[]
    }
  }

  export type ElementChildrenAttribute = {
    children: {}
  }

  export type IntrinsicAttributes = {
    ref?: ((x: Element) => unknown) | undefined
  }
}
