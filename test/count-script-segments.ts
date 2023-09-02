import { CORES } from "../script/secondary/core.js"
import { EXTENSIONS } from "../script/secondary/extension.js"

const totalHandwrittenScriptSegments =
  22 + // registers
  9 + // valences
  9 + // phases
  9 + // effects
  36 + // aspects
  Object.keys(CORES).length + // secondary cores
  Object.keys(EXTENSIONS).length + // vertical extensions
  Object.keys(EXTENSIONS).length + // horizontal extensions
  4 + // specifications
  16 + // diacritics
  0

const segmentsLeft = 22 + 9 + 9 + 36

console.log(
  totalHandwrittenScriptSegments,
  segmentsLeft,
  totalHandwrittenScriptSegments - segmentsLeft,
)
