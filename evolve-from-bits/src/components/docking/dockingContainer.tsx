import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import ErrorDockingWindow from "./errorDockingWindow";

const useStyles = makeStyles((theme: Theme) => createStyles({
  dockingContainer: {
    position: "relative",
    backgroundColor: theme.palette.docking.container.background,
    padding: 0,
    overflow: "hidden",
    transition: "background-color 0.2s ease-in-out",
    // "&:hover": {
    //   backgroundColor: theme.palette.docking.container.backgroundHover,
    // },
  },
  absoluteFull: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  panel: {
    position: "relative",
    flexShrink: 0,
    flexBasis: "0px",
    overflow: "hidden",
  },
  horizontalStripe: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  verticalStripe: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
}));

export type SingleDockingWindow = {
  windowId: string;
};

export type HorizontalDockingWindowStripe = ({
  key: string;
  horizontalFraction: number;
} & (SingleDockingWindow | {
  verticalStripe: VerticalDockingWindowStripe;
}))[];

export type VerticalDockingWindowStripe = ({
  key: string;
  verticalFraction: number;
} & (SingleDockingWindow | {
  horizontalStripe: HorizontalDockingWindowStripe;
}))[];

export type DockingWindowLayout = SingleDockingWindow | HorizontalDockingWindowStripe | VerticalDockingWindowStripe;

function isSingleWindow(layout: any): layout is SingleDockingWindow {
  return typeof layout === "object"
    && "windowId" in layout;
}

function isHorizontalStripe(layout: HorizontalDockingWindowStripe | VerticalDockingWindowStripe): layout is HorizontalDockingWindowStripe {
  return "horizontalFraction" in layout[0];
}

export type KnownDockingWindowLayout = {
  layoutName: string;
  isCustomLayout: boolean;
  layout: DockingWindowLayout;
};

export type KnownDockingWindowLayouts = KnownDockingWindowLayout[];

function isKnownDockingWindowLayout(knownLayout: any): knownLayout is KnownDockingWindowLayout {
  return (
    typeof knownLayout === "object"
    && "layoutName" in knownLayout
    && typeof knownLayout.layoutName === "string"
    && "isCustomLayout" in knownLayout
    && typeof knownLayout.isCustomLayout === "boolean"
    && "layout" in knownLayout
  );
}

function isKnownDockingWindowLayouts(knownLayouts: any): knownLayouts is KnownDockingWindowLayouts {
  return (
    Array.isArray(knownLayouts)
    && knownLayouts.every(isKnownDockingWindowLayout)
  );
}

export type DockingContainerContextType = {
  knownDockingWindowLayoutNames: string[];

  loadLayout: (layoutName: string) => void;
  storeLayout: (layoutName: string) => void;
};

export const DockingContainerContext = React.createContext<DockingContainerContextType>({
  knownDockingWindowLayoutNames: [],

  loadLayout: () => { },
  storeLayout: () => { },
});

export type DockingContainerProps = {
  className?: string;
  initialLayoutName: string;

  renderDockingWindow: (windowId: string) => React.ReactChild;
};

