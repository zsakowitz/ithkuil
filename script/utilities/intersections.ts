export type Line = {
  readonly type: "l"
  readonly x1: number
  readonly y1: number
  readonly x2: number
  readonly y2: number
}

export type QuadraticBézier = {
  readonly type: "q"
  readonly x1: number
  readonly y1: number
  readonly cx: number
  readonly cy: number
  readonly x2: number
  readonly y2: number
}

export type ConstantDistanceFromQuadraticBézier = {
  readonly type: "d"
  readonly r: number
  readonly x1: number
  readonly y1: number
  readonly cx: number
  readonly cy: number
  readonly x2: number
  readonly y2: number
}

export type Circle = {
  readonly type: "a"
  readonly x: number
  readonly y: number
  readonly r: number
}

export type InputShape = Line | QuadraticBézier

export type Shape =
  | Line
  | QuadraticBézier
  | ConstantDistanceFromQuadraticBézier
  | Circle

function shapeToDesmos(shape: Shape) {
  if (shape.type == "a") {
    return String.raw`\left(x-${shape.x}\right)^{2}+\left(y-${shape.y}\right)^{2}=${shape.r}^{2}`
  }

  if (shape.type == "l") {
    return String.raw`\operatorname{polygon}\left(\left(${shape.x1},${shape.y1}\right),\left(${shape.x2},${shape.y2}\right)\right)`
  }

  if (shape.type == "q") {
    return String.raw`\left(${shape.x1},${shape.y1}\right)\left(1-2t+t^{2}\right)+\left(${shape.x2},${shape.y2}\right)t^{2}+t\left(1-t\right)\left(${shape.cx},${shape.cy}\right)`
  }

  throw new Error(
    "ConstantDistanceFromQuadraticBézier shapes are not supported yet.",
  )
}

function constantDistanceFromLine(input: Line, space: number): Shape[] {
  const output: Shape[] = [
    {
      type: "a",
      x: input.x1,
      y: input.y1,
      r: space,
    },
    {
      type: "a",
      x: input.x2,
      y: input.y2,
      r: space,
    },
  ]

  if (input.x1 == input.x2) {
    output.push(
      {
        type: "l",
        x1: input.x1 - space,
        y1: input.y1,
        x2: input.x2 - space,
        y2: input.y2,
      },
      {
        type: "l",
        x1: input.x1 + space,
        y1: input.y1,
        x2: input.x2 + space,
        y2: input.y2,
      },
    )

    return output
  }

  if (input.y1 == input.y2) {
    output.push(
      {
        type: "l",
        x1: input.x1,
        y1: input.y1 - space,
        x2: input.x2,
        y2: input.y2 - space,
      },
      {
        type: "l",
        x1: input.x1,
        y1: input.y1 + space,
        x2: input.x2,
        y2: input.y2 + space,
      },
    )

    return output
  }

  const angle = Math.atan2(input.y2 - input.y1, input.x2 - input.x1)

  output.push(
    {
      type: "l",
      x1: -space * Math.sin(angle) + input.x1,
      y1: space * Math.cos(angle) + input.y1,
      x2: -space * Math.sin(angle) + input.x2,
      y2: space * Math.cos(angle) + input.y2,
    },
    {
      type: "l",
      x1: space * Math.sin(angle) + input.x1,
      y1: -space * Math.cos(angle) + input.y1,
      x2: space * Math.sin(angle) + input.x2,
      y2: -space * Math.cos(angle) + input.y2,
    },
  )

  return output
}

function constantDistanceFromQuadratic(
  input: QuadraticBézier,
  space: number,
): Shape[] {
  const output: Shape[] = [
    {
      type: "a",
      x: input.x1,
      y: input.y1,
      r: space,
    },
    {
      type: "a",
      x: input.x2,
      y: input.y2,
      r: space,
    },
    {
      ...input,
      type: "d",
      r: space,
    },
    {
      ...input,
      type: "d",
      r: -space,
    },
  ]

  return output
}

function constantDistance(input: InputShape, space: number): Shape[] {
  return input.type == "l"
    ? constantDistanceFromLine(input, space)
    : constantDistanceFromQuadratic(input, space)
}

