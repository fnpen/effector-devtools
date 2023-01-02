import { getHost } from "rempl";

let config: { inPage?: boolean; routeKeyboard?: boolean } = {
  routeKeyboard: true,
  inPage: false,
};

const loggerSettings = (c: typeof config) => {
  config = { ...config, ...c };

  if (config.inPage) {
    getHost().activate();
  } else {
    getHost().deactivate();
  }
};

export { config, loggerSettings as setupLogger };
