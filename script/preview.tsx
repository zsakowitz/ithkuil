import "https://esm.sh/snapsvg"
import { CORES } from "./secondary/core.js"
import { Anchor } from "./utilities/anchor.js"
import { fitViewBox } from "./utilities/fit-view-box.js"
import { Origin } from "./utilities/origin.js"

document.body.append(
  <script>
    new EventSource('/esbuild').addEventListener('change', () ={">"}
    location.reload())
  </script>,
)

// const node = (
//   <svg
//     viewBox={
//       {
//         a: "-100 -100 200 200" as const,
//         b: "0 0 60 60" as const,
//         c: "15 15 30 30" as const,
//         d: "20 25 15 15" as const,
//       }.a
//     }
//     ref={(el: SVGSVGElement) => {
//       let index = -1

//       for (const key in CORES) {
//         index++

//         const path = (
//           <Anchor
//             at="cc"
//             x={(index % 5) * 100 - 200}
//             y={(index / 5) * 100}
//           >
//             <path d={CORES[key]} />
//           </Anchor>
//         )

//         el.append(
//           path,
//           <Origin size={20}>
//             <Clone>{path}</Clone>
//           </Origin>,

//           <text
//             x={(index % 5) * 100 - 200}
//             y={(index / 5) * 100}
//             font-family="sans-serif"
//             stroke="white"
//             stroke-width="2"
//             font-size="16"
//             fill="black"
//             font-weight="900"
//             paint-order="stroke"
//           >
//             {key.slice(0, 5)}
//           </text>,
//         )
//       }

//       setTimeout(fitViewBox, 0, el)
//     }}
//   >
//     {/* <Lines /> */}
//   </svg>
// )

const letter: keyof typeof CORES = "k"

const core = (
  <Anchor at="cc">
    <path d={CORES[letter].shape} />
  </Anchor>
)

let hovered: SVGElement | undefined

const node = (
  <svg
    viewBox={
      {
        a: "-100 -100 200 200" as const,
        b: "0 0 60 60" as const,
        c: "15 15 30 30" as const,
        d: "20 25 15 15" as const,
      }.a
    }
    ref={(el) => {
      const path = Snap.path.toAbsolute(core.getAttribute("d")!)

      // for (let index = 1; index < path.length; index++) {
      //   if (path[index][0] == "L") {
      //     const [prevX, prevY] = path[index - 1].slice(-2)

      //     const [x, y] = path[index].slice(-2)

      //     const line = (
      //       <path
      //         d={["M", prevX, prevY, "L", x, y].join(" ")}
      //         stroke-width={2}
      //         stroke-linecap="round"
      //         stroke="blue"
      //       />
      //     )

      //     el.append(line)

      //     line.addEventListener("mouseover", () => {
      //       hovered?.setAttribute("stroke", "blue")

      //       line.setAttribute("stroke", "lime")

      //       hovered = line
      //     })

      //     line.addEventListener("click", () => {
      //       if (hovered != line) {
      //         return
      //       }

      //       let top, bottom, copied

      //       if (y < prevY) {
      //         top = [x, y]
      //         bottom = [prevX, prevY]
      //       } else {
      //         top = [prevX, prevY]
      //         bottom = [x, y]
      //       }

      //       if (y < 0) {
      //         copied = top
      //       } else {
      //         copied = bottom
      //       }

      //       navigator.clipboard.writeText(copied.join(" "))

      //       console.log("top", ...top)
      //       console.log("bottom", ...bottom)
      //       console.log("copied", ...copied)
      //     })
      //   }
      // }
    }}
  >
    {core}

    <g z-index={5}>
      {CORES[letter].top.startsWith("_") ? (
        <g />
      ) : (
        <Origin
          color="red"
          size={5}
        >
          <path d={"M " + CORES[letter].top.split(" ").slice(1).join(" ")} />
        </Origin>
      )}

      {CORES[letter].bottom.startsWith("_") ? (
        <g />
      ) : (
        <Origin
          color="green"
          size={5}
        >
          <path d={"M " + CORES[letter].bottom.split(" ").slice(1).join(" ")} />
        </Origin>
      )}
    </g>
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

fitViewBox(node, 10)
