import clsx from "clsx";
import { useStoreMap } from "effector-react";
import hlsl from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { useAsync } from "react-use";
import { parseJson } from "../../../common/parseJson";
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

  const content = useAsync(
    async () =>
      indent ? JSON.stringify(await parseJson(data), null, 2) : data,
    [data, indent]
  );

  useEffect(() => {
    startTransition(() => {
      if (!content.loading) {
        const __html = hlsl.highlight(content.value, {
          language: "json",
        }).value;
        setHtml(__html);
      } else {
        setHtml("");
      }
    });
  }, [content]);

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
