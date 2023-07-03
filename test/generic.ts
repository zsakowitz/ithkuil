import { zodPartialFormative } from "../generator/formative/index.js"
import { parseFormative } from "../parser/index.js"

const result = zodPartialFormative.parse(parseFormative("rrata"))

console.log(result)
