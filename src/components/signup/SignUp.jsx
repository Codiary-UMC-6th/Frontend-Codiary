import React from 'react'
import styled from 'styled-components';
import * as Color from '../../common/Color';
import { useState } from 'react';

import SignUpTitle from './SignUpTitle';
import { SignUpInputContainer } from './SignUpInputContainer';
import { SocialInputContainer } from './SocialInputContainer'
import { SignUpBtnBox } from './SignUpBtnBox';

import { get, post, put, del } from "../../common/api";

export const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    "email": '',
    "password": '',
    "nickname": '',
    "birth": '2001-02-03',
    "gender": 'Male',
    "github": '',
    "linkedin": ''
  });

  const handleChange = (name, value) => {
    if (name === 'birth') {
      value = birthFormatDate(value);
    }

    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await post('/members/sign-up', signUpFormData);
      console.log('회원가입 성공', response);
      // 뷰 이동?
    } catch (error) {
      console.error('회원가입 실패', error);
      console.log(signUpFormData);
    }
  }

  const birthFormatDate = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}-${month}-${day}`;
  }

  return (
    <St.SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
      <St.SignUpContainerWrapper>
        <SignUpInputContainer
          title='이메일'
          essential={Boolean(true)}
          type='text'
          placeholder='예: codiary@codiary.com'
          isButtonHidden={Boolean(false)}
          onChange={(value) => handleChange('email', value)}
        />
        <SignUpInputContainer
          title='비밀번호'
          essential={Boolean(true)}
          type='password'
          placeholder='8자 이상의 영문, 숫자 조합'
          isButtonHidden={Boolean(true)}
          onChange={(value) => handleChange('password', value)}
        />
        <SignUpInputContainer
          title='닉네임'
          essential={Boolean(true)}
          type='text'
          placeholder='사용자 닉네임을 입력해주세요.'
          isButtonHidden={Boolean(false)}
          onChange={(value) => handleChange('nickname', value)}
        />
        <SignUpInputContainer
          title='생년월일'
          essential={Boolean(false)}
          type='text'
          placeholder='YYYYDDMM'
          isButtonHidden={Boolean(true)}
          onChange={(value) => handleChange('birth', value)}
        />
      </St.SignUpContainerWrapper>
      <SocialInputContainer />
      <SignUpBtnBox onSubmit={handleSubmit} />
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

