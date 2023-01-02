import { StaticState } from "common-types";
import { is, Unit } from "effector";
import debounce from "lodash.debounce";
import { defaultState } from "../common/constants";
import { filterLogsFn } from "../common/filterLogsFn";

import { publisher, publishLog } from "./rempl-publisher";
import { Loggable } from "./types";

const localData = ((): Partial<StaticState> => {
  let data = {} as StaticState;
  try {
    data = JSON.parse(window.localStorage.getItem("effector-devtools") || "{}");
  } catch (e) {
    console.log("localData parsing issue.");
  }
  return data;
})();

let state = {
  ...defaultState,
  ...localData,
};

const units: Set<{ logger: Loggable }> = new Set();

function getState() {
  return {
    ...state,
    subscriptions: Array.from(units.values())
      .filter(unit => unit.logger.enabled)
      .map(unit => unit.logger.getName()),
  };
}

const sendState = debounce(() => {
  publisher.ns("state").publish(getState());
}, 80);

sendState();

const saveState = debounce(() => {
  window.localStorage.setItem("effector-devtools", JSON.stringify(state));
}, 80);

function setState(state: StaticState) {
  setEnabled(state.enabled);
  setFilterQuery(state.query);

  state.zoom = state.zoom;
  state.expanded = !!state.expanded;

  saveState();
}
publisher.provide("setState", setState);

function setFilterQuery(query: string) {
  if (state.query === query) {
    return;
  }

  state.query = query;

  setEnabled(state.enabled);

  sendState();
}

function setEnabled(enabled: boolean) {
  state.enabled = enabled;

  const filterFn = filterLogsFn(state.query);

  for (let unit of units) {
    if (!enabled) {
      unit.logger.setEnabled(false);
      continue;
    }

    unit.logger.setEnabled(filterFn(unit.logger.getName()));
  }
}

export function onUnitCreate(unit: { logger: Loggable }) {
  units.add(unit);

  if (state.enabled) {
    unit.logger.setEnabled(true);
  }

  // It's non informative for unit event
  if (
    unit.kind !== "store" &&
    !(
      unit.logger.getKind() === "effect" &&
      ["done", "fail"].includes(unit.shortName)
    )
  ) {
    unit.logger.log("unit-create");
  }

  sendState();
}

export function createLogger<T>(unit: Unit<T>, parent?: Unit<T>) {
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

      sendState();
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

export const loggerAttach = <T>(unit: Unit<T>, parent?: Unit<T>) => {
  if (is.domain(unit)) {
    unit.onCreateEvent(loggerAttach);
    unit.onCreateEffect(loggerAttach);
    unit.onCreateStore(loggerAttach);
    unit.onCreateDomain(loggerAttach);
  } else {
    (unit as any).logger = createLogger(unit, parent);

    onUnitCreate(unit);
  }
};
