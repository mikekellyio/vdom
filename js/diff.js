const diff = (oldVTree, newVTree) => {
  //newVtree is undefined
  //then just remove the $node passing into the patch then

  //old and new are both strings
  //same string?
  //then noop
  //else replace $node with render(newVTree)

  //one is string, other is element node
  //then replace $node with render(newVTree)

  //tagName's aren't ===
  //then replace $node with render(newVTree)

  return $el => {
    return $el;
  };
};

export default diff;
