import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import * as Color from '../common/Color';
import { get } from '../common/api';
import { formatDateTime } from "../components/diaryDetails/comments/formatDate";
import Scrap from "../assets/symbols_scrap.svg";
import CommentIcon from "../assets/symbols_comment.svg";

import KebabModal from "../components/diaryDetails/KebabModal";
import FAB from "../components/diaryDetails/FAB";
import CategoryChip from "../components/diaryDetails/CategoryChip";
import ProfileCard from "../components/diaryDetails/ProfileCard";
import Comments from "../components/diaryDetails/comments/Comments";
import CommentInput from "../components/diaryDetails/comments/CommentInput";
import OtherCards from "../components/diaryDetails/OtherCards";

import { getPost } from "@/shared/api/diaryDetail";

interface Post {
    coauthorIds: number[];
    postCategory: string;
    postId: number;
    title: string;
    details: string;
    author: string;
    authorId: number;
    createdAt: string;
}

interface CommentsInterface {
    memberId: number;
    nickname: string;
    commentId: number;
    commentBody: string;
    createdAt: string;
    childCommentList: CommentsInterface[] | undefined;
}

function DiaryDetails() {
    const memberId = 0;
    const [post, setPost] = useState<Post>({
        coauthorIds: [],
        postCategory: "",
        postId: 0,
        title: "",
        details: "",
        author: "",
        authorId: 0,
        createdAt: ""
    });
    const loadPost = async () => {
        const response = await getPost(2);
        console.log(response);
        setPost({
            coauthorIds: response.coauthor_ids,
            postCategory: response.post_category,
            postId: response.post_id,
            title: response.post_title,
            details: response.post_body,
            author: response.author_nickname,
            authorId: response.member_id,
            createdAt: response.created_at,
        })
    }

    useEffect(() => {
        loadPost();
    }, []);

    /*
        const stringModifyForImg = (content: any) => {
        const regex = /<img\s+id="(\w+)">/g;
        var string = content;
        var i = 0;
        string = string.replace(regex, function(match: string) {
            const replacedString = match.replace(/<img/, `<img class="postImg" src=${post.postFileList[i].url}`);
            i += 1;
            console.log("replacedString", replacedString);
            return replacedString;
        });

        return string;
    }
    */

    return (
        <Container>
            <FAB postId={post.postId} memberId={memberId} />
            <CenterBox>
                <Title>{post.title}</Title>
                <CategoryChip postId={post.postId} />
                <DiaryInfo>
                    <NameBox>
                        <UserName>{post.author}</UserName>
                        <Details>
                            <img src={Scrap} alt='scrap icon'/>
                            <ScrapCount>{/*bookmarkCount*/0}</ScrapCount>
                            <img src={CommentIcon} alt='comment icon'/>
                            <CommentCount>{/*totalComments*/0}</CommentCount>
                            <KebabModal memberId={memberId} authorId={post.authorId} commentId={0} />
                        </Details>
                    </NameBox>
                    <PostInfo>최초 등록일 {formatDateTime(post.createdAt)}</PostInfo>
                </DiaryInfo>
                <Text dangerouslySetInnerHTML={{ __html: post.details/*stringModifyForImg(state.details)*/ }}></Text>
                <ProfileCard authorId={post.authorId} author={post.author} memberId={memberId} />
                {post.coauthorIds ? 
                (post.coauthorIds.map((data) => (
                    <ProfileCard authorId={data} author={''} memberId={memberId} />
                )))
                : <></>}
                <CommentTitle>{/*totalComments*/0}개의 댓글</CommentTitle>
                <CommentInput postId={post.postId} memberId={memberId} />
                {/*commentsData.map((data) => (
                    <Comments comment={data} postId={state.postId} memberId={memberId} />
                ))*/}
            </CenterBox>
            <OtherCards postId={post.postId} />
        </Container>
    );
}

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

const Text = styled.div`
    color: ${Color.text1};
    text-align: justify;
    margin-bottom: 130px;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

const CommentTitle = styled.div`
    color: ${Color.text1};

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

export default DiaryDetails;