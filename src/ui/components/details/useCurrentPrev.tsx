import { useStoreMap } from "effector-react";
import { $logs } from "../../store/logs";

const reg = /^(.+)\.(done|error)$/;
export const logNameMatcher = (sname: string) => {
  if (reg.test(sname)) {
    const [, eventName] = reg.exec(sname) || [];
    sname = eventName;
  }

  return (name: string) => {
    return name === sname || (reg.test(name) && name.indexOf(sname) === 0);
  };
};

export const useCurrentPrev = id => {
  return useStoreMap({
    store: $logs,
    keys: [id],
    fn: (logs, [id]) => {
      const current = logs[id];
      const list = Object.values(logs);
      const index = list.indexOf(current);
      const l = list.slice(0, index).reverse();

      const matcher = logNameMatcher(current.name);

      const prev = l.find(message => matcher(message.name));

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

      const matcher = logNameMatcher(current.name);
      const next = l.find(message => matcher(message.name));

      return {
        current,
        next,
      };
    },
  });
};
