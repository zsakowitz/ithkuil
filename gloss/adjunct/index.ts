import {
  ALL_BIAS_ADJUNCTS,
  ALL_PARSING_ADJUNCTS,
  ALL_REGISTER_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
  BIAS_ADJUNCT_TO_NAME_MAP,
  REGISTER_ADJUNCT_TO_NAME_MAP,
  has,
  type Adjunct,
  type RegisterAdjunct,
} from "../../generate/index.js"
import { glossCn } from "../cn.js"
import { GlossString } from "../glossable.js"
import { glossVn } from "../vn.js"

/**
 * Glosses an adjunct.
 * @param adjunct The adjunct to be glossed.
 * @returns A `GlossString` representing the adjunct.
 */
export function glossAdjunct(adjunct: Adjunct): GlossString {
  if (typeof adjunct == "string") {
    if (has(ALL_BIAS_ADJUNCTS, adjunct)) {
      return new GlossString(adjunct, BIAS_ADJUNCT_TO_NAME_MAP[adjunct])
    }

    if (has(ALL_PARSING_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct == "monosyllabic"
          ? "mono:"
          : adjunct == "ultimate"
          ? "ulti:"
          : adjunct == "antepenultimate"
          ? "ante:"
          : "penu:",
        adjunct,
      )
    }

    if (has(ALL_SINGLE_REGISTER_ADJUNCTS, adjunct)) {
      return new GlossString(
        adjunct.endsWith(":START")
          ? adjunct.slice(0, 3) + " {"
          : "} " + adjunct.slice(0, 3),
        adjunct.endsWith(":START")
          ? REGISTER_ADJUNCT_TO_NAME_MAP[
              adjunct.slice(0, 3) as RegisterAdjunct
            ] + " {"
          : "} " +
            REGISTER_ADJUNCT_TO_NAME_MAP[
              adjunct.slice(0, 3) as RegisterAdjunct
            ],
      )
    }

    if (has(ALL_REGISTER_ADJUNCTS, adjunct)) {
      return new GlossString(adjunct, REGISTER_ADJUNCT_TO_NAME_MAP[adjunct])
    }

    throw new Error("Unrecognized adjunct: '" + adjunct + "'.")
  }

  if ("affixes" in adjunct && adjunct.affixes) {
    throw new Error("TODO:")
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

    return nextSegments.length == 0
      ? new GlossString("{blank}", "{empty modular adjunct}")
      : nextSegments.reduce((a, b) => a.plusString("-").plusGloss(b))
  }

  if ("type" in adjunct && adjunct.type) {
    throw new Error("TODO:")
  }

  throw new Error("Unrecognized adjunct.")
}
