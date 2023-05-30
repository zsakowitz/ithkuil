import {
  ALL_ASPECTS,
  aspectToIthkuil,
  slotVIIIToIthkuil,
  vnToIthkuil,
  type Aspect,
  type CaseScope,
  type Effect,
  type Level,
  type Mood,
  type Phase,
  type Valence,
} from "../../formative/index.js"
import { has } from "../../helpers/has.js"
import { VOWEL_TO_STRESSED_VOWEL_MAP } from "../../helpers/stress.js"
import { EMPTY, WithWYAlternative } from "../../helpers/with-wy-alternative.js"
import {
  modularAdjunctScopeToIthkuil,
  type ModularAdjunctScope,
} from "./scope.js"
import { modularAdjunctTypeToIthkuil, type ModularAdjunctType } from "./type.js"

export * from "./scope.js"
export * from "./type.js"

/** A modular adjunct. */
export type ModularAdjunct =
  | {
      /**
       * The type of the modular adjunct, indicating whether it has scope over
       * the entire next formative, only the parent formative, or only the
       * concatenated formative.
       *
       * @default "WHOLE"
       */
      readonly type?: ModularAdjunctType | undefined

      readonly cn?: undefined

      /** The single Aspect this adjunct represents. */
      readonly vn1: Aspect

      readonly vn2?: undefined

      readonly vn3?: undefined

      readonly scope?: undefined
    }
  | {
      /**
       * The type of the modular adjunct, indicating whether it has scope over
       * the entire next formative, only the parent formative, or only the
       * concatenated formative.
       *
       * @default "WHOLE"
       */
      readonly type?: ModularAdjunctType | undefined

      /** The mood or case-scope of this adjunct. */
      readonly cn: Mood | CaseScope

      /** The first Valence/Phase/Level/Effect/Aspect marked by this adjunct. */
      readonly vn1: Valence | Phase | Level | Effect | Aspect

      /** The second Valence/Phase/Level/Effect/Aspect marked by this adjunct. */
      readonly vn2?: Valence | Phase | Level | Effect | Aspect | undefined

      /**
       * The third Valence/Phase/Level/Effect marked by this adjunct. `vn3` may
       * not be an Aspect.
       */
      readonly vn3: Valence | Phase | Level | Effect

      readonly scope?: undefined
    }
  | {
      /**
       * The type of the modular adjunct, indicating whether it has scope over
       * the entire next formative, only the parent formative, or only the
       * concatenated formative.
       *
       * @default "WHOLE"
       */
      readonly type?: ModularAdjunctType | undefined

      /** The mood or case-scope of this adjunct. */
      readonly cn: Mood | CaseScope

      /** The first Valence/Phase/Level/Effect/Aspect marked by this adjunct. */
      readonly vn1: Valence | Phase | Level | Effect | Aspect

      /** The second Valence/Phase/Level/Effect/Aspect marked by this adjunct. */
      readonly vn2?: Valence | Phase | Level | Effect | Aspect | undefined

      readonly vn3?: undefined

      /** The scope of this modular adjunct. */
      readonly scope: ModularAdjunctScope
    }

/**
 * Converts a modular adjunct into Ithkuil.
 * @param adjunct The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function modularAdjunctToIthkuil(adjunct: ModularAdjunct): string {
  const type = modularAdjunctTypeToIthkuil(adjunct.type ?? "WHOLE")

  if (adjunct.cn == null) {
    const aspect = WithWYAlternative.of(
      aspectToIthkuil(adjunct.vn1)
    ).withPreviousText(type)

    return type + aspect
  }

  const vn1 = slotVIIIToIthkuil(
    { cn: adjunct.cn, vn: adjunct.vn1 },
    { omitDefaultValence: false }
  ).withPreviousText(type)

  const second = adjunct.vn2
    ? vnToIthkuil(adjunct.vn2, false) +
      (has(ALL_ASPECTS, adjunct.vn2) ? "n" : "ň")
    : EMPTY

  const vn2 = WithWYAlternative.of(second).withPreviousText(type + vn1)

  const output = type + vn1 + vn2

  if (adjunct.vn3) {
    const vn3 = vnToIthkuil(adjunct.vn3, false)

    return WithWYAlternative.add(output, vn3)
  }

  return (
    output +
    VOWEL_TO_STRESSED_VOWEL_MAP[modularAdjunctScopeToIthkuil(adjunct.scope)]
  )
}
