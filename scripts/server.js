const chokidar = require("chokidar");
const path = require("path");

// const fs = require("fs");

process.env.NODE_ENV = "development";

const { basePath, buildInjector, buildBabelPlugin } = require("./build");

const doInjector = () => buildInjector({ logLevel: "info", write: true });
const doBabelPlugin = () => buildBabelPlugin({ logLevel: "info", write: true });
const tasks = () => Promise.all([doInjector(), doBabelPlugin()]);

chokidar
  .watch(path.join(basePath, "src/"), {
    ignoreInitial: true,
  })
  .on("all", tasks);

tasks();
