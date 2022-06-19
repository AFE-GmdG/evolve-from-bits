import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import EvolveContext from "../../context/evolveContext";

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: {
    position: "sticky",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  svgContainer: {
    flex: "1 0 0px",
    backgroundColor: theme.palette.background.default,
    overflow: "scroll",
  },
  svg: {
    position: "relative",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
}));

const Network: React.FC = () => {
  const classes = useStyles();

  const { creatures, selectedCreature, selectCreature, generateNewCreature } = React.useContext(EvolveContext);

  const handleCreatureSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === "") {
      selectCreature(null);
      return;
    }
    const value = event.target.value as number;
    selectCreature(value);
  };

  return (
    <>
      <div className={classes.toolbar}>
        <FormControl className={classes.formControl}>
          <InputLabel id="creatue-select-label" shrink>Creature</InputLabel>
          <Select
            labelId="creature-select-label"
            id="creature-select"
            displayEmpty
            value={selectedCreature ? selectedCreature.id : ""}
            onChange={handleCreatureSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              creatures.map((creature) => (
                <MenuItem
                  key={creature.id}
                  value={creature.id}
                >
                  {creature.name}
                </MenuItem>
              ))
            }
          </Select>
          <FormHelperText>Select a creature</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            onClick={generateNewCreature}
          >
            New Creature
          </Button>
          <FormHelperText>Add new creatue</FormHelperText>
        </FormControl>
      </div>
      <div className={classes.svgContainer}>
        <svg
          className={classes.svg}
          width={1000}
          height={1000}
          viewBox="0 0 1000 1000"
        >
          <g />
        </svg>
      </div>
    </>
  );
};

export default Network;
