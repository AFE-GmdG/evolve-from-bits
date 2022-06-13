import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import EvolveLibContext from "../context/evolveLibContext";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  container: {
    flex: "1 0 0px",
    marginTop: 0,
    marginBottom: 0,
  },
}));

const Slash: React.FC = () => {
  const classes = useStyles();

  const { calculateNetwork } = React.useContext(EvolveLibContext);

  const [networkResult, setNetworkResult] = React.useState<number>(calculateNetwork());

  const onButtonClick = () => {
    setNetworkResult(calculateNetwork());
  };

  return (
    <Grid className={classes.container} container spacing={3}>
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

export default Slash;
