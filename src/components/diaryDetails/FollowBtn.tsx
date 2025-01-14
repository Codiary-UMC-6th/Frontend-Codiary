import React, { useState, useEffect } from "react";
import * as Color from '../../common/Color';
import styled from "styled-components";

import { getIsFollowed, toggleFollow } from "@/shared/api/diaryDetail";

interface FollowBtnProps {
    authorId: number;
}

const FollowBtn = ({ authorId }: FollowBtnProps) => {
    const [isSelf, setIsSelf] = useState<boolean>(false);
    const [isFollowed, setisFollowed] = useState<boolean>(false);
    const loadFollow = async () => {
        try {
            const response = await getIsFollowed(authorId);
            setisFollowed(response);
            setIsSelf(false);
        } catch (error) {
            console.log(error);
            setIsSelf(true);
        }
    }

    useEffect(() => {
        loadFollow();
    })

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const response = await toggleFollow(authorId);
        setisFollowed(response.follow_status);
    }

    return(
        isSelf
        ?
        <></>
        :
        <Button onClick={handleClick}>
        { (isFollowed === false) ? <Follow>팔로우</Follow> : <Following>팔로잉</Following> }
        </Button>
    );
}

const Button = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;

const Follow = styled.div`
    color: ${Color.text1};
    width: 55px;
    height: 26px;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;

    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 18px;
    border: 0px;
    background: #2D7295;
    cursor: pointer;

    &:hover {
        background: #225373;
    }
`;

const Following = styled.div`
    color: ${Color.primary_blue};
    width: 55px;
    height: 26px;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;

    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 18px;
    border:  1px solid ${Color.primary_blue};
    background: transparent;
    cursor: pointer;

    &:hover {
        color: #225373;
        border: 1px solid #225373;
    }
`;

export default FollowBtn;