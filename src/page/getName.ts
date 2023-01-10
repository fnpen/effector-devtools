import { is, Node, Unit } from "effector";
import {
  customNames,
  getGraph,
  getNode,
  getOwningDomainName,
  isEffectChild,
  isStoreOn,
} from "./debug";

// TOOD: use patronum/debug directly
export function getName(unit: Node | Unit<any>): string | null {
  const custom = customNames.get(getGraph(unit as any).id);
  if (custom) {
    return custom;
  }

  if (isEffectChild(unit)) {
    const node = getNode(unit);
    const parentEffect = node.family.owners.find(n => n.meta.op === "effect");

    if (parentEffect) {
      const closestParentDomainName = getOwningDomainName(parentEffect);
      const formattedDomainName = closestParentDomainName
        ? `${closestParentDomainName}/`
        : "";

      return `${formattedDomainName}${getName(parentEffect)}.${
        node.meta.named
      }`;
    }

    return node.meta.named;
  }

  if (isStoreOn(unit)) {
    const node = getNode(unit);
    const targetStoreName = getName(node.next[0]);
    const triggerEventName = getName(node.family.owners[0]);

    return `${targetStoreName}.on(${triggerEventName})`;
  }

  if (is.unit(unit)) {
    const fullName = (unit as any)?.compositeName?.fullName;
    if (fullName) {
      if (fullName.endsWith("*")) {
        return (
          fullName +
          ` (${getNode(unit)?.meta.sid || getNode(unit)?.meta.unitId})` // patch?
        );
      }

      return fullName;
    }

    const closestParentDomainName = getOwningDomainName(unit);
    const formattedDomainName = closestParentDomainName
      ? `${closestParentDomainName}/`
      : "";

    if ((unit as any)?.shortName) {
      return `${formattedDomainName}${(unit as any).shortName}`;
    }
    if ((unit as any)?.name) {
      return `${formattedDomainName}${(unit as any).name}`;
    }
  }

  if (getNode(unit)?.meta?.name) {
    return getNode(unit).meta.name;
  }

  return null;
}
