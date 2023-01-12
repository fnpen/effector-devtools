import clsx from "clsx";
import React, { useCallback } from "react";
import { JSONTree } from "react-json-tree";
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
export const Json = ({
  data = null,
  expanded = true,
  hideRoot = true,
  noRootSections = false,
  shouldExpandNode = false as Function | false,
}) => {
  const shouldExpandNodeCb = useCallback(
    (keyPath, data, level) =>
      shouldExpandNode ? shouldExpandNode(keyPath, data, level) : expanded,
    [expanded, shouldExpandNode]
  );

  return (
    <div className={clsx("ed-json", { "ed-json--root": !noRootSections })}>
      {data ? (
        typeof data === "string" ? (
          <span dangerouslySetInnerHTML={{ __html: data }} />
        ) : (
          <JSONTree
            hideRoot={hideRoot}
            data={data}
            theme={theme}
            invertTheme={false}
            shouldExpandNode={shouldExpandNodeCb}
            labelRenderer={
              noRootSections
                ? undefined
                : (keyPath, nodeType, expanded, expandable) => {
                    if (!keyPath.length) {
                      return "";
                    }

                    let text = keyPath[0];

                    // if (typeof keyPath[0] === "number") {
                    //   text = "[" + text + "]";
                    // }

                    text = text.toString();

                    if (keyPath && keyPath.length === 1) {
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
                        <strong
                          style={{ fontSize: 14, padding: "14px 0", color }}
                        >
                          {text}
                        </strong>
                      );
                    }

                    return <strong>{text}: </strong>;
                  }
            }
            valueRenderer={(value: any) => {
              return (
                <span
                  dangerouslySetInnerHTML={{
                    __html: value.toString().replace(/^\"+|\"+$/g, ""),
                  }}
                ></span>
              );
            }}
            sortObjectKeys={(a, b) => {
              const ranks = {
                error: 100,
                status: 100,
                message: 70,
                result: 50,
                params: 10,
              };

              return ranks?.[b.toLowerCase()] - ranks?.[a.toLowerCase()];
            }}
          />
        )
      ) : (
        <NoData />
      )}
    </div>
  );
};
