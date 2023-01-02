import { declare } from "@babel/helper-plugin-utils";
// import syntaxJsonStrings from "@babel/plugin-syntax-json-strings";
// import type * as t from "@babel/types";
// import type { NodePath } from "@babel/traverse";
import { NodePath, PluginPass, types as t } from "@babel/core";
import effectorPlugin from "effector/babel-plugin";
import { normalize, sep } from "path";
const replaceToDevtools = ["effector"];

export interface Options {
  effector?: any;
  skipEffectorPlugin?: boolean;
}

function addFileNameIdentifier(addLoc, enableFileName, t, path, state) {
  if (addLoc && !state.fileNameIdentifier) {
    const fileName = enableFileName
      ? stripRoot(state.file.opts.root || "", state.filename || "", false)
      : "";

    const fileNameIdentifier =
      path.scope.generateUidIdentifier("_effectorFileName");
    // babel bug https://github.com/babel/babel/issues/9496
    if (path.hub) {
      const scope = path.hub.getScope();
      if (scope) {
        scope.push({
          id: fileNameIdentifier,
          init: t.stringLiteral(fileName),
        });
      }
    }
    state.fileNameIdentifier = fileNameIdentifier;
  }
}

function makeTrace(fileNameIdentifier, lineNumber, columnNumber, t) {
  const fileLineLiteral = t.numericLiteral(
    lineNumber != null ? lineNumber : -1
  );
  const fileColumnLiteral = t.numericLiteral(
    columnNumber != null ? columnNumber : -1
  );

  const fileProperty = property(t, "file", fileNameIdentifier);
  const lineProperty = property(t, "line", fileLineLiteral);
  const columnProperty = property(t, "column", fileColumnLiteral);
  return t.objectExpression([fileProperty, lineProperty, columnProperty]);
}

function stripRoot(babelRoot, fileName, omitFirstSlash) {
  const rawPath = fileName.replace(babelRoot, "");
  let normalizedSeq = normalize(rawPath).split(sep);
  if (omitFirstSlash && normalizedSeq.length > 0 && normalizedSeq[0] === "") {
    normalizedSeq = normalizedSeq.slice(1);
  }
  const normalizedPath = normalizedSeq.join("/");
  return normalizedPath;
}

function property(t, field, content) {
  return t.objectProperty(t.identifier(field), content);
}

function stringProperty(t, field, value) {
  return property(t, field, t.stringLiteral(value));
}

function isLocalVariable(path, checkBindingName) {
  if (!checkBindingName) return false;
  const binding = path.scope.getBinding(checkBindingName);
  if (binding) return binding.kind !== "module";
  return false;
}

function findCandidateNameForExpression(path) {
  let id;
  path.find(path => {
    if (path.isAssignmentExpression()) {
      id = path.node.left;
    } else if (path.isObjectProperty()) {
      id = path.node.key;
    } else if (path.isVariableDeclarator()) {
      id = path.node.id;
    } else if (path.isStatement()) {
      // we've hit a statement, we should stop crawling up
      return true;
    }

    // we've got an id! no need to continue
    if (id) return true;
  });
  return id;
}

function setStoreNameAfter(
  path,
  state,
  nameNodeId,
  t,
  { addLoc, addNames },
  fillFirstArg,
  checkBindingName
) {
  const displayName = nameNodeId ? nameNodeId.name : "";
  if (isLocalVariable(path, checkBindingName)) return;
  let args;
  let loc;
  path.find(path => {
    if (path.isCallExpression()) {
      args = path.node.arguments;
      loc = path.node.loc.start;
      return true;
    }
  });

  if (args) {
    if (!args[0]) {
      if (!fillFirstArg) return;
      args[0] = t.nullLiteral();
    }
    const oldConfig = args[1];
    const configExpr = (args[1] = t.objectExpression([]));

    if (oldConfig) {
      configExpr.properties.push(property(t, "and", oldConfig));
    }

    if (addLoc) {
      const locProp = property(
        t,
        "loc",
        makeTrace(state.fileNameIdentifier, loc.line, loc.column, t)
      );
      configExpr.properties.push(locProp);
    }

    if (displayName && addNames) {
      configExpr.properties.push(stringProperty(t, "name", displayName));
    }
  }
}

export default declare((api, options: Options = {}) => {
  api.assertVersion(7);

  const { effector = {}, skipEffectorPlugin = false } = options;

  const importVisitor = {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>, state: PluginPass) {
      if (t.isLiteral(path.node.source)) {
        if (replaceToDevtools.includes(path.node.source.value)) {
          path.node.source.value = "@fnpen/effector-devtools";
        }
      }
    },
  };

  const addLoc = effector.addLoc || false;
  const enableFileName = addLoc;

  const instance = effectorPlugin(api, {
    ...effector,
  });

  return {
    name: "@fnpen/effector-devtools/babel-plugin",
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(importVisitor, state);

          if (!skipEffectorPlugin) {
            instance.pre();
            path.traverse(instance.visitor, {
              ...state,
              ...instance,
            });
            instance.post();
          }
        },
      },

      MemberExpression(path, state) {
        addFileNameIdentifier(addLoc, enableFileName, t, path, state);

        if (
          t.isIdentifier(path.node.property) &&
          path.node.property.name === "map"
        ) {
          setStoreNameAfter(
            path,
            state,
            findCandidateNameForExpression(path),
            t,
            { addLoc, addNames: true },
            false,
            path.node.property.name
          );
        }
      },
    },
  };
});
