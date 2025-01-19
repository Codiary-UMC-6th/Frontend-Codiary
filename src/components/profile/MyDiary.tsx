import react, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import * as Color from '../../common/Color';

import Diary from './Diary';
import PagenationBox from "./PagenationBox";
import { AddModal } from "../modal/AddModal";
import { getPersonalDiaryData } from "@/shared/api/profile";
import { diary } from "@/shared/api/profile/type";
import { Content } from "./BottomStyle";

interface props {
  memberId: string | undefined;
  onClick: any;
}

const MyDiary = (props: props) => {
  const [diaryList, setDiaryList] = useState<diary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getPersonalDiary = async (memberId: string | undefined, page: number, size: number) => {
    try {
      const response = await getPersonalDiaryData(memberId, page, size);
      console.log(response);
      setDiaryList(response.posts);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // const memberId = props.memberId;
    // axios.get(`/posts/member/${memberId}/paging?page=${currentPage-1}&size=5`)
    //     .then((response) => {
    //         console.log(response.data.result.posts);
    //         setDiaryList(response.data.result.posts);
    //     })
    //     .catch((error) => {})
    // setDiaryList(diaryList);
    getPersonalDiary(props.memberId, currentPage - 1, 5);
    console.log("Page updated. current page : " + currentPage);
  }, [currentPage]);

  return (
    <Container>
      <Title>내 다이어리</Title>
      <Category>
        <Btn>전체</Btn>
        <Btn>전체</Btn>
        <AddBtn onClick={props.onClick}>+</AddBtn>
      </Category>
      <DiaryBox>
        {diaryList && diaryList.length > 0 ? (
          <>
            {diaryList.map((diary: diary) => {
              return (
                <Diary
                  diary={diary}
                />
              );
            })}
          </>
        ):(
          <Content style={{ fontSize: "22px" }}>등록된 다이어리가 없습니다</Content>
        )}
      </DiaryBox>
      <PagenationBox setCurrentPage={setCurrentPage} />
    </Container>
  );
}

const Container = styled.div`
width: 680px;
`

const Title = styled.div`
    margin: 64px 0px 28px 0px;
    width: 100%;
    color: ${Color.text1};
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
`

const Category = styled.div`
    display: flex;
    height : 48px;
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

const AddBtn = styled.button`
    background: ${Color.background2};
    border: none;
    color: ${Color.text1};
    padding: 8px 32px 8px 32px;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 40px;
    font-weight: 200;
    cursor: pointer;
`;

const DiaryBox = styled.div`
    width: 100%;
    margin : 64px 0px 0px 0px;
`

export default MyDiary;