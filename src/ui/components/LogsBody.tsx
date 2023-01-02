import React, { useContext, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Virtuoso } from "react-virtuoso";
import { IdsProvider, TableStateProvider } from "../Table";

import { Row } from "./Log";

export const TableHotkeys = () => {
  const { hotkeysActive, setSelected, selected } =
    useContext(TableStateProvider);

  const ids = useContext(IdsProvider);

  useHotkeys(
    "up",
    e => {
      if (hotkeysActive) {
        let index =
          selected === false ? ids.length - 1 : ids.indexOf(selected) - 1;

        if (index < 0) {
          index = ids.length - 1;
        }

        setSelected(ids[index]);
        e.preventDefault();
      }
    },
    [selected, setSelected, hotkeysActive, ids.join("/")] // useHotkeys bug
  );

  useHotkeys(
    "down",
    e => {
      if (hotkeysActive) {
        let index = selected === false ? 0 : ids.indexOf(selected) + 1;

        if (index > ids.length - 1) {
          index = 0;
        }

        setSelected(ids[index]);
        e.preventDefault();
      }
    },
    [selected, setSelected, hotkeysActive, ids.join("/")] // useHotkeys bug
  );

  return null;
};

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
        defaultItemHeight={23}
        initialTopMostItemIndex={999}
        overscan={30}
        atBottomStateChange={bottom => {
          clearInterval(appendInterval.current);
          setAtBottom(bottom);
        }}
        components={{
          Item: Row,
          Footer: () => {
            return <div className="ed-footer-space" />;
          },
        }}
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
      <TableHotkeys />
    </>
  ) : null;
};
