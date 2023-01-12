import clsx from "clsx";
import { StoreValue } from "effector";
import { JSONPath } from "jsonpath-plus";
import prettyMilliseconds from "pretty-ms";
import React, { useContext, useEffect, useRef } from "react";
import { useAsync } from "react-use";
import { parseJson } from "../../../common/parseJson";
import { $storeHistory } from "../../store/logs";
import { TableStateProvider } from "../../Table";
import { Toolbar } from "../Toolbar";
import { Json } from "./Json";
import { useCurrentPrev } from "./useCurrentPrev";

import JSON5 from "json5";

import Split from "line-awesome/svg/columns-solid.svg";
import Tree from "line-awesome/svg/project-diagram-solid.svg";
import Unified from "line-awesome/svg/stream-solid.svg";

import { createPatch } from "diff";
import { html } from "diff2html";
import { useStore, useStoreMap } from "effector-react";
import { $diffMode, $xpathsInput, changeDiffMode } from "../../store/state";
import { prepareChanges } from "../prepareChanges";
import { XpathFilter } from "./XpathFilter";

export const getPrevHistoryJson = (
  storeHistory: StoreValue<typeof $storeHistory>,
  name: string,
  currentId: number
): string | null => {
  const history = storeHistory[name] as [id: number, payload: any][];

  const index = (history || []).findIndex(
    ([id, payload], index) => id === currentId
  );

  if (index <= 0) {
    return null;
  }

  return history[index - 1]?.[1];
};

export const DiffToolbar = ({ id }) => {
  const { current, prev } = useCurrentPrev(id);

  const diffMode = useStore($diffMode);

  let difference = "-";

  if (prev && current) {
    difference = prettyMilliseconds(current.time - prev.time, {
      millisecondsDecimalDigits: 3,
      separateMilliseconds: true,
    });
  }

  return (
    <Toolbar secondary>
      <XpathFilter name={current.name} />
      <div className="ed-toolbar-separator" />
      <a
        className={clsx("ed-btn", { "ed-btn--selected": diffMode === "tree" })}
        title="Tree"
        onClick={() => changeDiffMode("tree")}
      >
        <Tree />
      </a>
      <a
        className={clsx("ed-btn", { "ed-btn--selected": diffMode === "split" })}
        title="Split"
        onClick={() => changeDiffMode("split")}
      >
        <Split />
      </a>
      <a
        className={clsx("ed-btn", {
          "ed-btn--selected": diffMode === "unified",
        })}
        title="Unified"
        onClick={() => changeDiffMode("unified")}
      >
        <Unified />
      </a>

      <div className="ed-toolbar-space" />
      <div className="ed-toolbar-text">Difference: {difference}</div>
    </Toolbar>
  );
};

const Diff2Html = ({ prev, current, mode = "split" }) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const prevText = JSON5.stringify(prev, null, 2) || "";
    const currentText = JSON5.stringify(current, null, 2) || "";

    const result = createPatch("diff", prevText, currentText, {});

    const htmlResult = html(result, {
      matching: "lines",
      // renderNothingWhenEmpty: true,
      drawFileList: false,
      outputFormat: mode === "split" ? "side-by-side" : "line-by-line",
    });

    if (ref.current) {
      ref.current.innerHTML = htmlResult;
    }
  }, [prev, current, mode, ref]);

  return (
    <div
      ref={ref}
      className={clsx("ed-details-body-diff2html")}
      // dangerouslySetInnerHTML={{ __html: htmlResult }}
    >
      <i>Rendering...</i>
    </div>
  );
};

export const DetailsBodyDiff = () => {
  const { selected } = useContext(TableStateProvider);

  const { current, prev } = useCurrentPrev(selected);

  const xpath = useStoreMap({
    store: $xpathsInput,
    keys: [current.name],
    fn: (xpaths, [name]) => {
      return xpaths[name];
    },
  });

  const currentJsonState = useAsync(
    () => parseJson(current?.payload),
    [current]
  );
  const prevJsonState = useAsync(() => parseJson(prev?.payload), [prev]);

  // if (prevJsonState?.loading || currentJsonState?.loading) {
  //   return <NoData text="Loading..." />;
  // }

  let prevJson = prevJsonState.value;
  let currentJson = currentJsonState.value;

  if (xpath) {
    const path = xpath; // ("$" + debouncedXpath).replaceAll("$$", "$");
    prevJson = JSONPath({ path, json: prevJson });
    currentJson = JSONPath({ path, json: currentJson });
  }

  const diffMode = useStore($diffMode);

  if (diffMode === "tree") {
    const allChanges = prepareChanges(prevJson, currentJson);
    return (
      <>
        <DiffToolbar id={current.id} />
        <div className={clsx("ed-details-body-preview")}>
          <Json noRootSections data={allChanges} expanded={true} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <DiffToolbar id={current.id} />
        <Diff2Html mode={diffMode} prev={prevJson} current={currentJson} />
      </>
    );
  }

  return null;
};
