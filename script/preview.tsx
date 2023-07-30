import "https://esm.sh/snapsvg"
import { Lines } from "./other/lines.js"
import { Secondary } from "./secondary/index.js"

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
        b: "-50 -50 100 100" as const,
        c: "-50 -50 60 60" as const,
        d: "-40 -45 30 30" as const,
      }.c
    }
  >
    <Lines />

    <Secondary
      core="r"
      top="VELARIZED"
    />

    {/* <g opacity={0}>
      <Spread
        y={120}
        x={90}
        columns={6}
        items={Object.keys(CORES).map((x) => (
          <DebugCore letter={x} />
        ))}
      />
    </g> */}

    {/* <Clone>{shape}</Clone>

    <path d={CORES.k.shape} />

    <Blink>
      <Clone>{shape}</Clone>
    </Blink> */}
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

// fitViewBox(node, 10)
