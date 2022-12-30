import { combine, createEvent, createStore, sample } from "effector";
import { $logs, emptyLogs } from "./logs";

export const $selected = createStore<number | false>(false);
export const selectMessage = createEvent<number | false>();
$selected.on(selectMessage, (_, e) => e).reset(emptyLogs);

export const $detailsTab = createStore<string>("preview");
export const changeTab = createEvent<string>();
$detailsTab.on(changeTab, (_, e) => e);

export const $selectedMessage = sample({
  source: combine([$logs, $selected]),
  fn: ([logs, selected]) => (selected ? logs[selected] : null),
});
