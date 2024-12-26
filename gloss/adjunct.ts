import {
  ALL_BIAS_ADJUNCTS,
  ALL_PARSING_ADJUNCTS,
  ALL_REGISTER_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  BIAS_ADJUNCT_TO_NAME_MAP,
  CASE_TO_NAME_MAP,
  REGISTER_ADJUNCT_TO_NAME_MAP,
  SUPPLETIVE_ADJUNCT_TYPE_TO_NAME_MAP,
  has,
  type Adjunct,
  type RegisterAdjunct,
} from "../generate/index.js"
import { glossAffix } from "./affix.js"
import { glossCn } from "./cn.js"
import { GlossString } from "./glossable.js"
import { glossVn } from "./vn.js"

/**
 * Glosses an adjunct.
 * @param adjunct The adjunct to be glossed.
 * @returns A `GlossString` representing the adjunct.
 */
export function glossAdjunct(adjunct: Adjunct): GlossString {
  if (typeof adjunct == "number" || typeof adjunct == "bigint") {
    return GlossString.of("" + adjunct)
  }

  if (typeof adjunct == "string") {
    if (has(ALL_BIAS_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct,
        BIAS_ADJUNCT_TO_NAME_MAP[adjunct].toLowerCase(),
      )
    }

    if (has(ALL_PARSING_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct == "monosyllabic" ? "mono:"
        : adjunct == "ultimate" ? "ulti:"
        : adjunct == "antepenultimate" ? "ante:"
        : "penu:",
        adjunct,
      )
    }

    if (has(ALL_SINGLE_REGISTER_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct.endsWith(":START") ?
          adjunct.slice(0, 3)
        : adjunct.slice(0, 3) + "_END",

        adjunct.endsWith(":START") ?
          REGISTER_ADJUNCT_TO_NAME_MAP[
            adjunct.slice(0, 3) as RegisterAdjunct
          ].toLowerCase()
        : REGISTER_ADJUNCT_TO_NAME_MAP[
            adjunct.slice(0, 3) as RegisterAdjunct
          ].toLowerCase() + "_end",
      )
    }

    if (has(ALL_REGISTER_ADJUNCTS, adjunct)) {
      return new GlossString(adjunct, REGISTER_ADJUNCT_TO_NAME_MAP[adjunct])
    }

    throw new Error("Unrecognized adjunct: '" + adjunct + "'.")
  }

  if ("affixes" in adjunct && adjunct.affixes) {
    const firstAffix = glossAffix(adjunct.affixes[0], false)

    const scope = GlossString.of(
      adjunct.scope == "V:DOM" || !adjunct.scope ?
        ""
      : "{" +
          (adjunct.scope == "FORMATIVE" ? "formative"
          : adjunct.scope == "ADJACENT" ? "adjacent"
          : adjunct.scope) +
          "}",
    )

    const otherAffixes =
      adjunct.affixes.length > 1 ?
        adjunct.affixes
          .slice(1)
          .map((x) => glossAffix(x, false))
          .reduce((a, b) => a.plusString("-").plusGloss(b))
      : GlossString.of("")

    const scope2 = GlossString.of(
      adjunct.scope2 == "V:DOM" || !adjunct.scope2 ?
        ""
      : "{" +
          (adjunct.scope2 == "FORMATIVE" ? "formative"
          : adjunct.scope2 == "ADJACENT" ? "adjacent"
          : adjunct.scope2) +
          "}",
    )

    const concatOnly =
      adjunct.appliesToConcatenatedStemOnly ?
        new GlossString("{concat.}", "{concatenated formative only}")
      : GlossString.of("")

    return [firstAffix, scope, otherAffixes, scope2, concatOnly].reduce(
      (a, b) => (b.isEmpty() ? a : a.plusString("-").plusGloss(b)),
    )
  }

  if ("vn1" in adjunct && adjunct.vn1) {
    const segments: GlossString[] = []

    if (adjunct.type == "PARENT") {
      segments.push(new GlossString("{parent}", "{parent formative only}"))
    } else if (adjunct.type == "CONCAT") {
      segments.push(
        new GlossString("{concat.}", "{concatenated formative only}"),
      )
    }

    if (adjunct.vn1) {
      segments.push(glossVn(adjunct.vn1))
    }

    if (adjunct.cn) {
      segments.push(glossCn(adjunct.cn, true))
    }

    if (adjunct.vn2) {
      segments.push(glossVn(adjunct.vn2))
    }

    if (adjunct.vn3) {
      segments.push(glossVn(adjunct.vn3))
    }

    if (adjunct.scope == "FORMATIVE") {
      segments.push(
        new GlossString(
          "{under adj.}",
          "{scope over formative, but not adjacent adjuncts}",
        ),
      )
    } else if (adjunct.scope == "ADJACENT") {
      segments.push(
        new GlossString(
          "{over adj.}",
          "{scope over formative and adjacent adjuncts}",
        ),
      )
    } else if (adjunct.scope == "CASE/MOOD") {
      segments.push(new GlossString("{case/mood}", "{scope over case/mood}"))
    } else if (adjunct.scope == "CASE/MOOD+ILL/VAL") {
      segments.push(new GlossString("{form.}", "{scope over formative}"))
    }

    const nextSegments = segments.filter((x) => !x.isEmpty())

    return nextSegments.length == 0 ?
        new GlossString("{blank}", "{empty modular adjunct}")
      : nextSegments.reduce((a, b) => a.plusString("-").plusGloss(b))
  }

  if ("type" in adjunct && adjunct.type) {
    return new GlossString(
      "[" +
        adjunct.type +
        "]" +
        (adjunct.case == "THM" || !adjunct.case ? "" : "-" + adjunct.case),

      SUPPLETIVE_ADJUNCT_TYPE_TO_NAME_MAP[adjunct.type].toLowerCase() +
        (adjunct.case == "THM" || !adjunct.case ?
          ""
        : "-" + CASE_TO_NAME_MAP[adjunct.case].toLowerCase()),
    )
  }

  throw new Error("Unrecognized adjunct.")
}
