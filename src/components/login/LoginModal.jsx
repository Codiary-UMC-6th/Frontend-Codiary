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
          placeholder='input name = "userID"'
        />
        <St.Input
          type="text"
          placeholder='input name = "Password"'
        />
        <St.LoginSettingBox>
          <St.Checkbox />
          <St.StayLoginLabel>
            로그인 유지하기
          </St.StayLoginLabel>
          회원이 아니신가요?
          <St.LinkText href="/signup">회원가입</St.LinkText>
        </St.LoginSettingBox>
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
  `,

  LoginSettingBox: styled.div`
    display: flex;
    margin-top: 12px;
    padding-left: 90px;
    padding-right: 100px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    align-items: center;
    color: ${Color.gray500};
  `,

  StayLoginLabel: styled.div`
    margin-right: 76px;
    cursor: pointer;
    font-family: Pretendard;
  `,

  Checkbox: styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    border: 1px solid ${Color.gray500};
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 16px;

  &:checked {
    background-color: ${Color.primary_blue};
    border-color: ${Color.primary_blue};
  }
`,

  LinkText: styled.a`
    margin-left: 4px;
    color: ${Color.gray500};
    font-size: 16px;
    font-family: 'Pretendard', sans-serif;
    text-decoration: none;
    cursor: pointer;
    text-decoration: underline;
  `,

}