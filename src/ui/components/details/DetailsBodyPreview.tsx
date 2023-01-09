import { useStore, useStoreMap } from "effector-react";
import { JSONPath } from "jsonpath-plus";
import Minus from "line-awesome/svg/minus-square-solid.svg";
import Plus from "line-awesome/svg/plus-square-solid.svg";
import React, { useContext } from "react";
import { $logs } from "../../store/logs";
import { $expanded, $xpathsInput, setExpanded } from "../../store/state";
import { TableStateProvider } from "../../Table";
import { Toolbar } from "../Toolbar";
import { ToolsMessage } from "./../../../common/types";
import { Json } from "./Json";
import { XpathFilter } from "./XpathFilter";

export const PreviewToolbar = () => {
  const { selected } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  }) as ToolsMessage;

  return (
    <Toolbar secondary>
      <XpathFilter name={log.name} />
    </Toolbar>
  );
};

export const DetailsBodyPreview = () => {
  const { selected } = useContext(TableStateProvider);

  const expanded = useStore($expanded);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  }) as ToolsMessage;

  const xpath = useStoreMap({
    store: $xpathsInput,
    keys: [log.name],
    fn: (xpaths, [name]) => {
      return xpaths[name];
    },
  });

  let data = log.payload ? JSON.parse(log.payload) : undefined;

  if (xpath) {
    data = JSONPath({ path: xpath, json: data });
  }

  let cmp = <Json data={data} expanded={expanded} />;

  if (log.kind === "store") {
    cmp = <Json data={{ data }} expanded={expanded} />;
  } else if (log.kind === "event") {
    cmp = <Json data={{ ["Event Payload"]: data }} expanded={expanded} />;
  } else if (log.kind === "effect") {
    cmp = <Json data={data} expanded={expanded} />;
  }

  return (
    <>
      <PreviewToolbar />
      <div className={"ed-details-body-preview"}>
        {cmp}
        <div className={"ed-details-body-corner-btns"}>
          <div
            className={"ed-details-body-corner-btn"}
            onClick={() => setExpanded(!expanded)}
          >
            {!expanded ? (
              <>
                <Plus /> Expand
              </>
            ) : (
              <>
                <Minus /> Collapse
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
