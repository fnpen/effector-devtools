import { Effect, Event, Store } from "effector";

export interface StaticState {
  enabled: boolean;
  expanded: boolean;
  zoom: number;
  query: string;
  filterKind: string;
  diffMode: string;
  xpaths: { [name: string]: string };
}

export interface AttachLoggerConfig {
  // name?: string;
  // prefix?: string;
  // kind?: string;
  process?: ProcessFn;
}

export interface FullState extends StaticState {
  subscriptions: string[];
}

export interface Message {
  id: number;
  kind: string;
  name: string;
  time: number;
  payload?: any;
  fxID?: string;
  trace?: { kind: string; name: string; value: any }[];
}

export type ToolsMessage = {
  id: number;
  kind: string;
  name: string;

  index: number;
  time: number;
  timeEnd?: number;
  payload?: any;
  payloadShort?: any;
  fxID?: string;
};

export type ProcessFn = (
  payload: any,
  meta: Omit<Message, "payload">
) => any | false;

export interface Loggable {
  enabled: boolean;
  unwatch?: Function;
  setEnabled: (enabled: boolean) => void;
  getKind: () => string;
  getName: () => string;
  handler: (context: any) => void;
  process: ProcessFn;
}

export type AnyUnit<T> = Store<T> | Effect<T, any> | Event<T>;
export type LoggableUnit<T> = AnyUnit<T> & {
  logger: Loggable;
};
