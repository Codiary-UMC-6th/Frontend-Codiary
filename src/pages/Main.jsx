import React, { useEffect, useState } from "react";
import MockData from "../components/main/MockData";
import Card from "../components/main/Card";
import ViewBtn from "../components/main/ViewBtn";
import styled from "styled-components";
import * as Color from "../common/Color";
import CategoryBtn from "../components/main/CategoryBtn";
import { get } from "../common/api";
import useSearchStore from "../store/SearchStore";

const Container = styled.div`
  background-color: ${Color.background};
`;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  background-color: rgb(200, 200, 200);
  display: flex;
  margin-bottom: 52px;
`;

const CardsContainer = styled.div`
  margin: 0px 130px 0px 130px;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Main = () => {
  const [diaryData, setDiaryData] = useState([]);
  const onClickPopular = async () => {
    try {
      const response = await get("/posts/poplular/list?page=1");
      console.log(response?.result.postPopularList);
      setDiaryData(response?.result.postPopularList);
    } catch (error) {
      console.error("Get(Popular-List) 요청 실패:", error);
    }
  };

  const onClickLatest = async () => {
    try {
      const response = await get("/posts/latest/list?page=1");
      console.log(response?.result.postLatestList);
      setDiaryData(response?.result.postLatestList);
    } catch (error) {
      console.error("Get(Popular-List) 요청 실패:", error);
    }
  };

  const { searchResults } = useSearchStore();

  useEffect(() => {
    onClickPopular();
  }, []);

  useEffect(() => {
    if (searchResults) setDiaryData(searchResults);
  }, [searchResults]);
  return (
    <Container>
      <Banner />
      <ViewBtn onClickPopular={onClickPopular} onClickLatest={onClickLatest} />
      <CategoryBtn />
      <CardsContainer>
        {diaryData.map((data) => (
          <Card
            id={data.id}
            title={data.postTitle}
            author={data.nickname}
            details={data.postBody}
          />
        ))}
      </CardsContainer>
    </Container>
  );
};

export default Main;
