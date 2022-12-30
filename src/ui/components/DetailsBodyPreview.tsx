import { useStore, useStoreMap } from "effector-react";
import Minus from "line-awesome/svg/minus-square-solid.svg";
import Plus from "line-awesome/svg/plus-square-solid.svg";
import React, { useCallback, useContext } from "react";
import { JSONTree } from "react-json-tree";
import { $logs } from "../store/logs";
import { $expanded, setExpanded } from "../store/state";
import { TableStateProvider } from "../Table";
import { NoData } from "./NoData";

const theme = {
  scheme: "GitHub",
  author: "",
  base00: "#ffffff",
  base01: "#f5f5f5",
  base02: "#c8c8fa",
  base03: "#969896",
  base04: "#e8e8e8",
  base05: "#333333",
  base06: "#ffffff",
  base07: "#ffffff",
  base08: "#ed6a43",
  base09: "#0086b3",
  base0A: "#795da3",
  base0B: "#183691",
  base0C: "#183691",
  base0D: "#795da3",
  base0E: "#a71d5d",
  base0F: "#333333",
};

export const DetailsBodyPreview = () => {
  const { selected } = useContext(TableStateProvider);
  // const [expanded, setExpanded] = useState(false);
  const expanded = useStore($expanded);
  const shouldExpandNode = useCallback(() => expanded, [expanded]);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  });

  return (
    <div className={"ed-details-body-preview"}>
      {log.payload ? (
        <JSONTree
          data={JSON.parse(log.payload)}
          theme={theme}
          invertTheme={false}
          shouldExpandNode={shouldExpandNode as any}
        />
      ) : (
        <NoData />
      )}
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
