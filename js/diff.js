import render from "./render";
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

  // If the code reaches (A), it implies the following:
  // 1. oldVTree and newVTree are both virtual elements.
  // 2. They have the same tagName.
  // 3. They might have different attrs and children.
};

export default diff;
