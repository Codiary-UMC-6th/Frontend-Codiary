import react, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import * as Color from '../../common/Color';

import Diary from './Diary';
import PagenationBox from "./PagenationBox";

const Container = styled.div`
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
`;

const DiaryBox = styled.div`
    margin : 64px 0px 0px 0px;
`

const MyDiary = (props) => {
    const [diaryList, setDiaryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const memberId = props.memberId;
        axios.get(`/posts/member/${memberId}/paging?page=${currentPage-1}&size=5`)
            .then((response) => {
                console.log(response.data.result.posts);
                setDiaryList(response.data.result.posts);
            })
            .catch((error) => {})
        setDiaryList(diaryList);
        console.log("Page updated. current page : " + currentPage);
    }, [currentPage]);

    return (
        <Container>
            <Title>내 다이어리</Title>
            <Category>
                <Btn>전체</Btn>
                <AddBtn>+</AddBtn>
            </Category>
            <DiaryBox>
                {diaryList.map((diary)=> {
                    return (
                        <Diary
                            key={diary.postId}
                            postId={diary.postId} 
                            postTitle={diary.postTitle} 
                            postBody={diary.postBody} 
                            createdAt={diary.createdAt}
                        />
                    );
                })}
            </DiaryBox>
            <PagenationBox setCurrentPage={setCurrentPage}/>
        </Container>
    );
}

export default MyDiary;