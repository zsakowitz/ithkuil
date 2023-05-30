import type {
  PartialReferential,
  Referential,
  ReferentialReferentialCore,
  SuppletiveReferentialCore,
} from "./index.js"
import { deepFreeze } from "../helpers/deep-freeze.js"
import { fillDefaults } from "../helpers/fill-defaults.js"

/** The default referential (1m:NEU, M, THM, NRM). */
export const DEFAULT_REFERENTIAL: ReferentialReferentialCore =
  /* @__PURE__ */ deepFreeze({
    referrents: ["1m:NEU"],
    perspective: "M",
    case: "THM",
    essence: "NRM",
  })

/** The default suppletive referential (CAR, THM, NRM). */
export const DEFAULT_SUPPLETIVE_REFERENTIAL: SuppletiveReferentialCore =
  /* @__PURE__ */ deepFreeze({
    type: "CAR",
    case: "THM",
    essence: "NRM",
  })

/**
 * Fills default values into empty slots of a referential/
 * @param referential The referential to be filled.
 * @returns A complete referential, with all default slots filled.
 */
export function fillInDefaultReferentialSlots(
  referential: PartialReferential
): Referential {
  if (referential.perspective2 || referential.referrent2) {
    if (
      referential.specification ||
      (referential.affixes && (referential as Referential).affixes!.length)
    ) {
      throw new Error(
        "A referential cannot specify a second referrent/perspective and a specification or affix at the same time.",
        { cause: referential }
      )
    }

    return referential.type
      ? fillDefaults<Referential>(
          {
            ...DEFAULT_SUPPLETIVE_REFERENTIAL,
            perspective2: "M",
            // @ts-ignore
            referrent2: "1m:NEU",
          },
          referential
        )
      : fillDefaults<Referential>(
          {
            ...DEFAULT_REFERENTIAL,
            perspective2: "M",
            // @ts-ignore
            referrent2: "1m:NEU",
          },
          referential
        )
  }

  if (
    referential.specification ||
    (referential.affixes && referential.affixes.length)
  ) {
    if (referential.perspective2 || referential.referrent2) {
      throw new Error(
        "A referential cannot specify a second referrent/perspective and a specification or affix at the same time.",
        { cause: referential }
      )
    }

    return referential.type
      ? fillDefaults<Referential>(
          {
            ...DEFAULT_SUPPLETIVE_REFERENTIAL,
            specification: "BSC",
            affixes: [],
          },
          referential
        )
      : fillDefaults<Referential>(
          {
            ...DEFAULT_REFERENTIAL,
            specification: "BSC",
            affixes: [],
          },
          referential
        )
  }

  return referential.type
    ? fillDefaults(DEFAULT_SUPPLETIVE_REFERENTIAL, referential)
    : fillDefaults(DEFAULT_REFERENTIAL, referential)
}
