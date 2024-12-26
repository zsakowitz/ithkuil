import type { NumericAdjunct } from "../../generate/adjunct/numeric.js"
import {
  attachConstructor,
  Secondary,
  textToSecondaries,
  type ConstructableCharacter,
  type SecondaryCharacter,
} from "../index.js"
import { Numeral, type NumeralCharacter } from "./index.js"

/**
 * Converts a numeric adjunct into numeral characters.
 * @param number The number to be converted.
 * @param handwritten Whether the outputted characters should be handwritten.
 * @returns A series of constructable characters.
 */
export function numericAdjunctToNumerals(
  number: NumericAdjunct,
  handwritten?: boolean | undefined,
): ConstructableCharacter<NumeralCharacter>[] {
  if (typeof number == "number") {
    number = Math.floor(number)

    if (!Number.isSafeInteger(number)) {
      number = 0
    }
  }

  let value = BigInt(number)

  if (value < 0n) {
    value = 0n
  }

  const output: ConstructableCharacter<NumeralCharacter>[] = []

  while (value) {
    const amount = value % 10000n
    value = value / 10000n

    output.unshift({
      construct: Numeral,
      value: Number(amount),
      handwritten,
    })
  }

  if (output.length == 0) {
    output.push({
      construct: Numeral,
      value: 0,
      handwritten,
    })
  }

  return output
}

/**
 * Converts a numeric Cs or Cr form into secondary characters.
 * @param value The numeric value to write.
 * @param getCx Gets the Cs or Cr form corresponding to a given numeric value.
 * @param handwritten Whether or not to use the handwritten script.
 * @returns An array of secondary characters, or undefined if impossible.
 */
export function numericCxToSecondaries(
  value: bigint,
  getCx: (x: bigint) => string | undefined,
  handwritten: boolean | undefined,
): ConstructableCharacter<SecondaryCharacter>[] | undefined {
  const cx = getCx(value)

  if (cx == null) {
    return
  }

  return textToSecondaries(cx, {
    forcePlaceholderCharacters: true,
    handwritten,
  }).map((x) => attachConstructor(x, Secondary))
}
