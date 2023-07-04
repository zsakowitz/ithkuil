import type { CaseScope } from "./case-scope.js"
import type { Mood } from "./mood.js"

let isConstructionAllowed = true

export let FAC_CCN: MoodOrCaseScope<"FAC", "CCN", "h", "w">
export let SUB_CCA: MoodOrCaseScope<"SUB", "CCA", "hl", "hw">
export let ASM_CCS: MoodOrCaseScope<"ASM", "CCS", "hr", "hrw">
export let SPC_CCQ: MoodOrCaseScope<"SPC", "CCQ", "hm", "hmw">
export let COU_CCP: MoodOrCaseScope<"COU", "CCP", "hn", "hnw">
export let HYP_CCV: MoodOrCaseScope<"HYP", "CCV", "hň", "hňw">

export class MoodOrCaseScope<
  M extends Mood = Mood,
  C extends CaseScope = CaseScope,
  N extends string = string,
  A extends string = string,
> {
  readonly mood: M
  readonly caseScope: C
  readonly nonAspectualValue: N
  readonly aspectualValue: A

  private constructor(
    mood: M,
    caseScope: C,
    nonAspectualValue: N,
    aspectualValue: A,
  ) {
    if (!isConstructionAllowed) {
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

  toString(isAspectual: boolean) {
    return isAspectual ? this.aspectualValue : this.nonAspectualValue
  }

  toJSON() {
    return this.mood + "/" + this.caseScope
  }

  static {
    FAC_CCN = new this("FAC", "CCN", "h", "w")
    SUB_CCA = new this("SUB", "CCA", "hl", "hw")
    ASM_CCS = new this("ASM", "CCS", "hr", "hrw")
    SPC_CCQ = new this("SPC", "CCQ", "hm", "hmw")
    COU_CCP = new this("COU", "CCP", "hn", "hnw")
    HYP_CCV = new this("HYP", "CCV", "hň", "hňw")
  }
}

isConstructionAllowed = false
