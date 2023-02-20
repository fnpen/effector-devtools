function isReactSyntheticEvent(event: any) {
  if (typeof event !== "object" || event === null) {
    return false;
  }
  return "_dispatchListeners" in event;
}
export const stringify = (obj: any) => {
  try {
    return JSON.stringify(obj, (k, v) => {
      if (v && isReactSyntheticEvent(v)) return "SyntheticEvent";
      if (v && typeof v === "object") {
        // if (v instanceof Event || (typeof v?.originalEvent === 'object' && v?.originalEvent instanceof Event)) return 'Event';
        if (v instanceof Error) {
          return Object.getOwnPropertyNames(v).reduce((acc, k) => {
            acc[k] = v[k];
            return acc;
          }, {});
        }
        if (v instanceof Node) return "Node";
        if (v instanceof Window) return "Window";
      }
      return v;
    });
  } catch (e) {
    return Object.prototype.toString.call(obj);
  }
};
