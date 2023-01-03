import { Effect, Event, Store, Subscription } from "effector";

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
  process?: ProcessFn;
}

export interface FullState extends StaticState {
  subscriptions: string[];
}

export interface Message {
  op: string;
  id: number;
  kind: string;
  name: string;
  time: number;
  payload?: any;
}

export type ToolsMessage = Message & {
  index: number;
};

export type ProcessFn = (
  payload: any,
  meta: Omit<Message, "payload">
) => any | false;

export interface Loggable {
  enabled: boolean;
  unwatch?: Subscription;
  setEnabled: (enabled: boolean) => void;
  getKind: () => string;
  getName: () => string;
  log: (op: string, payload?: any) => void;
  process: ProcessFn;
}

export type AnyUnit<T> = Store<T> | Effect<T, any> | Event<T>;
export type LoggableUnit<T> = AnyUnit<T> & {
  logger: Loggable;
};
