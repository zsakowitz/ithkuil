import { getBBox } from "./get-bbox.js"
import { Translate } from "./translate.js"

/** The location for a generic anchor. */
export type AnchorLocation =
  | "tl"
  | "tc"
  | "tr"
  | "cl"
  | "cc"
  | "cr"
  | "bl"
  | "bc"
  | "br"

/**
 * Options which modify the position and content of an anchor.
 *
 * @template T Possible locations an object could be anchored at.
 */
export type AnchorOptions<T extends string> = {
  /** The location to anchor the object at. */
  readonly at: T

  /** The object to be anchored. */
  readonly children: SVGElement

  /**
   * The x-coordinate to anchor the object at.
   *
   * @default 0
   */
  readonly x?: number | undefined

  /**
   * The y-coordinate to anchor the object at.
   *
   * @default 0
   */
  readonly y?: number | undefined
}

/**
 * Anchors an element to any coordinates based on one of its corners or edges or
 * its center. For example, `<Anchor at="tl">...</Anchor>` anchors the top-left
 * corner of its content to (0, 0).
 * @param props Properties modifying the anchor's placement.
 * @returns A translated element anchored to (x, y) at one of its corners or
 * edges or its center.
 */
export function Anchor(props: AnchorOptions<AnchorLocation>): SVGElement {
  const children =
    props.children instanceof SVGGraphicsElement
      ? props.children
      : ((<g>{props.children}</g>) as SVGGElement)

  const box = getBBox(children)

  const y = props.at[0] as "t" | "c" | "b"
  const x = props.at[1] as "l" | "c" | "r"

  return (
    <Translate
      x={
        (x == "l"
          ? -box.x
          : x == "r"
          ? -box.x - box.width
          : -box.x - box.width / 2) + (props.x ?? 0)
      }
      y={
        (y == "t"
          ? -box.y
          : y == "b"
          ? -box.y - box.height
          : -box.y - box.height / 2) + (props.y ?? 0)
      }
    >
      {children}
    </Translate>
  )
}

/** The location for a horizontal anchor. */
export type AnchorXLocation = "l" | "c" | "r"

/**
 * Anchors an element's x-position to any coordinates based on one of its
 * corners or edges or its center while leaving its vertical position unchanged.
 * For example, `<AnchorX at="l">...</AnchorX>` anchors the left edge of its
 * content to x=0.
 * @param props Properties modifying the anchor's placement.
 * @returns A translated element anchored to (x, y) at one of its corners or
 * edges or its center.
 */
export function AnchorX(props: AnchorOptions<AnchorXLocation>): SVGElement {
  const children =
    props.children instanceof SVGGraphicsElement
      ? props.children
      : ((<g>{props.children}</g>) as SVGGElement)

  const box = getBBox(children)

  const x = props.at

  return (
    <Translate
      x={
        (x == "l"
          ? -box.x
          : x == "r"
          ? -box.x - box.width
          : -box.x - box.width / 2) + (props.x ?? 0)
      }
      y={props.y ?? 0}
    >
      {children}
    </Translate>
  )
}

/** The location for a vertical anchor. */
export type AnchorYLocation = "t" | "c" | "b"

/**
 * Anchors an element's y-position to any coordinates based on one of its
 * corners or edges or its center while leaving its horizontal position
 * unchanged. For example, `<AnchorY at="t">...</AnchorY>` anchors the top edge
 * of its content to y=0.
 * @param props Properties modifying the anchor's placement.
 * @returns A translated element anchored to (x, y) at one of its corners or
 * edges or its center.
 */
export function AnchorY(props: AnchorOptions<AnchorYLocation>): SVGElement {
  const children =
    props.children instanceof SVGGraphicsElement
      ? props.children
      : ((<g>{props.children}</g>) as SVGGElement)

  const box = getBBox(children)

  const y = props.at

  return (
    <Translate
      x={props.x ?? 0}
      y={
        (y == "t"
          ? -box.y
          : y == "b"
          ? -box.y - box.height
          : -box.y - box.height / 2) + (props.y ?? 0)
      }
    >
      {children}
    </Translate>
  )
}
