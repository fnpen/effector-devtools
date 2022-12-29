import { createEvent, createStore } from "effector";
import { remoteSubscriber } from "../rempl-subscriber";

export const $state = createStore({
  enabled: false,
  subscriptions: [],
  query: "",
});
export const $enabled = $state.map(e => e.enabled);
export const $subscriptions = $state.map(e => e.subscriptions);
export const $filterQuery = $state.map(e => e.query);
const changeState = createEvent();
export const toogleEnable = createEvent();
export const changeFilterQuery = createEvent<string>();

$state.on(changeState, (_, e) => e);
$state.on(changeFilterQuery, (state, query) => ({ ...state, query }));
$state.on(toogleEnable, state => ({ ...state, enabled: !state.enabled }));

$enabled.watch(enabled => {
  remoteSubscriber.callRemote("setEnabled", enabled);
});

remoteSubscriber.ns("state").subscribe(state => {
  changeState(state);
});

$filterQuery.watch(query => {
  remoteSubscriber.callRemote("setFilterQuery", query);
});
