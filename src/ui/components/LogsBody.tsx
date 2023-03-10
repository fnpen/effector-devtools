import { useStore } from "effector-react";
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
import { usePrevious } from "react-use";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { $autoSelectLast } from "../store/state";
import { IdsProvider, TableStateProvider } from "../Table";

import { Row } from "./Log";

export const TableHotkeys = memo(({ scrollToIndex }) => {
  const { setSelected, selected } = useContext(TableStateProvider);
  const autoSelectLast = useStore($autoSelectLast);

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

  const select = useCallback(
    id => {
      setSelected(id);
      scrollToIndex(ids.indexOf(id));
    },
    [setSelected, scrollToIndex, ids]
  );

  const prevAutoSelectLast = usePrevious(autoSelectLast);
  useEffect(() => {
    if (autoSelectLast && prevAutoSelectLast === autoSelectLast) {
      select(ids[ids.length - 1]);
    }
  }, [autoSelectLast, prevAutoSelectLast, select, ids]);

  const next = useCallback(() => {
    select(nextId);
  }, [select, nextId]);

  const prev = useCallback(() => {
    select(prevId);
  }, [select, scrollToIndex, prevId]);

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

/* export const ScrollTo = ({ scrollToIndex }) => {
  const { selected } = useContext(TableStateProvider);
  const ids = useContext(IdsProvider);
  const lastSelected = useRef<number | false>(false);

  useEffect(() => {
    if (selected === false || lastSelected.current === selected) {
      return;
    }

    lastSelected.current = selected;

    scrollToIndex(ids.indexOf(selected));
  }, [selected, ids, scrollToIndex]);
}; */

const itemContent = (_, id) => id;

export const LogsBody = memo(() => {
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
        behavior: "auto",
      });
    },
    [virtuosoRef]
  );

  return ids.length ? (
    <>
      {/* <ScrollTo scrollToIndex={scrollToIndex} /> */}
      <Virtuoso
        ref={virtuosoRef}
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
      <TableHotkeys scrollToIndex={scrollToIndex} />
    </>
  ) : null;
}, isEqual);
