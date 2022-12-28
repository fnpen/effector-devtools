import { Message } from "common-types";
import { createEvent, createStore } from "effector";
import { remoteSubscriber } from "../rempl-subscriber";

export const $logs = createStore<Message[]>([]);
const logRecieved = createEvent<Message>();
export const emptyLogs = createEvent();
$logs
  .on(logRecieved, (logs, log) => {
    if (!log) {
      return logs;
    }

    if (log.payload) {
      log.payloadData = JSON.parse(log.payload);
    }

    return [...logs, log];
  })
  .reset(emptyLogs);

export const $logIds = $logs.map(logs => logs.map(log => log.id));
remoteSubscriber.subscribe(data => {
  remoteSubscriber.callRemote("isReady");
});
remoteSubscriber.ns("logs").subscribe(logRecieved);
