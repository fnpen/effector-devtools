import { createEvent, createStore, sample } from "effector";
import { throttle } from "patronum";
import { defaultState } from "../../common/constants";
import { filterLogsFn } from "../../common/filterLogsFn";
import { remoteSubscriber } from "../rempl-subscriber";
import { FullState } from "./../../common/types";

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

// $state.watch(state => console.log({ state }));

export const $xpathsInput = createStore<{ [name: string]: string }>({});
export const $xpaths = $state.map(e => e.xpaths);

export const $zoom = $state.map(e => e.zoom);
export const $enabled = $state.map(e => e.enabled);
export const $expanded = $state.map(e => e.expanded);
export const $diffMode = $state.map(e => e.diffMode);
export const $filterKind = $state.map(e => e.filterKind);
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
export const changeDiffMode = createEvent<string>();
export const changeFilterKind = createEvent<string>();

export const changeXPathInput = createEvent<[string, string]>();
export const changeXPath = createEvent<[string, string]>();

$xpathsInput.on(changeXPathInput, (xpaths, [name, xpath]) => ({
  ...(xpaths || {}),
  [name]: xpath,
}));

throttle({
  source: changeXPathInput,
  timeout: 500,
  target: changeXPath,
});

sample({
  source: $xpaths,
  target: $xpathsInput,
});

$state.on(changeState, (_, e) => e);

$state.on(changeXPath, (state, [name, xpath]) => ({
  ...state,
  xpaths: {
    ...(state.xpaths || {}),
    [name]: xpath,
  },
}));

$state.on(changeFilterQuery, (state, query) => ({ ...state, query }));
$state.on(changeDiffMode, (state, diffMode) => ({ ...state, diffMode }));
$state.on(changeFilterKind, (state, filterKind) => ({ ...state, filterKind }));
$state.on(setExpanded, (state, expanded) => ({ ...state, expanded }));
$state.on(toogleEnable, state => ({ ...state, enabled: !state.enabled }));
$state.on(setZoom, (state, zoom) => ({ ...state, zoom }));

$state.watch(({ subscriptions, ...state }) => {
  remoteSubscriber.ns("state").callRemote("setState", state);
});

remoteSubscriber.ns("state").subscribe(state => {
  if (!state) {
    return;
  }

  changeState(state);
});

remoteSubscriber.ns("keyboard").subscribe((state: any) => {
  if (!state) {
    return;
  }

  document.dispatchEvent(new KeyboardEvent("keydown", state));
  document.dispatchEvent(new KeyboardEvent("keyup", state));
});
