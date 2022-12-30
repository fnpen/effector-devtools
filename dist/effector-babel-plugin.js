"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var babel_plugin_exports = {};
__export(babel_plugin_exports, {
  default: () => babel_plugin_default
});
module.exports = __toCommonJS(babel_plugin_exports);
var import_helper_plugin_utils = require("@babel/helper-plugin-utils");
var import_core = require("@babel/core");
const replaceToDevtools = ["effector"];
var babel_plugin_default = (0, import_helper_plugin_utils.declare)((api, options = {}) => {
  api.assertVersion(7);
  const importVisitor = {
    ImportDeclaration(path, state) {
      if (import_core.types.isLiteral(path.node.source)) {
        if (replaceToDevtools.includes(path.node.source.value)) {
          path.node.source.value = "@fnpen/effector-devtools/injector";
        }
      }
    }
  };
  return {
    name: "@fnpen/effector-devtools/babel-plugin",
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(importVisitor, state);
        }
      }
    }
  };
});
//# sourceMappingURL=effector-babel-plugin.js.map
