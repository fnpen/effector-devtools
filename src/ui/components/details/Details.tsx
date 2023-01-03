import React, { useContext } from "react";
import { TableStateProvider } from "../../Table";
import { DetailsBodyDiff } from "./DetailsBodyDiff";
import { DetailsBodyHistory } from "./DetailsBodyHistory";
import { DetailsBodyPayload } from "./DetailsBodyPayload";
import { DetailsBodyPreview } from "./DetailsBodyPreview";
import { DetailsToolbar } from "./DetailsToolbar";
import { useTabsState } from "./useTabsState";

export const DetailsBody = () => {
  const { selectedTab } = useTabsState();

  return (
    <div className="ed-details-body">
      {selectedTab === "preview" && <DetailsBodyPreview />}
      {selectedTab === "payload" && <DetailsBodyPayload />}
      {selectedTab === "history" && <DetailsBodyHistory />}
      {selectedTab === "diff" && <DetailsBodyDiff />}
    </div>
  );
};

export const Details = () => {
  const { selected } = useContext(TableStateProvider);

  return selected !== false ? (
    <div className="ed-details">
      <DetailsToolbar />
      <DetailsBody />
    </div>
  ) : null;
};
