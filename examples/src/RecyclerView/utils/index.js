// @flow

export class Dimension {
  width = 0
  height = 0

  constructor(width, height) {
    this.width = width
    this.height = height
  }
}

Dimension.of = (width, height) => new Dimension(width, height)

export class Point {
  x = 0
  y = 0

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

Point.of = (x, y) => new Point(x, y)

export class Rect {
  x = 0
  y = 0
  width = 0
  height = 0

  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}

Rect.of = (x, y, width, height) => new Rect(x, y, width, height)
