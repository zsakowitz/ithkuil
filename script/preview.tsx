import "https://esm.sh/snapsvg"
import { parseFormative } from "../index.js"
import { CharacterRow, formativeToScript } from "./construct/formative.js"
import { fitViewBox } from "./index.js"
import { Lines } from "./other/lines.js"
import { AnchorX } from "./utilities/anchor.js"

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
    <AnchorX at="c">
      <CharacterRow>
        {formativeToScript(
          parseFormative("walac") || { root: "kšš", type: "UNF/C" },
        )}
      </CharacterRow>
    </AnchorX>
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

fitViewBox(node, 10)

node.insertBefore(<Lines />, node.children[0] || null)
