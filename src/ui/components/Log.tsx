import clsx from "clsx";
import { detailedDiff } from "deep-object-diff";
import { useStoreMap } from "effector-react";
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
import { TableStateProvider } from "../Table";
import { ToolsMessage } from "./../../common/types";
import { getPrevHistoryJson } from "./details/DetailsBodyDiff";

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj: any) {
  if (obj === null || obj === undefined) return true;

  if (["number", "string", "boolean"].includes(typeof obj)) return false;

  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (!["object"].includes(typeof obj)) return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

const limit = pLimit(1);

const renderPayload = memoize(
  async (
    { id, name, payloadShort, payload, kind }: ToolsMessage,
    isAborted: () => boolean
  ) => {
    if (["store", "diff"].includes(kind)) {
      if (isAborted()) return false;

      const storeHistory = $storeHistory.getState();
      const prevJson = getPrevHistoryJson(storeHistory, name, id);

      if (isAborted()) return false;

      let [prev, current] = await Promise.all([
        parseJson(prevJson),
        parseJson(payload),
      ]);

      if (isAborted()) return false;

      if (isEmpty(prev)) {
        if (Array.isArray(current)) {
          prev = [];
        } else if (typeof current === "object") {
          prev = {};
        }
      }

      const changes = detailedDiff(prev, current);

      if (isAborted()) return false;

      let result = "";

      if (!isEmpty(changes.added)) {
        result += `<span style="background: #e2fcdc;">${colorizeJson(
          changes.added
        )}</span> `;
      }
      if (!isEmpty(changes.updated)) {
        result += `<span style="background: #fff3c6;">${colorizeJson(
          changes.updated
        )}</span> `;
      }
      if (!isEmpty(changes.deleted)) {
        result += `<span style="background: #f8e5e5;">${colorizeJson(
          changes.deleted
        )}</span> `;
      }

      if (isAborted()) return false;

      return result;
    } else if (kind === "event") {
      const data = await parseJson(payload);

      let html = `<div><strong>(</strong> ${colorizeJson(
        data
      )} <strong>)</strong></div>`;

      return html;
    } else if (kind === "effect") {
      const data = await parseJson(payload);

      let result = "<div>pending...</div>";
      let params = data;

      if (name.endsWith(".done")) {
        params = data.params;
        result = data.result ? colorizeJson(data.result) : "<div>void</div>";
      }
      if (name.endsWith(".fail")) {
        params = data.params;
        result = data.error.message
          ? `<span style="color:red;">${data.error.message}</span>`
          : colorizeJson(data.error);
      }

      let html = `<div><strong>(</strong> ${colorizeJson(
        params
      )} <strong>)</strong></div><div> <strong>⇒</strong> ${result}</div>`;

      return html;
    } else {
      const pl = payloadShort ?? payload;

      if (typeof pl !== "undefined") {
        return colorizeJsonString(pl);
      }
    }

    return payloadShort;
  },
  {
    serializer: args => {
      return args[0].id;
    },
  }
);

export const RowPayload = memo(
  ({ log }) => {
    const { id, payload, kind } = log;
    const ref = useRef<HTMLDivElement>();

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

            return await renderPayload(log, () => aborted);
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
  (a, b) => a.id === b.id
);

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
      <RowPayload log={log} />
    </div>
  ) : null;
};
