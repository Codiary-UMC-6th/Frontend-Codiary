import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as Color from '../../common/Color';
import Card from "../main/Card";

import { } from "@/shared/api/diaryDetail/index"

interface OtherCardsProps {
    postId: number;
}

const OtherCards = ({ postId }: OtherCardsProps) => {
    const [prevDiary, setPrevDiary] = useState<any>(null);
    const [nextDiary, setNextDiary] = useState<any>(null);

    const loadAdjacent = async () => {
        
    }

    useEffect(() => {
        loadAdjacent();
    }, []);

    return(
        <Container>
            <Box>
                <Text>이전글</Text>
                {
                    prevDiary !== null 
                    ? 
                    <Card post={prevDiary}/> 
                    :
                    <NoDiary>다이어리가 없습니다.</NoDiary>
                }
            </Box>
            <Box>
                <Text>다음글</Text>
                {   
                    nextDiary !== null 
                    ? 
                    <Card post={nextDiary}/>
                    :
                    <NoDiary>다이어리가 없습니다.</NoDiary>
                }
            </Box>
        </Container>
    );
}

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

const NoDiary = styled.div`
    display: flex;
    width: 360px;
    height: 40px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #434343;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 350;
    line-height: 36px;
`;


export default OtherCards;