import React from "react";
import * as Color from '../../common/Color';
import styled from "styled-components";
import FollowBtn from "./FollowBtn";

const Container = styled.div`
    display: flex;
    width: 740px;
    padding: 24px 20px;
    gap: 10px;
    margin: 120px 0px;
    align-items: center;
    justify-content: space-between;

    border-radius: 15px;
    border: 1px solid var(--Gray-500, #999);
`;

const UserBox = styled.div`
    display: flex;
`;

const UserImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: rgb(200, 200, 200);
    margin-right: 16px;
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
`;



const ProfileCard = ({ memberId }) => {

    return (
        <Container>
            <UserBox>
                <UserImg />
                <TextBox>
                    <UserName>USER NAME</UserName>
                    <Text>text</Text>
                </TextBox>
            </UserBox>
            <FollowBtn memberId={memberId} />
        </Container>
    );
}

export default ProfileCard;