import {
  ZodType,
  boolean,
  instanceof as instanceOf,
  literal,
  object,
  oboolean,
  string,
  undefined,
  union,
  type ParseInput,
  type ParseReturnType,
} from "zod"
import { ALL_AFFIXUAL_ADJUNCT_SCOPES } from "./generator/adjunct/affixual/scope.js"
import { ALL_BIAS_ADJUNCTS } from "./generator/adjunct/bias.js"
import { ALL_MODULAR_ADJUNCT_SCOPES } from "./generator/adjunct/modular/scope.js"
import { ALL_MODULAR_ADJUNCT_TYPES } from "./generator/adjunct/modular/type.js"
import { ALL_PARSING_ADJUNCTS } from "./generator/adjunct/parsing.js"
import {
  ALL_REGISTER_ADJUNCTS,
  ALL_SINGLE_REGISTER_ADJUNCTS,
} from "./generator/adjunct/register.js"
import { ALL_SUPPLETIVE_ADJUNCT_TYPES } from "./generator/adjunct/suppletive/type.js"
import { ALL_AFFIX_DEGREES } from "./generator/affix/degree.js"
import { ALL_REFERENTIAL_AFFIX_CASES } from "./generator/affix/index.js"
import { ALL_AFFIX_TYPES } from "./generator/affix/type.js"
import { ALL_AFFILIATIONS } from "./generator/ca/affiliation.js"
import { ALL_CONFIGURATIONS } from "./generator/ca/configuration.js"
import { ALL_ESSENCES } from "./generator/ca/essence.js"
import { ALL_EXTENSIONS } from "./generator/ca/extension.js"
import { ALL_PERSPECTIVES } from "./generator/ca/perspective.js"
import type {
  CoreFormative,
  PartialCoreFormative,
} from "./generator/formative/index.js"
import { ALL_SHORTCUT_TYPES } from "./generator/formative/shortcut-type.js"
import { ALL_CA_SHORTCUT_TYPES } from "./generator/formative/slot-1/ca-shortcut-type.js"
import { ALL_CONCATENATION_TYPES } from "./generator/formative/slot-1/concatenation-type.js"
import { ALL_SLOT_X_STRESSES } from "./generator/formative/slot-10/index.js"
import { ALL_AFFIX_SHORTCUTS } from "./generator/formative/slot-2/affix-shortcut.js"
import { ALL_STEMS } from "./generator/formative/slot-2/stem.js"
import { ALL_VERSIONS } from "./generator/formative/slot-2/version.js"
import { ALL_CONTEXTS } from "./generator/formative/slot-4/context.js"
import { ALL_FUNCTIONS } from "./generator/formative/slot-4/function.js"
import { ALL_SPECIFICATIONS } from "./generator/formative/slot-4/specification.js"
import { ALL_ASPECTS } from "./generator/formative/slot-8/aspect.js"
import { ALL_CASE_SCOPES } from "./generator/formative/slot-8/case-scope.js"
import { ALL_EFFECTS } from "./generator/formative/slot-8/effect.js"
import { ALL_LEVELS } from "./generator/formative/slot-8/level.js"
import { MoodOrCaseScope } from "./generator/formative/slot-8/mood-or-case-scope.js"
import { ALL_MOODS } from "./generator/formative/slot-8/mood.js"
import { ALL_PHASES } from "./generator/formative/slot-8/phase.js"
import { ALL_VALENCES } from "./generator/formative/slot-8/valence.js"
import { ALL_VN_TYPES } from "./generator/formative/slot-8/vn-type.js"
import { ALL_CASES } from "./generator/formative/slot-9/case.js"
import { ALL_ILLOCUTION_OR_VALIDATIONS } from "./generator/formative/slot-9/illocution-and-validation.js"
import { ALL_ILLOCUTIONS } from "./generator/formative/slot-9/illocution.js"
import { ALL_VALIDATIONS } from "./generator/formative/slot-9/validation.js"
import { ALL_DIPTHONGS } from "./generator/helpers/dipthongs.js"
import { ALL_REFERENT_EFFECTS } from "./generator/referential/referent/effect.js"
import { ALL_REFERENTS } from "./generator/referential/referent/referent.js"
import { ALL_REFERENT_TARGETS } from "./generator/referential/referent/target.js"
import type {
  PartialReferentialReferentialCore,
  PartialSuppletiveReferentialCore,
  ReferentialCore,
  ReferentialReferentialCore,
  SuppletiveReferentialCore,
} from "./generator/referential/referential.js"

