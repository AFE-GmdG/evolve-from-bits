import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
  svgContainer: {
    position: "relative",
    flex: "67 0 0px",
    overflow: "scroll",
    display: "grid",
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
  dataContent: {
    width: 610,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  svg: {
    position: "relative",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
  blackStroke: {
    stroke: "#000",
    strokeWidth: 1,
  },
}));

const isMouseEvent = (
  event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
): event is React.MouseEvent<HTMLDivElement> => "type" in event;

const Pond: React.FC = () => {
  const classes = useStyles();

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
      <div className={classes.svgContainer}>
        <svg
          className={classes.svg}
          width={1000} // 1239
          height={1000} // 921
        >
          <line className={classes.blackStroke} x1={100} y1={100} x2={200} y2={200} />
        </svg>
      </div>
      <div
        className={classes.splitter}
        role="switch"
        aria-checked={!collapsed}
        aria-label="Collapse/Expand"
        tabIndex={0}
        onClick={handleCollapseExpand}
        onKeyPress={handleCollapseExpand}
      />
      <div className={`${classes.dataContainer} ${collapsed ? classes.collapsed : ""}`}>
        <div className={classes.dataContent}>
          Hello, World!
        </div>
      </div>
    </div>
  );
};

export default Pond;
