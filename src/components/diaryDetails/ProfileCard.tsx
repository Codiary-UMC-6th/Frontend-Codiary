import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Color from '../../common/Color';
import styled from "styled-components";
import FollowBtn from "./FollowBtn";
import { BigProfileImg } from "./ProfileImg";
import { get } from "../../common/api";

const Container = styled.div`
    display: flex;
    width: 740px;
    padding: 24px 20px;
    gap: 10px;
    margin: 20px 0px;
    align-items: center;
    justify-content: space-between;

    border-radius: 15px;
    border: 1px solid var(--Gray-500, #999);
    cursor: pointer;
`;

const UserBox = styled.div`
    display: flex;
`;

const TextBox = styled.div`
    width: 492px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const UserName = styled.div`
    color: ${Color.primary_yellow};
    text-align: justify;

    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
`;

const Text = styled.div`
    color: ${Color.text5};
    text-align: justify;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

interface Profileprops{
    authorId: number;
    author: string;
    memberId: number | undefined;
}

const ProfileCard = ({ authorId, author, memberId }: Profileprops) => {
    const navigate = useNavigate();
    const [introduction, setIntroduction] = useState<String>('소개가 없습니다.');
    const [nickName, setNickname] = useState<String>('');

    const getAuthorInfo = async () => {
        try {
            const result = await get(`/members/profile/${authorId}`);
            if (result.result.introduction != null) {
                setIntroduction(result.result.introduction);
                setNickname(result.result.userName);
            }
        } catch (error) {
            console.error("작성자 정보 조회 실패: ", error);
        }
    }

    useEffect(() => {
        getAuthorInfo();
    }, []);

    return (
        <Container onClick={() => navigate(`/profile/${authorId}`)}>
            <UserBox>
                <BigProfileImg memberId={authorId} />
                <TextBox>
                    <UserName>{author ? author : nickName}</UserName>
                    <Text>{introduction}</Text>
                </TextBox>
            </UserBox>
            {authorId == memberId ?
            <></> : 
            <FollowBtn authorId={authorId} /> }
        </Container>
    );
}

export default ProfileCard;