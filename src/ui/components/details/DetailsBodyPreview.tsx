import { useStore, useStoreMap } from "effector-react";
import { JSONPath } from "jsonpath-plus";
import Minus from "line-awesome/svg/minus-square-solid.svg";
import Plus from "line-awesome/svg/plus-square-solid.svg";
import React, { useContext, useState } from "react";
import { $logs } from "../../store/logs";
import { $expanded, setExpanded } from "../../store/state";
import { TableStateProvider } from "../../Table";
import { Toolbar } from "../Toolbar";
import { ToolsMessage } from "./../../../common/types";
import { Json } from "./Json";

export const PreviewToolbar = ({ xpath, setXpath }) => {
  return (
    <Toolbar secondary>
      <div className="ed-toolbar-input">
        <input
          placeholder="Filter xPath"
          value={xpath}
          onChange={e => setXpath(e.target.value)}
        />
      </div>
    </Toolbar>
  );
};

export const DetailsBodyPreview = () => {
  const { selected } = useContext(TableStateProvider);
  // const [expanded, setExpanded] = useState(false);
  const expanded = useStore($expanded);
  const [xpath, setXpath] = useState("");

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  }) as ToolsMessage;

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
    if (log.name.endsWith(".done") || log.name.endsWith(".fail")) {
      cmp = <Json data={data} expanded={expanded} />;
    } else {
      cmp = <Json data={{ argument: data }} expanded={expanded} />;
    }
  }

  return (
    <>
      <PreviewToolbar {...{ xpath, setXpath }} />
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
