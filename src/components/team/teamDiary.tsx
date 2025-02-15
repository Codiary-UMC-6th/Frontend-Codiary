import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Color from '../../common/Color';

import { useParams } from "react-router-dom";
import { AddModal } from "../modal/AddModal";
import Card from "../main/Card";
import { diary, teamProject, teamProfile } from "@/shared/api/team/type";
import { getTeamDiaryData, getTeamProjectData } from "@/shared/api/team";
import { Content } from "../profile/BottomStyle";
import PagenationBox from "../profile/PagenationBox";

// PostType 타입 정의
interface PostType {
  author: string;
  author_image_url?: string;
  body: string;
  created_at: string;
  id: number;
  team_banner_image_url?: string;
  team_profile_image_url?: string;
  thumbnail_image_url?: string;
  title: string;
  updated_at: string;
}

type Propstype = {
  props: {
    isManager: boolean;
    teamProfileData: teamProfile | undefined;
  }
}

const TeamDiary = ({ props }: Propstype) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [diaryList, setDiaryList] = useState<diary[]>([]);
  const [postList, setPostList] = useState<PostType[]>([]);


  const { teamId } = useParams();
  const [teamProjectList, setTeamProjectList] = useState<teamProject[]>([]);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const openAddCategoryModal = () => setIsAddCategoryModalOpen(true);
  const closeAddCategoryModal = () => setIsAddCategoryModalOpen(false);

  const getTeamDiary = async (teamId: string | undefined, page: number, size: number) => {
    try {
      const response = await getTeamDiaryData(teamId, page, size);
      console.log(response);
      setDiaryList(response.posts);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTeamDiary(teamId, currentPage - 1, 5);
  }, [currentPage]);

  // diaryList를 PostType으로 변환하는 로직 -> card로 넘겨줄 데이터
  useEffect(() => {
    const mappedPosts = diaryList.map((item) => ({
      id: item.post_id,
      author: item.author_nickname,
      body: item.post_body,
      created_at: item.created_at,
      updated_at: item.updated_at,
      title: item.post_title,
      thumbnail_image_url: item.thumbnail_image_url,
      team_profile_image_url: item.team_profile_image_url,
      team_banner_image_url: item.team_banner_image_url,
    }));

    setPostList(mappedPosts);
  }, [diaryList]);

  const getTeamProject = async (teamId: string | undefined) => {
    try {
      const response = await getTeamProjectData(teamId);
      console.log(response);
      setTeamProjectList(response);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTeamProject(teamId);
  }, []);

  // useEffect(() => {
  //   const fetchTeamDiary = async () => {
  //     try {
  //       const response = await get(
  //         `/posts/team/${teamId}/paging?page=0&size=6`
  //       );

  //       setDiaryList(response?.result.posts);
  //     } catch (error) {
  //       console.error("Error fetching team data:", error);
  //     }
  //   };
  //   const getTeamInfo = async () => {
  //     try {
  //       const result = await get(`/teams/${teamId}`);
  //       setTeamProject(result?.result.projects);
  //       console.log("fetch team in diary", result?.result);
  //     } catch (error) {
  //       console.log("Error fetching team info:", error);
  //     }
  //   };

  //   getTeamInfo();
  //   fetchTeamDiary();
  // }, [isAddCategoryModalOpen]);

  // const addCategory = async (value: string) => {
  //   try {
  //     const result = await post(`/teams/${teamId}/project`, {
  //       projectName: value,
  //     });
  //   } catch (error) {
  //     console.log("post project error", error);
  //   }
  // };

  // useEffect(() => {
  //   setTotalPages(Math.ceil(diaryList.length / 6));
  // }, [diaryList]);

  // const handleCategoryClick = async (projectId: Number) => {
  //   if (projectId == -1) {
  //     try {
  //       const response = await get(
  //         `/posts/team/${teamId}/paging?page=0&size=6`
  //       );

  //       setDiaryList(response?.result.posts);
  //     } catch (error) {
  //       console.error("Error fetching team data:", error);
  //     }
  //   } else {
  //     try {
  //       const response = await get(
  //         `/posts/project/${projectId}/team/${teamId}/paging?page=0&size=6`
  //       );
  //       console.log("Response:", response);
  //       setDiaryList(response?.result.posts);
  //     } catch (error) {
  //       console.error("Error fetching project data:", error);
  //       setDiaryList([]);
  //     }
  //   }
  // };

  return (
    <>
      <Container>
        <Title>팀 다이어리</Title>
        <CategoryContainer>
          <Category>
            <Btn>전체</Btn>
            {teamProjectList && teamProjectList.length > 0 ? (
              <>
                {teamProjectList.map((project: teamProject) => {
                  return (
                    <Btn>{project.name}</Btn>
                  )
                })}
              </>
            ) : (
              <></>
            )}
            {/* {props.myPage ? <AddBtn onClick={props.onClick}>+</AddBtn> : <></>} */}
          </Category>
        </CategoryContainer>
        <DiaryContainer>
          {diaryList && diaryList.length > 0 ? (
            <>
              {postList.map((data) => {
                return (
                  <Card key={data.id} post={data} />
                );
              })}
            </>
          ):(
            <Content style={{ fontSize: "22px" }}>등록된 다이어리가 없습니다</Content>
          )}
        </DiaryContainer>

        <Pagination>
          <PagenationBox setCurrentPage={setCurrentPage} />
        </Pagination>
      </Container>
      {/* {isAddCategoryModalOpen && (
        <AddModal
          title="카테고리 추가하기"
          placeholder='input name = "interest"'
          onClose={closeAddCategoryModal}
          onAdd={addCategory}
        />
      )} */}
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
  margin: 40px 0 28px 0;
`;

const Category = styled.div`
  display: flex;
  height : 48px;

  &:hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const Btn = styled.div`
    background: ${Color.primary_blue};
    border: none;
    color: ${Color.text1};
    padding: 8px 32px 8px 32px;
    margin-right: 10px;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
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
  margin: 128px 0;
`;
