import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
const replaceToDevtools = ["effector"];
var babel_plugin_default = declare((api, options = {}) => {
  api.assertVersion(7);
  const importVisitor = {
    ImportDeclaration(path, state) {
      if (t.isLiteral(path.node.source)) {
        if (replaceToDevtools.includes(path.node.source.value)) {
          path.node.source.value = "effector-devtools-ng/injector";
        }
      }
    }
  };
  return {
    name: "effector-devtools-ng/babel-plugin",
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(importVisitor, state);
        }
      }
    }
  };
});
export {
  babel_plugin_default as default
};
//# sourceMappingURL=effector-babel-plugin.mjs.map
