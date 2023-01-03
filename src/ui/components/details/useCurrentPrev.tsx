import { useStoreMap } from "effector-react";
import { $logs } from "../../store/logs";

export const useCurrentPrev = id => {
  return useStoreMap({
    store: $logs,
    keys: [id],
    fn: (logs, [id]) => {
      const current = logs[id];
      const list = Object.values(logs);
      const index = list.indexOf(current);
      const l = list.slice(0, index).reverse();

      const prev = l.find(message => message.name === current.name);

      return {
        current,
        prev,
      };
    },
  });
};

export const useCurrentNext = id => {
  return useStoreMap({
    store: $logs,
    keys: [id],
    fn: (logs, [id]) => {
      const current = logs[id];
      const list = Object.values(logs);
      const index = list.indexOf(current);
      const l = list.slice(index + 1);

      const next = l.find(message => message.name === current.name);

      return {
        current,
        next,
      };
    },
  });
};
