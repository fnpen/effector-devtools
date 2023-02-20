import { clearNode, createNode, is, step } from "effector";

import type {
  Domain,
  Effect,
  Event,
  Node,
  Scope,
  Stack,
  Store,
  Unit,
} from "effector";

import { getName } from "./getName";

// TOOD: use patronum/debug directly

type LogContext = {
  logType: "initial" | "update";
  scope: Scope | null;
  scopeName: string | null;
  /** node, kind, value, name - common fields for logs and traces */
  node: Node;
  kind: string;
  value: unknown;
  name: string | null;
  loc?: {
    file?: string;
    line: number;
    column: number;
  };
  stackMeta: Record<string, unknown>;
  trace: {
    node: Node;
    name: string | null;
    kind: string;
    value: unknown;
    loc?: {
      file?: string;
      line: number;
      column: number;
    };
    stackMeta: Record<string, unknown>;
  }[];
};

interface Config {
  trace?: boolean;
  handler?: (context: LogContext) => void;
}

const defaultConfig: Config = {
  trace: false,
  // default logger to console.info
  handler: context => {
    if (isEffectChild(context.node) && context.node.meta.named === "finally") {
      // skip effect.finally logs, it can be useful for other custom handlers
      // but not for default console.info logger
      return;
    }
    const { scope, scopeName, name, kind, value, loc, trace, node, logType } =
      context;
    const scopeLog = scope ? ` (scope: ${scopeName})` : "";

    const logName =
      name ?? (loc ? `${loc.file}:${loc.line}:${loc.column}` : "");
    const logPrintType = logType === "initial" ? " [getState]" : "";

    console.info(`[${kind}]${scopeLog} ${logName}${logPrintType}`, value);

    if (
      // logging trace only if there is something to log
      trace &&
      trace.length > 0 &&
      // do not log trace for effect children, as it is always the same effect internals
      !isEffectChild(node)
    ) {
      console.groupCollapsed(`[${kind}]${scopeLog} ${logName} trace`);
      trace.forEach(update => {
        const { name: traceName, kind, value, loc } = update;

        const logTraceName =
          traceName ?? (loc ? `${loc.file}:${loc.line}:${loc.column}` : "");

        console.info(`<- [${kind}] ${logTraceName}`, value);
      });
      console.groupEnd();
    }
  },
};

export function debug(
  ...entries:
    | [Unit<any>, ...Unit<any>[]]
    | [Config, ...Unit<any>[]]
    | [Record<string, Unit<any>>]
    | [Config, Record<string, Unit<any>>]
): void {
  const { config, units } = resolveParams(...entries);

  units.forEach(unit => {
    if (is.store(unit) || is.event(unit) || is.effect(unit)) {
      watchUnit(unit, config);
    } else if (is.domain(unit)) {
      watchDomain(unit, config);
    } else {
      /**
       * Let unknown stuff pass through as noop
       *
       * It's useful for debug of custom entities:
       * debug(myFarfetchedQuery)
       */
    }
  });
}

// Log node
function watchDomain(domain: Domain, config: Config) {
  domain.onCreateStore(store => watchUnit(store, config));
  domain.onCreateEvent(event => watchUnit(event, config));
  domain.onCreateEffect(effect => watchUnit(effect, config));
  domain.onCreateDomain(domain => watchDomain(domain, config));
}

function watchUnit(
  unit: Store<any> | Event<any> | Effect<any, any, any>,
  config: Config
) {
  if (is.store(unit)) {
    // store has its initial/current value - we can log it right away
    watchStoreInit(unit, config);
    watch(unit, config);
  } else if (is.event(unit)) {
    watch(unit, config);
  } else if (is.effect(unit)) {
    watch(unit, config);
    watch(unit.finally, config);
    watch(unit.done, config);
    watch(unit.fail, config);
  }
}

