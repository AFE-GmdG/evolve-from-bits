import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createStyles, makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";

import { EvolveLibContextProvider } from "./context/evolveLibContext";
import { Slash } from "./views/slash";

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
}));

const App: React.FC = () => {
  useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <EvolveLibContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Slash />
            </Route>
          </Switch>
        </BrowserRouter>
      </EvolveLibContextProvider>
    </ThemeProvider>
  );
};

render(
  <App />,
  document.getElementById("app"),
);
