import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Network from "../components/network";
import PropertyEditor, { PropertyMetadataArray } from "../components/propertyEditor";

import EvolveContext from "../context/evolveContext";

import { isMouseEvent } from "../types/events";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    flex: "1 0 0px",
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    alignItems: "stretch",
    height: "100%",
  },
  networkContainer: {
    position: "relative",
    flex: "67 0 0px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  splitter: {
    position: "relative",
    flex: "0 0 5px",
    backgroundColor: theme.palette.divider,
    cursor: "pointer",
  },
  collapsed: {
  },
  dataContainer: {
    position: "relative",
    flex: "33 0 0px",
    margin: 0,
    padding: 0,
    overflow: "scroll",
    transition: "flex-grow 500ms ease-in-out",
    "&$collapsed": {
      flexGrow: 0,
    },
  },
  propertyEditor: {
    width: 610,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const creatureMetadataArray: PropertyMetadataArray = [
  {
    propertyName: "id",
    propertyDescription: "The unique identifier of the creature.",
    groupName: "General",
  },
  {
    propertyName: "name",
    propertyDescription: "Name of the creature",
    groupName: "General",
  },
  {
    propertyName: "age",
    propertyDescription: "Age of the creature",
    groupName: "Age related",
    readonly: true,
  },
];

const Slash: React.FC = () => {
  const classes = useStyles();

  const { selectedCreature } = React.useContext(EvolveContext);
  const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapseExpand = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (isMouseEvent(event)) {
      setCollapsed(!collapsed);
      return;
    }
    if (event.key !== "Space") {
      return;
    }
    setCollapsed(!collapsed);
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <div className={classes.networkContainer}>
        <Network />
      </div>
      <div
        className={classes.splitter}
        role="switch"
        aria-checked={!collapsed}
        aria-label="Toggle data view"
        tabIndex={0}
        onClick={handleCollapseExpand}
        onKeyPress={handleCollapseExpand}
      />
      <div className={`${classes.dataContainer} ${collapsed ? classes.collapsed : ""}`}>
        <PropertyEditor
          className={classes.propertyEditor}
          metadataArray={creatureMetadataArray}
          object={selectedCreature}
        />
      </div>
    </div>
  );
};

export default Slash;
