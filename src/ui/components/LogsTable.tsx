import clsx from "clsx";
import { useStore } from "effector-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { $nameColumnWidth, changeNameColumnWidth } from "../store/state";
import { LogsBody } from "./LogsBody";

export const LogsTable = () => {
  const nameColumnWidth = useStore($nameColumnWidth);

  const [resizing, setResizing] = useState(false);
  const enabled = useRef<boolean>(false);

  const onMouseDown = useCallback(() => {
    setResizing(true);
  }, [enabled]);

  const onMouseUp = useCallback(() => {
    setResizing(false);
  }, [setResizing]);

  const onMouseMove = useCallback(
    event => {
      if (resizing === false) {
        return;
      }

      changeNameColumnWidth(nameColumnWidth + event.movementX);
    },
    [nameColumnWidth, resizing]
  );

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp, true);

    return () => window.removeEventListener("mouseup", onMouseUp, true);
  }, [onMouseUp]);

  return (
    <div className="ed-table">
      <div
        className={clsx("ed-table-header", {
          "ed-table-header--resizing": resizing,
        })}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div style={{ width: nameColumnWidth }}>
          Name
          <div
            className="ed-table-header-resizer"
            onMouseDown={onMouseDown}
          ></div>
        </div>
        <div>Payload</div>
      </div>
      <div className="ed-table-line" style={{ left: nameColumnWidth }}></div>
      <div className="ed-table-body">
        <LogsBody />
      </div>
    </div>
  );
};
