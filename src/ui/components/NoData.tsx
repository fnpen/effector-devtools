import React from "react";

export const NoData = ({ text = "" }) => {
  return <i>{text || "No Data"}</i>;
};
