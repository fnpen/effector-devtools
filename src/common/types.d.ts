import { Domain, Effect, Event, Store } from "effector";

export interface StaticState {
  enabled: boolean;
  expanded: boolean;
  autoSelectLast: boolean;
  zoom: number;
  query: string;
  filterKind: string;
  nameColumnWidth: number;
  diffMode: string;
  xpaths: { [name: string]: string };
}

export interface FullState extends StaticState {
  subscriptions: string[];
}

export interface Message {
  id: number;
  kind: string;
  name?: string;
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

export interface Loggable<T> {
  unit: AnyUnit<T>;
  enabled: boolean;
  unwatch?: Function;
  setEnabled: (enabled: boolean) => void;
  getName: () => string;
  handler: (context: any) => void;
}

export type AnyUnit<T> =
  | Store<T>
  | Effect<T, unknown, unknown>
  | Event<T>
  | Domain;
