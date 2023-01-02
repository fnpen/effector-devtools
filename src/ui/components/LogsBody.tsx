import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import isEqual from "react-fast-compare";
import { useHotkeys } from "react-hotkeys-hook";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { IdsProvider, TableStateProvider } from "../Table";

import { Row } from "./Log";

export const TableHotkeys = memo(() => {
  const { setSelected, selected } = useContext(TableStateProvider);

  const ids = useContext(IdsProvider);

  const nextId = useMemo(() => {
    let index = selected === false ? 0 : ids.indexOf(selected) - 1;
    // let index = selected === false ? ids.length - 1 : ids.indexOf(selected) - 1;

    if (index < 0) {
      index = ids.length - 1;
    }

    return ids[index];
  }, [ids, selected]);

  const prevId = useMemo(() => {
    let index = selected === false ? 0 : ids.indexOf(selected) + 1;

    if (index > ids.length - 1) {
      index = 0;
    }

    return ids[index];
  }, [ids, selected]);

  const next = useCallback(() => {
    setSelected(nextId);
  }, [setSelected, nextId]);

  const prev = useCallback(() => {
    setSelected(prevId);
  }, [setSelected, prevId]);

  return <TableHotkeysInner prev={prev} next={next} />;
});

export const TableHotkeysInner = memo(({ next, prev }) => {
  const { hotkeysActive } = useContext(TableStateProvider);

  useHotkeys(
    "up",
    e => {
      if (hotkeysActive) {
        next();
        e.preventDefault();
      }
    },
    [next, hotkeysActive]
  );

  useHotkeys(
    "down",
    e => {
      if (hotkeysActive) {
        prev();
        e.preventDefault();
      }
    },
    [prev, hotkeysActive]
  );

  return null;
});

export const ScrollTo = ({ scrollToIndex }) => {
  const { selected } = useContext(TableStateProvider);

  useEffect(() => {
    if (selected === false) {
      return;
    }
    scrollToIndex(selected);
  }, [selected, scrollToIndex]);
};

const itemContent = (_, id) => id;

export const LogsBody = memo(({ width, height }) => {
  const appendInterval = useRef(null);
  const virtuosoRef = useRef<VirtuosoHandle>();
  const [atBottom, setAtBottom] = useState(false);
  const showButtonTimeoutRef = useRef<NodeJS.Timeout>();
  const [showButton, setShowButton] = useState(false);

  const ids = useContext(IdsProvider);

  useEffect(() => {
    return () => {
      if (appendInterval.current) clearInterval(appendInterval.current);
      if (showButtonTimeoutRef.current)
        clearTimeout(showButtonTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (showButtonTimeoutRef.current)
      clearTimeout(showButtonTimeoutRef.current);
    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
    } else {
      setShowButton(false);
    }
  }, [atBottom, setShowButton]);

  const { selected } = useContext(TableStateProvider);

  const followOutput = useCallback(
    (isAtBottom: boolean) => {
      return selected === false && isAtBottom ? "auto" : false;
    },
    [selected]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      virtuosoRef?.current?.scrollToIndex({
        index,
        align: "center",
        behavior: "smooth",
      });
    },
    [virtuosoRef]
  );

  return height > 0 && width > 0 && ids.length ? (
    <>
      <ScrollTo scrollToIndex={scrollToIndex} />
      <Virtuoso
        ref={virtuosoRef}
        style={{ height, width }}
        data={ids}
        defaultItemHeight={23}
        overscan={30}
        atBottomStateChange={bottom => {
          if (appendInterval.current) clearInterval(appendInterval.current);
          setAtBottom(bottom);
        }}
        components={{
          Item: Row,
          Footer: () => {
            return <div className="ed-footer-space" />;
          },
        }}
        itemContent={itemContent}
        followOutput={followOutput}
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
}, isEqual);
