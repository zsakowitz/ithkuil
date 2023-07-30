export function Blink(props: {
  children: SVGElement | SVGElement[]
  interval?: number
}) {
  return (
    <g
      opacity={0}
      ref={(el) => {
        setInterval(() => {
          el.setAttribute(
            "opacity",
            el.getAttribute("opacity") == "0" ? "1" : "0",
          )
        }, props.interval ?? 1000)
      }}
    >
      {props.children}
    </g>
  )
}
