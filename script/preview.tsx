import type { Valence } from "../generate/index.js"
import {
  Lines,
  Tertiary,
  fitViewBox,
  type TertiarySegmentName,
} from "./index.js"

document.body.append(
  <script>
    {`new EventSource("/esbuild").addEventListener("change", () =>
    location.reload())`}
  </script>,
)

const lines___: any & any & any = true
const HEIGHT__: number & number = 70
const mode____: any & any & any = true
const doFitBox: any & any & any = false
const character_______: Valence = "MNO"
let t: TertiarySegmentName | "" = "1:DET"
let b: TertiarySegmentName | "" = t

function randomItem<T>(x: readonly T[]) {
  if (x.length == 0) {
    throw new Error()
  }

  return x[Math.floor(Math.random() * x.length)]!
}

const node = (
  <svg
    viewBox={
      {
        a: `${-HEIGHT__ * (innerWidth / innerHeight)} ${-HEIGHT__} ${
          2 * HEIGHT__ * (innerWidth / innerHeight)
        } ${2 * HEIGHT__}` as const,
        b: "-50 -50 100 100" as const,
        c: "-50 -50 60 60" as const,
        d: "-40 -45 30 30" as const,
      }.a
    }
    fill="none"
    stroke="black"
    stroke-width={4}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <Tertiary
      handwritten={!!mode____}
      valence={character_______}
      top={t ? t : undefined}
      bottom={b ? b : undefined}
    />

    {/* <HandleResult
      ok={(x) => <CharacterRow compact>{x}</CharacterRow>}
      error={(x) => <text>{x}</text>}
    >
      {textToScript("sňlio")}
    </HandleResult> */}

    {/* <Secondary
      handwritten={!!mode____}
      core={character_____}
      top={top__ ? top__ : undefined}
      bottom={botto ? botto : undefined}
    />

    <Blink>
      <Secondary
        handwritten={!!mode____}
        core={character_____}
      />
    </Blink> */}

    {/* <Spread
      columns={12}
      y={120}
      items={Object.entries(HANDWRITTEN_CORES)
        .concat(Object.entries(HANDWRITTEN_CORES))
        .filter(([, v]) => v.shape)
        .map(([k]) => k)
        .map((x) => (
          <g>
            <Secondary
              handwritten
              core={x}
              top={randomItem(Object.keys(EXTENSIONS))}
              bottom={randomItem(Object.keys(EXTENSIONS))}
            />

            <Blink>
              <Secondary
                handwritten
                core={x}
              />
            </Blink>
          </g>
        ))}
    /> */}

    {/* <Row space={0}>
      <Secondary
        handwritten
        core="STRESSED_SYLLABLE_PLACEHOLDER"
        top="z"
        right="ä"
        bottom="k"
      />

      <Secondary
        handwritten
        superposed="ë"
        top="r"
        core="STRESSED_SYLLABLE_PLACEHOLDER"
        underposed="i"
      />
    </Row> */}
  </svg>
) as SVGSVGElement

// @ts-ignore
node.style = "max-height:100vh;max-width:100vw;background:#f0f0f0"

// @ts-ignore
document.body.style =
  "margin:0;display:flex;align-items:center;justify-content:center"

document.body.appendChild(node)

if (doFitBox) {
  fitViewBox(node, typeof doFitBox == "number" ? doFitBox : 20)
}

if (lines___) {
  node.insertBefore(
    <Lines
      width={500}
      height={0}
    />,
    node.children[0] || null,
  )
}
