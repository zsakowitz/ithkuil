import { formativeToIthkuil, parseFormative } from "../index.js"

const result1 = formativeToIthkuil({
  type: "UNF/C",
  root: { cs: "c", degree: 3 },
  caseScope: "CCA",
  shortcut: "VIII",
  context: "FNC",
})

const result2 = parseFormative(result1)

if (!result2) {
  throw new Error()
}

console.log(result2)

const result3 = formativeToIthkuil(result2)

console.log(result1)
console.log(result3)
