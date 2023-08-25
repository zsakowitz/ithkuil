import {
  ALL_AFFILIATIONS,
  ALL_CONFIGURATIONS,
  ALL_ESSENCES,
  ALL_EXTENSIONS,
  ALL_PERSPECTIVES,
} from "../generate/index.js"
import { anyText } from "../parse/index.js"

const Affiliation = anyText(...ALL_AFFILIATIONS)
const Configuration = anyText(...ALL_CONFIGURATIONS)
const Extension = anyText(...ALL_EXTENSIONS)
const Perspective = anyText(...ALL_PERSPECTIVES)
const Essence = anyText(...ALL_ESSENCES)

function parseGloss(text: string) {}
