import type { PrimaryCharacter } from "./index.js"

/** An elidable primary character. */
export interface ElidablePrimaryCharacter extends PrimaryCharacter {
  readonly isSentenceInitial: true
  readonly affiliation?: "CSL"
  readonly bottom?: "UNF/C" | "UNF/K" | "FRM"
  readonly configuration?: "UPX"
  readonly context?: "EXS"
  readonly essence?: "NRM"
  readonly extension?: "DEL"
  readonly function?: "STA"
  readonly perspective?: "M"
  readonly specification?: "BSC"
  readonly stem?: 1
  readonly version?: "PRC"
}

export function isElidable(
  primary: PrimaryCharacter,
): primary is ElidablePrimaryCharacter {
  if (!primary.isSentenceInitial) {
    return false
  }

  if (primary.affiliation && primary.affiliation != "CSL") {
    return false
  }

  if (primary.bottom == 1 || primary.bottom == 2) {
    return false
  }

  if (primary.configuration && primary.configuration != "UPX") {
    return false
  }

  if (primary.context && primary.context != "EXS") {
    return false
  }

  if (primary.essence == "RPV") {
    return false
  }

  if (primary.extension && primary.extension != "DEL") {
    return false
  }

  if (primary.function == "DYN") {
    return false
  }

  if (primary.perspective && primary.perspective != "M") {
    return false
  }

  if (primary.specification && primary.specification != "BSC") {
    return false
  }

  if (primary.stem != null && primary.stem != 1) {
    return false
  }

  if (primary.version == "CPT") {
    return false
  }

  return true
}
