let el: HTMLPreElement | undefined

/**
 * Shows text in a small window at the top-left of the screen.
 *
 * @param data The text to be shown.
 */
export function debug(...data: unknown[]) {
  el ??= document.createElement("pre")

  el.textContent +=
    data
      .map((x) => {
        if (typeof x == "number") {
          return Math.round(x * 1e4) / 1e4
        }

        return x
      })
      .join(" ") + "\n"

  el.setAttribute(
    "style",
    `z-index: 1; position: fixed; top: 1rem; left: 1rem; margin: 0; font-size: 1rem; line-height: 1.25rem; background: #fff8; overflow-x: auto; max-width: calc(100vw - 2rem)`,
  )

  document.body.append(el)
}
