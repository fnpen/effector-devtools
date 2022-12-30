import React, { useContext } from "react";
import { TableStateProvider } from "../Table";
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
    </div>
  );
};

export const Details = () => {
  const { selected, setSelected } = useContext(TableStateProvider);

  return selected ? (
    // <GlobalHotKeys
    //   keyMap={{
    //     ESC: ["esc"],
    //   }}
    //   handlers={{
    //     ESC: e => {
    //       debugger;
    //       e.preventDefault();
    //       setSelected(false);
    //     },
    //   }}
    // >
    <div className="ed-details">
      <DetailsToolbar />
      <DetailsBody />
    </div>
  ) : // </GlobalHotKeys>
  null;
};
