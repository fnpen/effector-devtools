import clsx from "clsx";
import { useStore } from "effector-react";
import PauseCircle from "line-awesome/svg/pause-circle.svg";
import PlayCircle from "line-awesome/svg/play-circle.svg";
import Trash from "line-awesome/svg/trash-solid.svg";
import React from "react";
import { emptyLogs } from "../store/logs";
import { $enabled, toogleEnable } from "../store/state";
import { Toolbar } from "./Toolbar";

export const LogToolbar = () => {
  const enabled = useStore($enabled);
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
    </Toolbar>
  );
};
