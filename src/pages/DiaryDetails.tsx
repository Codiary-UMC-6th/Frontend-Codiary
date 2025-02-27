import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import * as Color from '../common/Color';
import { formatDateTime } from "../components/diaryDetails/comments/formatDate";
import Scrap from "../assets/symbols_scrap.svg";
import CommentIcon from "../assets/symbols_comment.svg";

import KebabModal from "../components/diaryDetails/KebabModal";
import FAB from "../components/diaryDetails/FAB";
import CategoryChip from "../components/diaryDetails/CategoryChip";
import ProfileCard from "../components/diaryDetails/ProfileCard";
import CommentBox from "../components/diaryDetails/comments/CommentBox";
import CommentInput from "../components/diaryDetails/comments/CommentInput";
import CommentPage from "@/components/diaryDetails/comments/CommentPage";
import OtherCards from "../components/diaryDetails/OtherCards";

import { getPost, getComments } from "@/shared/api/diaryDetail";

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { parse } from "path";

interface Post {
    coauthorIds: number[];
    postCategory: string;
    postId: number;
    title: string;
    details: string;
    author: string;
    authorId: number;
    createdAt: string;
    isBookmarked: boolean;
    bookmarkCount: number;
}

interface Comment {
    comment_body: string;
    comment_id: number;
    commenter_id: number;
    commenter_nickname: string;
    commenter_profile_image_url: string;
    created_at: string;
    number_of_reply: number;
    post_id: number;
    updated_at: string;
}

interface BlockType {
    type: string;
    editorState: EditorState;
}

const styleMap = {
    'COLOR_#FFFFFF': {
        color: '#FFFFFF',
    },
    'COLOR_#2D7295': {
        color: '#2D7295',
    },
    'COLOR_#AE5257': {
        color: '#AE5257',
    },
    'COLOR_#E19E58': {
        color: '#E19E58',
    },
    'COLOR_#83A67B': {
        color: '#83A67B',
    },
    'COLOR_#EAB3CE': {
        color: '#EAB3CE',
    },
};

const DiaryDetails = () => {
    const memberId = 0;
    const { postId } = useParams<string>();
    const [post, setPost] = useState<Post>({
        coauthorIds: [],
        postCategory: "",
        postId: 0,
        title: "",
        details: "",
        author: "",
        authorId: 0,
        createdAt: "",
        isBookmarked: false,
        bookmarkCount: 0,
    });

    const loadPost = async () => {
        const response = await getPost(Number(postId));
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
            isBookmarked: response.is_bookmarked,
            bookmarkCount: response.bookmark_count,
        });
        parseContent(response.post_body);
    }

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number>(0);
    const loadComments = async () => {
        const response = await getComments(Number(postId));
        setComments(response.content);
        console.log(response.content);
    }

    // 내용 파싱
    const [blocks, setBlocks] = useState<BlockType[]>([]);
    const parseContent = (diary_content: string) => {
        const parsed_content = JSON.parse((diary_content !== null) ? diary_content : '');
        const temp_blocks: BlockType[] = [];
        parsed_content.forEach((item: any) => {
            console.log('item', item);
            const converted = convertFromRaw(item.raw_content);
            const contentState = EditorState.createWithContent(converted);
            temp_blocks.push({
                type: item.type,
                editorState: contentState,
            });
        });
        setBlocks(temp_blocks);
        return EditorState.createEmpty();
    }

    useEffect(() => {
        loadPost();
        loadComments();
    }, []);

    return (
        <Container>
            <FAB postId={post.postId} memberId={memberId} isBookmarked={post.isBookmarked} />
            <CenterBox>
                <Title>{post.title}</Title>
                <CategoryChip postId={post.postId} />
                <DiaryInfo>
                    <NameBox>
                        <UserName>{post.author}</UserName>
                        <Details>
                            <img src={Scrap} alt='scrap icon' />
                            <ScrapCount>{post.bookmarkCount}</ScrapCount>
                            <img src={CommentIcon} alt='comment icon' />
                            <CommentCount>{comments.length}</CommentCount>
                            <KebabModal memberId={memberId} authorId={post.authorId} commentId={0} />
                        </Details>
                    </NameBox>
                    <PostInfo>최초 등록일 {formatDateTime(post.createdAt)}</PostInfo>
                </DiaryInfo>
                <Text>
                    {
                        blocks.map((block, index) => {
                            if (block.type === 'text') {
                                return (
                                    <Editor
                                        editorState={block.editorState}
                                        onChange={() => { }}
                                        onFocus={() => { }}
                                        customStyleMap={styleMap}
                                    />
                                );
                            } else {
                                return <></>
                            }
                        })
                    }
                </Text>
                <ProfileCard authorId={post.authorId} author={post.author} />
                {post.coauthorIds ?
                    (post.coauthorIds.map((data) => (
                        <ProfileCard authorId={data} author={''} />
                    )))
                    : <></>}
                <CommentTitle>{comments.length}개의 댓글</CommentTitle>
                <CommentInput postId={post.postId} loadComments={loadComments} />
                {comments.map((data) => (
                    <CommentBox key={data.comment_id} comment={data} postId={Number(postId)} memberId={memberId} />
                ))}
                <CommentPage></CommentPage>
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

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const Text = styled.div`
    color: ${Color.text1};
    text-align: justify;
    margin-bottom: 130px;

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

const CommentTitle = styled.div`
    color: ${Color.text1};

    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

export default DiaryDetails;