import clsx from "clsx";
import { useStore, useStoreMap } from "effector-react";
import memoize from "fast-memoize";
import pLimit from "p-limit";

import React, {
  memo,
  startTransition,
  useContext,
  useEffect,
  useRef,
} from "react";
import { colorizeJson, colorizeJsonString } from "../../common/colorizeJson";
import { parseJson } from "../../common/parseJson";
import { $logs, $storeHistory } from "../store/logs";
import { $nameColumnWidth } from "../store/state";
import { TableStateProvider } from "../Table";
import { isEmpty } from "../utils/isEmpty";
import { getPrevHistoryJson } from "./details/DetailsBodyDiff";
import { prepareChanges } from "./prepareChanges";

export const hasOwnProperty = Object.prototype.hasOwnProperty;

const limit = pLimit(1);

const renderPayload = memoize(
  async (
    { log: { id, name, payloadShort, payload, kind } },
    isAborted: () => boolean
  ) => {
    if (["store", "diff"].includes(kind)) {
      if (isAborted()) return false;

      const storeHistory = $storeHistory.getState();
      const prevJson = getPrevHistoryJson(storeHistory, name, id);

      if (payload.length >= 10000) {
        return `<span style="color: #cccccc;margin: 0 4px;">${payload}</span>`;
      }

      if (isAborted()) return false;

      let [prev, current] = await Promise.all([
        parseJson(prevJson),
        parseJson(payload),
      ]);

      if (isAborted()) return false;

      let result = "";
      const allChanges = prepareChanges(prev, current);

      if (Object.values(allChanges).length) {
        result = `<span>${colorizeJson(allChanges)}</span> `;
      }

      return result;
    } else if (kind === "event") {
      const data = await parseJson(payload);

      let html = `<div><strong> ( </strong> ${colorizeJson(
        data
      )} <strong> ) </strong></div>`;

      return html;
    } else if (kind === "effect") {
      const data = await parseJson(payload);

      let result = "<div>pending...</div>";
      let params = data.params;

      if (data.status === "done") {
        result = data.result ? colorizeJson(data.result) : "<div>void</div>";
      }
      if (data.status === "fail") {
        result = data.error.message
          ? `<span style="color:red;margin: 0 4px;">${data.error.message}</span>`
          : colorizeJson(data.error);
      }

      let html = `<div><strong> ( </strong> ${colorizeJson(
        params
      )} <strong> ) </strong></div><div> <strong>⇒</strong> ${result}</div>`;

      return html;
    } else {
      const pl = payloadShort ?? payload;

      if (typeof pl !== "undefined") {
        return colorizeJsonString(pl);
      }
    }

    return payloadShort;
  }
);

export const RowPayload = memo(
  ({ log }) => {
    const { id, payload, kind } = log;
    const ref = useRef<HTMLDivElement>();

    // const xpath = useStoreMap({
    //   store: $xpaths,
    //   keys: [log.name],
    //   fn: (xpaths, [name]) => {
    //     return xpaths[name];
    //   },
    // });

    useEffect(() => {
      let aborted = false;

      if (isEmpty(log.payload)) {
        return;
      }

      startTransition(() => {
        (async () => {
          const content = await limit(async () => {
            if (aborted) return false;
            // await (() => new Promise(r => setTimeout(r, 30)))();

            // if (aborted) return false;

            return await renderPayload({ log }, () => aborted);
          });

          if (content !== false && ref.current) {
            ref.current.innerHTML = content || "";
          }
        })();
      });

      return () => void (aborted = true);
    }, [id, kind, payload]);

    return (
      <div
        className="ed-list-item-payload"
        title={payload}
        data-id={id}
        ref={ref}
      ></div>
    );
  },
  (a, b) => a.id === b.id && a.log.payload === b.log.payload
);

export const Row = ({ children: id, "data-index": index }) => {
  const { selected, setSelected } = useContext(TableStateProvider);

  const nameColumnWidth = useStore($nameColumnWidth);

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
      <div title={`${log.op}: ${log.name}`} style={{ width: nameColumnWidth }}>
        <div
          className={clsx("op-icon", `op-icon-${log.kind}`)}
          title={log.kind}
        ></div>
        {log.name}
      </div>
      <RowPayload log={log} />
    </div>
  ) : null;
};
