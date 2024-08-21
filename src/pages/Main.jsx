import React, { useEffect, useState } from "react";
import Card from "../components/main/Card";
import ViewBtn from "../components/main/ViewBtn";
import styled from "styled-components";
import * as Color from "../common/Color";
import CategoryBtn from "../components/main/CategoryBtn";
import { get } from "../common/api";
import useSearchStore from "../store/SearchStore";

import { AddModal } from "../components/modal/AddModal";
import Pagenation from "../components/main/Pagenation";
import banner from "../assets/diary/banner.png";

const Container = styled.div`
  background-color: ${Color.background};
`;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  background-color: rgb(200, 200, 200);
  display: flex;
  margin-bottom: 52px;
  object-fit: cover;
`;

const CardsContainer = styled.div`
  margin: 0px 130px 0px 130px;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Main = () => {
  const [diaryData, setDiaryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPopular = async () => {
    try {

      const response = await get(`/posts/poplular/list?page=${currentPage}`);
      console.log("response", response?.result.postPopularList);

      setDiaryData(response?.result.postPopularList);
    } catch (error) {
      console.error("Get(Popular-List) 요청 실패:", error);
    }
  };

  const onClickLatest = async () => {
    try {
      const response = await get(`/posts/latest/list?page=${currentPage}`);
      console.log(response?.result.postLatestList);
      setDiaryData(response?.result.postLatestList);
    } catch (error) {
      console.error("Get(Popular-List) 요청 실패:", error);
    }
  };
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const openAddCategoryModal = () => setIsAddCategoryModalOpen(true);
  const closeAddCategoryModal = () => setIsAddCategoryModalOpen(false);

  const { searchResults } = useSearchStore();

  useEffect(() => {
    onClickPopular();
  }, [currentPage]);

  useEffect(() => {
    if (searchResults) setDiaryData(searchResults);
  }, [searchResults]);

  const postAddCategory = () => {
    alert('카테고리가 추가되었습니다');
    closeAddCategoryModal();
  }

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])

  return (
    <>
      <Container>
        <Banner img src={banner} alt='banner' />
        <ViewBtn
          onClickPopular={onClickPopular}
          onClickLatest={onClickLatest}
        />

        <CategoryBtn onClick={openAddCategoryModal} />
        <CardsContainer>
          {diaryData.map((data) => (
            <Card
              key={data.postId}
              postId={data.postId}
              title={data.postTitle}
              author={data.nickname}
              details={data.postBody}
              createdAt={data.createdAt}
              authorId={data.memberId}
              thumbnailImageUrl={data.thumbnailImageUrl?data.thumbnailImageUrl:""}
              postFileList={data.postFileList.postFileList}
            />
          ))}
        </CardsContainer>
      </Container>
      {isAddCategoryModalOpen && (
        <AddModal
          title="카테고리 추가하기"
          placeholder='input name = "interest"'
          onClose={closeAddCategoryModal}
          onAdd={postAddCategory}
        />
      )}
      <Pagenation setCurrentPage={setCurrentPage}/>

    </>
  );
};

export default Main;
