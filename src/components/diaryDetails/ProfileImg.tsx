import React, { useState, useEffect } from "react";
import * as Color from '../../common/Color';
import styled from "styled-components";

import { get } from "../../common/api";


const SmallImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 40px;
    background-color: rgb(200, 200, 200);
    margin-right: 16px;
`;

const BigImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: rgb(200, 200, 200);
    margin-right: 16px;
`;

interface ProfileImgProps {
    memberId: number | undefined;
}

export const BigProfileImg = ({ memberId }: ProfileImgProps) => {
    const [url, setUrl] = useState('');

    const getUserImg = async () => {
        try {
            const result = await get(`/members/${memberId}/profile-image`);
            console.log("유저 프로필 사진 조회 결과: ", result);

            if (result.result.url == '') {
                setUrl('https://codiary.s3.ap-northeast-2.amazonaws.com/files/61fa6597-b41f-4943-a589-8fa8a44e0148');
            } else {
                setUrl(result.result.url);
            }
        } catch (error) {
            console.error("유저 프로필 사진 조회 실패: ", error);
        }
    }

    useEffect(() => {
        getUserImg();
    }, []);

    return (
        <BigImg src={url} />
    )

}

export const SmallProfileImg = ({ memberId }: ProfileImgProps) => {
    const [url, setUrl] = useState('');

    const getUserImg = async () => {
        try {
            const result = await get(`/members/${memberId}/profile-image`);
            //console.log("유저 프로필 사진 조회 결과: ", result);

            if (result.result.url == '') {
                setUrl('https://codiary.s3.ap-northeast-2.amazonaws.com/files/61fa6597-b41f-4943-a589-8fa8a44e0148');
            } else {
                setUrl(result.result.url);
            }
        } catch (error) {
            console.error("유저 프로필 사진 조회 실패: ", error);
        }
    }

    useEffect(() => {
        getUserImg();
    }, []);

    return (
        <SmallImg src={url} />
    )

}