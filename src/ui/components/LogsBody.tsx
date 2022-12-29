import React from "react";
import { FixedSizeList as List } from "react-window";
import { Log } from "./Log";

export const LogsBody = ({ logIds, width, height }) => {
  // const ref = useRef();

  // const throttled = useRef(
  //   throttle(() => ref.current?.scrollTo(Number.MAX_SAFE_INTEGER), 100)
  // );

  // useLayoutEffect(() => {
  //   // throttled.current?.();
  // }, [logIds.length]);

  return (
    <List
      // ref={ref}
      overscanCount={30}
      height={height}
      itemCount={logIds.length}
      itemSize={24}
      width={width}
    >
      {Log}
    </List>
  );
};
