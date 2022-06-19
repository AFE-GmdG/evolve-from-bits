import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Creature, { CreatureProps } from "../components/creature";

import { isMouseEvent } from "../types/events";

type CreaturePropsWithId = CreatureProps & {
  id: number;
};

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

const Pond: React.FC = () => {
  const classes = useStyles();

  const [collapsed, setCollapsed] = React.useState(false);

  const creatures = React.useMemo<CreaturePropsWithId[]>(
    () => {
      const cp: CreaturePropsWithId[] = [
        {
          id: 0,
          creature: {
            location: {
              x: Math.random() * 800 + 100,
              y: Math.random() * 800 + 100,
            },
            orientation: Math.random() * 360,
            bodyLength: Math.random() * 15 + 5,
          },
        }, {
          id: 1,
          creature: {
            location: {
              x: Math.random() * 800 + 100,
              y: Math.random() * 800 + 100,
            },
            orientation: Math.random() * 360,
            bodyLength: Math.random() * 15 + 5,
          },
        }, {
          id: 2,
          creature: {
            location: {
              x: Math.random() * 800 + 100,
              y: Math.random() * 800 + 100,
            },
            orientation: Math.random() * 360,
            bodyLength: Math.random() * 15 + 5,
          },
        }, {
          id: 3,
          creature: {
            location: {
              x: Math.random() * 800 + 100,
              y: Math.random() * 800 + 100,
            },
            orientation: Math.random() * 360,
            bodyLength: Math.random() * 15 + 5,
          },
        },
      ];

      return cp;
    },
    [],
  );

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
          viewBox="0 0 1000 1000"
        >
          {
            creatures.map((cp) => (
              <Creature key={cp.id} creature={cp.creature} />
            ))
          }
        </svg>
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
        <div className={classes.dataContent}>
          Hello, World!
        </div>
      </div>
    </div>
  );
};

export default Pond;
