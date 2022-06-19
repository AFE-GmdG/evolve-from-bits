import { Point } from "../types/math";

export default class Creature {
  location: Point;

  constructor() {
    this.location = { x: 0, y: 0 };
  }

  renderCreature() {
    console.log("rendering creature");
  }
}
