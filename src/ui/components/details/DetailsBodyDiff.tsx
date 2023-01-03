import clsx from "clsx";
import { detailedDiff } from "deep-object-diff";
import { StoreValue } from "effector";
import { flatten } from "flat";
import { JSONPath } from "jsonpath-plus";
import prettyMilliseconds from "pretty-ms";
import React, { useContext, useState } from "react";
import { useAsync } from "react-use";
import { parseJson } from "../../../common/parseJson";
import { $storeHistory } from "../../store/logs";
import { TableStateProvider } from "../../Table";
import { NoData } from "../NoData";
import { Toolbar } from "../Toolbar";
import { Json } from "./Json";
import { useCurrentPrev } from "./useCurrentPrev";

export const getPrevHistoryJson = (
  storeHistory: StoreValue<typeof $storeHistory>,
  name: string,
  currentId: number
): string | null => {
  const history = storeHistory[name] as [id: number, payload: any][];

  const index = (history || []).findIndex(
    ([id, payload], index) => id === currentId
  );

  if (index <= 0) {
    return null;
  }

  return history[index - 1]?.[1];
};

export const DiffToolbar = ({ id, xpath, setXpath }) => {
  const { current, prev } = useCurrentPrev(id);

  let difference = "-";

  if (prev && current) {
    difference = prettyMilliseconds(current.time - prev.time, {
      millisecondsDecimalDigits: 3,
      separateMilliseconds: true,
    });
  }

  return (
    <Toolbar secondary>
      <div className="ed-toolbar-input">
        <input
          placeholder="Filter xPath"
          value={xpath}
          onChange={e => setXpath(e.target.value)}
        />
      </div>
      <div className="ed-toolbar-space" />
      <div className="ed-toolbar-text">Difference: {difference}</div>
    </Toolbar>
  );
};

export const DetailsBodyDiff = () => {
  const { selected } = useContext(TableStateProvider);

  const [xpath, setXpath] = useState("");

  const { current, prev } = useCurrentPrev(selected);

  const currentJsonState = useAsync(
    () => parseJson(current?.payload),
    [current]
  );
  const prevJsonState = useAsync(() => parseJson(prev?.payload), [prev]);

  if (prevJsonState?.loading || currentJsonState?.loading) {
    return <NoData text="Loading..." />;
  }

  let prevJson = prevJsonState.value;
  let currentJson = currentJsonState.value;

  if (xpath) {
    prevJson = JSONPath({ path: xpath, json: prevJson });
    currentJson = JSONPath({ path: xpath, json: currentJson });
  }

  const changes = detailedDiff(prevJson, currentJson);

  if (true) {
    return (
      <>
        <DiffToolbar id={current.id} {...{ xpath, setXpath }} />
        <div className={clsx("ed-details-body-preview")}>
          <Json data={changes} expanded={true} />
        </div>
      </>
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
