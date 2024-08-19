import React, { useState } from "react";
import * as Color from '../../common/Color';
import styled from "styled-components";

import { post } from "../../common/api";

const Button = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;

const Follow = styled.div`
    color: ${Color.text1};
    width: 79px;
    height: 34px;
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
    width: 79px;
    height: 34px;
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

const FollowBtn = ({ memberId }) => {
    const [isFollowed, setisFollowed] = useState(false);

    async function handleFollow() {
        const endpoint = `/members/follow/${memberId}`;

        try {
            const result = await post(endpoint);
            console.log("팔로우 결과:", result);
            setisFollowed(true);
        } catch (error) {
            console.error("팔로우 실패:", error);
        }
    }

    return(
        <Button onClick={handleFollow}>
            {(isFollowed==true) ?
                <Follow>팔로우</Follow> :
                <Following>팔로잉</Following>
            }
        </Button>
    );
}

export default FollowBtn;