import React from "react";
import { FixedSizeList as List } from "react-window";
import { Log } from "./Log";

export const LogsBody = ({ logIds, width, height }) => {
  return (
    <List height={height} itemCount={logIds.length} itemSize={24} width={width}>
      {Log}
    </List>
  );
};
