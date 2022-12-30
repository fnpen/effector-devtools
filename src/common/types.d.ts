declare module "common-types" {
  export interface StaticState {
    enabled: boolean;
    expanded: boolean;
    zoom: number;
    query: string;
  }

  export interface FullState extends StaticState {
    subscriptions: string[];
  }

  export interface BaseMessage {
    op: string;
    id: number;
    kind: string;
    name: string;
    payload?: any;
  }

  // export type UnitType = 1; // | 2;

  // export interface EventCreateMessage extends BaseMessage {
  //   op: "unit-create";
  // }

  // export interface EventWatchMessage extends BaseMessage {
  //   op: "unit-watch";
  //   payload: any;
  // }

  export type Message = BaseMessage; //EventCreateMessage | EventWatchMessage;

  export type ToolsMessage = Message & {
    index: number;
  }; //EventCreateMessage | EventWatchMessage;
}
