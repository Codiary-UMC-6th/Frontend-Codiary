import { useState } from "react";
import styled from "styled-components";

import * as Color from '../../../common/Color';

import { postComment } from '@/shared/api/diaryDetail'

interface CommentInputProps {
    postId: number;
    loadComments: any;
}

const CommentInput = ({ postId, loadComments }: CommentInputProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('submitted comment', inputValue);
        const response = await postComment(postId, { comment_body: inputValue});
        console.log('posted comment', response);
        loadComments();
        setInputValue('');
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
            <Input 
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder='댓글을 작성하세요.' 
            />
            <Box>
                <RegistrationBtn>등록</RegistrationBtn>
            </Box>
            </form>
        </Container>
    );
}

const Container = styled.div`
    margin-bottom: 72px;
`

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
    justify-content: flex-end;
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

export default CommentInput;