import { Message } from "common-types";
import { Subscription } from "effector";
export * from "common-types";

export type DistributiveOmit<T, K extends keyof T> = T extends any
  ? Omit<T, K>
  : never;

export type RecordEventHandler = (
  payload: DistributiveOmit<Message, "id">
) => number;

export type Loggable = {
  enabled: boolean;
  unwatch?: Subscription;
  setEnabled: (enabled: boolean) => void;
  getKind: () => string;
  getName: () => string;
  log: (op: string, payload?: any) => void;
};
