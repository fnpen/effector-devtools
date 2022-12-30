import { useStore, useStoreMap } from "effector-react";
import React, { useEffect, useState } from "react";
import { $selectedMessage } from "../store/details";
import { $logs } from "../store/logs";
import { IdsProvider, Table, TableStateProvider } from "../Table";

export const DetailsBodyHistory = () => {
  const [selected, setSelected] = useState<number | false>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const selectedMessage = useStore($selectedMessage);

  useEffect(() => {
    setSelected(false);
  }, [setSelected, selectedMessage]);

  // TODO: process ids to make right order
  const passedLogIds = useStoreMap({
    store: $logs,
    keys: [selectedMessage?.name],
    fn: (logs, [sname]) =>
      Object.values(logs).reduce((acc, log) => {
        if (log.name === sname) {
          acc.push(log.id);
        }
        return acc;
      }, []),
  });

  return (
    <div className="ed-details-body-history">
      <IdsProvider.Provider value={passedLogIds}>
        <TableStateProvider.Provider
          value={{
            selected,
            setSelected,
            selectedTab,
            setSelectedTab,
            showHistory: false,
          }}
        >
          <Table />
        </TableStateProvider.Provider>
      </IdsProvider.Provider>
    </div>
  );
};
