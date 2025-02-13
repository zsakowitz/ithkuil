import {
  type Affix,
  type ReferentialAffixCase,
} from "../../generate/affix/index.js"
import { ALL_CASES } from "../../generate/formative/slot-9/case.js"
import { deepFreeze } from "../../generate/helpers/deep-freeze.js"
import { n, parseReferentListAndPerspective } from "../index.js"
import type { VowelForm } from "../vowel-form.js"
import { parseCa } from "./ca.js"
import { parseCase } from "./case.js"

const INVALID_AFFIX_CS_FORMS = /* @__PURE__ */ deepFreeze([
  "w",
  "y",
  "ç",
  "ļ",
  "ļw",
  "ļy",
] as string[])

/**
 * Parses an affix.
 *
 * @param vx The Vx form of the affix to be parsed.
 * @param cs The Cs form of the affix to be parsed.
 * @param isAlone Whether this affix is standalone.
 * @returns The parsed affix. Throws an error if the Vx or Cs forms are invalid.
 */
export function parseAffix(vx: VowelForm, cs: string, isAlone: boolean): Affix {
  if (cs[0] == "h" || cs[0] == "w" || cs[0] == "y") {
    throw new Error("Invalid Cs form: '" + cs + "'.")
  }

  if (vx.sequence == 4 && vx.degree == 0) {
    return { ca: parseCa(cs) }
  }

  if (/^[szčšžjl][wy]$/.test(cs)) {
    if (cs[0] == "l") {
      return {
        case: parseCase(vx, cs[1] == "y"),
      }
    }

    return {
      case: parseCase(vx, cs[1] == "y"),
      isInverse: "šžj".includes(cs[0]!),
      type:
        cs[0] == "s" || cs[0] == "š" ? 1
        : cs[0] == "z" || cs[0] == "ž" ? 2
        : 3,
    }
  }

  if (vx.sequence == 4) {
    const [referents, perspective] = parseReferentListAndPerspective(cs, true)

    return {
      referents,
      perspective,
      case: ALL_CASES[vx.degree - 1]! as ReferentialAffixCase,
    }
  }

  if (vx.sequence == 3) {
    if (isAlone) {
      const [referents, perspective] = parseReferentListAndPerspective(cs, true)

      return {
        referents,
        perspective,
        case: ALL_CASES[8 + vx.degree]! as ReferentialAffixCase,
      }
    } else {
      if (INVALID_AFFIX_CS_FORMS.includes(cs)) {
        throw new Error("Invalid Cs form: '" + cs + "'.")
      }

      return {
        type: 3,
        degree: vx.degree,
        cs: n.test(cs) ? BigInt(cs.replaceAll(/_/g, "")) : cs,
      }
    }
  } else {
    if (INVALID_AFFIX_CS_FORMS.includes(cs)) {
      throw new Error("Invalid Cs form: '" + cs + "'.")
    }

    return {
      type: vx.sequence,
      degree: vx.degree,
      cs: n.test(cs) ? BigInt(cs.replaceAll(/_/g, "")) : cs,
    }
  }
}
