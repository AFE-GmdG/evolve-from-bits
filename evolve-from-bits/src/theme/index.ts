import { createTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface DockingAction {
    background: string;
    backgroundHover: string;
    borderRadius: number;
  }

  interface TypeDocking {
    container: DockingAction;
    window: DockingAction;
  }

  interface Palette {
    docking: TypeDocking;
  }

  interface PaletteOptions {
    docking: TypeDocking;
  }
}

export default createTheme({
  palette: {
    primary: {
      main: "#172B3F",
    },
    secondary: {
      main: "#FF9100",
    },
    text: {
      primary: "rgba(51, 51, 51, 0.87)",
      secondary: "rgba(51, 51, 51, 0.60)",
      disabled: "rgba(51, 51, 51, 0.38)",
    },
    background: {
      default: "#ffffff",
      paper: "#ececec",
    },
    docking: {
      container: {
        background: "#363f49",
        backgroundHover: "#21262c",
        borderRadius: 0,
      },
      window: {
        background: "#ffffff",
        backgroundHover: "#ececec",
        borderRadius: 8,
      },
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: "Hind",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h2: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h3: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h4: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h5: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h6: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
  },
});
