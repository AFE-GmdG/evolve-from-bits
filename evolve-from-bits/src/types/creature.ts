/* eslint-disable no-bitwise */

import { Food } from "./food";

export type Creature = {
  id: number;
  name: string;

  maleParentId: number | null;
  femaleParentId: number | null;

  age: number;
  childUntilAge: number;
  breedUntilAge: number;
  maxAge: number;

  gender: "male" | "female";

  bodyHue: number;
  eyeHue: number;

  bodySize: number;
  maxBodySize: number;
  clawSize: number;
  frontLegSize: number;
  middleLegSize: number;
  backLegSize: number;
  tailSize: number;
  growRate: number;

  hp: number;
  maxHp: number;
  hunger: number;

  pregnant: boolean;
  pregnancyProgress: number;
  pregnancyDuration: number;

  dead: boolean;
  deadAt: number;
  deadFoodValue: number;
};

export const advanceCreature = (
  time: number,
  creature: Creature,
  otherCreatures: Creature[],
  food: Food[],
): (Creature | null) => {
  const newCreature = { ...creature };

  newCreature.age += 1;

  // Kill the creature if it's too old, too hungry or it's hp is too low.
  if (!creature.dead
    && (
      creature.age > creature.maxAge
      || creature.hunger >= 1
      || creature.hp <= 0
    )
  ) {
    newCreature.dead = true;
    newCreature.deadAt = time;
    newCreature.deadFoodValue = (newCreature.bodySize * (10 - (newCreature.hunger * 7))) | 0;
  }

  // Decrease the dead food value.
  if (creature.dead && creature.deadFoodValue > 0) {
    newCreature.deadFoodValue -= 1;
  }

  // Remove the creature if it's dead and it's dead food value becomes 0.
  if (creature.dead && newCreature.deadFoodValue <= 0) {
    return null;
  }

  // find the closest food
  const closestFood = food.reduce<{ food: Food | null, distance: number }>((closest, currentFood) => {
    const distance = distanceBetween(creature, food);
    if (distance < closest.distance) {
      return {
        food: currentFood,
        distance,
      };
    }
    return closest;
  }, { food: null, distance: Infinity });

  if (closestFood.food != null && closestFood.distance < (creature.bodySize + closestFood.food.amount / 10)) {
    // eat the food
    newCreature.hunger = 0;
  }

  newCreature.hp = Math.min(newCreature.hp + 1, newCreature.maxHp);
  newCreature.hunger = Math.min(newCreature.hunger + 1, newCreature.maxHp);

  if (newCreature.age >= newCreature.childUntilAge) {
    newCreature.pregnant = false;
    newCreature.pregnancyProgress = 0;
  }

  if (newCreature.age >= newCreature.breedUntilAge) {
    newCreature.pregnant = true;
    newCreature.pregnancyProgress = 0;
  }

  return newCreature;
};
