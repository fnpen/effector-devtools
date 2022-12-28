import { Message } from "common-types";
import { createPublisher } from "rempl";
import { ToolId } from "../common/constants";

let eventIdSeed = 0;

// const events: Message[] = [];

declare let __DEV__: boolean;
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

export const publishLog = (message: Message) => {
  const id = eventIdSeed++;

  const { name, op, payload } = message;

  const data = {
    id,
    name,
    op,
    payload: stringify(payload),
  };

  if (isReady) {
    eventLogChannel.publish(data);
  } else {
    stack.push(data);
  }
};
