const el = document.createElement("pre")

export function debug(...texts: unknown[]) {
  el.textContent +=
    texts
      .map((x) => {
        if (typeof x == "number") {
          return Math.round(x * 1e4) / 1e4
        }

        return x
      })
      .join(" ") + "\n"

  el.setAttribute(
    "style",
    `z-index: 1; position: fixed; top: 1rem; left: 1rem; margin: 0; font-size: 1rem; line-height: 1.25rem; background: #fff8`,
  )

  document.body.append(el)
}
