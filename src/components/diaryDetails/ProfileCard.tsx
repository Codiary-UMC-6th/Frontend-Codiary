import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Color from '../../common/Color';
import styled from "styled-components";
import FollowBtn from "./FollowBtn";
import { getAuthorInfo } from "@/shared/api/diaryDetail/index";
import { useLoginStore } from "@/store/LoginStore";

interface Profileprops{
    authorId: number;
    author: string;
}

const ProfileCard = ({ authorId, author }: Profileprops) => {
    const [isSelf, setIsSelf] = useState<boolean>(false);
    const { memberId } = useLoginStore();

    const navigate = useNavigate();
    const [introduction, setIntroduction] = useState<String>('');
    const [name, setName] = useState<String>('');

    const loadAuthorInfo = async () => {
        if (authorId !== 0) {
            const response = await getAuthorInfo(authorId);
            console.log(response);
            if(response.current_member_id === response.user_id){ setIsSelf(true) };
            setName(response.user_name);
            setIntroduction(response.introduction);
        }
    }

    useEffect(() => {
        loadAuthorInfo();
    });

    console.log('authorId', authorId);
    console.log('memberId', memberId);

    return (
        <Container onClick={() => navigate(`/profile/${authorId}`)}>
            <UserBox>
                <BigImg src={'url'}/>
                <TextBox>
                    <UserName>{name ? name : ''}</UserName>
                    <Text>{introduction ? introduction : '소개가 없습니다.'}</Text>
                </TextBox>
            </UserBox>
            {(!isSelf) && <FollowBtn authorId={authorId} />}
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

const BigImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: rgb(200, 200, 200);
    margin-right: 16px;
`;

export default ProfileCard;