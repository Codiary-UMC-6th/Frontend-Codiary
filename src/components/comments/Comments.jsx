import React, { useState } from 'react';
import styled from 'styled-components';

import * as Color from '../../common/Color';
import { ReactComponent as Kebab } from "../../assets/symbols_kebab.svg";
import { ReactComponent as Reply } from "../../assets/symbols_reply.svg";

const Container = styled.div`
    margin-bottom: 40px;
`;

const Input = styled.input`
    display: flex;
    width: 746px;
    height: 46px;
    padding: 16px;
    align-items: flex-start;
    margin: 16px 0px;

    border: 1px solid ${Color.background2};
    background: ${Color.background3};

    color: ${Color.text2};
    text-align: justify;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
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

const ReplyContainer = styled.div`
    border-bottom: 1px solid ${Color.divider};
`;

const ReplyBtn = styled.button`
    border: 0;
    width: 780px;
    background-color: transparent;
    cursor: pointer;

    padding: 16px 0px;
    display: flex;
    align-items: center;
`;

const ReplyText = styled.span`
    color: ${Color.text5};
    text-align: justify;
    margin-left: 8px;

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

const CancelBtn = styled.button`
    border-radius: 10px;
    border: 1px solid ${Color.primary_red};
    background: transparent;
    width: 83px;
    height: 40px;
    cursor: pointer;
    margin-right: 8px;

    color: ${Color.primary_red};
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

const RegistrationBtn = styled.button`
    border-radius: 10px;
    background: ${Color.primary_red};
    width: 83px;
    height: 40px;
    cursor: pointer;
    border: none;

    color: ${Color.text1};
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

const ToggleReply = () => {
    const [showReplyInput, setShowReplyInput] = useState(false);

    const toggleReplyInput = () => {
        setShowReplyInput(preShowReplyInput => !preShowReplyInput);
    }

    return (
        <ReplyContainer>
            <ReplyBtn onClick={toggleReplyInput}>
                <Reply />
                <ReplyText>답글 달기</ReplyText>
            </ReplyBtn>
            {showReplyInput && (
                <div style={{margin: "16px 0px"}}>
                    <Input placeholder='답글을 작성하세요.'/>
                    <Box style={{justifyContent: "flex-end"}}>
                        <CancelBtn onClick={toggleReplyInput}>취소</CancelBtn>
                        <RegistrationBtn>등록</RegistrationBtn>
                    </Box>
                </div>
            )}
        </ReplyContainer>
    );

}

const Comments = ({ comment }) => {

    return (
        <Container>
            <Box>
                <Box>
                    <UserImg />
                    <Author>{comment.author}</Author>
                </Box>
                <Box>
                    <Date>{comment.createdAt}</Date>
                    <Kebab />
                </Box>
            </Box>
            
            <CommentContent>{comment.content}</CommentContent>
            {comment.replies && comment.replies.length > 0 && (
                <ReplyList>
                    {comment.replies.map((reply) => (
                        <ReplyItem key={reply.id}>
                            <Box>
                                <Box>
                                    <Reply />
                                    <UserImg style={{marginLeft: "12px"}}/>
                                    <Author>{reply.author}</Author>
                                </Box>
                                <Box>
                                    <Date>{reply.createdAt}</Date>
                                    <Kebab />
                                </Box>
                            </Box>
                            <CommentContent style={{marginLeft: "36px"}}>{reply.content}</CommentContent>

                        </ReplyItem>
                    ))}
                </ReplyList>
            )}
            <ToggleReply />
        </Container>
    );
  
}

export default Comments;
