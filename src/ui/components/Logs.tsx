import React from "react";
import { useMeasure } from "react-use";
import { LogsBody } from "./LogsBody";

export const Logs = ({ logIds }) => {
  const [ref, { width, height }] = useMeasure();

  return (
    <div className="ed-table">
      <div className="ed-table-header">
        <div></div>
        <div>Name</div>
        <div>Payload</div>
      </div>
      <div className="ed-table-body" ref={ref}>
        <LogsBody logIds={logIds} {...{ width, height }} />
      </div>
    </div>
  );
};
