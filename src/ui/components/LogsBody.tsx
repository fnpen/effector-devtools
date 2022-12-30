import React, { useContext, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { IdsProvider } from "../Table";

import { Row } from "./Log";

export const LogsBody = ({ width, height }) => {
  const appendInterval = useRef(null);
  const virtuosoRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);
  const showButtonTimeoutRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const ids = useContext(IdsProvider);

  useEffect(() => {
    return () => {
      clearInterval(appendInterval.current);
      clearTimeout(showButtonTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    clearTimeout(showButtonTimeoutRef.current);
    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  return height > 0 && width > 0 && ids.length ? (
    <>
      <Virtuoso
        ref={virtuosoRef}
        style={{ height, width }}
        data={ids}
        defaultItemHeight={24}
        initialTopMostItemIndex={999}
        overscan={30}
        atBottomStateChange={bottom => {
          clearInterval(appendInterval.current);
          setAtBottom(bottom);
        }}
        components={{ Item: Row }}
        itemContent={(_, id) => id}
        followOutput={"auto"}
      />
      {showButton && (
        <a
          className="ed-btn-tobottom"
          onClick={() =>
            virtuosoRef.current.scrollToIndex({
              index: ids.length - 1,
              behavior: "auto",
            })
          }
        >
          Bottom
        </a>
      )}
    </>
  ) : null;
};
