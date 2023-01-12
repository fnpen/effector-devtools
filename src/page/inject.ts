import {
  createEffect as createEffectOrig,
  createEvent as createEventOrig,
  createStore as createStoreOrig,
} from "effector";
import { attachLogger } from "./controller";

const createStore: typeof createStoreOrig = <T>(...args: any) => {
  const event = createStoreOrig(...args);

  const mapOrig = event.map;

  event.map = (fn, dataFromBabel) => {
    const store = mapOrig(fn);

    if (dataFromBabel?.name) {
      store.shortName = dataFromBabel.and
        ? `\$${dataFromBabel.and}`
        : dataFromBabel.name;
    }

    attachLogger(store);

    return store;
  };

  attachLogger(event);

  return event;
};
const createEvent: typeof createEventOrig = <T>(...args: any) => {
  const event = createEventOrig(...args);

  attachLogger(event);

  return event;
};
const createEffect: typeof createEffectOrig = <T, A>(...args: any) => {
  const effect = createEffectOrig(...args);

  attachLogger(effect);

  return effect;
};

export { createStore, createEvent, createEffect };
