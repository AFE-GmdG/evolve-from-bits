/* eslint-disable no-bitwise */

import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Point } from "types/math";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  body: {
    stroke: "#000",
    fill: "#7f1cdd",
  },
}));

export type CreatureProps = {
  creature: {
    location: Point;
    orientation: number;
    bodyLength: number;
  };
};

const Creature: React.FC<CreatureProps> = ({
  creature: {
    location: {
      x,
      y,
    },
    orientation,
    bodyLength,
  },
}) => {
  const classes = useStyles();

  return (
    <g transform={`translate(${x},${y}) rotate(${orientation})`}>
      <circle className={classes.body} cx={0} cy={bodyLength} r={bodyLength} transform="scale(0.9,1.3)" />
      <circle className={classes.body} cx={0} cy={0} r={bodyLength} />
    </g>
  );
};

export default Creature;
