import { createPublisher, PublisherNamespace } from "rempl";
import { ToolId } from "../common/constants";
import { Message } from "./../common/types";
import { isBrowser } from "./isBrowser";
import { stringify } from "./stringify";

let eventIdSeed = 0;

declare let __UI_SRC__: string;

let isReady = false;
const stack: any[] = [];
let publisher;

function initPublisher() {
  const publisher = createPublisher(ToolId, () => ({
    type: "script",
    value: __UI_SRC__,
  }));

  publisher.provide("isReady", () => {
    isReady = true;
    if (stack.length) {
      while (stack.length) {
        publisher.ns("logs").publish(stack.shift());
      }
    }
  });

  return publisher;
}

export const getPublisher = (ns: string) => {
  if (!isBrowser) {
    return null;
  }

  if (!publisher) {
    publisher = initPublisher();
  }
  return publisher?.ns(ns);
};

export type Publisher = PublisherNamespace;

export const publishLog = (message: Partial<Message>) => {
  const id = eventIdSeed++;

  const { payload, ...rest } = message;

  const data = {
    op: "custom",
    kind: "message",
    ...rest,
    id,
    time: performance.now(),
    payload: stringify(message.payload),
  };

  if (isReady) {
    getPublisher("logs").publish(data);
  } else {
    stack.push(data);
  }
};
