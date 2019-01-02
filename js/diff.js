import render from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
  return $node => {
    return $node;
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  return $node => {
    return $node;
  };
};

const diff = (oldVTree, newVTree) => {
  if (newVTree === undefined) {
    //newVtree is undefined
    //then just remove the $node passing into the patch then and return undefined
    return $node => {
      $node.remove();
      return undefined;
    };
  }

  if (typeof oldVTree === "string" || typeof newVTree === "string") {
    if (oldVTree !== newVTree) {
      //could be 2 cases
      //1. both trees are strings and unequal
      //2. one is string, the other is elements
      //either case, render(newVTree)
      return $node => {
        const $newNode = render(newVTree);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return $node => $node;
    }
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    // assume if tag doesn't match, they are completely different trees
    // and simply render the newVTree
    return $node => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);

  return $node => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
