import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import DockingWindow from "./dockingWindow";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  scrollable: {
    overflow: "auto",
  },
}));

export type ErrorDockingWindowProps = {
  error: Error;
};

const ErrorDockingWindow: React.VFC<ErrorDockingWindowProps> = ({
  error,
}) => {
  const classes = useStyles();

  return (
    <DockingWindow className={classes.scrollable}>
      <Typography variant="h6">Error:</Typography>
      <Typography variant="body1" paragraph>{error.message}</Typography>
      <Typography variant="body1" paragraph>{error.stack}</Typography>
    </DockingWindow>
  );
};

export default ErrorDockingWindow;
