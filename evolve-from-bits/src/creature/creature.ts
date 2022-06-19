import Vec2 from "../math/vec2";

export default class Creature {
  location: Vec2;

  constructor() {
    this.location = Vec2.zero;
  }

  renderCreature() {
    console.log("rendering creature");
  }
}
