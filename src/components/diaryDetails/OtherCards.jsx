import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as Color from '../../common/Color';
import Card from "../main/Card";
import { get } from '../../common/api';

const Container = styled.div`
    display: flex;
    margin-top: 150px;
    padding-top: 72px;
    padding-bottom: 54px;
    gap: 60px;
    width: 100%;
    justify-content: center;

    border-top: 4px solid ${Color.divider};
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.div`
    color: ${Color.text4};
    text-align: justify;
    margin-bottom: 36px;

    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
`;

const OtherCards = ({ postId }) => {

    const getadjacent = async () => {
        try {
            const result = await get(`/posts/${postId}/adjacent`);
            console.log("인접 다이어리 조회 성공: ", result);
        } catch (error) {
            console.error("인접 다이어리 조회 실패: ", error);
        }
    }

    useEffect(() => {
        getadjacent();
    }, []);

    return(
        <Container>
            <Box>
                <Text>이전글</Text>
                <Card />
            </Box>
            <Box>
                <Text>다음글</Text>
                <Card />
            </Box>
        </Container>
    );

}

export default OtherCards;