import clsx from "clsx";
import { useStoreMap } from "effector-react";
import React, { useContext } from "react";
import { $logs } from "../store/logs";
import { TableStateProvider } from "../Table";

export const Row = ({ children: id, "data-index": index }) => {
  const { selected, setSelected } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [id],
    fn: (logs, [id]) => logs[id],
  });

  return typeof log?.id === "number" ? (
    <div
      className={clsx("ed-list-item", {
        "ed-list-item--odd": index % 2 === 0,
        "ed-list-item--selected": selected === log.id,
      })}
      onClick={() => setSelected(log.id)}
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
      <div title={log.payload}>{log.payloadShort ?? log.payload}</div>
    </div>
  ) : null;
};
