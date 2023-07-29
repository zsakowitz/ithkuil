import "https://esm.sh/snapsvg"
import { CORES } from "./secondary/core.js"
import { Anchor } from "./utilities/anchor.js"
import { fitViewBox } from "./utilities/fit-view-box.js"
import { DebugCore } from "./secondary/debug.js"
import { Spread } from "./utilities/spread.js"

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

const letter: keyof typeof CORES = "b"

const core = (
  <Anchor at="cc">
    <path d={CORES[letter].shape} />
  </Anchor>
)

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
  >
    <Spread
      y={120}
      x={90}
      columns={6}
      items={Object.keys(CORES).map((x) => (
        <DebugCore letter={x} />
      ))}
    />
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

fitViewBox(node, 10)
