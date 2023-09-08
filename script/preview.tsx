import { type RegisterAdjunct } from "../generate/index.js"
import {
  CharacterRow,
  HandleResult,
  Lines,
  fitViewBox,
  textToScript,
  type RegisterMode,
} from "./index.js"
import { HANDWRITTEN_THOUSANDS, Numeral } from "./numerals/index.js"

document.body.append(
  <script>
    {`new EventSource("/esbuild").addEventListener("change", () =>
    location.reload())`}
  </script>,
)

const lines___: any & any & any = false
const HEIGHT__: number & number = 100
const mode____: any & any & any = false
const doFitBox: any & any & any = true
const t__________: RegisterMode = "transliterative"
const b_______: RegisterAdjunct = "SPF"

function randomItem<T>(x: readonly T[]) {
  if (x.length == 0) {
    throw new Error()
  }

  return x[Math.floor(Math.random() * x.length)]!
}

const output = textToScript("walgklpyucklpdfgüöřpšgř", true)

function getColor(index: number) {
  const colors = ["blue", "green", "red", "purple", "orange"]
  return colors[~~index % colors.length]!
}

const value = (HANDWRITTEN_THOUSANDS.length - 1) * 1000 + 4

const numeral = (<Numeral value={value} />) as SVGGElement

// debug("v:", value)
// debug("w:", getBBox(numeral).width)
// debug("h:", (getBBox(numeral).height - 70) / 2)

const node = (
  <svg
    viewBox={
      {
        a: `${-HEIGHT__ * (innerWidth / innerHeight)} ${-HEIGHT__} ${
          2 * HEIGHT__ * (innerWidth / innerHeight)
        } ${2 * HEIGHT__}` as const,
        b: "-50 -50 100 100" as const,
        c: "-50 -50 60 60" as const,
        d: "10 -45 30 30" as const,
      }.b
    }
    fill="none"
    stroke="black"
    stroke-width={4}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {/* <Secondary
      top="y"
      core="p"
      bottom="y"
    /> */}

    {/* <Spread
      columns={2}
      items={"ļc řc čc".split(" ").flatMap(([core, ext]) =>
        [false, true].map((rotated) => (
          <Secondary
            handwritten
            top={ext}
            core={core}
            bottom={ext}
            rotated={rotated}
          />
        )),
      )}
    /> */}

    {/* <Spread
      y={150}
      columns={10}
      items={Array(10)
        .fill(0)
        .flatMap((_, i) =>
          Array(10)
            .fill(0)
            .map((_, j) => (
              <Numeral
                handwritten
                value={1000 * i + j}
              />
            )),
        )}
    /> */}

    {/* {numeral} */}

    {/* {[
      "blue",
      "red",
      "green",
      "purple",
      "orange",
      "blue",
      "red",
      "green",
      "purple",
      "orange",
    ]
      .map((color, value) => (
        <Anchor at="cc">
          <g
            opacity={0.5}
            fill={color}
          >
            <Numeral value={0} />
          </g>
        </Anchor>
      ))
      .slice(0)
      .slice(0, 10)} */}

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
