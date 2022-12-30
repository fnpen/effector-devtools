import clsx from "clsx";
import { useStoreMap } from "effector-react";
import hlsl from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { $logs } from "../../store/logs";
import { TableStateProvider } from "../../Table";
import { NoData } from "./../NoData";

hlsl.registerLanguage("json", json);

export const Json = ({ data, indent }) => {
  if (!data) {
    return null;
  }

  const [__html, setHtml] = useState("");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const content = indent ? JSON.stringify(JSON.parse(data), null, 2) : data;
      const __html = hlsl.highlight(content, { language: "json" }).value;
      setHtml(__html);
    });
  }, [data]);

  return (
    <div>
      <pre>
        {(!__html || isPending) && <code>Rendering..</code>}
        {__html && <code dangerouslySetInnerHTML={{ __html }}></code>}
      </pre>
    </div>
  );
};

export const DetailsBodyPayload = ({ preview = false }) => {
  const { selected } = useContext(TableStateProvider);

  const log = useStoreMap({
    store: $logs,
    keys: [selected],
    fn: (logs, [id]) => logs[id],
  });

  return log ? (
    <div
      className={clsx("ed-details-body-code", {
        "ed-details-body-code-raw": !preview,
      })}
    >
      {log.payload ? <Json data={log.payload} indent={preview} /> : <NoData />}
    </div>
  ) : null;
};
