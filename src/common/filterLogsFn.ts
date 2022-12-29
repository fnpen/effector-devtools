export const filterLogsFn = query => {
  if (!query) {
    return () => true;
  }

  const rw = new RegExp(query.replace(/[/\-\\^$*+?.()[\]{}]/g, "\\$&"), "i");

  return name => {
    return rw.test(name);
  };
};
