import { zodFormative } from "../generator/formative/index.js"
import { parseFormative } from "../parser/index.js"

const result = zodFormative.parse(parseFormative("rrata"))

console.log(result)
