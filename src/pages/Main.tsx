import React, { useEffect, useState } from "react";
import Card from "../components/main/Card";
import ViewBtn from "../components/main/ViewBtn";
import styled from "styled-components";
import * as Color from "../common/Color";
import CategoryBtn from "../components/main/CategoryBtn";
import useSearchStore from "../store/SearchStore";

import { AddModal } from "../components/modal/AddModal";
import Pagenation from "../components/main/Pagenation";
import banner from "../assets/diary/banner.png";

import { getPosts } from "@/shared/api/main";
import { Post } from "@/shared/api/main/type";

const Main = () => {
  const [diaryData, setDiaryData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPopular = async () => {
    try { 
      //const response = await get(`/posts/poplular/list?page=${currentPage}`);
      //console.log("response", response?.result.postPopularList);
      //setDiaryData(response?.result.postPopularList);
      const response = await getPosts(currentPage - 1, 6, 'popular');
      setDiaryData(response.content)
      console.log(response.content);
    } catch (error) {
      console.error("Get(Popular-List) 요청 실패:", error);
    }
  };

  const onClickLatest = async () => {
    try {
      const response = await getPosts(currentPage - 1, 6, 'latest');
      setDiaryData(response.content)
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

  return (
    <>
      <Container>
        <Banner src={banner} alt='banner' />
        <ViewBtn
          onClickPopular={onClickPopular}
          onClickLatest={onClickLatest}
        />

        <CategoryBtn onClick={openAddCategoryModal} />
        <CardsContainer>
          {diaryData.map((post) => (
            <Card
              key={post.id}
              post={post}
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

export default Main;