/** A `ZodType` matching a specific enumerated set of literals. */
export class Enum<const T> extends ZodType<T> {
  /**
   * Constructs an `Enum`.
   * @param items The items to match against.
   * @returns The constructed `Enum`.
   */
  constructor(readonly items: readonly T[]) {
    super({})
    Object.freeze(this)
  }

  _parse(input: ParseInput): ParseReturnType<T> {
    if (this.items.includes(input.data)) {
      return {
        status: "valid",
        value: input.data,
      }
    } else {
      return {
        status: "aborted",
      }
    }
  }
}

// #region Literals

/** A Zod validator matching affiliations. */
export const affiliation = /* @__PURE__ */ new Enum(ALL_AFFILIATIONS)

/** A Zod validator matching affix degrees. */
export const affixDegree = /* @__PURE__ */ new Enum(ALL_AFFIX_DEGREES)

/** A Zod validator matching affix shortcuts. */
export const affixShortcut = /* @__PURE__ */ new Enum(ALL_AFFIX_SHORTCUTS)

/** A Zod validator matching affix types. */
export const affixType = /* @__PURE__ */ new Enum(ALL_AFFIX_TYPES)

/** A Zod validator matching affixual adjunct scopes. */
export const affixualAdjunctScope = /* @__PURE__ */ new Enum(
  ALL_AFFIXUAL_ADJUNCT_SCOPES,
)

/** A Zod validator matching aspects. */
export const aspect = /* @__PURE__ */ new Enum(ALL_ASPECTS)

/** A Zod validator matching bias adjuncts. */
export const biasAdjunct = /* @__PURE__ */ new Enum(ALL_BIAS_ADJUNCTS)

/** A Zod validator matching Ca shortcut types. */
export const caShortcutType = /* @__PURE__ */ new Enum(ALL_CA_SHORTCUT_TYPES)

/** A Zod validator matching cases. */
export const case_ = /* @__PURE__ */ new Enum(ALL_CASES)

/** A Zod validator matching case scopes. */
export const caseScope = /* @__PURE__ */ new Enum(ALL_CASE_SCOPES)

/** A Zod validator matching concatenation types. */
export const concatenationType = /* @__PURE__ */ new Enum(
  ALL_CONCATENATION_TYPES,
)

/** A Zod validator matching configurations. */
export const configuration = /* @__PURE__ */ new Enum(ALL_CONFIGURATIONS)

/** A Zod validator matching contexts. */
export const context = /* @__PURE__ */ new Enum(ALL_CONTEXTS)

/** A Zod validator matching dipthongs. */
export const dipthong = /* @__PURE__ */ new Enum(ALL_DIPTHONGS)

/** A Zod validator matching effects. */
export const effect = /* @__PURE__ */ new Enum(ALL_EFFECTS)

/** A Zod validator matching essences. */
export const essence = /* @__PURE__ */ new Enum(ALL_ESSENCES)

/** A Zod validator matching extensions. */
export const extension = /* @__PURE__ */ new Enum(ALL_EXTENSIONS)

/** A Zod validator matching functions. */
export const function_ = /* @__PURE__ */ new Enum(ALL_FUNCTIONS)

/** A Zod validator matching illocutions. */
export const illocution = /* @__PURE__ */ new Enum(ALL_ILLOCUTIONS)

/** A Zod validator matching non-ASR illocutions and validations. */
export const illocutionOrValidation = /* @__PURE__ */ new Enum(
  ALL_ILLOCUTION_OR_VALIDATIONS,
)

/** A Zod validator matching levels. */
export const level = /* @__PURE__ */ new Enum(ALL_LEVELS)

/** A Zod validator matching modular adjunct scopes. */
export const modularAdjunctScope = /* @__PURE__ */ new Enum(
  ALL_MODULAR_ADJUNCT_SCOPES,
)

/** A Zod validator matching modular adjunct types. */
export const modularAdjunctType = /* @__PURE__ */ new Enum(
  ALL_MODULAR_ADJUNCT_TYPES,
)

/** A Zod validator matching moods. */
export const mood = /* @__PURE__ */ new Enum(ALL_MOODS)

