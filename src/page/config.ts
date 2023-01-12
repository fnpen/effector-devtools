import { getHost } from "rempl";

type Config = {
  inPage?: boolean;
  routeKeyboard?: boolean;
};

let defaultConfig: Config = {
  routeKeyboard: true,
  inPage: false,
};

let globalConfig = { ...defaultConfig };

const loggerSettings = (config: Config) => {
  globalConfig = { ...globalConfig, ...config };

  if (globalConfig.inPage) {
    getHost().activate();
  } else {
    getHost().deactivate();
  }
};

export { globalConfig, loggerSettings as setupLogger };
