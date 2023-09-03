import { ALL_BIAS_ADJUNCTS, type RegisterAdjunct } from "../generate/index.js"
import {
  CharacterRow,
  HandleResult,
  Lines,
  fitViewBox,
  textToScript,
  type RegisterMode,
  Spread,
  Bias,
  Translate,
  Secondary,
} from "./index.js"

document.body.append(
  <script>
    {`new EventSource("/esbuild").addEventListener("change", () =>
    location.reload())`}
  </script>,
)

const lines___: any & any & any = true
const HEIGHT__: number & number = 100
const mode____: any & any & any = true
const doFitBox: any & any & any = true
const t__________: RegisterMode = "transliterative"
const b_______: RegisterAdjunct = "SPF"

function randomItem<T>(x: readonly T[]) {
  if (x.length == 0) {
    throw new Error()
  }

  return x[Math.floor(Math.random() * x.length)]!
}

const output = textToScript("taličřá", true)

console.log(output)

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
    {/* <Spread
      y={200}
      columns={16}
      items={ALL_BIAS_ADJUNCTS.slice(0, -1).map((bias) => (
        <g>
          <Bias
            bias={bias}
            handwritten
          />

          <Translate
            x={0}
            y={50}
          >
            <text
              fill="blue"
              stroke-width={0}
            >
              {bias}
            </text>
          </Translate>

          <Translate y={100}>
            <Bias bias={bias} />
          </Translate>
        </g>
      ))}
    /> */}

    {/* <Register
      handwritten={!!mode____}
      mode={t__________}
      type={b_______}
    /> */}

    <HandleResult
      ok={(x) => <CharacterRow>{x}</CharacterRow>}
      error={(x) => <text>{x}</text>}
    >
      {output}
    </HandleResult>

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
