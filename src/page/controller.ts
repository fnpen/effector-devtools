import type {
  AnyUnit,
  Loggable,
  Message,
  StaticState,
} from "./../common/types";

import { is } from "effector";
import debounce from "lodash.debounce";
import { defaultState } from "../common/constants";
import { filterLogsFn } from "../common/filterLogsFn";

import { globalConfig } from "./config";
import { watch } from "./debug";
import { getName } from "./getName";
import { isBrowser } from "./isBrowser";
import { getPublisher, publishLog } from "./rempl-publisher";
import { stringify } from "./stringify";

export const logDiff = (name: string, ...args: any[]) => {
  publishLog({
    kind: "diff",
    name,
    payload: args,
  });
};

export const log = (...args: any[]) => logName(undefined, ...args);

export const logName = (name: string | undefined, ...args: any[]) => {
  publishLog({
    name,
    payload: args,
  });
};

if (isBrowser) {
  document.addEventListener("keydown", e => {
    if (globalConfig.routeKeyboard) {
      const { key, code, ctrlKey, metaKey } = e;
      getPublisher("keyboard").publish({ key, code, ctrlKey, metaKey });
    }
  });
}

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

const saveState = debounce(() => {
  window.localStorage.setItem("effector-devtools", JSON.stringify(state));
}, 80);

const units: Set<Loggable<any>> = new Set();

function getState() {
  return {
    ...state,
    subscriptions: Array.from(units.values())
      .filter(logger => logger.enabled)
      .map(logger => logger.getName()),
  };
}

const sendState = debounce(() => {
  getPublisher("state").publish(getState());
}, 80);

function setState(newState: StaticState) {
  state.enabled = newState.enabled;
  state.diffMode = newState.diffMode;
  state.nameColumnWidth = newState.nameColumnWidth;
  state.autoSelectLast = newState.autoSelectLast;
  state.filterKind = newState.filterKind;
  state.xpaths = newState.xpaths;

  setFilterQuery(newState.query);

  state.zoom = newState.zoom;
  state.expanded = !!newState.expanded;

  saveState();
  refreshSubscriptions();
}

if (isBrowser) {
  getPublisher("state").provide({ setState });
  sendState();
}

function setFilterQuery(query: string) {
  if (state.query === query) {
    return;
  }

  state.query = query;

  refreshSubscriptions();

  sendState();
}

function refreshSubscriptions() {
  const filterFn = filterLogsFn(state.query);

  for (let logger of units) {
    if (!state.enabled) {
      logger.setEnabled(false);
      continue;
    }

    logger.setEnabled(filterFn(logger.getName()));
  }
}

export function onUnitCreate<T>(logger: Loggable<T>) {
  units.add(logger);

  if (state.enabled) {
    logger.setEnabled(true);
  }

  sendState();
}

export function createLogger<T>(unit: AnyUnit<T>) {
  const logger: Loggable<T> = {
    unit,

    enabled: false,

    getName: () => {
      return getName(unit) || "";
    },

    setEnabled: (enabled: boolean) => {
      if (enabled === logger.enabled) {
        return;
      }

      if (enabled) {
        if (!logger.enabled) {
          logger.unwatch = watch(logger.unit, {
            trace: true,
            handler: logger.handler,
          });
        }
      } else if (logger.unwatch) {
        logger.unwatch();
      }

      logger.enabled = enabled;

      sendState();
    },

    handler: (context: any) => {
      let payload = context.value;

      if (context.kind === "effect") {
        const status = context.value?.status || "pending";

        payload = {
          params: status === "pending" ? context.value : null,
          ...(context.value || {}),
          status,
        };
      }

      const data = {
        kind: context.kind,
        name: context.name,
        fxID: context.stackMeta?.fxID,
        trace: context.trace
          ? stringify(
              context.trace.map(trace => ({
                kind: trace.kind,
                name: trace.name,
                value: trace.value,
                fxID: context.stackMeta?.fxID,
                loc: trace.loc,
              }))
            )
          : undefined,
      } as Message;

      data.payload = payload;

      if (data.payload !== false) {
        publishLog(data);
      }
    },
  };

  return logger;
}

export const attachLogger = <T>(unit: AnyUnit<T>) => {
  if (is.domain(unit)) {
    unit.onCreateEvent(attachLogger);
    unit.onCreateEffect(attachLogger);
    unit.onCreateStore(attachLogger);
    unit.onCreateDomain(attachLogger);
  } else {
    const logger = createLogger(unit);

    onUnitCreate(logger);

    if (is.effect(unit)) {
      attachLogger(unit.finally);
    }
  }
};
