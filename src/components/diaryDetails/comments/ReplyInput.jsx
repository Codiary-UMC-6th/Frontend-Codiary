import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Color from '../../../common/Color';
import { ReactComponent as Reply } from "../../../assets/symbols_reply.svg";
import { post } from '../../../common/api';

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

    &:hover {
        color: ${Color.text4};
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


const ReplyInput = ({ postId, memberId, parentId }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [commentReplyBody, setCommentReplyBody] = useState('');

    const toggleReplyInput = () => {
        setShowReplyInput(preShowReplyInput => !preShowReplyInput);
        setInputValue('');
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleClick = () => {
        setCommentReplyBody(inputValue);
        window.location.reload();
    }

    useEffect(() => {
        if (commentReplyBody.trim() !== '') {
            console.log(commentReplyBody);
            postCommentReply();
            setInputValue('');
        }
    }, [commentReplyBody])

    const postCommentReply = async () => {
        const endpoint = `/posts/add/comment/reply/${memberId}/${postId}/${parentId}`;
        const data = {
            commentReplyBody: commentReplyBody
        };

        try {
            const result = await post(endpoint, data);
            console.log("댓글 추가 결과:", result);
        } catch (error) {
            console.error("댓글 작성 실패: ", error);
        }
    }


    return (
        <ReplyContainer>
            <ReplyBtn onClick={toggleReplyInput}>
                <Reply />
                <ReplyText>답글 달기</ReplyText>
            </ReplyBtn>
            {showReplyInput && (
                <div style={{margin: "16px 0px"}}>
                    <Input 
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder='답글을 작성하세요.'
                    />
                    <Box style={{justifyContent: "flex-end"}}>
                        <CancelBtn onClick={toggleReplyInput}>취소</CancelBtn>
                        <RegistrationBtn onClick={handleClick}>등록</RegistrationBtn>
                    </Box>
                </div>
            )}
        </ReplyContainer>
    );

}

export default ReplyInput;