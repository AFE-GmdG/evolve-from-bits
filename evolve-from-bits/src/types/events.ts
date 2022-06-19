import React from "react";

export const isMouseEvent = (
  event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
): event is React.MouseEvent<HTMLDivElement> => "type" in event;
