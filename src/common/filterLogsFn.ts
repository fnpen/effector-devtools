export const filterLogsFn = (query?: string) => {
  if (!query) {
    return () => true;
  }

  const rw = new RegExp(query.replace(/[/\-\\^$*+?.()[\]{}]/g, "\\$&"), "i");

  return (name: string) => {
    return rw.test(name);
  };
};
