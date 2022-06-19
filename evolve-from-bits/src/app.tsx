import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createStyles, makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";

import PageFooter from "./components/pageFooter";

import { EvolveContextProvider } from "./context/evolveContext";

import Pond from "./views/pond";
import Slash from "./views/slash";

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
      width: "100%",
      height: "100%",
      overflow: "hidden",
      margin: 0,
    },
    "#app": {
      display: "flex",
      flexDirection: "column",
      flex: "1 0 0px",
    },
  },
  content: {
    position: "relative",
    flex: "1 0 0px",
    backgroundColor: theme.palette.background.default,
    overflow: "hidden",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: theme.spacing(1),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <EvolveContextProvider>
        <BrowserRouter>
          <div className={classes.content}>
            <Switch>
              <Route path="/pond">
                <Pond />
              </Route>
              <Route path="/">
                <Slash />
              </Route>
            </Switch>
          </div>
          <PageFooter />
        </BrowserRouter>
      </EvolveContextProvider>
    </ThemeProvider>
  );
};

render(
  <App />,
  document.getElementById("app"),
);
