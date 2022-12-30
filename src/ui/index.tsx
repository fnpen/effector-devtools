import { useStore } from "effector-react";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { useHotkeys } from "react-hotkeys-hook";
import { LogToolbar } from "./components/LogToolbar";
import {
  $detailsTab,
  $selected,
  changeTab,
  selectMessage,
} from "./store/details";
import { $logIds } from "./store/logs";
import { $zoom, setZoom } from "./store/state";
import { IdsProvider, Table, TableStateProvider } from "./Table";

declare let __CSS__: string;
document.head.appendChild(document.createElement("style")).append(__CSS__);

const Body = () => {
  const [hotkeysActive, setHotkeysActive] = useState(true);
  const logIds = useStore($logIds);
  const selected = useStore($selected);
  const selectedTab = useStore($detailsTab);

  return (
    <div className="ed-body">
      <IdsProvider.Provider value={logIds}>
        <TableStateProvider.Provider
          value={{
            selected,
            setSelected: selectMessage,
            setSelectedTab: changeTab,
            selectedTab,
            hotkeysActive,
            setHotkeysActive,
            showHistory: true,
          }}
        >
          <Table />
        </TableStateProvider.Provider>
      </IdsProvider.Provider>
    </div>
  );
};

const App = () => {
  const zoom = useStore($zoom);

  useHotkeys(
    "meta+p",
    () => {
      setZoom(zoom + 0.1);
    },
    {
      preventDefault: true,
    },
    [zoom, setZoom]
  );
  useHotkeys(
    "meta+o",
    () => {
      setZoom(zoom - 0.1);
    },
    {
      preventDefault: true,
    },
    [zoom, setZoom]
  );

  return (
    <div className="ed-layout" style={{ zoom }}>
      <LogToolbar />
      <Body />
    </div>
  );
};

const root = createRoot(
  document.body.appendChild(document.createElement("div"))
);

root.render(<App />);
