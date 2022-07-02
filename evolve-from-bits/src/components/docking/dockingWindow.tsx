import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme: Theme) => createStyles({
  dockingWindow: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.docking.window.background,
    borderRadius: theme.palette.docking.window.borderRadius,
    outline: `${theme.palette.docking.window.borderRadius}px solid ${theme.palette.docking.container.background}`,
    margin: theme.spacing(0.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",

    "&$toolbarBottom": {
      flexDirection: "column-reverse",
    },
  },
  toolbarBottom: {},
  toolbar: {
    flex: "0 0 auto",
  },
  content: {
    flex: "1 0 0px",
  },
}));

export type DockingWindowProps = {
  className?: string;
  toolbarBottom?: boolean;
};

const DockingWindow: React.FC<DockingWindowProps> = ({
  className,
  toolbarBottom = false,

  children,
}) => {
  const classes = useStyles();

  return (
    <div className={`${classes.dockingWindow} ${toolbarBottom ? classes.toolbarBottom : ""}`}>
      <Toolbar className={classes.toolbar} variant="dense" />

      <div className={`${classes.content} ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default DockingWindow;
