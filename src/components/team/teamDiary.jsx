import React, { useState, useEffect } from "react";
import { boardData } from "../../pages/teamDataEx";
import styled from "styled-components";
import DiaryCard from "./diaryCard";
import { get } from "../../common/api";
import { useParams } from "react-router-dom";
const TeamDiary = ({ isManager }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const { teamId } = useParams();

  const size = 6;
  useEffect(() => {
    const fetchTeamDiary = async () => {
      try {
        const response = await get(
          `/posts/team/${teamId}/paging?page=${currentPage}&size=${size}`
        );
        setBoardList(response?.result.posts);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamDiary();
  }, [currentPage]);

  const addCategory = () => {
    setCategoryList([...categoryList, ""]);
  };

  const handleCategoryChange = (index, value) => {
    const newCategoryList = [...categoryList];
    newCategoryList[index] = value;
    setCategoryList(newCategoryList);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(boardData.length / 6));
  }, [boardData]);

  const getDiary = async () => {};

  return (
    <Container>
      <Title>팀 다이어리</Title>
      <CategoryContainer>
        <Category>전체</Category>
        {categoryList.map((el, index) => (
          <CategoryInput
            key={index}
            type="text"
            value={el}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
          />
        ))}
        {isManager && (
          <AddCategoryButton onClick={addCategory}>+</AddCategoryButton>
        )}
      </CategoryContainer>
      <DiaryContainer>
        {boardList
          .slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)
          .map((el) => (
            <DiaryCard key={el.id} data={el} />
          ))}
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
`;

const CategoryInput = styled.input`
  width: 90px;
  height: 45px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #2d7295;
  color: white;
  margin-right: 10px;
  border: none;
  padding: 0;
  text-align: center;
  font-size: 15px;
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