/** A Zod validator matching parsing adjuncts. */
export const parsingAdjunct = /* @__PURE__ */ new Enum(ALL_PARSING_ADJUNCTS)

/** A Zod validator matching perspectives. */
export const perspective = /* @__PURE__ */ new Enum(ALL_PERSPECTIVES)

/** A Zod validator matching phases. */
export const phase = /* @__PURE__ */ new Enum(ALL_PHASES)

/** A Zod validator matching referents. */
export const referent = /* @__PURE__ */ new Enum(ALL_REFERENTS)

/** A Zod validator matching referent effects. */
export const referentEffect = /* @__PURE__ */ new Enum(ALL_REFERENT_EFFECTS)

/** A Zod validator matching referent targets. */
export const referentTarget = /* @__PURE__ */ new Enum(ALL_REFERENT_TARGETS)

/** A Zod validator matching referential affix cases. */
export const referentialAffixCase = /* @__PURE__ */ new Enum(
  ALL_REFERENTIAL_AFFIX_CASES,
)

/** A Zod validator matching register adjuncts. */
export const registerAdjunct = /* @__PURE__ */ new Enum(ALL_REGISTER_ADJUNCTS)

/** A Zod validator matching shortcut types. */
export const shortcutType = /* @__PURE__ */ new Enum(ALL_SHORTCUT_TYPES)

/** A Zod validator matching single register adjuncts. */
export const singleRegisterAdjunct = /* @__PURE__ */ new Enum(
  ALL_SINGLE_REGISTER_ADJUNCTS,
)

/** A Zod validator matching specifications. */
export const specification = /* @__PURE__ */ new Enum(ALL_SPECIFICATIONS)

/** A Zod validator matching stems. */
export const stem = /* @__PURE__ */ new Enum(ALL_STEMS)

/** A Zod validator matching suppletive adjunct types. */
export const suppletiveAdjunctType = /* @__PURE__ */ new Enum(
  ALL_SUPPLETIVE_ADJUNCT_TYPES,
)

/** A Zod validator matching valences. */
export const valence = /* @__PURE__ */ new Enum(ALL_VALENCES)

/** A Zod validator matching validations. */
export const validation = /* @__PURE__ */ new Enum(ALL_VALIDATIONS)

/** A Zod validator matching versions. */
export const version = /* @__PURE__ */ new Enum(ALL_VERSIONS)

/** A Zod validator matching Vn types. */
export const vnType = /* @__PURE__ */ new Enum(ALL_VN_TYPES)

// #endregion

// #region More Validators

/** A Zod validator matching `MoodOrCaseScope` instances. */
export const moodOrCaseScope = /* @__PURE__ */ instanceOf(
  MoodOrCaseScope as new () => MoodOrCaseScope,
)

/** A Zod validator matching Cn forms. */
export const cn = /* @__PURE__ */ union([mood, caseScope, moodOrCaseScope])

/** A Zod validator matching non-aspectual Vn forms. */
export const nonAspectualVn = /* @__PURE__ */ union([
  valence,
  phase,
  effect,
  level,
])

/** A Zod validator matching Vn forms. */
export const vn = /* @__PURE__ */ union([valence, phase, effect, level, aspect])

/** A Zod validator matching Ca forms. */
export const ca = /* @__PURE__ */ object({
  affiliation,
  configuration,
  extension,
  perspective,
  essence,
})

/** A Zod validator matching partial Ca forms. */
export const partialCA = /* @__PURE__ */ ca.partial()

/** A Zod validator matching affixes. */
export const affix = /* @__PURE__ */ union([
  /* @__PURE__ */ object({
    type: affixType,
    degree: affixDegree,
    cs: /* @__PURE__ */ string(),
    ca: /* @__PURE__ */ undefined().optional(),
    referent: /* @__PURE__ */ undefined().optional(),
    case: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    ca: partialCA,
    cs: /* @__PURE__ */ undefined().optional(),
    referent: /* @__PURE__ */ undefined().optional(),
    case: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    referent: referent,
    perspective: /* @__PURE__ */ new Enum(["M", "G", "N"]).optional(),
    case: referentialAffixCase,
    cs: /* @__PURE__ */ undefined().optional(),
    ca: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    case: case_,
    type: affixType,
    isInverse: /* @__PURE__ */ boolean(),
    cs: /* @__PURE__ */ undefined().optional(),
    ca: /* @__PURE__ */ undefined().optional(),
    referent: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    case: case_,
    cs: /* @__PURE__ */ undefined().optional(),
    ca: /* @__PURE__ */ undefined().optional(),
    referent: /* @__PURE__ */ undefined().optional(),
    type: /* @__PURE__ */ undefined().optional(),
  }),
])

