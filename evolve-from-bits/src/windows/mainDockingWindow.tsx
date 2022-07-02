import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import DockingWindow from "../components/docking/dockingWindow";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  mainWindow: {
    backgroundColor: "lime",
  },
}));

export type MainDockingWindowProps = {
};

const MainDockingWindow: React.VFC<MainDockingWindowProps> = () => {
  const classes = useStyles();

  return (
    <DockingWindow className={classes.mainWindow}>
      MainDockingWindow
    </DockingWindow>
  );
};

export default MainDockingWindow;
