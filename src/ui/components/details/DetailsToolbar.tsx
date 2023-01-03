import clsx from "clsx";
import Times from "line-awesome/svg/times-circle-solid.svg";
import React, { useContext, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { TableStateProvider } from "../../Table";
import { Toolbar } from "./../Toolbar";
import { tabs, useTabsState } from "./useTabsState";

import Prev from "line-awesome/svg/caret-left-solid.svg";
import Next from "line-awesome/svg/caret-right-solid.svg";
import { useCurrentNext, useCurrentPrev } from "./useCurrentPrev";

export const DetailsToolbar = () => {
  const {
    parentSetHotkeysActive,
    hotkeysActive,
    selected,
    setSelected,
    setSelectedTab,
  } = useContext(TableStateProvider);

  const { availableTabs, selectedTab } = useTabsState();

  // Lock upper hotkeys.
  useEffect(() => {
    if (!parentSetHotkeysActive) {
      return;
    }
    parentSetHotkeysActive(false);
    return () => parentSetHotkeysActive(true);
  }, [parentSetHotkeysActive]);

  useHotkeys(
    "esc",
    () => {
      if (hotkeysActive) {
        setSelected(false);
      }
    },
    [setSelected, hotkeysActive]
  );

  useHotkeys(
    "right",
    () => {
      if (hotkeysActive) {
        let index = availableTabs.indexOf(selectedTab) + 1;

        if (index > availableTabs.length - 1) {
          index = 0;
        }

        setSelectedTab(availableTabs[index]);
      }
    },
    [selectedTab, setSelectedTab, hotkeysActive, availableTabs.join("/")] // useHotkeys bug
  );

  useHotkeys(
    "left",
    () => {
      if (hotkeysActive) {
        let index = availableTabs.indexOf(selectedTab) - 1;

        if (index < 0) {
          index = availableTabs.length - 1;
        }

        setSelectedTab(availableTabs[index]);
      }
    },
    [selectedTab, setSelectedTab, hotkeysActive, availableTabs.join("/")] // useHotkeys bug
  );

  const { prev } = useCurrentPrev(selected);
  const { next } = useCurrentNext(selected);

  return (
    <Toolbar>
      <a className={"ed-btn"} onClick={() => setSelected(false)}>
        <Times />
      </a>
      {availableTabs.map(tab => (
        <a
          key={tab}
          className={clsx("ed-tab-header", {
            "ed-tab-header--selected": selectedTab === tab,
          })}
          onClick={() => setSelectedTab(tab)}
        >
          {tabs[tab]}
        </a>
      ))}
      <div className="ed-toolbar-space" />
      <a
        className={clsx("ed-btn", { "ed-btn--disabled": !prev })}
        onClick={() => prev && setSelected(prev.id)}
      >
        <Prev />
      </a>
      <a
        className={clsx("ed-btn", { "ed-btn--disabled": !next })}
        onClick={() => next && setSelected(next.id)}
      >
        <Next />
      </a>
    </Toolbar>
  );
};
