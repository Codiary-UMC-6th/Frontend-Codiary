import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { post } from '../../../common/api';
import * as Color from '../../../common/Color';

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

const CommentInput = ({ postId, memberId }) => {
    const [inputValue, setInputValue] = useState('');
    const [commentBody, setCommentBody] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleClick = () => {
        setCommentBody(inputValue);
    }

    useEffect(() => {
        if (commentBody.trim() !== '') {
            console.log(commentBody);
            postComment();
            setInputValue('');
        }
    }, [commentBody])

    const postComment = async () => {
        const endpoint = `/posts/add/comment/${memberId}/${postId}`;
        const data = {
            commentBody: commentBody
        };

        try {
            const result = await post(endpoint, data);
            console.log("댓글 추가 결과:", result);
        } catch (error) {
            console.error("댓글 작성 실패: ", error);
        }
    }

    return (
        <div style={{marginBottom: "72px"}}>
            <Input 
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder='댓글을 작성하세요.' 
            />
            <Box style={{justifyContent: "flex-end"}}>
                <RegistrationBtn onClick={handleClick}>등록</RegistrationBtn>
            </Box>
        </div>
    );
    
}

export default CommentInput;