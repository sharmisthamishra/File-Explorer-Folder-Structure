const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      // base condition
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    const latestNode = tree.items.map((node) => {
      return insertNode(node, folderId, item, isFolder); // recursive function if the id doesn't match
    });

    return { ...tree, items: latestNode }; // hook return with the latest tree node as well
  };
  return { insertNode };
};
export default useTraverseTree;
