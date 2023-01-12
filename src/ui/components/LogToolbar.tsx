import clsx from "clsx";
import { useStore } from "effector-react";
import PauseCircle from "line-awesome/svg/pause-circle.svg";
import PlayCircle from "line-awesome/svg/play-circle.svg";
import Trash from "line-awesome/svg/trash-solid.svg";
import React from "react";
import {
  $filterInputText,
  emptyLogs,
  filterInputTextChange,
} from "../store/logs";
import {
  $enabled,
  $filterKind,
  $subscriptions,
  changeFilterKind,
  toogleEnable,
} from "../store/state";
import { Toolbar } from "./Toolbar";

export const LogToolbar = () => {
  const enabled = useStore($enabled);
  const subscriptions = useStore($subscriptions);
  const filterInputText = useStore($filterInputText);
  const filterKind = useStore($filterKind);
  return (
    <Toolbar>
      <a
        className={clsx(
          "ed-btn",
          enabled ? "ed-btn-enabled" : "ed-btn-disabled"
        )}
        onClick={() => toogleEnable()}
      >
        {enabled ? <PauseCircle /> : <PlayCircle />}
      </a>
      <a className={"ed-btn"} onClick={() => emptyLogs()}>
        <Trash />
      </a>
      <div className="ed-toolbar-separator" />
      <div className="ed-toolbar-input">
        <input
          placeholder="Filter"
          value={filterInputText}
          onChange={e => filterInputTextChange(e.target.value)}
        />
      </div>
      <div className="ed-toolbar-separator" />
      <a
        className={clsx("ed-btn", { "ed-btn--selected": filterKind === "" })}
        onClick={() => changeFilterKind("")}
      >
        All
      </a>
      <a
        className={clsx("ed-btn", {
          "ed-btn--selected": filterKind === "store",
        })}
        onClick={() => changeFilterKind("store")}
      >
        Store
      </a>
      <a
        className={clsx("ed-btn", {
          "ed-btn--selected": filterKind === "event",
        })}
        onClick={() => changeFilterKind("event")}
      >
        Event
      </a>
      <a
        className={clsx("ed-btn", {
          "ed-btn--selected": filterKind === "effect",
        })}
        onClick={() => changeFilterKind("effect")}
      >
        Effect
      </a>
      <div className="ed-toolbar-space" />
      <div className="ed-toolbar-text" title={subscriptions.join("\n")}>
        Subscriptions: {subscriptions.length}
      </div>
    </Toolbar>
  );
};
