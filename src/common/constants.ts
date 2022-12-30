import { StaticState } from "common-types";

export const ToolId = "☄️ Effector";

// export const UnitTypeEvent: UnitType = 1;

// export const unitTypeName: Record<UnitType, string> = {
//   [UnitTypeEvent]: "Event",
// };

export const defaultState: StaticState = {
  enabled: false,
  expanded: false,
  zoom: 1.0,
  query: "",
};
