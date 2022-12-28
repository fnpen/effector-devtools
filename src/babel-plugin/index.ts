import { declare } from "@babel/helper-plugin-utils";
// import syntaxJsonStrings from "@babel/plugin-syntax-json-strings";
// import type * as t from "@babel/types";
// import type { NodePath } from "@babel/traverse";
import { NodePath, PluginPass, types as t } from "@babel/core";
// import effectorPlugin from 'effector/babel-plugin';

const replaceToDevtools = ["effector"];

export interface Options {
  effector?: any;
  skipEffectorPlugin?: boolean;
}

export default declare((api, options: Options = {}) => {
  api.assertVersion(7);

  // const { effector = {}, skipEffectorPlugin = false } = options;

  const importVisitor = {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>, state: PluginPass) {
      if (t.isLiteral(path.node.source)) {
        if (replaceToDevtools.includes(path.node.source.value)) {
          path.node.source.value = "effector-devtools-ng/injector";
        }
      }
    },
  };

  // const instance = effectorPlugin(api, { addLoc: true, addNames: true, ...effector });

  return {
    name: "effector-devtools-ng/babel-plugin",
    visitor: {
      
      Program: {
        enter(path, state) {
          path.traverse(importVisitor, state);

          // if (!skipEffectorPlugin) {
          //   instance.pre();
          //   path.traverse(instance.visitor, {
          //     ...state,
          //     ...instance,
          //   });
          //   instance.post();
          // }
        },
      },
    },
  };
});
