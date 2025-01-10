import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as Color from '../../common/Color';
import Card from "../main/Card";
import { get } from '../../common/api';

interface OtherCardsProps {
    postId: number | undefined;
}

interface DiaryDataType {
    postId: number;
    postTitle: string;
    nickname: string;
    postBody: string;
    createdAt: string;
    memberId: number;
    thumbnailImageUrl?: string;
    postFileList: {
      postFileList: any[];
    };
  }

const OtherCards = ({ postId }: OtherCardsProps) => {

    const [laterDiaryData, setLaterDiaryData] = useState<DiaryDataType | null>(null);
    const [olderDiaryData, setOlderDiaryData] = useState<DiaryDataType | null>(null);

    const getadjacent = async () => {
        try {
            const result = await get(`/posts/${postId}/adjacent`);
            console.log("인접 다이어리 조회 성공: ", result);
            if (result.result.hasLater === true) {
                setLaterDiaryData(result.result.laterPost);
            } 
            if (result.result.hadOlder === true) {
                setOlderDiaryData(result.result.olderPost);
            }
        } catch (error) {
            console.error("인접 다이어리 조회 실패: ", error);
        }
    }

    useEffect(() => {
        getadjacent();
    }, []);

    /*
    return(
        <Container>
            <Box>
                <Text>이전글</Text>
                {olderDiaryData !== null ? 
                    <Card
                        post={olderDiaryData}
                    /> :
                    <NoDiary>다이어리가 없습니다.</NoDiary>
                }
            </Box>
            <Box>
                <Text>다음글</Text>
                {   
                    laterDiaryData !== null 
                    ? 
                    <Card post={laterDiaryData}/>
                    :
                    <NoDiary>다이어리가 없습니다.</NoDiary>
                }
            </Box>
        </Container>
    );
    */
    
    return (
        <Temp> 수리중... </Temp>
    )
}
const Temp = styled.div`
    background-color: green;
`

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
    height: 468px;
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