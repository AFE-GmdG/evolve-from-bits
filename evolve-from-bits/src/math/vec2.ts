export default class Vec2 {
  public readonly x: number;
  public readonly y: number;

  constructor();
  constructor(xy: number);
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    if (x == null) {
      this.x = 0;
      this.y = 0;
    } else if (y == null) {
      this.x = x;
      this.y = x;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  public static readonly zero = new Vec2(0, 0);
  public static readonly one = new Vec2(1, 1);
  public static readonly left = new Vec2(-1, 0);
  public static readonly right = new Vec2(1, 0);
  public static readonly up = new Vec2(0, 1);
  public static readonly down = new Vec2(0, -1);

  public add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  public subtract(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  public multiply(other: Vec2): Vec2 {
    return new Vec2(this.x * other.x, this.y * other.y);
  }

  public divide(other: Vec2): Vec2 {
    return new Vec2(this.x / other.x, this.y / other.y);
  }

  public scale(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): Vec2 {
    const magnitude = this.magnitude();
    return new Vec2(this.x / magnitude, this.y / magnitude);
  }

  public distance(other: Vec2): number {
    return this.subtract(other).magnitude();
  }

  public dot(other: Vec2): number {
    return this.x * other.x + this.y * other.y;
  }

  public cross(other: Vec2): number {
    return this.x * other.y - this.y * other.x;
  }

  public equals(other: Vec2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  public static fromAngle(angle: number): Vec2 {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  public static fromAngleDegrees(angle: number): Vec2 {
    return Vec2.fromAngle((angle * Math.PI) / 180);
  }

  public lerp(other: Vec2, t: number): Vec2 {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return new Vec2(this.x + dx * t, this.y + dy * t);
  }

  public slerp(other: Vec2, t: number): Vec2 {
    const dot = this.dot(other);
    const theta = Math.acos(dot);
    const theta0 = theta * t;
    const theta1 = theta - theta0;
    const v0 = this.normalize();
    const v1 = other.normalize();
    return v0.scale(Math.cos(theta0)).add(v1.scale(Math.sin(theta1)));
  }
}
