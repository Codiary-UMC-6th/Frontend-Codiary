import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import "./Diary.css";

import { useFileStore } from "../store/FileStore";
import EditMenu from "../components/diary/EditMenu";

const DiaryEditor = () => {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const { file, setFile } = useFileStore();
  const fileInputRef = useRef(null);
  const handleFileChange = () => {
    if (fileInputRef.current.files.length > 0) {
      setFile(fileInputRef.current.files[0]); // 첫 번째 파일을 상태로 저장
      
      const imageUrl = URL.createObjectURL(fileInputRef.current.files[0]);
      setPreview(imageUrl);
      console.log("file", file);
      console.log("url", imageUrl);
    }
  };

  const handleSave = () => {
    // Save the diary entry
    const area = document.getElementById("area");
    sessionStorage.setItem("diary-title", title);
    sessionStorage.setItem("diary-content", area.innerHTML);
    navigate("/diary-register"); // "작성하기" 버튼을 눌렀을 때 이동
  };

  const decoSelected = (type) => {
    if(selected.innerHTML.includes(`<${type}>`)){
      selected.innerHTML = selected.innerHTML.replace(`<${type}>`, '');
      selected.innerHTML = selected.innerHTML.replace(`<${type}>`, '');
    } else {
      selected.innerHTML = `<${type}>` + selected.innerHTML + `</${type}>`;  
    }
  }

  const colorSelected = (color) => {
    selected.style.color = color;
  }

  const headSelected = (type) => {
    const headTypes = ["h1", "h2", "h3"];
    headTypes.forEach((item) => {
      selected.innerHTML = selected.innerHTML.replace(`<${item}>`, '');
      selected.innerHTML = selected.innerHTML.replace(`<${item}>`, '');
    });
    selected.innerHTML = `<${type}>` + selected.innerHTML + `</${type}>`;
  }

  const createBlock = () => {
    const area = document.getElementById("area");
    const block = document.createElement("div");
    block.className = "block";
    block.contentEditable = true;
    block.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // <br> 태그 생성 및 삽입
        const br = document.createElement('br');
        range.insertNode(br);
        range.insertNode(document.createElement('br'));

        // <br> 태그 뒤로 커서 이동
        range.setStartAfter(br);
        range.setEndAfter(br);

        // 선택된 영역 갱신
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    area.appendChild(block);
    block.focus();
    setSelected(block);
  }

  useEffect(() => {
    console.log(document.getElementById("area").childNodes);
    if (document.getElementById("area").childNodes.length === 0) {
      createBlock();
    }
    window.addEventListener('focusin', (event) => {
      var target = event.target;
      while(target.className !== "block"){
        target = target.parentNode;
        if (target === null) { break; }
      }
      setSelected(target);
      console.log("focus in");
    });

    document.getElementById("title").focus();
  }, [])

  return (
    <Container>
      <Header>
        <TempSaveButton>임시저장</TempSaveButton>
        <SubmitButton onClick={handleSave}>작성하기</SubmitButton>
      </Header>
      <TitleInput
        id="title"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ContentInput
        placeholder="명령어는 '/'를 입력하세요."
      > 
        <div id="area"></div>
        <button onClick={createBlock}>+</button>
      </ContentInput>
      {
        selected === null ?
        <></>
        :
        <EditMenu
        decoSelected={decoSelected}
        colorSelected={colorSelected}
        headSelected={headSelected}
        selected={selected}
        setSelected={setSelected}
        />
      }

      <Preview src={preview?preview:null}></Preview>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: var(--Gray-900, #222);
  color: white;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  border: none;

  background: none;
  color: white;
  outline: none;
  border-bottom: 1px solid #888;
`;

const ContentInput = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: 400px;
  padding: 10px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #888;
  background: none;
  color: white;
  outline: none;
  resize: none;
`;

const Button = styled.button`
  display: flex; /* 스타일 수정 */
  padding: 4px 16px; /* 스타일 수정 */
  justify-content: center; /* 스타일 수정 */
  align-items: center; /* 스타일 수정 */
  gap: 10px; /* 스타일 수정 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const TempSaveButton = styled(Button)`
  border-radius: 30px; /* 스타일 수정 */
  border: 2px solid var(--Primary-Red, #ae5257); /* 스타일 수정 */
  color: var(--Primary-Red, #ae5257); /* 스타일 수정 */
`;

const SubmitButton = styled(Button)`
  border-radius: 30px; /* 스타일 수정 */
  background: var(--Primary-Red, #ae5257); /* 스타일 수정 */
  color: white;
  margin-left: 10px; /* 간격 추가 */
`;

const Preview = styled.img`
  width: 400px;
  height: 400px;
  background-color: white;
`

export default DiaryEditor;
