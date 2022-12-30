import React, { createContext } from "react";
import { Details } from "./components/details/Details";
import { LogsTable } from "./components/LogsTable";

export const IdsProvider = createContext<number[]>([]);
export const TableStateProvider = createContext<{
  selected: number | false;
  selectedTab: string;
  showHistory: boolean;
  setSelected: (s: number | false) => void;
  setSelectedTab: (s: string) => void;
  hotkeysActive: boolean;
  setHotkeysActive?: (a: boolean) => void;
  parentSetHotkeysActive?: (a: boolean) => void;
}>({
  selected: false,
  selectedTab: "",
  showHistory: true,
  setSelected: () => {},
  setSelectedTab: () => {},
  hotkeysActive: true,
});

export const Table = () => {
  return (
    <div className="ed-logs">
      <LogsTable />
      <Details />
    </div>
  );
};
