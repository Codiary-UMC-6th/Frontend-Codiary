import React, { useState, useEffect } from "react";
import * as Color from '../../common/Color';
import styled from "styled-components";

import { get, post } from "../../common/api";

const Button = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;

const Follow = styled.div`
    color: ${Color.text1};
    width: 47px;
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
    width: 47px;
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

const FollowBtn = ({ authorId }) => {
    const [isFollowed, setisFollowed] = useState(false);

    const handleFollow = async () => {
        try {
            const result = await post(`/members/follow/${authorId}`);
            //console.log("팔로우 결과:", result);
            setisFollowed(pre => ! pre);
        } catch (error) {
            console.error("팔로우 실패:", error);
        }
    }

    const getIsFollowed = async() => {
        try {
            const result = await get(`/members/follow/${authorId}`);
            //console.log("팔로우 조회 결과: ", result);
            if (result.result == true) {
                setisFollowed(true);
            }
        } catch (error) {
            console.error("팔로우 조회 실패:", error);
        }
    }

    useEffect(() => {
        getIsFollowed();
    }, [])

    return(
        <Button onClick={handleFollow}>
            {(isFollowed == false) ?
                <Follow>팔로우</Follow> :
                <Following>팔로잉</Following>
            }
        </Button>
    );
}

export default FollowBtn;