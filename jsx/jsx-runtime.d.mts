/**
 * A small JSX library that constructs elements.
 *
 * @param tag The tag of the element to be constructed.
 * @param props Properties of the element to be constructed.
 * @param children Children of the element to be constructed.
 * @returns The constructed element.
 */
export function jsx(
  tag: string | ((...args: any) => SVGElement | HTMLElement),
  props?: Record<string, any> | null | undefined,
  ...children: any[]
): SVGElement | HTMLElement

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
      fill?: string | undefined
      opacity?: NumberLike | undefined
      stroke?: string | undefined
      "stroke-linecap"?: "round" | undefined
      "stroke-width"?: NumberLike | undefined
      transform?: string | undefined
    }

    path: {
      d?: string | undefined
      fill?: string | undefined
      opacity?: NumberLike | undefined
      stroke?: string | undefined
      "stroke-width"?: NumberLike | undefined
      "stroke-linejoin"?: "round" | undefined
      "stroke-linecap"?: "round" | undefined
      transform?: string | undefined
    }

    script: {
      src?: string | undefined
    }

    svg: {
      viewBox?: `${number} ${number} ${number} ${number}` | undefined
      fill?: string | undefined
      stroke?: string | undefined
      "stroke-width"?: NumberLike | undefined
    }

    text: {
      fill?: string | undefined
      "font-family"?: string | undefined
      "font-size"?: NumberLike | undefined
      "font-weight"?: NumberLike | undefined
      "paint-order"?: "stroke" | "fill" | undefined
      stroke?: string | undefined
      "stroke-width"?: NumberLike | undefined
      x?: NumberLike | undefined
      y?: NumberLike | undefined
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
