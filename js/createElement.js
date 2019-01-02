export default (tagName, opts) => {
  return {
    tagName,
    attrs: opts.attrs,
    children: opts.children
  };
};
