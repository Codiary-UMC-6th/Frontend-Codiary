import React from 'react'
import styled from 'styled-components';
import * as Color from '../../common/Color';
import SignUpTitle from './SignUpTitle';

export const SignUp = () => {
  return (
    <St.SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
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
}

