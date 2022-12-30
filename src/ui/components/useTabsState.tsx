import { useContext } from "react";
import { TableStateProvider } from "../Table";

export const tabs: { [key: string]: string } = {
  preview: "Preview",
  payload: "Payload",
  history: "History",
};

export const useTabsState = () => {
  const { selectedTab, showHistory } = useContext(TableStateProvider);

  let availableTabs = Object.keys(tabs);

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