/** A Zod validator matching affix matadata. */
export const affixMetadata = /* @__PURE__ */ object({
  reversed: /* @__PURE__ */ boolean(),
  insertGlottalStop: /* @__PURE__ */ oboolean(),
  isGlottalStopWordFinal: /* @__PURE__ */ oboolean(),
})

/** A Zod validator matching a list of referents. */
export const referentList = /* @__PURE__ */ referent.array().nonempty()

/** A Zod validator matching {@link ReferentialReferentialCore}s. */
export const referentialReferentialCore = /* @__PURE__ */ object({
  referents: referentList,
  perspective: perspective,
  type: /* @__PURE__ */ undefined().optional(),
  case: case_,
  case2: /* @__PURE__ */ case_.optional(),
  essence,
})

/** A Zod validator matching suppletive adjuncts. */
export const suppletiveAdjunct = /* @__PURE__ */ object({
  type: suppletiveAdjunctType,
  case: case_,
})

/** A Zod validator matching {@link SuppletiveReferentialCore}s. */
export const suppletiveReferentialCore = /* @__PURE__ */ object({
  referents: /* @__PURE__ */ undefined().optional(),
  perspective: /* @__PURE__ */ undefined().optional(),
  type: suppletiveAdjunctType,
  case: case_,
  case2: /* @__PURE__ */ case_.optional(),
  essence,
})

/** A Zod validator matching {@link ReferentialCore}s. */
export const referentialCore = /* @__PURE__ */ union([
  referentialReferentialCore,
  suppletiveReferentialCore,
])

/** A Zod validator matching referent objects. */
export const referentObject = /* @__PURE__ */ object({
  target: referentTarget,
  effect: referentEffect,
})

/** A Zod validator matching {@link PartialReferentialReferentialCore}s. */
export const partialReferentialReferentialCore = /* @__PURE__ */ object({
  referents: referentList,
  perspective: /* @__PURE__ */ perspective.optional(),
  type: /* @__PURE__ */ undefined().optional(),
  case: /* @__PURE__ */ case_.optional(),
  case2: /* @__PURE__ */ case_.optional(),
  essence: /* @__PURE__ */ essence.optional(),
})

/** A Zod validator matching {@link PartialSuppletiveReferentialCore}s. */
export const partialSuppletiveReferentialCore = /* @__PURE__ */ object({
  referents: /* @__PURE__ */ undefined().optional(),
  perspective: /* @__PURE__ */ undefined().optional(),
  type: suppletiveAdjunctType,
  case: /* @__PURE__ */ case_.optional(),
  case2: /* @__PURE__ */ case_.optional(),
  essence: /* @__PURE__ */ essence.optional(),
})

/** A Zod validator matching {@link PartialReferentialCore}s. */
export const partialReferentialCore = /* @__PURE__ */ union([
  partialReferentialReferentialCore,
  partialSuppletiveReferentialCore,
])

/** A Zod validator matching referentials. */
export const referential = /* @__PURE__ */ union([
  /* @__PURE__ */ referentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ referentialCore.and(
    /* @__PURE__ */ object({
      referent2: referent,
      perspective2: perspective,
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ referentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: specification,
      affixes: /* @__PURE__ */ affix.array(),
    }),
  ),
])

/** A Zod validator matching partial referentials. */
export const partialReferential = /* @__PURE__ */ union([
  /* @__PURE__ */ partialReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ partialReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: referent,
      perspective2: /* @__PURE__ */ perspective.optional(),
      specification: /* @__PURE__ */ undefined().optional(),
      affixes: /* @__PURE__ */ undefined().optional(),
    }),
  ),
  /* @__PURE__ */ partialReferentialCore.and(
    /* @__PURE__ */ object({
      referent2: /* @__PURE__ */ undefined().optional(),
      perspective2: /* @__PURE__ */ undefined().optional(),
      specification: /* @__PURE__ */ specification.optional(),
      affixes: /* @__PURE__ */ affix.array().optional(),
    }),
  ),
])

