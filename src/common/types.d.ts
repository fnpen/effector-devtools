declare module "common-types" {
  export interface BaseMessage {
    op: string;
    id: number;
    commitId: number;
  }

  export type UnitType = 1;// | 2;

  export interface EventCreateMessage extends BaseMessage {
    op: "event-create";
    name: string;
  }

  export interface EventWatchMessage extends BaseMessage {
    op: "event-watch";
    name: string;
    payload: any;
  }

  export type Message =
    | EventCreateMessage
    | EventWatchMessage
}
