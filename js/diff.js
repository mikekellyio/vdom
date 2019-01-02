import render from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  //setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  //3 cases:
  // 1. old.length === new.length
  // then we can do diff(old[i], new[i]) for i=0...old.length
  // 2. old.length > new.length
  // then we can also do diff(old[i], new[i]) for i=0...old.length
  // new[j] will be undefined for j >= new.length
  // but this is fine, because our diff can handle diff(node, undefined)!
  // 3. old.length < new.length
  // then we can also do diff(old[i], new[i]) for i=0...old.length
  // which creates patches for each already existing children
  // we just need create the remaining additional ones: new.slice(old.length)
  //so ultimate we loop through old regardless and we call diff(old[i], new[i])
  //then render any addl children and append

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
