export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: string }

export function HandleResult<T, U, V>(props: {
  children: Result<T>
  ok(value: T): U
  error(reason: string): V
}): U | V {
  if (props.children.ok) {
    return props.ok(props.children.value)
  } else {
    return props.error(props.children.reason)
  }
}
