import { deepFreeze } from "../../index.js"
import type { CaseScope } from "./case-scope.js"
import type { Mood } from "./mood.js"

const key = /* @__PURE__ */ Symbol()

/**
 * A class representing a value that could either be a mood or a case-scope,
 * depending on the context. This is mainly used when parsing modular adjuncts,
 * although it can also be passed to any slot expecting a Cn value.
 */
export class MoodOrCaseScope<
  M extends Mood = Mood,
  C extends CaseScope = CaseScope,
  N extends string = string,
  A extends string = string,
> {
  /** The mood this object represents. */
  readonly mood: M

  /** The case-scope this object represents. */
  readonly caseScope: C

  /**
   * The Cn value this object has when its corresponding Vn value isn't an
   * Aspect.
   */
  readonly nonAspectualValue: N

  /** The Cn value this object has when its corresponding Vn value is an Aspect. */
  readonly aspectualValue: A

  private constructor(
    mood: M,
    caseScope: C,
    nonAspectualValue: N,
    aspectualValue: A,
    lock: typeof key,
  ) {
    if (lock != key) {
      throw new Error(
        "New `MoodOrCaseScope` objects cannot be constructed. Use the exported objects instead of constructing new ones.",
      )
    }

    this.caseScope = caseScope
    this.mood = mood
    this.nonAspectualValue = nonAspectualValue
    this.aspectualValue = aspectualValue

    Object.freeze(this)
  }

  /**
   * Converts this `MoodOrCaseScope` into a Cn form.
   *
   * @param isAspectual Whether the corresponding Vn value is an Aspect.
   * @returns Romanized Ithkuilic text representing this Cn value.
   */
  toString(isAspectual: boolean) {
    return isAspectual ? this.aspectualValue : this.nonAspectualValue
  }

  /**
   * Converts this `MoodOrCaseScope` into JSON.
   *
   * @returns A string containing slash-separated mood and case-scope.
   */
  toJSON() {
    return this.mood + "/" + this.caseScope
  }
}

const X = MoodOrCaseScope as unknown as new <
  M extends Mood,
  C extends CaseScope,
  N extends string,
  A extends string,
>(
  mood: M,
  caseScope: C,
  nonAspectualValue: N,
  aspectualValue: A,
  lock: typeof key,
) => MoodOrCaseScope<M, C, N, A>

/** A `MoodOrCaseScope` representing FAC/CCN mood/case-scope. */
export const FAC_CCN = /* @__PURE__ */ new X("FAC", "CCN", "h", "w", key)

/** A `MoodOrCaseScope` representing SUB/CCA mood/case-scope. */
export const SUB_CCA = /* @__PURE__ */ new X("SUB", "CCA", "hl", "hw", key)

/** A `MoodOrCaseScope` representing ASM/CCS mood/case-scope. */
export const ASM_CCS = /* @__PURE__ */ new X("ASM", "CCS", "hr", "hrw", key)

/** A `MoodOrCaseScope` representing SPC/CCQ mood/case-scope. */
export const SPC_CCQ = /* @__PURE__ */ new X("SPC", "CCQ", "hm", "hmw", key)

/** A `MoodOrCaseScope` representing COU/CCP mood/case-scope. */
export const COU_CCP = /* @__PURE__ */ new X("COU", "CCP", "hn", "hnw", key)

/** A `MoodOrCaseScope` representing HYP/CCV mood/case-scope. */
export const HYP_CCV = /* @__PURE__ */ new X("HYP", "CCV", "hň", "hňw", key)

/** An array containing all `MoodOrCaseScope`s. */
export const ALL_MOOD_OR_CASE_SCOPES: readonly MoodOrCaseScope[] =
  /* @__PURE__ */ deepFreeze([
    FAC_CCN,
    SUB_CCA,
    ASM_CCS,
    SPC_CCQ,
    COU_CCP,
    HYP_CCV,
  ])
