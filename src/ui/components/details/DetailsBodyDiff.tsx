import clsx from "clsx";
import { useStoreMap } from "effector-react";
import React, { useContext } from "react";
import { $logs, $storeHistory } from "../../store/logs";
import { TableStateProvider } from "../../Table";

import { detailedDiff } from "deep-object-diff";
import { StoreValue } from "effector";
import { flatten } from "flat";
import { useAsync } from "react-use";
import { parseJson } from "../../../common/parseJson";
import { NoData } from "../NoData";
import { Json } from "./Json";

export const getPrevHistoryJson = (
  storeHistory: StoreValue<typeof $storeHistory>,
  name: string,
  currentId: number
): string | null => {
  const history = storeHistory[name] as [id: number, payload: any][];

  const index = history.findIndex(([id, payload], index) => id === currentId);

  if (index === 0) {
    return null;
  }

  return history[index - 1]?.[1];
};

export const DetailsBodyDiff = () => {
  const { selected } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  });

  const prevJson = useStoreMap({
    store: $storeHistory,
    keys: [log],
    fn: (storeHistory, [log]) =>
      getPrevHistoryJson(storeHistory, log.name, log.id),
  });

  const current = useAsync(() => parseJson(log?.payload), [log]);
  const prev = useAsync(() => parseJson(prevJson), [prevJson]);

  if (current?.loading || prev?.loading) {
    return <NoData text="Loading" />;
  }

  const changes = detailedDiff(prev.value, current.value);

  if (true) {
    return (
      <div className={clsx("ed-details-body-preview")}>
        <Json data={changes} expanded={true} />
      </div>
    );
  } else {
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
  }

  return null;
};