const DockingContainer: React.VFC<DockingContainerProps> = ({
  className = "",
  initialLayoutName,

  renderDockingWindow,
}) => {
  const classes = useStyles();

  const [saveKnownLayoutsCounter, setSaveKnownLayoutsCounter] = React.useState(0);
  const knownDockingWindowLayouts = React.useMemo<KnownDockingWindowLayouts>(
    () => {
      // try to load a layout from local storage
      let dockingWindowLayouts = localStorage.getItem("dockingWindowLayouts");
      if (!dockingWindowLayouts || !isKnownDockingWindowLayouts(JSON.parse(dockingWindowLayouts))) {
        // generate a default layout and store it.
        const defaultLayout: KnownDockingWindowLayout = {
          layoutName: "main",
          isCustomLayout: false,
          layout: [{
            verticalFraction: 90,
            key: "horizontal#1",
            horizontalStripe: [{
              horizontalFraction: 80,
              key: "main#1",
              windowId: "main",
            }, {
              horizontalFraction: 20,
              key: "vertical#1",
              verticalStripe: [{
                verticalFraction: 30,
                key: "outliner#1",
                windowId: "main",
              }, {
                verticalFraction: 70,
                key: "propeties#1",
                windowId: "main",
              }],
            }],
          }, {
            verticalFraction: 10,
            key: "timeline#1",
            windowId: "main",
          }],
        };
        dockingWindowLayouts = JSON.stringify([defaultLayout]);
        localStorage.setItem("dockingWindowLayouts", dockingWindowLayouts);
      }

      return JSON.parse(dockingWindowLayouts);
    },
    [saveKnownLayoutsCounter],
  );

  const knownDockingWindowLayoutNames = React.useMemo<string[]>(
    () => knownDockingWindowLayouts.map((knownDockingWindowLayout) => knownDockingWindowLayout.layoutName),
    [knownDockingWindowLayouts],
  );

  const [currentLayout, setCurrentLayout] = React.useState<KnownDockingWindowLayout>(() => {
    const layout = knownDockingWindowLayouts.find((knownDockingWindowLayout) => knownDockingWindowLayout.layoutName === initialLayoutName);
    if (!layout) {
      throw new Error(`Unknown layout name: ${initialLayoutName}`);
    }
    return layout;
  });

  const loadLayout = React.useCallback(
    (layoutName: string) => {
      const layout = knownDockingWindowLayouts.find((knownDockingWindowLayout) => knownDockingWindowLayout.layoutName === layoutName);
      if (!layout) {
        throw new Error(`Unknown layout name: ${layoutName}`);
      }
      setCurrentLayout(layout);
    },
    [knownDockingWindowLayouts],
  );

  const storeLayout = React.useCallback(
    (layoutName: string) => {
      const foundLayout = knownDockingWindowLayouts.find((knownDockingWindowLayout) => knownDockingWindowLayout.layoutName === layoutName);
      if (foundLayout && !foundLayout.isCustomLayout) {
        throw new Error(`Cannot store a layout with the name ${layoutName} because it is a built-in layout.`);
      }
      if (!foundLayout) {
        const newLayout = {
          ...currentLayout,
          layoutName,
          isCustomLayout: true,
        };
        knownDockingWindowLayouts.push(newLayout);
        localStorage.setItem("dockingWindowLayouts", JSON.stringify(knownDockingWindowLayouts));
      } else {
        const newKnownDockingWindowLayouts = knownDockingWindowLayouts.map((knownDockingWindowLayout) => {
          if (knownDockingWindowLayout.layoutName === layoutName) {
            return {
              ...knownDockingWindowLayout,
              layout: currentLayout.layout,
            };
          }
          return knownDockingWindowLayout;
        });
        localStorage.setItem("dockingWindowLayouts", JSON.stringify(newKnownDockingWindowLayouts));
      }
      setSaveKnownLayoutsCounter((counter) => counter + 1);
    },
    [knownDockingWindowLayouts],
  );

  const renderLayout = React.useCallback(
    (): React.ReactChild => {
      const { layout } = currentLayout;
      if (isSingleWindow(layout)) {
        const { windowId } = layout;
        return renderDockingWindow(windowId);
      }

      const renderHorizontalStripe = (stripe: HorizontalDockingWindowStripe): React.ReactChild => {
        if (stripe.length < 2) {
          return <ErrorDockingWindow error={new Error(`stripe length is less than 2: ${stripe.length}`)} />;
        }

        return (
          <div className={`${classes.horizontalStripe} ${classes.absoluteFull}`}>
            {
              stripe.map((stripeItem) => {
                const { key, horizontalFraction } = stripeItem;
                return (
                  <div key={key} className={classes.panel} style={{ flexGrow: `${horizontalFraction}` }}>
                    {
                      isSingleWindow(stripeItem)
                        ? renderDockingWindow(stripeItem.windowId)
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        : renderVerticalStripe(stripeItem.verticalStripe)
                    }
                  </div>
                );
              })
            }
          </div>
        );
      };

      const renderVerticalStripe = (stripe: VerticalDockingWindowStripe): React.ReactChild => {
        if (stripe.length < 2) {
          return <ErrorDockingWindow error={new Error(`stripe length is less than 2: ${stripe.length}`)} />;
        }

        return (
          <div className={`${classes.verticalStripe} ${classes.absoluteFull}`}>
            {
              stripe.map((stripeItem) => {
                const { key, verticalFraction } = stripeItem;
                return (
                  <div key={key} className={classes.panel} style={{ flexGrow: `${verticalFraction}` }}>
                    {
                      isSingleWindow(stripeItem)
                        ? renderDockingWindow(stripeItem.windowId)
                        : renderHorizontalStripe(stripeItem.horizontalStripe)
                    }
                  </div>
                );
              })
            }
          </div>
        );
      };

      if (isHorizontalStripe(layout)) {
        return renderHorizontalStripe(layout);
      }

      return renderVerticalStripe(layout);
    },
    [currentLayout],
  );

  return (
    <DockingContainerContext.Provider
      value={{
        knownDockingWindowLayoutNames,

        loadLayout,
        storeLayout,
      }}
    >
      <div className={`${classes.dockingContainer} ${className}`}>
        {renderLayout()}
      </div>
    </DockingContainerContext.Provider>
  );
};

export default DockingContainer;