export function watch(unit: Unit<any>, config: Config) {
  const watcher = createNode({
    parent: [unit],
    // debug watchers should behave like normal watchers
    meta: { op: "watch" },
    family: { owners: unit },
    regional: true,
    // node only gets all required data
    node: [
      step.run({
        fn(value: unknown, _internal: unknown, stack: Stack) {
          const scope = stack?.scope ?? null;

          const context: LogContext = {
            logType: "update",
            scope,
            scopeName: getScopeName(scope),
            node: getNode(unit),
            kind: getType(unit),
            value,
            name: getName(unit),
            loc: getLoc(unit),
            // Use stack meta of actual unit, not of debug node
            stackMeta: getStackMeta(stack.parent),
            trace: config.trace ? collectTrace(stack) : [],
          };

          if (!config.handler) {
            throw Error("patronum/debug must have the handler");
          }

          config.handler(context);
        },
      }),
    ],
  });

  return () => clearNode(watcher);
}

type Trace = NonNullable<LogContext["trace"]>;
type TraceEntry = Trace[number];

function collectTrace(stack: Stack): Trace {
  const trace: Trace = [];

  let parent = stack?.parent;

  while (parent) {
    const { node, value } = parent;

    const entry: TraceEntry = {
      node,
      value,
      name: getName(node),
      loc: getLoc(node),
      kind: getType(node),
      stackMeta: getStackMeta(parent),
    };

    trace.push(entry);

    parent = parent.parent;
  }

  return trace;
}

function watchStoreInit(store: Store<any>, config: Config) {
  if (!config.handler) {
    throw Error("patronum/debug must have the handler");
  }

  const node = getNode(store);

  // current state
  const context: LogContext = {
    logType: "initial",
    scope: null,
    scopeName: null,
    node,
    kind: getType(store),
    value: store.getState(),
    name: getName(store),
    loc: getLoc(store),
    // nothing to trace for store.getState() - it is one-step call
    trace: [],
    // no stackMeta for initial state
    stackMeta: {},
  };

  config.handler(context);

  // current state in every known scope
  scopes.forEach(scope => watchStoreInitInScope(store, config, scope));
  // subscribe to new scopes
  watchScopeRegister(newScope =>
    watchStoreInitInScope(store, config, newScope)
  );
}

function watchStoreInitInScope(
  store: Store<any>,
  config: Config,
  scope: Scope
) {
  if (!config.handler) {
    throw Error("patronum/debug must have the handler");
  }

  const node = getNode(store);

  // current state
  const context: LogContext = {
    logType: "initial",
    scope,
    scopeName: getScopeName(scope),
    node,
    kind: getType(store),
    value: scope.getState(store),
    name: getName(store),
    loc: getLoc(store),
    // nothing to trace for scope.getState(store) - it is one-step call
    trace: [],
    // no stackMeta for initial state
    stackMeta: {},
  };

  config.handler(context);
}

// Config

function resolveParams(...entry: Parameters<typeof debug>): {
  config: Config;
  units: Unit<any>[];
} {
  let config: Config = defaultConfig;
  const [maybeConfig, ...restUnits] = entry;

  const units = [];

  if (isConfig(maybeConfig)) {
    config = { ...defaultConfig, ...maybeConfig };
  } else if (!is.unit(maybeConfig)) {
    for (const [name, unit] of Object.entries(maybeConfig)) {
      customNames.set(getGraph(unit as any).id, name);
      units.push(unit);
    }
  } else {
    units.push(maybeConfig);
  }

  for (const maybeUnit of restUnits) {
    if (is.unit(maybeUnit)) {
      units.push(maybeUnit);
    } else {
      for (const [name, unit] of Object.entries(maybeUnit)) {
        customNames.set(getGraph(unit as any).id, name);
        units.push(unit);
      }
    }
  }

  return { config, units };
}

function isConfig(
  maybeConfig: Unit<any> | Record<string, Unit<any>> | Config
): maybeConfig is Config {
  if (!is.unit(maybeConfig)) {
    return !Object.values(maybeConfig).every(is.unit);
  }

  return false;
}

