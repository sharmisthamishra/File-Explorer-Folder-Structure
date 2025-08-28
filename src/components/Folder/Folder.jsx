import { useState } from "react";
import "./Folder.css";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFolderOpened,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscRefresh,
  VscCollapseAll,
} from "react-icons/vsc";

const Folder = ({ handleInsertNode, folderData }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    isFolder: null,
  });

  const handleNewFolderorFile = (e, isFolder) => {
    console.log(e, isFolder);
    setExpand(true);
    e.stopPropagation();
    setShowInput({
      isVisible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(folderData.id, e.target.value, showInput.isFolder);
      setShowInput({
        ...showInput,
        isVisible: false,
      });
    }
  };

  if (folderData.isFolder) {
    return (
      <div>
        <div className='folder' onClick={() => setExpand(!expand)}>
          <span>
            {expand ? <VscChevronDown /> : <VscChevronRight />}{" "}
            <span className='folderIcon'>
              {expand ? <VscFolderOpened /> : <VscFolder />}
            </span>{" "}
            <span>{folderData.name}</span>
          </span>

          <div className='newItems'>
            <span onClick={(e) => handleNewFolderorFile(e, true)}>
              <VscNewFolder />
            </span>
            <span onClick={(e) => handleNewFolderorFile(e, false)}>
              <VscNewFile />
            </span>
            <span>
              <VscRefresh />
            </span>
            {folderData.id === 1 && (
              <span>
                <VscCollapseAll onClick={() => setExpand(false)} />
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            display: expand ? "block" : "none",
            paddingLeft: 25,
            borderLeft: expand ? "1px solid #ccc" : "none",
            marginLeft: 15,
          }}
        >
          {showInput.isVisible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
              <input
                type='text'
                onBlur={() => setShowInput({ ...showInput, isVisible: false })}
                autoFocus
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {folderData?.items?.map((folder) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                folderData={folder}
                key={folder.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className='file'>
        <div className='fileItems'>
          <span className='fileIcon'>
            <VscFile />
          </span>{" "}
          <span>{folderData.name}</span>
        </div>
      </div>
    );
  }
};

export default Folder;
