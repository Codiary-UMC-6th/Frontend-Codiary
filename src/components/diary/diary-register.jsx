import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../common/Color";
import { useFileStore } from "../../store/FileStore";
import { useLoginStore } from "../../store/LoginStore";

import { patch } from "../../common/api";

import Card from "../main/Card";

const DiaryRegister = () => {
  const { teamList } = useLoginStore();

  const [isPublic, setIsPublic] = useState(true);
  const [coAuthors, setCoAuthors] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { files } = useFileStore();
  const handleSave = async () => {
    // Save the diary entry

    const modifyContent = (content) => {
      var string = content.replace(new RegExp("contenteditable=\"true\"", 'g'), '');
      string = string.replace(new RegExp("class=\"block\"", 'g'), '');

      let idCounter = 0;
      string = string.replace(/<img[^>]*>/g, function() {
        return `<img id="${idCounter++}">`;
      });
      return string.toString();
    }

    const formData = new FormData();
    formData.append('teamId', teamId);
    formData.append('projectId', projectId);
    formData.append('postTitle', sessionStorage.getItem('diary-title'));
    const content = sessionStorage.getItem('diary-content');
    const modified_content = modifyContent(content);
    formData.append('postBody', modified_content);
    formData.append('postStatus', 'true');
    formData.append('postAccess', 'ENTIRE');
    formData.append('thumbnailImageName', '');
    files.forEach((file) => {
      formData.append('postFiles', file);
    })

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
        categoryPatch(data.result.postId);
        alert("다이어리 등록을 성공하였습니다.");
        navigate('/');
      } else {
        console.error('Error uploading post:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      alert("다이어리 등록을 실패하였습니다.");
    }
  };

  const categoryPatch = async (postId) => {
    try {
      const response= await patch(`/posts/categories/${postId}`, categories);
      console.log("카테고리 요청 성공", response);
    } catch (error) {
      console.error("카테고리 요청 실패", error);
    }
    
  }

  const handleAddCoAuthor = (author) => {
    if (!author) {
      setErrorMsg("존재하지 않는 사용자입니다.");
    } else {
      setCoAuthors([...coAuthors, author]);
      setErrorMsg("");
    }
  };

  const handleAddCategory = (e) => {
    if((e.key === 'Enter')&&(e.target.value)){
      setCategories([...categories, e.target.value]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://43.202.229.89:8080/projects/list', {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });
        const data = await response.json();
        console.log(data);
        setProjectList(data.result.projects);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProjects();
  }, [])

  return (
    <Container>
      <LeftSection>
        <CloseButton>&times;</CloseButton>
        <DiaryPreview>
          <DiaryPreviewTitle>다이어리 미리보기</DiaryPreviewTitle>
          <Card
            title={sessionStorage.getItem("diary-title")}
            author="Writer"
            details={"내용 미리보기"}
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
              disabled={true}
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
            <Label>팀명</Label>
            <Select
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            >
              <Option value="">-</Option>
              {
                teamList.map((team) => (
                  <Option value={team.teamId}>{team.teamName}</Option>
                ))
              }
            </Select>
            <Label>프로젝트명</Label>
            <Select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <Option value="">-</Option>
              {
                projectList.map((project) => (
                  <Option value={project.projectId}>{project.projectName}</Option>
                ))
              }
            </Select>
            <Label>카테고리 추가</Label>
            <Input
              type="text"
              placeholder="카테고리를 입력하세요. (최대 7개)"
              onKeyDown={(e) => {handleAddCategory(e)}}
            />
            <CategoryBox>
              {categories.map((category, index) => (
                <Category key={index}>{category}</Category>
              ))}
            </CategoryBox>
          </FormGroup>
        </FormSection>
        <Button onClick={handleSave}>작성 완료</Button>
      </RightSection>
    </Container>
  );
};

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
  height: 600px;
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
  margin-top: 20px;
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
  background: ${Color.primary_red};
  color: ${Color.text1};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; 
  width: 147px;
  height: 56px;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;
`

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.background3};
  color: ${Color.text1};
  width: 78px;
  height: 32px;
  padding: 4px;
  border-radius: 4px;
  margin: 8px 10px;
`

export default DiaryRegister;
