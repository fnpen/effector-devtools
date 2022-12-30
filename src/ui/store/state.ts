import { FullState } from "common-types";
import { createEvent, createStore } from "effector";
import { defaultState } from "../../common/constants";
import { filterLogsFn } from "../../common/filterLogsFn";
import { remoteSubscriber } from "../rempl-subscriber";

// const localData = ((): Partial<State> => {
//   let data = {} as State;
//   try {
//     data = JSON.parse(window.localStorage.getItem("effector-devtools") || "{}");
//   } catch (e) {
//     console.log("localData parsing issue.");
//   }
//   return data;
// })();

export const $state = createStore<FullState>({
  ...defaultState,
  subscriptions: [],
});

// $state.watch(storage =>
//   window.localStorage.setItem("effector-devtools", JSON.stringify(storage))
// );

export const $zoom = $state.map(e => e.zoom);
export const $enabled = $state.map(e => e.enabled);
export const $expanded = $state.map(e => e.expanded);
export const $subscriptions = $state.map(e => e.subscriptions);
export const $filterQuery = $state.map(e => e.query);
export const $filterQueryRegexp = $filterQuery.map(filterQuery =>
  filterLogsFn(filterQuery)
);
const changeState = createEvent();
export const setExpanded = createEvent<boolean>();
export const setZoom = createEvent<number>();
export const toogleEnable = createEvent();
export const changeFilterQuery = createEvent<string>();

$state.on(changeState, (_, e) => e);
$state.on(changeFilterQuery, (state, query) => ({ ...state, query }));
$state.on(setExpanded, (state, expanded) => ({ ...state, expanded }));
$state.on(toogleEnable, state => ({ ...state, enabled: !state.enabled }));
$state.on(setZoom, (state, zoom) => ({ ...state, zoom }));

$zoom.watch(zoom => {
  remoteSubscriber.callRemote("setZoom", zoom);
});
$enabled.watch(enabled => {
  remoteSubscriber.callRemote("setEnabled", enabled);
});

remoteSubscriber.ns("state").subscribe(state => {
  changeState(state);
});

$filterQuery.watch(query => {
  remoteSubscriber.callRemote("setFilterQuery", query);
});
