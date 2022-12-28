import { getHost } from "rempl";

let config: { inPage?: boolean } = {};

const setConfig = (c: typeof config) => {
  console.log('setConfig', c)
  config = {...config, ...c};

  if (config.inPage) {
    getHost().activate();
  } else {
    getHost().deactivate();
  }
};

export {
  config,
  setConfig
};
