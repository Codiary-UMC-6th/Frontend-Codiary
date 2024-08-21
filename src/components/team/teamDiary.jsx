import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DiaryCard from "./diaryCard";
import { get, post } from "../../common/api";
import { useParams } from "react-router-dom";
import { AddModal } from "../modal/AddModal";
const TeamDiary = ({ isManager }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [diaryList, setDiaryList] = useState([]);
  const { teamId } = useParams();
  const [teamProject, setTeamProject] = useState([]);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const openAddCategoryModal = () => setIsAddCategoryModalOpen(true);
  const closeAddCategoryModal = () => setIsAddCategoryModalOpen(false);

  useEffect(() => {
    const fetchTeamDiary = async () => {
      try {
        const response = await get(
          `/posts/team/${teamId}/paging?page=0&size=6`
        );

        setDiaryList(response?.result.posts);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    const getTeamInfo = async () => {
      try {
        const result = await get(`/teams/${teamId}`);
        setTeamProject(result?.result.projects);
        console.log("fetch team in diary", result?.result);
      } catch (error) {
        console.log("Error fetching team info:", error);
      }
    };

    getTeamInfo();
    fetchTeamDiary();
  }, [isAddCategoryModalOpen]);

  const addCategory = async (value) => {
    try {
      const result = await post(`/teams/${teamId}/project`, {
        projectName: value,
      });
    } catch (error) {
      console.log("post project error", error);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(diaryList.length / 6));
  }, [diaryList]);

  const handleCategoryClick = async (projectId) => {
    try {
      const response = await get(
        `/posts/project/${projectId}/team/${teamId}/paging?page=0&size=6`
      );
      console.log("Response:", response);
      setDiaryList(response?.result.posts);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setDiaryList([]);
    }
  };

  return (
    <>
      <Container>
        <Title>팀 다이어리</Title>
        <CategoryContainer>
          <Category>전체</Category>
          {teamProject.map((el, index) => (
            <Category
              onClick={() => handleCategoryClick(el.projectId)}
              key={index}
            >
              {el.projectName}
            </Category>
          ))}
          {isManager && (
            <AddCategoryButton onClick={openAddCategoryModal}>
              +
            </AddCategoryButton>
          )}
        </CategoryContainer>
        <DiaryContainer>
          {diaryList &&
            diaryList
              .slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)
              .map((el) => <DiaryCard key={el.id} data={el} />)}
        </DiaryContainer>

        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageNum
              key={index + 1}
              isActive={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageNum>
          ))}
        </Pagination>
      </Container>
      {isAddCategoryModalOpen && (
        <AddModal
          title="카테고리 추가하기"
          placeholder='input name = "interest"'
          onClose={closeAddCategoryModal}
          onAdd={addCategory}
        />
      )}
    </>
  );
};

export default TeamDiary;

const Container = styled.div`
  width: 80vw;
`;

const Title = styled.div`
  color: white;
  font-size: 30px;
  margin: 30px 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Category = styled.div`
  width: 90px;
  height: 45px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #2d7295;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
  font-size: 15px;

  &:hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const AddCategoryButton = styled.div`
  width: 90px;
  height: 45px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;

  &:hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const DiaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 70px;
  margin: 20px 0;
  justify-content: center;
`;

const Pagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
`;

const PageNum = styled.div`
  color: ${(props) => (props.isActive ? "white" : "#888888")};
  font-size: 20px;
  cursor: pointer;
  margin: 10px;
`;