/** A Zod validator matching modular adjuncts. */
export const modularAdjunct = /* @__PURE__ */ union([
  /* @__PURE__ */ object({
    type: /* @__PURE__ */ modularAdjunctType.optional(),
    cn: /* @__PURE__ */ undefined().optional(),
    vn1: aspect,
    vn2: /* @__PURE__ */ undefined().optional(),
    vn3: /* @__PURE__ */ undefined().optional(),
    scope: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    type: /* @__PURE__ */ modularAdjunctType.optional(),
    cn,
    vn1: vn,
    vn2: /* @__PURE__ */ vn.optional(),
    vn3: nonAspectualVn,
    scope: /* @__PURE__ */ undefined().optional(),
  }),
  /* @__PURE__ */ object({
    type: /* @__PURE__ */ modularAdjunctType.optional(),
    cn,
    vn1: vn,
    vn2: /* @__PURE__ */ vn.optional(),
    vn3: /* @__PURE__ */ undefined().optional(),
    scope: modularAdjunctScope,
  }),
])

/** A Zod validator matching affixual adjuncts. */
export const affixualAdjunct = /* @__PURE__ */ object({
  affixes: /* @__PURE__ */ affix.array().nonempty(),
  scope: /* @__PURE__ */ affixualAdjunctScope.optional(),
  scope2: /* @__PURE__ */ affixualAdjunctScope.optional(),
  appliesToConcatenatedStemOnly: /* @__PURE__ */ oboolean(),
})

/** A Zod validator matching adjuncts. */
export const adjunct = /* @__PURE__ */ union([
  affixualAdjunct,
  biasAdjunct,
  modularAdjunct,
  parsingAdjunct,
  registerAdjunct,
  singleRegisterAdjunct,
  suppletiveAdjunct,
])

/**
 * A Zod validator matching adjuncts other than non-single register adjuncts.
 */
export const plainAdjunct = /* @__PURE__ */ union([
  affixualAdjunct,
  biasAdjunct,
  modularAdjunct,
  parsingAdjunct,
  singleRegisterAdjunct,
  suppletiveAdjunct,
])

// #endregion

// #region Formative Slots

/** A Zod validator matching Slot I data. */
export const slotI = /* @__PURE__ */ object({
  concatenationType: concatenationType,
  caShortcutType: caShortcutType,
})

/** A Zod validator matching Slot III data. */
export const slotIII = /* @__PURE__ */ union([
  /* @__PURE__ */ string(),
  referentList,
  /* @__PURE__ */ object({
    degree: affixDegree,
    cs: /* @__PURE__ */ string(),
  }),
])

/** A Zod validator matching Slot II data. */
export const slotII = /* @__PURE__ */ object({ stem, version })

/** A Zod validator matching Slot II metadata. */
export const slotIIMetadata = /* @__PURE__ */ object({
  slotI: /* @__PURE__ */ string(),
  slotIII,
  affixShortcut: /* @__PURE__ */ affixShortcut.optional(),
  doesSlotVHaveAtLeastTwoAffixes: /* @__PURE__ */ boolean(),
  function: function_,
})

/** A Zod validator matching Slot IV data. */
export const slotIV = /* @__PURE__ */ object({
  function: function_,
  specification,
  context,
})

/** A Zod validator matching Slot IV metadata. */
export const slotIVMetadata = /* @__PURE__ */ object({
  slotIII: /* @__PURE__ */ string(),
  affixualFormativeDegree: /* @__PURE__ */ affixDegree.optional(),
})

/** A Zod validator matching Slot V data. */
export const slotV = /* @__PURE__ */ affix.array()

/** A Zod validator matching Slot V metadata. */
export const slotVMetadata = /* @__PURE__ */ object({
  isSlotVIElided: /* @__PURE__ */ boolean(),
  isAtEndOfWord: /* @__PURE__ */ boolean(),
})

/** A Zod validator matching Slot VI data. */
export const slotVI = ca

/** A Zod validator matching Slot VI metadata. */
export const slotVIMetadata = /* @__PURE__ */ object({
  isSlotVFilled: /* @__PURE__ */ boolean(),
})

/** A Zod validator matching Slot VII data. */
export const slotVII = /* @__PURE__ */ affix.array()

/** A Zod validator matching Slot VIII data. */
export const slotVIII = /* @__PURE__ */ object({ vn, cn })

