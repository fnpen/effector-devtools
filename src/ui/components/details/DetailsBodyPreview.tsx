import { useStore, useStoreMap } from "effector-react";
import Minus from "line-awesome/svg/minus-square-solid.svg";
import Plus from "line-awesome/svg/plus-square-solid.svg";
import React, { useContext } from "react";
import { $logs } from "../../store/logs";
import { $expanded, setExpanded } from "../../store/state";
import { TableStateProvider } from "../../Table";
import { ToolsMessage } from "./../../../common/types";
import { Json } from "./Json";

export const DetailsBodyPreview = () => {
  const { selected } = useContext(TableStateProvider);
  // const [expanded, setExpanded] = useState(false);
  const expanded = useStore($expanded);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  }) as ToolsMessage;

  const data = log.payload ? JSON.parse(log.payload) : undefined;

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
  );
};
