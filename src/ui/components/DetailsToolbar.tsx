import clsx from "clsx";
import { useStore } from "effector-react";
import Times from "line-awesome/svg/times-circle-solid.svg";
import React from "react";
import { $detailsTab, changeTab, selectMessage } from "../store/details";
import { Toolbar } from "./Toolbar";

export const DetailsToolbar = () => {
  const detailsTab = useStore($detailsTab);

  return (
    <Toolbar>
      <a className={"ed-btn"} onClick={() => selectMessage(false)}>
        <Times />
      </a>
      <a
        className={clsx("ed-tab-header", {
          "ed-tab-header--selected": detailsTab === "payload",
        })}
        onClick={() => changeTab("payload")}
      >
        Payload
      </a>
      <a
        className={clsx("ed-tab-header", {
          "ed-tab-header--selected": detailsTab === "history",
        })}
        onClick={() => changeTab("history")}
      >
        History
      </a>
    </Toolbar>
  );
};
