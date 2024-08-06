import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  border-bottom: 1px solid #888;
  background: none;
  color: white;
  outline: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  max-width: 800px;
  height: 400px;
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

const DiaryEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // Save the diary entry
    console.log("Diary saved:", { title, content });
    navigate("/diary-register"); // "작성하기" 버튼을 눌렀을 때 이동
  };

  return (
    <Container>
      <Header>
        <TempSaveButton>임시저장</TempSaveButton>
        <SubmitButton onClick={handleSave}>작성하기</SubmitButton>
      </Header>
      <TitleInput
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ContentInput
        placeholder="명령어는 '/'를 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </Container>
  );
};

export default DiaryEditor;
