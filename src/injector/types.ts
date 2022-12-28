import {
  Message
} from "common-types";
export * from "common-types";

export type DistributiveOmit<T, K extends keyof T> = T extends any
  ? Omit<T, K>
  : never;

export type RecordEventHandler = (
  payload: DistributiveOmit<Message, "id">
) => number;