/** A Zod validator matching Slot VIII metadata. */
export const slotVIIIMetadata = /* @__PURE__ */ object({
  omitDefault: /* @__PURE__ */ boolean(),
})

/** A Zod validator matching Slot IX data. */
export const slotIX = /* @__PURE__ */ union([case_, illocutionOrValidation])

/** A Zod validator matching Slot IX metadata. */
export const slotIXMetadata = /* @__PURE__ */ object({
  elideIfPossible: /* @__PURE__ */ boolean(),
  isPartOfConcatenatedFormative: /* @__PURE__ */ boolean(),
})

/** A Zod validator matching Slot X data. */
export const slotX = /* @__PURE__ */ new Enum(ALL_SLOT_X_STRESSES)

// #endregion

// #region Formatives

/** A Zod validator matching {@link CoreFormative}s. */
export const coreFormative = /* @__PURE__ */ object({
  version: version,
  stem: stem,
  root: slotIII,
  function: function_,
  specification: specification,
  context: context,
  slotVAffixes: slotV,
  ca: slotVI,
  slotVIIAffixes: slotVII,
  vn: vn,
  shortcut: shortcutType,
})

/** A Zod validator matching {@link PartialCoreFormative}s. */
export const partialCoreFormative = /* @__PURE__ */ object({
  version: /* @__PURE__ */ version.optional(),
  stem: /* @__PURE__ */ stem.optional(),
  root: slotIII,
  function: /* @__PURE__ */ function_.optional(),
  specification: /* @__PURE__ */ specification.optional(),
  context: /* @__PURE__ */ context.optional(),
  slotVAffixes: /* @__PURE__ */ slotV.optional(),
  ca: partialCA,
  slotVIIAffixes: /* @__PURE__ */ slotVII.optional(),
  vn: /* @__PURE__ */ vn.optional(),
  shortcut: /* @__PURE__ */ shortcutType.optional(),
})

/** A Zod validator matching nominal formatives. */
export const nominalFormative = /* @__PURE__ */ coreFormative.extend({
  type: /* @__PURE__ */ literal("UNF/C"),
  concatenationType: concatenationType,
  caseScope: caseScope,
  case: case_,
})

/** A Zod validator matching partial nominal formatives. */
export const partialNominalFormative =
  /* @__PURE__ */ partialCoreFormative.extend({
    type: /* @__PURE__ */ literal("UNF/C"),
    concatenationType: /* @__PURE__ */ concatenationType.optional(),
    caseScope: /* @__PURE__ */ caseScope.optional(),
    case: /* @__PURE__ */ case_.optional(),
  })

/** A Zod validator matching unframed verbal formatives. */
export const unframedVerbalFormative = /* @__PURE__ */ coreFormative.extend({
  type: /* @__PURE__ */ literal("UNF/K"),
  mood: mood,
  illocutionValidation: illocutionOrValidation,
})

/** A Zod validator matching partial unframed verbal formatives. */
export const partialUnframedVerbalFormative =
  /* @__PURE__ */ partialCoreFormative.extend({
    type: /* @__PURE__ */ literal("UNF/K"),
    mood: /* @__PURE__ */ mood.optional(),
    illocutionValidation: /* @__PURE__ */ illocutionOrValidation.optional(),
  })

/** A Zod validator matching framed verbal formatives. */
export const framedVerbalFormative = /* @__PURE__ */ coreFormative.extend({
  type: /* @__PURE__ */ literal("FRM"),
  caseScope: caseScope,
  case: case_,
})

/** A Zod validator matching partial framed verbal formatives. */
export const partialFramedVerbalFormative =
  /* @__PURE__ */ partialCoreFormative.extend({
    type: /* @__PURE__ */ literal("FRM"),
    caseScope: /* @__PURE__ */ caseScope.optional(),
    case: /* @__PURE__ */ case_.optional(),
  })

/** A Zod validator matching formatives. */
export const formative = /* @__PURE__ */ union([
  nominalFormative,
  unframedVerbalFormative,
  framedVerbalFormative,
])

/** A Zod validator matching partial formatives. */
export const partialFormative = /* @__PURE__ */ union([
  partialNominalFormative,
  partialUnframedVerbalFormative,
  partialFramedVerbalFormative,
])

// #endregion

export { case_ as case }
export { function_ as function }
