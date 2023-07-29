export function Clone<T extends Node>(props: { children: T }) {
  return props.children.cloneNode(true) as T
}
