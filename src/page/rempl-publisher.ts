import { createPublisher } from "rempl";
import { ToolId } from "../common/constants";
import { Message } from "./../common/types";

let eventIdSeed = 0;

declare let __UI_SRC__: string;

export const publisher = createPublisher(ToolId, () => ({
  type: "script",
  value: __UI_SRC__,
}));

export type Publisher = typeof publisher;

function isReactSyntheticEvent(event: any) {
  if (typeof event !== "object" || event === null) {
    return false;
  }
  return "_dispatchListeners" in event;
}

const stringify = (obj: any) => {
  return JSON.stringify(obj, (k, v) => {
    if (v && isReactSyntheticEvent(v)) return "SyntheticEvent";
    if (v && typeof v === "object") {
      // if (v instanceof Event || (typeof v?.originalEvent === 'object' && v?.originalEvent instanceof Event)) return 'Event';
      if (v instanceof Error) {
        return Object.getOwnPropertyNames(v).reduce((acc, k) => {
          acc[k] = v[k];
          return acc;
        }, {});
      }
      if (v instanceof Node) return "Node";
      if (v instanceof Window) return "Window";
    }
    return v;
  });
};

let isReady = false;
const stack: any[] = [];

const eventLogChannel = publisher.ns("logs");

publisher.provide("isReady", () => {
  isReady = true;
  if (stack.length) {
    while (stack.length) {
      eventLogChannel.publish(stack.shift());
    }
  }
});

export const publishLog = (message: Omit<Message, "id">) => {
  const id = eventIdSeed++;

  const { name, op, kind, payload } = message;

  const data = {
    id,
    name,
    kind,
    op,
    payload: stringify(payload),
  };

  if (isReady) {
    eventLogChannel.publish(data);
  } else {
    stack.push(data);
  }
};
