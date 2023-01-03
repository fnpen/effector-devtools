import clsx from "clsx";
import React from "react";

export const Toolbar = ({ secondary, children }) => {
  return (
    <div className={clsx("ed-toolbar", { "ed-toolbar--secondary": secondary })}>
      {children}
    </div>
  );
};
