import React, { useContext } from "react";
import { TableStateProvider } from "../Table";
import { DetailsBodyCode } from "./DetailsBodyCode";
import { DetailsBodyHistory } from "./DetailsBodyHistory";
import { DetailsToolbar } from "./DetailsToolbar";
import { useTabsState } from "./useTabsState";

export const DetailsBody = () => {
  const { selectedTab } = useTabsState();

  return (
    <div className="ed-details-body">
      {selectedTab === "preview" && <DetailsBodyCode preview />}
      {selectedTab === "payload" && <DetailsBodyCode />}
      {selectedTab === "history" && <DetailsBodyHistory />}
    </div>
  );
};
export const Details = () => {
  const { selected } = useContext(TableStateProvider);

  return selected ? (
    <div className="ed-details">
      <DetailsToolbar />
      <DetailsBody />
    </div>
  ) : null;
};