// Scopes
const watchers = new Set<(scope: Scope) => void>();
const watchScopeRegister = (cb: (scope: Scope) => void) => {
  watchers.add(cb);

  return () => {
    watchers.delete(cb);
  };
};

function registerScope(scope: Scope, config: { name: string }) {
  scopes.save(scope, { name: config.name });

  watchers.forEach(cb => cb(scope));

  return () => {
    scopes.delete(scope);
  };
}

function unregisterAllScopes() {
  scopes.clear();
}

interface Meta {
  name: string;
}

let unknownScopes = 0;
function getDefaultScopeName() {
  unknownScopes += 1;
  return `unknown_${unknownScopes}`;
}

const cache = new Map<Scope, Meta>();
const scopes = {
  save(scope: Scope, meta: Meta) {
    if (!scopes.get(scope)) {
      cache.set(scope, meta);
    }
  },
  get(scope?: Scope): Meta | null {
    if (!scope) return null;
    return cache.get(scope) ?? null;
  },
  delete(scope: Scope) {
    cache.delete(scope);
  },
  forEach(callback: (scope: Scope, meta: Meta) => void) {
    cache.forEach((meta, scope) => callback(scope, meta));
  },
  clear() {
    cache.clear();
  },
} as const;

debug.registerScope = registerScope;
debug.unregisterAllScopes = unregisterAllScopes;

function getScopeName(scope: Scope | null) {
  if (!scope) return null;

  const meta = scopes.get(scope);

  if (!meta) {
    // @ts-expect-error
    const fallbackId =
      scope._debugId || (scope._debugId = getDefaultScopeName());

    return fallbackId;
  }

  return meta.name;
}

// Utils
export function isEffectChild(node: Node | Unit<any>) {
  const actualNode = getNode(node);
  const { sid, named } = actualNode.meta;

  return Boolean(
    !sid &&
      (named === "finally" ||
        named === "done" ||
        named === "doneData" ||
        named === "fail" ||
        named === "failData" ||
        named === "inFlight" ||
        named === "pending")
  );
}

export function isStoreOn(node: Node | Unit<any>) {
  const actualNode = getNode(node);
  const { op } = actualNode.meta;

  if (op === "on") return true;

  return false;
}

export function getType(unit: Unit<any> | Node) {
  if (is.store(unit)) {
    return "store";
  }
  if (is.effect(unit) || isEffectChild(unit)) {
    return "effect";
  }
  if (is.event(unit)) {
    return "event";
  }
  if (is.domain(unit)) {
    return "domain";
  }
  if (is.unit(unit)) {
    return "unit";
  }

  const node = getNode(unit);

  if (node.meta.op) {
    return node.meta.op;
  }

  return "unknown";
}

type NodeUnit = { graphite: Node } | Node;
export const getGraph = (graph: NodeUnit): Node =>
  (graph as { graphite: Node }).graphite || graph;

export const customNames = new Map<Node["id"], string>();

export function getOwningDomainName(unit: Node | Unit<any>): string | null {
  const closestParentDomain = getNode(unit).family.owners.find(
    n => n.meta.op === "domain"
  );

  if (!closestParentDomain) return null;

  return getName(closestParentDomain);
}

function readLoc({
  meta,
}: Node): void | { file?: string; line: number; column: number } {
  if (!meta) {
    return;
  }

  const loc = meta.config ? meta.config.loc : meta.loc;

  return loc;
}

function getLoc(unit: Node | Unit<any>) {
  const loc = readLoc(getNode(unit));

  if (!loc) return undefined;

  return loc;
}

export function getNode(node: Node | { graphite: Node } | Unit<any>): Node {
  const actualNode = "graphite" in node ? node.graphite : (node as Node);

  return actualNode;
}

function getStackMeta(stack?: Stack): Record<string, unknown> {
  if (!stack) return {};

  const meta = (stack as any).meta || {};

  return meta as Record<string, unknown>;
}
