const chokidar = require("chokidar");
const path = require("path");

// const fs = require("fs");

process.env.NODE_ENV = "development";

const { basePath, buildBabelPlugin, buildMain } = require("./build");

const doMain = () => buildMain({ logLevel: "info", write: true });
const doBabelPlugin = () => buildBabelPlugin({ logLevel: "info", write: true });
const tasks = () => Promise.all([doMain(), doBabelPlugin()]);

chokidar
  .watch(path.join(basePath, "src/"), {
    ignoreInitial: true,
  })
  .on("all", tasks);

tasks();
