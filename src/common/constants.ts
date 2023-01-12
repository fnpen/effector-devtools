import { StaticState } from "./types";

export const ToolId = "☄️ Effector";

export const defaultState: StaticState = {
  enabled: false,
  expanded: false,
  zoom: 1.0,
  nameColumnWidth: 140,
  query: "",
  filterKind: "",
  diffMode: "split",
};
