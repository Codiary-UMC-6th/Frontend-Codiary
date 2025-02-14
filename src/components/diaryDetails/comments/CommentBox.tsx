import React from 'react';
import styled from 'styled-components';

import * as Color from '../../../common/Color';
import ReplyInput from './ReplyInput';
import KebabModal from '../KebabModal';
import { formatDate } from './formatDate';
import Reply from "../../../assets/symbols_reply.svg";

interface CommentsProps {
    comment: Comment;
    postId: number;
    memberId: number;
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

const CommentBox = ({ comment, postId, memberId }: CommentsProps) => {
    return (
        <Container>
            <Box>
                <Box>
                    <SmallImg src={comment.commenter_profile_image_url} />
                    <Author>{comment.commenter_nickname}</Author>
                </Box>
                <Box>
                    <Date>{formatDate(comment.created_at)}</Date>
                    <KebabModal memberId={memberId} authorId={comment.commenter_id} commentId={comment.comment_id} />
                </Box>
            </Box>
            <CommentContent>{comment.comment_body}</CommentContent>
            {
            /*comment.childCommentList && comment.childCommentList.length > 0 && (
                <ReplyList>
                    {comment.childCommentList.map((reply) => (
                        <ReplyItem key={reply.commentId}>
                            <Box>
                                <Box>
                                    <Reply style={{marginRight: "12px"}} />
                                    <SmallProfileImg memberId={comment.memberId} />
                                    <Author>{reply.nickname}</Author>
                                </Box>
                                <Box>
                                    <Date>{formatDate(reply.createdAt)}</Date>
                                    <KebabModal memberId={memberId} authorId={reply.memberId} commentId={reply.commentId} />
                                </Box>
                            </Box>
                            <CommentContent style={{marginLeft: "36px"}}>{reply.commentBody}</CommentContent>

                        </ReplyItem>
                    ))}
                </ReplyList>
            )*/
            }
            {
                //<ReplyInput postId={postId} memberId={memberId} parentId={comment.comment_id} />
            }
        </Container>
    );
}

const Container = styled.div`
    margin-bottom: 40px;
    border-bottom: 1px solid ${Color.gray300}
`;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Author = styled.div`
    color: ${Color.text1};
    text-align: justify;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

const Date = styled.div`
    color: #D9D9D9;
    text-align: justify;
    margin-right: 16px;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

const CommentContent = styled.div`
    color: ${Color.text1};
    text-align: justify;
    padding: 32px 0px;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

const ReplyList = styled.div`
    padding-left: 48px;
`;

const ReplyItem = styled.div`
    padding: 16px 0px;
`;

const SmallImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 40px;
    background-color: rgb(200, 200, 200);
    margin-right: 16px;
`;

export default CommentBox;
