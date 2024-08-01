import React from 'react'
import styled from 'styled-components';
import * as Color from '../../common/Color';
import SignUpTitle from './SignUpTitle';
import { SignUpInputContainer } from './SignUpInputContainer';

export const SignUp = () => {
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
        />
        <SignUpInputContainer
          title='비밀번호'
          essential={Boolean(true)}
          type='password'
          placeholder='8자 이상의 영문, 숫자 조합'
          isButtonHidden={Boolean(true)}
        />
        <SignUpInputContainer
          title='닉네임'
          essential={Boolean(true)}
          type='text'
          placeholder='사용자 닉네임을 입력해주세요.'
          isButtonHidden={Boolean(false)}
        />
        <SignUpInputContainer
          title='생년월일'
          essential={Boolean(false)}
          type='text'
          placeholder='YYYYDDMM'
          isButtonHidden={Boolean(true)}
        />
      </St.SignUpContainerWrapper>
    </St.SignUpWrapper>
  )
}

const St = {

  SignUpWrapper: styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Color.backgroundBlur};
  `,

  SignUpContainerWrapper: styled.div`
    display: flex;
    align-items: center;
    justentify-content: center;
    margin-top: 48px;
    flex-direction: column;
  `,
}

