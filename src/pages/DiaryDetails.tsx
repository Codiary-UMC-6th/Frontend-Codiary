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

import "./DiaryDetail.css";

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

interface Post {
    coauthorIds: number[];
    postCategory: string;
    postId: number | undefined;
    memberId: number | undefined;
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
    const { state } = useLocation();
    const [memberId, setMemberId] = useState<number | undefined>(undefined);
    const [bookmarkCount, setBookmarkCount] = useState<number>(0);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [content, setContent] = useState();
    const [commentsData, setCommentsData] = useState<CommentsInterface[]>([]);
    const [category, setCategory] = useState<string>('');
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState<boolean>(true);
    const [coauthorIds, setCoauthorIds] = useState<number[]>([]);

    const getPost = async () => {
        try {
            const response = await get(`/posts/${state.postId}`);
            //console.log("다이어리 조회 성공: ", result);
            const result: Post = response.result;
            setPost(result);
            setCategory(result.postCategory);
            setLoading(false);
        } catch (error) {
            console.error("다이어리 조회 실패: ", error);
            setLoading(false);
        }
    }

    const getMemberId = async () => {
        try {
            const result = await get("/members/info");
            //console.log("사용자 정보 조회 성공: ", result);
            setMemberId(result.result.memberId);
        } catch (error) {
            console.error("사용자 정보 조회 실패:", error);
        }
    };

    const getBookmarkCount = async () => {
        try {
            const result = await get(`/bookmarks/count/${state.postId}`);
            //console.log("북마크 개수 조회 결과:", result);
            setBookmarkCount(result.result.countBookmark);
        } catch (error) {
            console.error("북마크 개수 조회 실패:", error);
        }
    };

    const getCommentsCount = async () => {
        try {
            const result = await get(`/comments/count/${state.postId}`);
            console.log("댓글 개수 조회 결과:", result);
            setTotalComments(result.result.countComments);
        } catch (error) {
            console.error("댓글 개수 조회 실패:", error);
        }
    };

    const getCommentsData = async () => {
        try {
            const result = await get(`/posts/comments/list/${state.postId}`);
            //console.log("댓글 조회 성공: ", result);
            setCommentsData(result.result);
        } catch (error) {
            console.error("댓글 조회 실패: ", error);
        }
    }
  
    useEffect(() => {
        getPost();
        getMemberId();
        getCommentsCount();
        getCommentsData();
        getBookmarkCount();

        console.log("state", state);
        setContent(state.details);
    }, []);

    useEffect(() => {
        if (post) {
            setCoauthorIds(post.coauthorIds);
        }
    }, [post]);


    const stringModifyForImg = (content: any) => {
        const regex = /<img\s+id="(\w+)">/g;
        var string = content;
        var i = 0;
        string = string.replace(regex, function(match: string) {
            const replacedString = match.replace(/<img/, `<img class="postImg" src=${state.postFileList[i].url}`);
            i += 1;
            console.log("replacedString", replacedString);
            return replacedString;
        });

        return string;
    }

    /*
    if (loading || !post) {
        return null;
    }
    */
    return (
        <Container>
            <FAB postId={state.postId} memberId={memberId} />
            <CenterBox>
                <Title>{state.title}</Title>
                <CategoryChip postId={post?.postId} />
                <DiaryInfo>
                    <NameBox>
                        <UserName>{state.author}</UserName>
                        <Details>
                            <Scrap />
                            <ScrapCount>{bookmarkCount}</ScrapCount>
                            <CommentIcon />
                            <CommentCount>{totalComments}</CommentCount>
                            <KebabModal memberId={memberId} authorId={state.authorId} commentId={0} />
                        </Details>
                    </NameBox>
                    <PostInfo>최초 등록일 {formatDateTime(state.createdAt)}</PostInfo>
                </DiaryInfo>
                <Text dangerouslySetInnerHTML={{ __html: stringModifyForImg(state.details) }}></Text>
                {/*<CodeBox>
                    <Code>{state.details}</Code>
                </CodeBox>*/}
                <ProfileCard authorId={state.authorId} author={state.author} memberId={memberId} />
                {coauthorIds ? 
                (coauthorIds.map((data) => (
                    <ProfileCard authorId={data} author={''} memberId={memberId} />
                )))
                : <></>}
                <CommentTitle>{totalComments}개의 댓글</CommentTitle>
                <CommentInput postId={state.postId} memberId={memberId} />
                {commentsData.map((data) => (
                    <Comments comment={data} postId={state.postId} memberId={memberId} />
                ))}
            </CenterBox>
            <OtherCards postId={post?.postId} />
        </Container>
    );

}

export default DiaryDetails;