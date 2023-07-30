export function rotate180(x: string) {
  return x.replace(/(?<!M[\s\d.-]+)[\d.-]+/g, (x) => -x as any)
}

export function rotate180AndRotateStartingPoint(x: string) {
  return x.replace(/[\d.-]+/g, (x) => -x as any)
}
