// import "https://esm.sh/snapsvg"
import { scriptFromText } from "./from-text.js"
import { CharacterRow, fitViewBox } from "./index.js"
import { Lines } from "./other/lines.js"
import { HandleResult } from "./utilities/result.js"

document.body.append(
  <script>
    new EventSource('/esbuild').addEventListener('change', () ={">"}
    location.reload())
  </script>,
)

const HEIGHT = 200

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
    <HandleResult
      ok={(x) => <CharacterRow compact>{x}</CharacterRow>}
      error={(x) => <text>{x}</text>}
    >
      {scriptFromText("kšš lu wag")}
    </HandleResult>

    {/* <Primary bottom="UNF/K" /> */}

    {/* <CharacterRow>
      {formativeToScript(parseFormative("wazvejamäm")!)}
    </CharacterRow> */}

    {/* <path d={NUMERALS.at(-1)!} /> */}

    {/* <Spread
      items={THOUSANDS.map((x) => (
        <Anchor at="cc">
          <path d={x} />
        </Anchor>
      ))}
    /> */}

    {/* <g fill="green">
      <Numeral value={0} />
    </g>

    <g fill="purple">
      <Numeral value={9} />
    </g>

    <Blink>
      <g fill="green">
        <Numeral value={0} />
      </g>
    </Blink> */}
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

fitViewBox(node, 35)

node.insertBefore(
  <Lines
    width={500}
    height={0}
  />,
  node.children[0] || null,
)
