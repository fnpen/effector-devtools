import clsx from "clsx";
import { useStore, useStoreMap } from "effector-react";
import React from "react";
import { $selected, selectMessage } from "../store/details";
import { $logs } from "../store/logs";

// export const Log = memo(({ index, style }) => {
//   const id = useStoreMap({
//     store: $logs,
//     keys: [index],
//     fn: (logs, [index]) => logs[index]?.id,
//   });

//   return typeof id === "number" ? (
//     <Row id={id} index={index} style={style} />
//   ) : null;
// }, isEqual);

export const Row = ({ id, index, style }) => {
  const selected = useStore($selected);

  const log = useStoreMap({
    store: $logs,
    keys: [id],
    fn: (logs, [id]) => logs.find(log => log.id === id),
  });

  return typeof log?.id === "number" ? (
    <div
      className={clsx("ed-list-item", {
        "ed-list-item--odd": index % 2 === 0,
        "ed-list-item--selected": selected === log.id,
      })}
      style={style}
      onClick={() => selectMessage(log.id)}
    >
      <div className={"ed-list-item-icons"} title={log.op}>
        <div
          className={clsx("op-icon", `op-icon-${log.kind}`)}
          title={log.kind}
        ></div>
        <div
          className={clsx(
            "op-icon op-icon-second",
            `op-icon-${log.op}`,
            `op-icon-${log.op}-${log.kind}`
          )}
          title={log.op}
        ></div>
      </div>
      <div title={log.name}>{log.name}</div>
      <div title={log.payload}>{log.payload}</div>
    </div>
  ) : null;
};