function doesIntersect(a: Shape, b: InputShape): boolean {
  if (a.type == "l" && a.x1 == a.x2) {
    a = { ...a, x2: a.x2 + Math.random() / 1e5 }
  }

  if (b.type == "l" && b.x1 == b.x2) {
    b = { ...b, x2: b.x2 + Math.random() / 1e5 }
  }

  if (b.type == "l") {
    if (a.type == "l") {
      // if (b.x1 == b.x2 && a.x1 == a.x2) {
      //   if (b.x1 != a.x1) {
      //     return false
      //   }

      //   const a1 = Math.min(b.y1, b.y2)
      //   const a2 = Math.max(b.y1, b.y2)
      //   const b1 = Math.min(a.y1, a.y2)
      //   const b2 = Math.max(a.y1, a.y2)

      //   return !(b1 > a2 || a1 > b2)
      // }

      // if (b.x1 == b.x2) {
      //   if (b.x1 < Math.min(a.x1, a.x2) || b.x1 > Math.max(a.x1, a.x2)) {
      //     return false
      //   }

      //   const slopeB = (a.y2 - a.y1) / (a.x2 - a.x1)
      //   const y = slopeB * (b.x1 - a.x1) + a.y1

      //   if (Math.min(b.y1, b.y2) > y || Math.max(b.y1, b.y2) < y) {
      //     return false
      //   }

      //   return true
      // }

      // if (a.x1 == a.x2) {
      //   if (a.x1 < Math.min(b.x1, b.x2) || a.x1 > Math.max(b.x1, b.x2)) {
      //     return false
      //   }

      //   const slopeA = (b.y2 - b.y1) / (b.x2 - b.x1)
      //   const y = slopeA * (a.x1 - b.x1) + b.y1

      //   if (Math.min(a.y1, a.y2) > y || Math.max(a.y1, a.y2) < y) {
      //     return false
      //   }

      //   return true
      // }

      const slopeA = (b.y2 - b.y1) / (b.x2 - b.x1)
      const slopeB = (a.y2 - a.y1) / (a.x2 - a.x1)

      if (slopeA == slopeB) {
        const yInterceptOfA = slopeA * -b.x1 + b.y1
        const yInterceptOfB = slopeB * -a.x1 + a.y1

        if (yInterceptOfA != yInterceptOfB) {
          return false
        }

        const a1 = Math.min(b.y1, b.y2)
        const a2 = Math.max(b.y1, b.y2)
        const b1 = Math.min(a.y1, a.y2)
        const b2 = Math.max(a.y1, a.y2)

        return !(b1 > a2 || a1 > b2)
      }

      const x =
        (a.y1 - a.x1 * slopeB + b.x1 * slopeA - b.y1) / (slopeA - slopeB)

      const a1 = Math.min(b.x1, b.x2)
      const a2 = Math.max(b.x1, b.x2)
      const b1 = Math.min(a.x1, a.x2)
      const b2 = Math.max(a.x1, a.x2)

      return a1 <= x && x <= a2 && b1 <= x && x <= b2
    }

    if (a.type == "q") {
      const slope = (b.y2 - b.y1) / (b.x2 - b.x1)

      const A = a.y1 + a.y2 - 2 * a.cy - slope * (a.x1 + a.x2 - 2 * a.cx)
      const B = 2 * (a.cy - a.y1 - slope * (a.cx - a.x1))
      const C = a.y1 - slope * a.x1 + slope * b.x1 - b.y1

      const discriminant = B * B - 4 * A * C

      if (discriminant < 0) {
        return false
      }

      for (const t of [
        (-B - Math.sqrt(discriminant)) / (2 * A),
        (-B + Math.sqrt(discriminant)) / (2 * A),
      ]) {
        if (0 <= t && t <= 1) {
          const x =
            (1 - t) * ((1 - t) * a.x1 + t * a.cx) +
            t * ((1 - t) * a.cx + t * a.x2)

          if (Math.min(b.x1, b.x2) <= x && x <= Math.max(b.x1, b.x2)) {
            return true
          }
        }
      }

      return false
    }
  }

  if (b.type == "q") {
    if (a.type == "l") {
      return doesIntersect(b, a)
    }
  }

  throw new Error("Unhandled case.")
}

const a: Shape = {
  type: "q",
  x1: 3,
  y1: 1,
  cx: 6,
  cy: 2,
  x2: 5,
  y2: 5,
}

const b: InputShape = {
  type: "l",
  x1: 4,
  y1: 3,
  x2: 4,
  y2: 2,
}

console.log(doesIntersect(b, a))
