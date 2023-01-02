import {
  createEffect as createEffectOrig,
  createEvent as createEventOrig,
  createStore as createStoreOrig,
  Effect,
  Event,
  Store,
} from "effector";
import { loggerAttach } from "./controller";
import { Loggable } from "./types";

const createStore: typeof createStoreOrig = <T>(...args: any) => {
  const event = createStoreOrig(...args) as Loggable & Store<T>;

  const mapOrig = event.map;
  event.map = (fn, dataFromBabel) => {
    const store = mapOrig(fn);

    if (dataFromBabel?.name) {
      store.shortName = dataFromBabel.and
        ? `\$${dataFromBabel.and}`
        : dataFromBabel.name;
    }

    loggerAttach(store);

    return store;
  };

  loggerAttach(event);

  return event;
};
const createEvent: typeof createEventOrig = <T>(...args: any) => {
  const event = createEventOrig(...args) as Loggable & Event<T>;

  loggerAttach(event);

  return event;
};
const createEffect: typeof createEffectOrig = <T, A>(...args: any) => {
  const effect = createEffectOrig(...args) as Loggable & Effect<T, A>;

  loggerAttach(effect);
  loggerAttach(effect.done, effect);
  loggerAttach(effect.fail, effect);
  // attachLogger(effect.finally, effect);
  return effect;
};

export { createStore, createEvent, createEffect };