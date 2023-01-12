import clsx from "clsx";
import { useStoreMap } from "effector-react";
import React, { useContext } from "react";
import { $logs } from "../../store/logs";
import { TableStateProvider } from "../../Table";
import { NoData } from "../NoData";
import { Json } from "./Json";

export const DetailsBodyTrace = () => {
  const { selected } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  });

  let trace = log.trace ? JSON.parse(log.trace) : undefined;

  return log ? (
    <div className={clsx("ed-details-body-code", {})}>
      {trace ? (
        <Json
          data={trace}
          shouldExpandNode={(keyPath, data, level) => {
            return level < 2;
          }}
        />
      ) : (
        <NoData />
      )}
    </div>
  ) : null;
};
