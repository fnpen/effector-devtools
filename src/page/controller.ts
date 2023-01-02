import type {
  AnyUnit,
  AttachLoggerConfig,
  Loggable,
  LoggableUnit,
  StaticState,
} from "./../common/types";

import { is, Unit } from "effector";
import debounce from "lodash.debounce";
import { defaultState } from "../common/constants";
import { filterLogsFn } from "../common/filterLogsFn";

import { config } from "./config";
import { publisher, publishLog } from "./rempl-publisher";

document.addEventListener("keydown", e => {
  if (config.routeKeyboard) {
    const { key, code, ctrlKey, metaKey } = e;
    publisher.ns("keyboard").publish({ key, code, ctrlKey, metaKey });
  }
});

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

const units: Set<LoggableUnit<any>> = new Set();

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

function setState(newState: StaticState) {
  state.enabled = newState.enabled;

  setFilterQuery(newState.query);

  state.zoom = newState.zoom;
  state.expanded = !!newState.expanded;

  saveState();
  refreshSubscriptions();
}

publisher.ns("state").provide({ setState });

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

  for (let unit of units) {
    if (!state.enabled) {
      unit.logger.setEnabled(false);
      continue;
    }

    unit.logger.setEnabled(filterFn(unit.logger.getName()));
  }
}

export function onUnitCreate<T>(unit: LoggableUnit<T>) {
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

export function createLogger<T>(
  unit: AnyUnit<T>,
  config: AttachLoggerConfig = {}
) {
  config = config || {};

  const logger: Loggable = {
    enabled: false,

    getName: () => {
      let name = config.name || unit.compositeName.fullName;

      if (config.prefix) {
        name = config.prefix + name;
      }

      return name;
    },

    getKind: () => config.kind ?? unit.kind,

    setEnabled: (enabled: boolean) => {
      if (enabled === logger.enabled) {
        return;
      }

      if (enabled) {
        if (!logger.enabled) {
          const unwatch = unit.watch((payload: any) => {
            logger.log("unit-watch", payload);
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

export const attachLogger = <T>(
  unit: Unit<T>,
  config: AttachLoggerConfig = {}
) => {
  config = config || {};

  if (typeof config !== "object") {
    config = {};
  }

  if (is.domain(unit)) {
    unit.onCreateEvent(attachLogger);
    unit.onCreateEffect(attachLogger);
    unit.onCreateStore(attachLogger);
    unit.onCreateDomain(attachLogger);
  } else {
    const logger = createLogger(unit, config);
    const unitWithLogger = unit as any as LoggableUnit<typeof unit>;

    unitWithLogger.logger = logger;

    onUnitCreate(unitWithLogger);

    if (is.effect(unit)) {
      attachLogger(unit.done, {
        ...config,
        kind: "effect",
        prefix: unitWithLogger.logger.getName() + ".",
      });
      attachLogger(unit.fail, {
        ...config,
        kind: "effect",
        prefix: unitWithLogger.logger.getName() + ".",
      });
    }
  }
};
