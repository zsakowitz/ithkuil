/**
 * A small JSX library that constructs elements.
 * @param tag The tag of the element to be constructed.
 * @param props Properties of the element to be constructed.
 * @param children Children of the element to be constructed.
 * @returns The constructed element.
 */
export function jsx(
  tag: string | ((...args: any) => SVGElement | HTMLElement),
  props?: Record<string, any> | null | undefined,
  ...children: any[]
) {
  if (typeof tag == "function") {
    if (props && !("children" in props)) {
      if (children.length == 1) {
        props.children = children[0]
      } else if (children.length > 1) {
        props.children = children
      }
    }

    const el = tag(props)

    return el
  }

  const el = document.createElementNS("http://www.w3.org/2000/svg", tag)

  if (props && "children" in props) {
    children = Array.isArray(props.children) ? props.children : [props.children]
  }

  for (const key in props) {
    if (key != "children") {
      el.setAttribute(key, props[key])
    }
  }

  el.append(...children.filter((x) => x != null))

  return el
}

export { jsx as jsxs }

/** The JSX namespace. */
export namespace JSX {
  /** The type of all JSX elements. */
  export type Element = SVGElement

  /** Either a number, or a string containing a number. */
  export type NumberLike = `${number}` | number

  /** Constructable elements, and their attributes. */
  export type CoreIntrinsicElements = {
    g: {
      fill?: string
      opacity?: NumberLike
      stroke?: string
      "stroke-linecap"?: "round"
      "stroke-width"?: NumberLike
      transform?: string
    }

    path: {
      d?: string
      fill?: string
      opacity?: NumberLike
      stroke?: string
      "stroke-width"?: NumberLike
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

    text: {
      fill?: string
      "font-family"?: string
      "font-size"?: NumberLike
      "font-weight"?: NumberLike
      "paint-order"?: "stroke" | "fill"
      stroke?: string
      "stroke-width"?: NumberLike
      x?: NumberLike
      y?: NumberLike
    }
  }

  /** Finalized forms of the constructable elements. */
  export type IntrinsicElements = {
    [K in keyof CoreIntrinsicElements]: CoreIntrinsicElements[K] & {
      children?:
        | string
        | SVGElement
        | (string | SVGElement | null | undefined)[]
        | null
        | undefined
    }
  }

  /** The attribute used to mark children. */
  export type ElementChildrenAttribute = {
    children: {}
  }
}
