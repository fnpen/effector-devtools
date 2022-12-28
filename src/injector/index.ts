import { createEvent as createEventOrig, Event, Subscription } from "effector";

import { setConfig } from "./config";
import { EventCreateMessage, EventWatchMessage } from "./types";

import type { Publisher } from "./rempl-publisher";
import { publisher, publishLog } from "./rempl-publisher";

type LoggableEvent<T> = Event<T> & {
  loggingEnabled: boolean;
  loggingUnwatchFn?: Subscription;
  logging: (enabled: boolean) => void;
};

class Controller {
  publisher: Publisher;
  enabled: boolean = true;

  _events: Set<LoggableEvent<any>> = new Set();

  constructor(publisher: Publisher) {
    this.publisher = publisher;
    this.bindRemote();

    this.onStateChanged("enabled", this.enabled);
  }

  onStateChanged(name: string, value: any) {
    this.publisher.ns("stateChanged").publish({
      name,
      value,
    });
  }

  bindRemote() {
    this.publisher.provide("setEnabled", this.setEnabled.bind(this));
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.onStateChanged("enabled", enabled);

    for (let event of this._events) {
      if (
        (enabled && !event.loggingEnabled) ||
        (!enabled && event.loggingEnabled)
      ) {
        event.logging(enabled);
      }
    }
  }

  onEventCreate(event: LoggableEvent<any>) {
    this._events.add(event);

    if (this.enabled) {
      event.logging(true);
    }

    publishLog({
      op: "event-create",
      name: event.getType(),
    } as EventCreateMessage);
  }
}

const controller = new Controller(publisher);

const createEvent: typeof createEventOrig = <T>(...args: any) => {
  const event = createEventOrig(...args) as LoggableEvent<T>;

  event.loggingEnabled = false;

  event.logging = enabled => {
    if (enabled) {
      if (!event.loggingEnabled) {
        const name = event.getType();
        const unwatch = event.watch(payload => {
          publishLog({
            op: "event-watch",
            name,
            payload,
          } as EventWatchMessage);
        });

        event.loggingUnwatchFn = unwatch;
      }
    } else if (event.loggingUnwatchFn) {
      event.loggingUnwatchFn();
    }

    event.loggingEnabled = enabled;
  };

  controller.onEventCreate(event);

  return event;
};

export * from "effector";
export { createEvent, setConfig as config };
