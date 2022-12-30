import {
  createEffect as createEffectOrig,
  createEvent as createEventOrig,
  createStore as createStoreOrig,
  Effect,
  Event,
  Store,
  Subscription,
  Unit,
} from "effector";
import debounce from "lodash.debounce";

import { filterLogsFn } from "../common/filterLogsFn";
import { setConfig } from "./config";

import type { Publisher } from "./rempl-publisher";
import { publisher, publishLog } from "./rempl-publisher";

type Loggable = {
  enabled: boolean;
  unwatch?: Subscription;
  setEnabled: (enabled: boolean) => void;
  getKind: () => string;
  getName: () => string;
  log: (op: string, payload?: any) => void;
  // graphite: Node;
};

class Controller {
  publisher: Publisher;
  enabled: boolean = true;
  query: string = "";

  _events: Set<{ logger: Loggable }> = new Set();

  constructor(publisher: Publisher) {
    this.publisher = publisher;
    this.bindRemote();

    this.sendState();
  }

  getState() {
    return {
      enabled: this.enabled,
      query: this.query,
      subscriptions: Array.from(this._events.values())
        .filter(unit => unit.logger.enabled)
        .map(unit => unit.logger.getName()),
    };
  }

  sendState = debounce(() => {
    this.publisher.ns("state").publish(this.getState());
  }, 80);

  bindRemote() {
    this.publisher.provide("setEnabled", this.setEnabled.bind(this));
    this.publisher.provide("setFilterQuery", this.setFilterQuery.bind(this));
  }

  setFilterQuery(query: string) {
    this.query = query;

    this.setEnabled(this.enabled);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;

    const filterFn = filterLogsFn(this.query);

    for (let unit of this._events) {
      if (!enabled) {
        unit.logger.setEnabled(false);
        continue;
      }

      unit.logger.setEnabled(filterFn(unit.logger.getName()));
    }
  }

  onUnitCreate(unit: { logger: Loggable }) {
    this._events.add(unit);

    if (this.enabled) {
      unit.logger.setEnabled(true);
    }

    unit.logger.log("unit-create");

    this.sendState();
  }

  createLogger<T>(unit: Unit<T>, parent?: Unit<T>) {
    const logger: Loggable = {
      enabled: false,
      getName: () => {
        return (
          (parent ? (parent as any).shortName + "." : "") +
          (unit as any).shortName
        );
      },
      getKind: () => (parent ? parent : unit).kind,
      setEnabled: enabled => {
        if (enabled === logger.enabled) {
          return;
        }

        if (enabled) {
          if (!logger.enabled) {
            const unwatch = unit.watch(payload => {
              unit.logger.log("unit-watch", payload);
            });

            logger.unwatch = unwatch;
          }
        } else if (logger.unwatch) {
          logger.unwatch();
        }

        logger.enabled = enabled;

        this.sendState();
      },
      log: (op: string, payload?: any) => {
        publishLog({
          op,
          kind: logger.getKind(),
          name: logger.getName(),
          payload,
        });
      },
    };

    return logger;
  }
}

const controller = new Controller(publisher);

const attachLogger = <T>(unit: Unit<T>, parent?: Unit<T>) => {
  (unit as any).logger = controller.createLogger(unit, parent);

  controller.onUnitCreate(unit as any);
};

const createStore: typeof createStoreOrig = <T>(...args: any) => {
  const event = createStoreOrig(...args) as Loggable & Store<T>;

  attachLogger(event);

  return event;
};

const createEvent: typeof createEventOrig = <T>(...args: any) => {
  const event = createEventOrig(...args) as Loggable & Event<T>;

  attachLogger(event);

  return event;
};

const createEffect: typeof createEffectOrig = <T, A>(...args: any) => {
  const effect = createEffectOrig(...args) as Loggable & Effect<T, A>;

  attachLogger(effect);
  attachLogger(effect.done, effect);
  attachLogger(effect.fail, effect);
  attachLogger(effect.finally, effect);

  return effect;
};

export * from "effector";
export { createEvent, createEffect, createStore, setConfig as config };
