import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleRight, FaFileCode, FaJs, FaHtml5, FaCss3, FaInfoCircle, FaGitAlt} from "react-icons/fa";
import {data} from "./structure"

const Folder = ({ name, children }) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpand(!isExpand);
  };

  return (
    <FolderDiv>
      <div className="folder-name" onClick={handleToggle}>
        <FaAngleRight />
        <Title>{name}</Title>
      </div>
      <ToggleFolder isExpand={isExpand}>{children}</ToggleFolder>
    </FolderDiv>
  );
};

const FILE_EXT_ENUM = {
  js: <FaJs />,
  html: <FaHtml5 />,
  css: <FaCss3 />,
  gitignore: <FaGitAlt />,
  md: <FaInfoCircle />
};

const File = ({ name }) => {
  let ext = name.split(".")[1];

  return (
    <FileDiv>
      {FILE_EXT_ENUM[ext] || <FaFileCode />}
      <Title>{name}</Title>
    </FileDiv>
  );
};

const RenderNodeRecursively = ({ data }) => {
  return data.map((item) => {
    
    if (item.children.length === 0) {
      return <File name={item.title} key={item.title}/>;
    }
    if (item.children.length > 0) {
      return (
        <Folder name={item.title} key={item.title}>
          <RenderNodeRecursively data={item.children} key={item.children} />
        </Folder>
      );
    }
  });
};

export default function App() {
  return (
    <StyledNode>
    <RenderNodeRecursively data={data} />
    </StyledNode>
  );
}


const StyledNode = styled.div`
  line-height: 1.5;
`;

const FolderDiv = styled.div`
  padding-left: 20px;

  .folder-name {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.div`
      margin-left: 5px;
`;
const FileDiv = styled.div`
  display: flex;
  padding-left: 25px;
  align-items: center;
`;
const ToggleFolder = styled.div`
  height: ${(p) => (p.isExpand ? "auto" : "0")};
  overflow: hidden;
`;