function d(t, e, ...n) {
  if (typeof t == "function")
    return (
      e &&
        !("children" in e) &&
        (n.length == 1 ?
          (e.children = n[0])
        : n.length > 1 && (e.children = n)),
      t(e)
    )
  let r = document.createElementNS("http://www.w3.org/2000/svg", t)
  e &&
    "children" in e &&
    (n = Array.isArray(e.children) ? e.children : [e.children])
  for (let i in e) i != "children" && r.setAttribute(i, e[i])
  return r.append(...n.filter((i) => i != null)), r
}
export { d as jsx, d as jsxs }
