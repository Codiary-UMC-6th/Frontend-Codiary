import React from "react";
import styled from "styled-components";

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

const CommentInput = () => {

    return (
        <div style={{marginBottom: "72px"}}>
            <Input placeholder='댓글을 작성하세요.' />
            <Box style={{justifyContent: "flex-end"}}>
                <RegistrationBtn>등록</RegistrationBtn>
            </Box>
        </div>
    );
    
}

export default CommentInput;