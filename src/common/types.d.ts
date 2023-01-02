import { Effect, Event, Store } from "effector";

export interface StaticState {
  enabled: boolean;
  expanded: boolean;
  zoom: number;
  query: string;
}

export interface AttachLoggerConfig {
  name?: string;
  prefix?: string;
  kind?: string;
}

export interface FullState extends StaticState {
  subscriptions: string[];
}

export interface Message {
  op: string;
  id: number;
  kind: string;
  name: string;
  payload?: any;
}

export type ToolsMessage = Message & {
  index: number;
};

export interface Loggable {
  enabled: boolean;
  unwatch?: Subscription;
  setEnabled: (enabled: boolean) => void;
  getKind: () => string;
  getName: () => string;
  log: (op: string, payload?: any) => void;
}

export type AnyUnit<T> = Store<T> | Effect<T, any> | Event<T>;
export type LoggableUnit<T> = AnyUnit<T> & {
  logger: Loggable;
};
