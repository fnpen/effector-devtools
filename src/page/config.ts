import { getHost } from "rempl";
import { ProcessFn } from "../common/types";

let config: {
  inPage?: boolean;
  routeKeyboard?: boolean;
  process?: ProcessFn;
} = {
  routeKeyboard: true,
  inPage: false,
  process: data => data,
};

const loggerSettings = (c: typeof config) => {
  config = { ...config, ...c };

  if (config.inPage) {
    getHost().activate();
  } else {
    getHost().deactivate();
  }
};

export { config as globalConfig, loggerSettings as setupLogger };
