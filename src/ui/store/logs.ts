import { combine, createEvent, createStore, sample } from "effector";
import { debounce } from "patronum/debounce";
import { Message, ToolsMessage } from "../../common/types";
import { remoteSubscriber } from "../rempl-subscriber";
import {
  $filterKind,
  $filterQuery,
  $filterQueryRegexp,
  changeFilterQuery,
} from "./state";

export const $filterInputText = createStore<string>("");

export const filterInputTextChange = createEvent<string>();
$filterInputText.on(filterInputTextChange, (_, e) => e);

debounce({
  source: filterInputTextChange,
  timeout: 60,
  target: changeFilterQuery,
});

sample({
  source: $filterQuery,
  target: $filterInputText,
});

export const $filteredOutLogIds = createStore<number[]>([]);
export const $logs = createStore<{ [id: number]: ToolsMessage }>({});
export const $storeHistory = createStore<{
  [unitName: string]: Array<[id: number, payload: any]>;
}>({});
export const $logIds = createStore<number[]>([]);

const $filtrationResult = sample({
  clock: combine([$filterQuery, $filterKind]),
  source: combine([$logs, $filterQueryRegexp, $filterKind]),
  fn: ([logs, filterQueryRegexp, filterKind]) => {
    const passed: number[] = [];
    const notPassed: number[] = [];

    Object.values(logs).forEach(log => {
      if (
        filterQueryRegexp(log.name) &&
        (filterKind === "" || filterKind === log.kind)
      ) {
        passed.push(log.id);
      } else {
        notPassed.push(log.id);
      }
    });

    return {
      passed,
      notPassed,
    };
  },
});

sample({
  clock: $filtrationResult,
  fn: result => result.passed,
  target: $logIds,
});

sample({
  clock: $filtrationResult,
  fn: result => result.notPassed,
  target: $filteredOutLogIds,
});

const logRecieved = createEvent<Message>();
export const emptyLogs = createEvent();

$logs.reset(emptyLogs);

sample({
  clock: logRecieved,
  source: combine([$logs, $logIds]),
  fn: ([logs, logIds], newLog) => {
    if (!newLog) {
      return logs;
    }

    const existingLog = newLog.fxID
      ? Object.values(logs).find(log => log.fxID === newLog.fxID)
      : null;

    let id = newLog.id;

    let payloadShort = existingLog?.payloadShort ?? "";

    if (newLog.payload) {
      if (newLog.payload.length > 400) {
        payloadShort = newLog.payload.slice(0, 400) + "…";
      }
    }

    if (!existingLog || logIds.indexOf(existingLog.id) !== logIds.length - 1) {
      logs = {
        ...logs,
        [id]: {
          ...newLog,
          payloadShort,
          index: Object.values(logs).length,
        },
      };
    }

    if (existingLog) {
      logs = {
        ...logs,
        [existingLog.id]: {
          ...existingLog,
          payload: newLog.payload,
          payloadShort,
          timeEnd: newLog.time,
        },
      };
    }

    return logs;
  },
  target: $logs,
});

$storeHistory
  .on(logRecieved, (history, log) => {
    if (!log || !["store", "diff"].includes(log.kind) || !log.payload) {
      return history;
    }

    return {
      ...history,
      [log.name]: [...(history[log.name] || []), [log.id, log.payload]],
    };
  })
  .reset(emptyLogs);

// $storeHistory.watch(console.log);

sample({
  clock: logRecieved,
  source: combine([$logIds, $logs, $filterQueryRegexp, $filterKind]),
  fn: ([logIds, logs, filterQueryRegexp, filterKind], log) => {
    if (
      !log ||
      !logs[log.id] ||
      !filterQueryRegexp(log.name) ||
      !(filterKind === "" || filterKind === log.kind)
    ) {
      return logIds;
    }

    return [...logIds, log.id];
  },
  target: $logIds,
});

$logIds.reset(emptyLogs);

remoteSubscriber.subscribe(() => remoteSubscriber.callRemote("isReady"));
remoteSubscriber.ns("logs").subscribe(logRecieved);
