import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Color from '../../common/Color';
import styled from "styled-components";
import FollowBtn from "./FollowBtn";
import { BigProfileImg } from "./ProfileImg";

import { getAuthorInfo } from "@/shared/api/diaryDetail/index"

interface Profileprops{
    authorId: number;
    author: string;
}

const ProfileCard = ({ authorId, author }: Profileprops) => {
    console.log('authorId', authorId);

    const memberId = 0;
    const navigate = useNavigate();
    const [introduction, setIntroduction] = useState<String>('');
    const [name, setName] = useState<String>('');

    const loadAuthorInfo = async () => {
        const response = await getAuthorInfo(authorId);
        console.log(response);
        setName(response.user_name);
        setIntroduction(response.introduction);
    }

    useEffect(() => {
        loadAuthorInfo();
    });

    return (
        <Container onClick={() => navigate(`/profile/${authorId}`)}>
            <UserBox>
                <BigProfileImg memberId={authorId} />
                <TextBox>
                    <UserName>{name ? name : ''}</UserName>
                    <Text>{introduction ? introduction : '소개가 없습니다.'}</Text>
                </TextBox>
            </UserBox>
            {authorId === memberId ?
            <></> : 
            <FollowBtn authorId={authorId} /> }
        </Container>
    );
}

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

export default ProfileCard;