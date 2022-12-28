import { useStore, useStoreMap } from "effector-react";
import * as React from "react";
import { $selectedMessage } from "../store/details";
import { $logs } from "../store/logs";
import { Logs } from "./Logs";

export const DetailsBodyHistory = () => {
  const selectedMessage = useStore($selectedMessage);

  const logIds = useStoreMap({
    store: $logs,
    keys: [selectedMessage?.name],
    fn: (logs, [sname]) =>
      logs.filter(({ name }) => name === sname).map(({ id }) => id),
  });

  console.log({ logIds });

  return (
    <div className="ed-details-body-history">
      <Logs logIds={logIds} />
    </div>
  );
};
