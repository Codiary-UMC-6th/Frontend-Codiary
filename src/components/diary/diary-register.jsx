import React, { useState, useRef } from "react";
import styled from "styled-components";
import * as Color from "../../common/Color";
import { post } from "../../common/api";

import Card from "../main/Card";

const Container = styled.div`
  display: flex;
  background-color: ${Color.background};
  padding: 20px;
  color: white;
  min-height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px; /* 오른쪽 여백 추가 */
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 2px;
  background-color: #ccc;
  margin: 0 20px; /* 좌우 여백 추가 */
`;

const FormSection = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${Color.background};
  color: white;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${Color.background};
  color: white;
`;

const Option = styled.option`
  background-color: ${Color.background};
  color: white;
`;

const ErrorMsg = styled.div`
  color: red;
  margin-top: 8px;
`;

const DiaryPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
`;

const DiaryPreviewTitle = styled.h2`
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Button = styled.button`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  background: var(--Primary-Red, #ae5257); /* 스타일 수정 */
  color: white; /* 스타일 수정 */
`;

const DiaryRegister = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [coAuthors, setCoAuthors] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  const handleSave = async () => {
    // Save the diary entry

    const formData = new FormData();
    formData.append('teamId', '');
    formData.append('projectId', '');
    formData.append('postTitle', sessionStorage.getItem('diary-title'));
    const content = sessionStorage.getItem('diary-content');
    const modified_content = content.replace(new RegExp("contenteditable=\"true\"", 'g'), '').toString();
    formData.append('postBody', modified_content);
    formData.append('postStatus', 'true');
    formData.append('postAccess', 'ENTIRE');
    formData.append('thumbnailImageName', '');
    const fileInput = fileInputRef.current;
    if (fileInput.files.length > 0) {
      formData.append('postFiles', fileInput.files[0]); // 첫 번째 파일을 선택
    }

    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
          'accept': '*/*'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
      } else {
        console.error('Error uploading post:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  const handleAddCoAuthor = (author) => {
    if (!author) {
      setErrorMsg("존재하지 않는 사용자입니다.");
    } else {
      setCoAuthors([...coAuthors, author]);
      setErrorMsg("");
    }
  };

  const handleAddCategory = (category) => {
    setCategories([...categories, category]);
  };

  return (
    <Container>
      <input type="file" ref={fileInputRef} />
      <LeftSection>
        <CloseButton>&times;</CloseButton>
        <DiaryPreview>
          <DiaryPreviewTitle>다이어리 미리보기</DiaryPreviewTitle>
          <Card
            title={title}
            author="Writer"
            details={content.split("\n").slice(0, 4).join("\n")}
          />
        </DiaryPreview>
      </LeftSection>
      <Divider />
      <RightSection>
        <FormSection>
          <FormGroup>
            <Label>공개 설정</Label>
            <div>
              <input
                type="radio"
                id="public"
                name="visibility"
                value="public"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              <label htmlFor="public">공개</label>
              <input
                type="radio"
                id="private"
                name="visibility"
                value="private"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />
              <label htmlFor="private">비공개</label>
            </div>
            <Label>공동 저자 추가</Label>
            <Input
              type="text"
              placeholder="공동 저자 아이디를 검색하세요."
              onBlur={(e) => handleAddCoAuthor(e.target.value)}
            />
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <div>
              {coAuthors.map((author, index) => (
                <span key={index}>{author}</span>
              ))}
            </div>
            <Label>프로젝트명</Label>
            <Select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            >
              <Option value="">프로젝트</Option>
              <Option value="Option 1">Option 1</Option>
              <Option value="Option 2">Option 2</Option>
              <Option value="Option 3">Option 3</Option>
              <Option value="Option 4">Option 4</Option>
              <Option value="Option 5">Option 5</Option>
            </Select>
            <Label>카테고리 설정</Label>
            <Input
              type="text"
              placeholder="카테고리를 입력하세요. (최대 7개)"
              onBlur={(e) => handleAddCategory(e.target.value)}
            />
            <div>
              {categories.map((category, index) => (
                <span key={index}>{category}</span>
              ))}
            </div>
          </FormGroup>
        </FormSection>
        <Button onClick={handleSave}>작성 완료</Button>
      </RightSection>
    </Container>
  );
};

export default DiaryRegister;
