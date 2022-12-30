import clsx from "clsx";
import Times from "line-awesome/svg/times-circle-solid.svg";
import React, { useContext } from "react";
import { TableStateProvider } from "../Table";
import { Toolbar } from "./Toolbar";
import { tabs, useTabsState } from "./useTabsState";

export const DetailsToolbar = () => {
  const { setSelected, setSelectedTab } = useContext(TableStateProvider);

  const { availableTabs, selectedTab } = useTabsState();

  return (
    <Toolbar>
      <a className={"ed-btn"} onClick={() => setSelected(false)}>
        <Times />
      </a>
      {availableTabs.map(tab => (
        <a
          className={clsx("ed-tab-header", {
            "ed-tab-header--selected": selectedTab === tab,
          })}
          onClick={() => setSelectedTab(tab)}
        >
          {tabs[tab]}
        </a>
      ))}
    </Toolbar>
  );
};
