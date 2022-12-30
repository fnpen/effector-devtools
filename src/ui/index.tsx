import { useStore } from "effector-react";
import React from "react";
import ReactDOM from "react-dom";
import { LogToolbar } from "./components/LogToolbar";
import {
  $detailsTab,
  $selected,
  changeTab,
  selectMessage,
} from "./store/details";
import { $logIds } from "./store/logs";
import { IdsProvider, Table, TableStateProvider } from "./Table";

declare let __CSS__: string;
document.head.appendChild(document.createElement("style")).append(__CSS__);

const Body = () => {
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
  return (
    <div className="ed-layout">
      <LogToolbar />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.body);

root.render(<App />);
