/* eslint-disable no-bitwise */

import React from "react";

import { Creature } from "../types/creature";
import { Food } from "../types/food";

export type EvolveContextType = {
  time: number;

  creatures: Creature[];
  selectedCreature: Creature | null;

  food: Food[];

  advanceTime: () => void;

  selectCreature: (creature: Creature | number | null) => void;
  generateNewCreature: () => void;
};

const EvolveContext = React.createContext<EvolveContextType>({
  time: 0,

  creatures: [],
  selectedCreature: null,

  food: [],

  advanceTime: () => { },

  selectCreature: () => { },
  generateNewCreature: () => { },
});

export const EvolveContextProvider: React.FC = ({
  children,
}) => {
  const [time, setTime] = React.useState(0);

  const [creatures, setCreatures] = React.useState<Creature[]>([]);
  const [newCreatureId, setNewCreatureId] = React.useState<number>(creatures.reduce((max, creature) => Math.max(max, creature.id), 0) + 1);
  const [selectedCreature, setSelectedCreature] = React.useState<Creature | null>(null);

  const [food, setFood] = React.useState<Food[]>(() => (
    Array.from({ length: 20 }).map<Food>((_, id) => ({
      id,
      amount: Math.random() * 500 + 500,
      location: {
        x: Math.random() * 900 + 50,
        y: Math.random() * 900 + 50,
      },
    }))
  ));

  const advanceTime = () => {
    setTime((currentTime) => {
      setFood((currentFood) => {
        const newFood = [...currentFood];

        setCreatures((currentCreatures) => {
          const newCreatures = currentCreatures.map((creature) => {
            const newCreature = { ...creature };
            newCreature.age += 1;

            return newCreature;
          });

          return newCreatures;
        });


      });

      return currentTime + 1;
    });
  };

  const selectCreature = (creatureOrId: Creature | number | null) => {
    if (creatureOrId === null) {
      setSelectedCreature(null);
      return;
    }
    if (typeof creatureOrId === "number") {
      setSelectedCreature(creatures.find((c) => c.id === creatureOrId) || null);
      return;
    }
    setSelectedCreature(creatures.find((c) => c.id === creatureOrId.id) || null);
  };

  const generateNewCreature = () => {
    const maxHp = (Math.random() * 900 + 100) | 0;
    const newCreature: Creature = {
      id: newCreatureId,
      name: `Creature ${newCreatureId}`,

      maleParentId: null,
      femaleParentId: null,

      age: 0,
      childUntilAge: 50,
      breedUntilAge: 300,
      maxAge: 500,

      gender: Math.random() < 0.5 ? "male" : "female",

      bodyHue: (Math.random() * 360) | 0,
      eyeHue: (Math.random() * 360) | 0,

      bodySize: 2,
      maxBodySize: Math.random() * 15 + 5,
      clawSize: Math.random() * 5 + 1,
      frontLegSize: Math.random() * 5 + 1,
      middleLegSize: Math.random() * 5 + 1,
      backLegSize: Math.random() * 5 + 1,
      tailSize: Math.random() * 5 + 1,
      growRate: Math.random() * 0.2 + 0.01,

      hp: maxHp,
      maxHp,
      hunger: 0,

      pregnant: false,
      pregnancyProgress: 0,
      pregnancyDuration: (Math.random() * 40 + 10) | 0,
    };
    setCreatures([...creatures, newCreature]);
    setSelectedCreature(newCreature);
    setNewCreatureId(newCreatureId + 1);
  };

  return (
    <EvolveContext.Provider
      value={{
        time,

        creatures,
        selectedCreature,

        food,

        advanceTime,

        selectCreature,
        generateNewCreature,
      }}
    >
      {children}
    </EvolveContext.Provider>
  );
};

export default EvolveContext;
