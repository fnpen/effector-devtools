import React, { useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Row } from "./Log";

export const LogsBody = ({ logIds, width, height }) => {
  // const ref = useRef();

  // const throttled = useRef(
  //   throttle(() => ref.current?.scrollTo(Number.MAX_SAFE_INTEGER), 100)
  // );

  // useLayoutEffect(() => {
  //   // throttled.current?.();
  // }, [logIds.length]);

  const appendInterval = useRef(null);
  const virtuosoRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);
  const showButtonTimeoutRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

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

  return height > 0 && width > 0 && logIds.length ? (
    // <List
    //   // ref={ref}
    //   overscanCount={30}
    //   height={height}
    //   itemCount={logIds.length}
    //   itemSize={24}
    //   width={width}
    // >
    //   {Log}
    // </List>
    <>
      <Virtuoso
        ref={virtuosoRef}
        style={{ height, width }}
        data={logIds}
        defaultItemHeight={24}
        initialTopMostItemIndex={999}
        overscan={30}
        atBottomStateChange={bottom => {
          clearInterval(appendInterval.current);

          setAtBottom(bottom);
        }}
        itemContent={(index, id) => {
          return <Row index={index} id={id} />;
        }}
        followOutput={"auto"}
      />
      {showButton && (
        <a
          className="ed-btn-tobottom"
          onClick={() =>
            virtuosoRef.current.scrollToIndex({
              index: logIds.length - 1,
              behavior: "smooth",
            })
          }
        >
          Bottom
        </a>
      )}
    </>
  ) : null;
};
