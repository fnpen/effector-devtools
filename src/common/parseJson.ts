export const parseJson = async (str: string) => {
  return str ? JSON.parse(str || "undefined") : undefined;
};
