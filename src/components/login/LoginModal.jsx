import React from 'react'
import styled from "styled-components";
import * as Color from '../../common/Color';

export const LoginModal = () => {


  return (
    <St.LoginModalWrapper>
      <St.LoginModalWrapper>
        <St.HeaderTitle>CODIARY</St.HeaderTitle>
        <St.Input
          type="text"
          placeholder='input name - "userID"'
        />
        <St.Input
          type="text"
          placeholder='input name = "Password"'
        />
      </St.LoginModalWrapper>
    </St.LoginModalWrapper>
  )
}

const St = {

  LoginModalBackground: styled.div`
    width: 100%;
    height: 100%;
    background-color: ${Color.primary_blue};
    backdrop-filter: 50%;
  `,

  LoginModalWrapper: styled.div`;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Color.backgroundBlur};
    width: 600px;
    height: 600px;
  `,

  HeaderTitle: styled.h1`
    display: block;
    padding-top: 88px 0 0 38px;
    color: ${Color.text1};
    font-family: Pretendard;
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
  `,

  Input: styled.input`
    background-color: ${Color.gray700};
    color: ${Color.gray300};
    font-family: 'D2Coding', monospace;
    margin-bottom: 24px;
    width: 400px;
    height: 56px;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-wight: 400px;
    line-height: 22px;
    outline: none;
    padding-left: 17px;

    &::placeholder {
      color: ${Color.gray300};
    }
  `
}