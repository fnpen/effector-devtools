import { ToolsMessage } from "common-types";
import { useStore, useStoreMap } from "effector-react";
import Minus from "line-awesome/svg/minus-square-solid.svg";
import Plus from "line-awesome/svg/plus-square-solid.svg";
import React, { useCallback, useContext } from "react";
import { JSONTree } from "react-json-tree";
import { $logs } from "../../store/logs";
import { $expanded, setExpanded } from "../../store/state";
import { TableStateProvider } from "../../Table";
import { NoData } from "./../NoData";

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

const Json = ({ data = null, expanded = true, hideRoot = true }) => {
  const shouldExpandNode = useCallback(() => expanded, [expanded]);

  return (
    <div className="ed-json">
      {data ? (
        <JSONTree
          hideRoot={hideRoot}
          data={data}
          theme={theme}
          invertTheme={false}
          shouldExpandNode={shouldExpandNode}
          labelRenderer={(keyPath, nodeType, expanded, expandable) => {
            let text = keyPath[0];

            if (typeof keyPath[0] === "number") {
              text = "[" + text + "]";
            }

            text = text.toString();

            if (keyPath.length === 1) {
              let color = "#000000";

              if (text === "error") {
                color = "red";
                text = "Error";
              } else if (text === "result") {
                color = "green";
                text = "Result";
              }

              text = text.charAt(0).toUpperCase() + text.slice(1);

              return (
                <strong style={{ fontSize: 14, padding: "14px 0", color }}>
                  {text}
                </strong>
              );
            }

            return <strong>{text}: </strong>;
          }}
          sortObjectKeys={(a, b) => {
            if (a === "error") {
              return -100;
            }
            if (a === "message") {
              return -70;
            }
            if (a === "result") {
              return -50;
            }
            if (a === "params") {
              return -10;
            }
            // console.log({ a, b });
            return 0;
          }}
        />
      ) : (
        <NoData />
      )}
    </div>
  );
};

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
