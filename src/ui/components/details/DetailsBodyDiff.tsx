import clsx from "clsx";
import { useStoreMap } from "effector-react";
import React, { useContext } from "react";
import { $logs, $storeHistory } from "../../store/logs";
import { TableStateProvider } from "../../Table";

import { detailedDiff } from "deep-object-diff";
import { flatten } from "flat";
import { Json } from "./Json";

export const DetailsBodyDiff = () => {
  const { selected } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  });

  const current = log.payload ? JSON.parse(log.payload) : undefined;

  const prev = useStoreMap({
    store: $storeHistory,
    keys: [log],
    fn: (storeHistory, [log]) => {
      const history = storeHistory[log.name] as [id: number, payload: any][];

      const index = history.findIndex(([id, payload], index) => id === log.id);

      if (index === 0) {
        return null;
      }

      return history[index - 1]?.[1];
    },
  });

  // const changes = detailedDiff(prev ? { data: prev } : {}, { data: current });
  const changes = detailedDiff(prev, current);

  const result: any = {};

  function isPrimitive(obj: any) {
    return obj !== Object(obj);
  }

  if (changes.added) {
    result.added = isPrimitive(changes.added)
      ? changes.added
      : flatten(changes.added);
  }
  if (changes.updated) {
    result.updated = isPrimitive(changes.updated)
      ? changes.updated
      : flatten(changes.updated);
  }
  if (changes.deleted) {
    result.deleted = isPrimitive(changes.deleted)
      ? changes.deleted
      : flatten(changes.deleted);
  }

  return result ? (
    <div className={clsx("ed-details-body-preview")}>
      <Json data={result} expanded={true} />
    </div>
  ) : null;
};
