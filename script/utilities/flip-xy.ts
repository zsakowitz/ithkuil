export function flipXY(x: string) {
  return x.replace(/(?<!M[\s\d.-]+)([\d.-]+)\s+([\d.-]+)/g, "$2 $1")
}
