import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as Color from '../../../common/Color';
import ReplyInput from './ReplyInput';
import { formatDate } from './formatDate';
import { ReactComponent as Kebab } from "../../../assets/symbols_kebab.svg";
import { ReactComponent as Reply } from "../../../assets/symbols_reply.svg";

const Container = styled.div`
    margin-bottom: 40px;
`;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UserImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background-color: rgb(200, 200, 200);
    margin-right: 12px;
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


const Comments = ({ comment, postId, memberId }) => {

    return (
        <Container>
            <Box>
                <Box>
                    <UserImg />
                    <Author>{comment.nickname}</Author>
                </Box>
                <Box>
                    <Date>{formatDate(comment.createdAt)}</Date>
                    <Kebab />
                </Box>
            </Box>
            
            <CommentContent>{comment.commentBody}</CommentContent>

            {comment.childCommentList && comment.childCommentList.length > 0 && (
                <ReplyList>
                    {comment.childCommentList.map((reply) => (
                        <ReplyItem key={reply.commentId}>
                            <Box>
                                <Box>
                                    <Reply />
                                    <UserImg style={{marginLeft: "12px"}}/>
                                    <Author>{reply.nickname}</Author>
                                </Box>
                                <Box>
                                    <Date>{formatDate(reply.createdAt)}</Date>
                                    <Kebab />
                                </Box>
                            </Box>
                            <CommentContent style={{marginLeft: "36px"}}>{reply.commentBody}</CommentContent>

                        </ReplyItem>
                    ))}
                </ReplyList>
            )}

            <ReplyInput postId={postId} memberId={memberId} parentId={comment.commentId} />
        </Container>
    );
  
}

export default Comments;
