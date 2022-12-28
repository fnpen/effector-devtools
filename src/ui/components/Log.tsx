import clsx from "clsx";
import { useStore, useStoreMap } from "effector-react";
import React, { memo } from "react";
import { areEqual } from "react-window";
import { $selected, selectMessage } from "../store/details";
import { $logs } from "../store/logs";

export const Log = memo(({ index, style, ...e }) => {
  const selected = useStore($selected);
  const log =
    useStoreMap({
      store: $logs,
      keys: [index],
      fn: (logs, [index]) => logs[index],
    }) || {};

  return (
    <div
      className={clsx("ed-list-item", {
        "ed-list-item--odd": index % 2 === 0,
        "ed-list-item--selected": selected === log.id,
      })}
      style={style}
      title={log.payload}
      onClick={() => selectMessage(log.id)}
    >
      <div
        className={clsx("op-icon", `op-icon-${log.op}`)}
        title={log.op}
      ></div>
      <div>{log.name}</div>
      <div>{log.payload}</div>
    </div>
  );
}, areEqual);
