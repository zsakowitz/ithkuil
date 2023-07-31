import "https://esm.sh/snapsvg"
import type { Valence } from "../index.js"
import { CharacterRow, formativeToScript } from "./construct/formative.js"
import { fitViewBox } from "./index.js"
import { Lines } from "./other/lines.js"

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
    <CharacterRow>
      {formativeToScript({
        type: "UNF/C",
        root: "rr",
        case: "PRD",
        caseScope: "CCQ",
        slotVAffixes: [{ cs: "nļ", type: 2, degree: 2 }],
        slotVIIAffixes: [
          { cs: "c", type: 1, degree: 3 },
          { cs: "řž", type: 2, degree: 5 },
        ],
        vn: "PTI" satisfies Valence,
      })}
    </CharacterRow>
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

fitViewBox(node, 10)

node.insertBefore(<Lines width={500} />, node.children[0] || null)
