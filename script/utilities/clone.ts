/**
 * Clones a node.
 * @param props Properties modifying the cloned element.
 * @returns The cloned node.
 */
export function Clone<T extends Node>(props: {
  /** The node to be cloned. */
  readonly children: T
}): T {
  return props.children.cloneNode(true) as T
}
