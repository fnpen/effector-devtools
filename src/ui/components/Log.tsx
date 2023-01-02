import clsx from "clsx";
import { ToolsMessage } from "common-types";
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
import { getPrevHistoryJson } from "./details/DetailsBodyDiff";

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj: any) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
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
    if (kind === "store") {
      if (isAborted()) return false;

      const storeHistory = $storeHistory.getState();
      const prevJson = getPrevHistoryJson(storeHistory, name, id);

      if (isAborted()) return false;

      const [prev, current] = await Promise.all([
        parseJson(prevJson),
        parseJson(payload),
      ]);

      if (isAborted()) return false;

      const changes = detailedDiff(prev, current);

      if (isAborted()) return false;

      let result = "";

      if (changes.added && !isEmpty(changes.added)) {
        result += `<div style="background: #e2fcdc;">${colorizeJson(
          changes.added
        )}</div> `;
      }

      if (changes.updated && !isEmpty(changes.updated)) {
        result += `<div style="background: #fff3c6;">${colorizeJson(
          changes.updated
        )}</div> `;
      }
      if (changes.deleted && !isEmpty(changes.deleted)) {
        result += `<div style="background: #f8e5e5;">${colorizeJson(
          changes.deleted
        )}</div> `;
      }

      if (isAborted()) return false;

      return result;
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

            if (aborted) return false;

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

export const Row = //memo(
  ({ children: id, "data-index": index }) => {
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
// (a, b) => a.children === b.children
