import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder/Folder";
import { folderData } from "./data/folderData";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("folderData");
    console.log(saved, "saved", folderData);
    return saved ? JSON.parse(saved) : folderData;
  });

  const { insertNode } = useTraverseTree();

  useEffect(() => {
    localStorage.setItem("folderData", JSON.stringify(folderData));
  }, [folderData]);

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(folderData, folderId, item, isFolder);
    setData(finalTree);
    localStorage.setItem("folderData", JSON.stringify(finalTree));
  };

  return (
    <div className='App'>
      {/* <p>Hii there!</p> */}
      <Folder handleInsertNode={handleInsertNode} folderData={data} />
    </div>
  );
}

export default App;
