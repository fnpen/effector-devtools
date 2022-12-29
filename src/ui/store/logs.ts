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

export const $filteredOutLogs = createStore<Message[]>([]);
export const $logs = createStore<Message[]>([]);

const $filtrationResult = sample({
  clock: $filterQuery,
  source: combine([$logs, $filteredOutLogs, $filterQuery]),
  fn: ([logs, filteredOutLogs, filterQuery]) => {
    const filterLogs = filterLogsFn(filterQuery);

    const passed: Message[] = [];
    const notPassed: Message[] = [];

    [...logs, ...filteredOutLogs].forEach(log => {
      if (filterLogs(log.name)) {
        passed.push(log);
      } else {
        notPassed.push(log);
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
  target: $logs,
});

sample({
  clock: $filtrationResult,
  fn: result => result.notPassed,
  target: $filteredOutLogs,
});

export const $logIds = $logs.map(logs => logs.map(log => log.id));

const logRecieved = createEvent<Message>();
export const emptyLogs = createEvent();
$logs
  .on(logRecieved, (logs, log) => {
    if (!log) {
      return logs;
    }

    if (log.payload) {
      // TODO: later in React Details?
      log.payloadData = JSON.parse(log.payload);
    }

    return [...logs, log];
  })
  .reset(emptyLogs);

remoteSubscriber.subscribe(() => {
  remoteSubscriber.callRemote("isReady");
});
remoteSubscriber.ns("logs").subscribe(logRecieved);
