import memoize from "fast-memoize";

export const parseJson = memoize(async (str: any) => {
  return typeof str === "string" && str
    ? JSON.parse(str || "undefined")
    : undefined;
});
