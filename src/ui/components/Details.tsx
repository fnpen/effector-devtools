import { useStore } from "effector-react";
import * as React from "react";
import { $detailsTab, $selected } from "../store/details";
import { DetailsBodyHistory } from "./DetailsBodyHistory";
import { DetailsBodyPayload } from "./DetailsBodyPayload";
import { DetailsToolbar } from "./DetailsToolbar";

export const DetailsBody = () => {
  const detailsTab = useStore($detailsTab);

  return (
    <div className="ed-details-body">
      {detailsTab === "payload" && <DetailsBodyPayload />}
      {detailsTab === "history" && <DetailsBodyHistory />}
    </div>
  );
};
export const Details = () => {
  const selected = useStore($selected);
  return selected ? (
    <div className="ed-details">
      <DetailsToolbar />
      <DetailsBody />
    </div>
  ) : null;
};
