import { createEvent, createStore } from "effector";
import { remoteSetEnabled, remoteSubscriber } from "../rempl-subscriber";

export const $enabled = createStore(false);
const changeEnabled = createEvent();
export const toogleEnable = createEvent();
$enabled.on(changeEnabled, (_, e) => e).on(toogleEnable, e => !e);
$enabled.watch(remoteSetEnabled);
remoteSubscriber.ns("stateChanged").subscribe(({ name, value }) => {
  switch (name) {
    case "enabled":
      changeEnabled(value);
      break;
  }
});
