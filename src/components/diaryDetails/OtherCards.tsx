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

interface OtherCardsProps {
    postId: number |undefined;
}

const OtherCards = ({ postId }: OtherCardsProps) => {

    const defaultData = {
        postId: 0,
        postTitle: '',
        nickname: '',
        postBody:'',
        createdAt: '',
        memberId: 0
    }

    const [laterDiaryData, setLaterDiaryData] = useState(defaultData);
    const [olderDiaryData, setOlderDiaryData] = useState(defaultData);
    

    const getadjacent = async () => {
        try {
            const result = await get(`/posts/${postId}/adjacent`);
            console.log("인접 다이어리 조회 성공: ", result);
            if (result.result.hasLater == true) {
                setLaterDiaryData(result.result.laterPost);
            } 
            if (result.result.hadOlder == true) {
                setOlderDiaryData(result.result.olderPost);
            }
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
                {olderDiaryData.postId != 0 ? 
                    <Card
                        props={{
                            postId: olderDiaryData.postId,
                            title: olderDiaryData.postTitle,
                            author: olderDiaryData.nickname,
                            details: olderDiaryData.postBody,
                            createAt: olderDiaryData.createdAt,
                            authorId: olderDiaryData.memberId
                        }}
                    /> :
                    <NoDiary>다이어리가 없습니다.</NoDiary>
                }
            </Box>
            <Box>
                <Text>다음글</Text>
                {laterDiaryData.postId != 0 ? 
                    <Card
                    props={{
                        postId: olderDiaryData.postId,
                        title: olderDiaryData.postTitle,
                        author: olderDiaryData.nickname,
                        details: olderDiaryData.postBody,
                        createAt: olderDiaryData.createdAt,
                        authorId: olderDiaryData.memberId
                    }}
                    /> :
                    <NoDiary>다이어리가 없습니다.</NoDiary>
                }
            </Box>
        </Container>
    );

}

export default OtherCards;