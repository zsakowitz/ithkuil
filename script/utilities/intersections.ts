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

export type Shape =
  | Line
  | QuadraticBézier
  | ConstantDistanceFromQuadraticBézier
  | Circle

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

  throw new Error("Try later.")
}

const input: QuadraticBézier = {
  type: "q",
  x1: 4,
  y1: 24,
  cx: 12,
  cy: 6,
  x2: 36,
  y2: 36,
}

const output = constantDistanceFromQuadratic(input, 5)

console.log(output.map(shapeToDesmos).join("\n"))
