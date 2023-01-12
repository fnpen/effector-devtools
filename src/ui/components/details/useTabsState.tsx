import { useStoreMap } from "effector-react";
import { useContext } from "react";
import { $logs } from "../../store/logs";
import { TableStateProvider } from "../../Table";

export const tabs: { [key: string]: string } = {
  diff: "Diff",
  preview: "Preview",
  payload: "Payload",
  history: "History",
  trace: "Trace",
};

export const useTabsState = () => {
  const { selected, selectedTab, showHistory } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  });

  let availableTabs = Object.keys(tabs);

  if (!["store", "diff"].includes(log.kind)) {
    availableTabs = availableTabs.filter(tab => tab !== "diff");
  }

  if (!log.trace) {
    availableTabs = availableTabs.filter(tab => tab !== "trace");
  }

  if (!showHistory) {
    availableTabs = availableTabs.filter(tab => tab !== "history");
  }

  let currentSelectedTab = availableTabs.includes(selectedTab)
    ? selectedTab
    : availableTabs[0];

  return {
    availableTabs,
    selectedTab: currentSelectedTab,
  };
};
