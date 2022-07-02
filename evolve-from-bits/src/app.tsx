import React from "react";
import { render } from "react-dom";

import { createStyles, makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";

import DockingContainer from "./components/docking/dockingContainer";
import PageFooter from "./components/pageFooter";

import MainDockingWindow from "./windows/mainDockingWindow";
import UnknownDockingWindow from "./windows/unknownDockingWindow";

import { EvolveContextProvider } from "./context/evolveContext";

import muiTheme from "./theme";

const useStyles = makeStyles((theme: Theme) => createStyles({
  "@global": {
    html: {
      height: "100%",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      userSelect: "none",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      margin: 0,
    },
    "#app": {
      position: "relative",
      flex: "1 0 0px",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      overflow: "hidden",
    },
  },
  dockingContainer: {
    flex: "1 0 0px",
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const renderDockingWindow = React.useCallback(
    (windowId: string): React.ReactChild => {
      switch (windowId) {
        case "main":
          return <MainDockingWindow />;
        default:
      }
      return <UnknownDockingWindow expectedWindowId={windowId} />;
    },
    [],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <EvolveContextProvider>
        <DockingContainer
          className={classes.dockingContainer}
          initialLayoutName="main"
          renderDockingWindow={renderDockingWindow}
        />
        <PageFooter />
      </EvolveContextProvider>
    </ThemeProvider>
  );
};

render(
  <App />,
  document.getElementById("app"),
);
