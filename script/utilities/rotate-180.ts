export function rotate180(x: string) {
  return x
    .replace(/(?<!M[\s\d.-]+)[\d.-]+/g, "-$&")
    .replace(/-0 /g, "0 ")
    .replace(/--/g, "")
}
