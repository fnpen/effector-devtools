import React, { createContext } from "react";
import { Details } from "./components/Details";
import { LogsTable } from "./components/LogsTable";

export const IdsProvider = createContext<number[]>([]);
export const TableStateProvider = createContext<{
  selected: number | false;
  selectedTab: string;
  showHistory: boolean;
  setSelected: (s: number | false) => void;
  setSelectedTab: (s: string) => void;
}>({
  selected: false,
  selectedTab: "",
  showHistory: true,
  setSelected: () => {},
  setSelectedTab: () => {},
});

export const Table = () => {
  return (
    <div className="ed-logs">
      <LogsTable />
      <Details />
    </div>
  );
};
