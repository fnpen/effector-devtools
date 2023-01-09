import { useStoreMap } from "effector-react";
import React from "react";
import { $xpathsInput, changeXPathInput } from "../../store/state";

export const XpathFilter = ({ name }) => {
  const xpath =
    useStoreMap({
      store: $xpathsInput,
      keys: [name],
      fn: (xpaths, [name]) => {
        return xpaths[name];
      },
    }) || "";

  return (
    <div className="ed-toolbar-input">
      <input
        placeholder="Filter xPath"
        value={xpath}
        onChange={e => changeXPathInput([name, e.target.value])}
      />
    </div>
  );
};
