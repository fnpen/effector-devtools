import React from "react";
import { LogsBody } from "./LogsBody";

export const LogsTable = () => {
  return (
    <div className="ed-table">
      <div className="ed-table-header">
        <div></div>
        <div>Name</div>
        <div>Payload</div>
      </div>
      <div className="ed-table-body">
        <LogsBody />
      </div>
    </div>
  );
};
