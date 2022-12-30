import { Message } from "common-types";
import { combine, createEvent, createStore, sample } from "effector";
import { debounce } from "patronum/debounce";
import { filterLogsFn } from "../../common/filterLogsFn";
import { remoteSubscriber } from "../rempl-subscriber";
import { $filterQuery, changeFilterQuery } from "./state";

export const $filterInputText = createStore<string>("");

export const filterInputTextChange = createEvent<string>();
$filterInputText.on(filterInputTextChange, (_, e) => e);

debounce({
  source: filterInputTextChange,
  timeout: 60,
  target: changeFilterQuery,
});

export const $filteredOutLogIds = createStore<number[]>([]);
export const $logs = createStore<{ [id: number]: Message }>({});
export const $storeHistory = createStore<{ [unitName: string]: any }>({});
export const $logIds = createStore<number[]>([]);

const $filtrationResult = sample({
  clock: $filterQuery,
  source: combine([$logs, $logIds, $filteredOutLogIds, $filterQuery]),
  fn: ([logs, logIds, filteredOutLogIds, filterQuery]) => {
    const filterLogs = filterLogsFn(filterQuery);

    const passed: number[] = [];
    const notPassed: number[] = [];

    [...logIds, ...filteredOutLogIds].forEach(logId => {
      if (filterLogs(logs[logId])) {
        passed.push(logId);
      } else {
        notPassed.push(logId);
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
$logs
  .on(logRecieved, (logs, log) => {
    if (!log) {
      return logs;
    }

    if (log.payload) {
      if (log.payload.length > 200) {
        log.payloadShort = log.payload.slice(0, 200);
      }
    }

    return { ...logs, [log.id]: log };
  })
  .reset(emptyLogs);

$storeHistory
  .on(logRecieved, (history, log) => {
    if (
      !log ||
      log.kind !== "store" ||
      log.op !== "unit-watch" ||
      !log.payload
    ) {
      return history;
    }

    return {
      ...history,
      [log.name]: [
        ...(history[log.name] || []),
        [log.id, JSON.parse(log.payload)],
      ],
    };
  })
  .reset(emptyLogs);

// $storeHistory.watch(console.log);

$logIds
  .on(logRecieved, (logs, log) => {
    if (!log) {
      return logs;
    }

    return [...logs, log.id];
  })
  .reset(emptyLogs);

remoteSubscriber.subscribe(() => {
  remoteSubscriber.callRemote("isReady");
});
remoteSubscriber.ns("logs").subscribe(logRecieved);
