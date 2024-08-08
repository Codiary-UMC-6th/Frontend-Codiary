import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import * as Color from '../common/Color';
import { ReactComponent as Scrap } from "../assets/symbols_scrap.svg";
import { ReactComponent as CommentIcon } from "../assets/symbols_comment.svg";
import { ReactComponent as Kebab } from "../assets/symbols_kebab.svg";

import CategoryChip from "../components/CategoryChip";
import ProfileCard from "../components/ProfileCard";
import Comments from "../components/comments/Comments";
import mockComments from "../components/comments/MockComments";
import CommentInput from "../components/comments/CommentInput";
import OtherCards from "../components/OtherCards";

const Container = styled.div`
    background-color : ${Color.background};

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenterBox = styled.div`
    width: 780px;
`;

const Title = styled.div`
    color: ${Color.text1};
    display: flex;
    width: 780px;
    margin-top: 52px;
    margin-bottom: 48px;

    font-family: Pretendard;
    font-size: 42px;
    font-style: normal;
    font-weight: 600;
    line-height: 50px;
`;

const DiaryInfo = styled.div`
    border-bottom: 1px solid ${Color.divider};
    margin-bottom: 80px;
`;

const NameBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const UserName = styled.div`
    color: ${Color.text1};
    text-align: justify;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
`;

const ScrapCount = styled.div`
    color: ${Color.primary_yellow};
    text-align: justify;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    margin-left: 6px;
    margin-right: 24px;
`;

const CommentCount = styled.div`
    color: ${Color.primary_red};
    text-align: justify;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    margin-left: 6px;
    margin-right: 24px;
`;

const PostInfo = styled.div`
    color: ${Color.text5};
    text-align: justify;
    margin-bottom: 25px;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const Subtitle = styled.div`
    color: ${Color.text1};
    text-align: justify;
    margin-bottom: 16px;

    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
`;

const Text = styled.div`
    color: ${Color.text1};
    text-align: justify;
    margin-bottom: 40px;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

const CodeBox = styled.div`
    display: flex;
    width: 732px;
    height: 70px;
    padding: 24px;
    align-items: center;

    border: 1px solid ${Color.divider};
    background: ${Color.background3};
`;

const CommentTitle = styled.div`
    color: ${Color.text1};

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

const Code = styled.div`
    width: 732px;
    color: ${Color.primary_blue};

    font-family: D2Coding;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.09px;
`;

const DiaryDetails = () => {
    const { state } = useLocation();
    const [totalComments, setTotalComments] = useState(0);

    const countComments = (comments) => {
        let count = 0;
        comments.forEach(comment => {
            count += 1; // 현재 댓글 추가
            if (comment.replies) {
                count += comment.replies.length; // 대댓글 개수 추가
            }
        });
        
        return count;

    };
  
    useEffect(() => {
      setTotalComments(countComments(mockComments));
    }, []);

    return (
        <Container>
            <CenterBox>
                <Title>{state.title}</Title>
                <CategoryChip />
                <DiaryInfo>
                    <NameBox>
                        <UserName>{state.author}</UserName>
                        <Details>
                            <Scrap />
                            <ScrapCount>n</ScrapCount>
                            <CommentIcon />
                            <CommentCount>n</CommentCount>
                            <Kebab />
                        </Details>
                    </NameBox>
                    <PostInfo>최초 등록일 YYYY.MM.DD 최종 수정일 YYYY.MM.DD</PostInfo>
                </DiaryInfo>
                <Subtitle>Subtitle</Subtitle>
                <Text>{state.details}</Text>
                <CodeBox>
                    <Code>{state.details}</Code>
                </CodeBox>
                <ProfileCard />
                <CommentTitle>{totalComments}개의 댓글</CommentTitle>
                <CommentInput />
                {mockComments.map((comment) => (
                    <Comments key={comment.id} comment={comment} />
                ))}
            </CenterBox>
            <OtherCards />
        </Container>
    );

}

export default DiaryDetails;