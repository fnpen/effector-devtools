import { Message } from "common-types";
import { combine, createEvent, createStore, sample } from "effector";
import { debounce } from "patronum/debounce";
import { remoteSubscriber } from "../rempl-subscriber";
import { $filterQuery, $filterQueryRegexp, changeFilterQuery } from "./state";

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
export const $logs = createStore<{ [id: number]: Message }>({});
export const $storeHistory = createStore<{ [unitName: string]: any }>({});
export const $logIds = createStore<number[]>([]);

const $filtrationResult = sample({
  clock: $filterQuery,
  source: combine([$logs, $logIds, $filteredOutLogIds, $filterQueryRegexp]),
  fn: ([logs, logIds, filteredOutLogIds, filterQueryRegexp]) => {
    const passed: number[] = [];
    const notPassed: number[] = [];

    Object.values(logs)
      .map(log => log.id)
      .forEach(logId => {
        if (filterQueryRegexp(logs[logId].name)) {
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

    return {
      ...logs,
      [log.id]: {
        ...log,
        index: logs.length,
      },
    };
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

sample({
  clock: logRecieved,
  source: combine([$logIds, $filterQueryRegexp]),
  fn: ([logIds, filterQueryRegexp], log) => {
    if (!log || !filterQueryRegexp(log.name)) {
      return logIds;
    }

    return [...logIds, log.id];
  },
  target: $logIds,
});

$logIds.reset(emptyLogs);

remoteSubscriber.subscribe(() => {
  remoteSubscriber.callRemote("isReady");
});
remoteSubscriber.ns("logs").subscribe(logRecieved);
