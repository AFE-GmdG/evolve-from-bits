import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import EvolveLibContext from "../context/evolveLibContext";

export const Slash: React.FC = () => {
  console.log("Render: Slash");

  const { calculateNetwork } = React.useContext(EvolveLibContext);

  const [networkResult, setNetworkResult] = React.useState<number>(calculateNetwork());

  const onButtonClick = () => {
    setNetworkResult(calculateNetwork());
  };

  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={6}>
        <Typography variant="h3">Slash</Typography>
        <Button onClick={onButtonClick}>
          Calculate Network
        </Button>
        <Typography variant="body1">{networkResult}</Typography>
      </Grid>
    </Grid>
  );
};
