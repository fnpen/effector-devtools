import merge from "@fastify/deepmerge";
import { detailedDiff } from "deep-object-diff";
import clone from "fast-clone";
import traverse from "traverse";
import { isEmpty } from "../utils/isEmpty";

function isPrimitive(o) {
  return o !== Object(o);
}
const deepmerge = merge({ all: true });
export const prepareChanges = (prev: any, current: any) => {
  if (isEmpty(prev)) {
    if (Array.isArray(current)) {
      prev = [];
    } else if (typeof current === "object") {
      prev = {};
    }
  }

  const changes = clone(detailedDiff(prev, current));

  const orig = traverse(prev);

  traverse(changes).forEach(function (e) {
    const type = this.path[0];
    if (isPrimitive(e)) {
      if (type === "added") {
        this.update(
          `<span style='color:#4CAF50;font-weight: bold;'>${e}</span>`
        );
      } else if (type === "updated") {
        const oldValue = orig.get(this.path.slice(1));

        const oldValueText =
          oldValue !== undefined
            ? isPrimitive(oldValue)
              ? oldValue
              : typeof oldValue
            : "undefined";

        this.update(
          `<span style='color: #2196F3;font-weight: bold;'>${
            oldValueText + " → " + e
          }</span>`
        );
      }
    }

    if (
      type === "deleted" &&
      Object.keys(e).length === 0 &&
      this.path.length > 1
    ) {
      const oldValue = orig.get(this.path.slice(1));
      this.update(
        `<span style='color: #F44336;font-weight: bold;text-decoration: line-through;'>${oldValue}</span>`
      );
    }
  });

  let allChanges;

  if (typeof changes.added === "string") {
    allChanges = changes.added;
  } else if (typeof changes.updated === "string") {
    allChanges = changes.updated;
  } else if (typeof changes.deleted === "string") {
    allChanges = changes.deleted;
  } else {
    allChanges = deepmerge(changes.added, changes.updated, changes.deleted);
  }

  if (Object.keys(allChanges).length === 0) {
    return "<span>No changes</span>";
  }

  return allChanges;
};
