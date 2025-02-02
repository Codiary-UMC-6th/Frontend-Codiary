import React from 'react'
import styled from 'styled-components';
import * as Color from '../../common/Color';
import { useState, useEffect } from 'react';

import SignUpTitle from '../signup/component/SignUpTitle';
import { SignUpInputContainer } from '../signup/component/SignUpInputContainer';
import { SocialInputContainer } from '../signup/component/SocialInputContainer';
import { SignUpBtnBox } from '../signup/component/SignUpBtnBox';

import { get, put } from "../../common/api";
import { useLoginStore } from "../../store/LoginStore";
import { IntroduceInputContainer } from '../signup/component/IntroduceInputContainer';
import { useNavigate } from 'react-router-dom';

export const ModifyProfile = () => {

  const memberId = useLoginStore((state) => state.memberId);
  const navigate = useNavigate();

  const [profileFormData, setProfileFormData] = useState({
    "email": '',
    "password": '************',
    "nickname": '',
    "birth": '',
    "github": '',
    "linkedin": '',
    "discord": '',
    "introduction": '',
  });

  // 유저 정보 get api
  // const getUserInfo = async () => {
  //   try {
  //     const response = await get(`/members/info`);  // 회원 정보를 가져오는 API
  //     const userData = response.result;
  //     console.log(response.result);
  //     setProfileFormData({
  //       email: userData.email,
  //       password: userData.password,
  //       nickname: userData.nickname,
  //       birth: userData.birth === '1000-01-01' ? '' : userData.birth.replaceAll('-', ''),
  //       github: userData.githubUrl || '',
  //       linkedin: userData.linkedinUrl || '',
  //       discord: userData.discordUrl || '',
  //       introduction: userData.introduction || '',
  //     });

  //     if (userData.birth === '1000-01-01') {
  //       setProfileFormData({ birth: '' });
  //     }
  //     console.log(profileFormData);
  //   } catch (error) {
  //     console.error('회원 정보 가져오기 실패', error);
  //   }
  // }

  const [changeFormData, setChangeFormData] = useState({
    "birth": profileFormData.birth,
    "introduction": profileFormData.introduction,
    "github": profileFormData.github,
    "linkedin": profileFormData.linkedin,
    "discord": profileFormData.discord,
  });

  // useEffect(() => {
  //   console.log(memberId);
  //   if (memberId) {
  //     getUserInfo();
  //   }
  // }, [memberId]);

  const [errors, setErrors] = useState({
    nickname: '',
    birth: ''
  });

  const [isNicknameChecked, setIsNicknameChecked] = useState(true);

  const handleChange = (name: string, value: string, error: string | undefined) => {
    if (name === 'birth') {
      setProfileFormData({
        ...profileFormData,
        birth: value,
      });
    } else {
      setProfileFormData({
        ...profileFormData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: error,
    });

    // 닉네임 변경되었을 시 초기화
    if (name === 'nickname') {
      setIsNicknameChecked(false);
    }

    setChangeFormData({
      ...profileFormData,
      [name]: value,
    });
  };

  // 생년월일 포맷
  const birthFormatDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}-${month}-${day}`;
  }

  const putUserInfo = async () => {
    try {
      if (Object.values(errors).some(error => error)) {
        console.error('폼 형식이 알맞지 않습니다.');
        return;
      } else if (!isNicknameChecked) {
        alert('닉네임 중복 확인이 필요합니다.');
        return;
      }

      const formattedData = {
        ...changeFormData,
        birth: birthFormatDate(changeFormData.birth),
      };

      const response = await put('/members/info', formattedData);
      alert(response.message);
      console.log('프로필 수정 성공', response);
      console.log(changeFormData);
      navigate(-1);
    } catch (error) {
      console.error('프로필 수정 실패', error);
      console.log(changeFormData);
    }
  };

  return (
    <St.SignUpWrapper>
      <SignUpTitle>내 정보</SignUpTitle>
      <St.SignUpContainerWrapper>
        <SignUpInputContainer
          props={{
            title: "이메일",
            essential: true,
            placeholder: "이메일을 입력해주세요.",
            value: profileFormData.email,
            onChange: () => { },
            isButtonHidden: false,
            disable: true,
            type: "text",
          }}
        />
        <SignUpInputContainer
          props={{
            title: "비밀번호",
            essential: true,
            placeholder: "비밀번호를 입력해주세요.",
            value: profileFormData.password,
            onChange: () => { },
            isButtonHidden: true,
            disable: true,
            type: "password",
          }}
        />
        <SignUpInputContainer
          props={{
            title: "닉네임",
            essential: true,
            placeholder: "사용자 닉네임을 입력해주세요.",
            value: profileFormData.nickname,
            onChange: () => { },
            isButtonHidden: false,
            disable: true,
            type: "text",
          }}
        />
        <SignUpInputContainer
          props={{
            title: "생년월일",
            essential: false,
            placeholder: "YYYYDDMM",
            value: profileFormData.birth,
            onChange: (value, error) => handleChange('birth', value, error),
            isButtonHidden: true,
            type: "text",
          }}
        />
      </St.SignUpContainerWrapper>
      <IntroduceInputContainer
        props={{
          value: profileFormData.introduction,
          handleChange: handleChange
        }}
      />
      <SocialInputContainer
        props={{
          handleChange: handleChange,
          github: profileFormData.github,
          linkedIn: profileFormData.linkedin,
          discord: profileFormData.discord
        }}
      />
      <SignUpBtnBox
        props={{
          onSubmit: putUserInfo,
          title: "저장하기",
          isDisabled: false
        }}
      />
    </St.SignUpWrapper>
  )
}

const St = {

  SignUpWrapper: styled.div`
    width: 100%;
    height: 100%;
    position: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Color.background};
    padding-bottom: 126px;
  `,

  SignUpContainerWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-top: 48px;
    flex-direction: column;
  `,
}

