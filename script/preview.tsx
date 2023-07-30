import "https://esm.sh/snapsvg"
import { Lines } from "./other/lines.js"
import { Row } from "./other/row.js"
import { textToSecondaries } from "./secondary/from-text.js"
import { Secondary } from "./secondary/index.js"

document.body.append(
  <script>
    new EventSource('/esbuild').addEventListener('change', () ={">"}
    location.reload())
  </script>,
)

const HEIGHT = 100

const node = (
  <svg
    viewBox={
      {
        a: `${-HEIGHT * (innerWidth / innerHeight)} -${HEIGHT} ${
          2 * HEIGHT * (innerWidth / innerHeight)
        } ${2 * HEIGHT}` as const,
        b: "-50 -50 100 100" as const,
        c: "-50 -50 60 60" as const,
        d: "-40 -45 30 30" as const,
      }.a
    }
  >
    <Lines />

    {/* <Row compact={true}>
      {textToSecondaries("zäkëri säköwec", {
        useRightDiacritics: true,
      })
        .slice(0, 2)
        .map(Secondary)}
    </Row> */}

    <Secondary {...textToSecondaries("kšš")[0]} />

    {/* <Spread
      y={120}
      x={90}
      columns={7}
      items={Object.keys(CORES).map((x) => (
        <Secondary
          core={x}
          top="'"
        />
      ))}
    /> */}
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)
