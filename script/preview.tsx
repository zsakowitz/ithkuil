import "https://esm.sh/snapsvg"
import { Lines } from "./other/lines.js"
import { Primary } from "./primary/index.js"

document.body.append(
  <script>
    new EventSource('/esbuild').addEventListener('change', () ={">"}
    location.reload())
  </script>,
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
    <Lines />

    <Primary
      function="DYN"
      version="CPT"
      configuration="DFS"
      stem={3}
      extension="ICP"
      perspective="N"
      affiliation="COA"
      essence="RPV"
      context="RPS"
      bottom="UNF/K"
    />
  </svg>
)

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)
