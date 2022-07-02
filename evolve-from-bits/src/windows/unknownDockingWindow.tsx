import React from "react";

import Typography from "@material-ui/core/Typography";

import DockingWindow from "../components/docking/dockingWindow";

export type UnknownDockingWindowProps = {
  expectedWindowId: string;
};

const UnknownDockingWindow: React.VFC<UnknownDockingWindowProps> = ({
  expectedWindowId,
}) => (
  <DockingWindow>
    <Typography variant="h6">
      {`Unknown Window ID: ${expectedWindowId}`}
    </Typography>
  </DockingWindow>
);

export default UnknownDockingWindow;
