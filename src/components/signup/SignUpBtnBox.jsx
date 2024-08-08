import React from 'react'
import styled from 'styled-components'
import * as Color from '../../common/Color';

export const SignUpBtnBox = ({ onSubmit, isDisabled }) => {
  return (
    <St.SignUpBtnBoxWrapper>
      <St.SignUpButton title='회원가입' onClick={onSubmit} disabled={isDisabled}>회원가입</St.SignUpButton>
      <St.BackButton title='뒤로가기'>뒤로가기</St.BackButton>
    </St.SignUpBtnBoxWrapper>
  )
}

const St = {

  SignUpBtnBoxWrapper: styled.div`
    display: flex;
    margin-top: 88px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,

  SignUpButton: styled.button`
    width: 230px;
    height: 56px;
    border: none;
    cursor: pointer;
    background-color: ${Color.primary_blue};
    color: ${Color.text1};
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    text-align: center;
    margin-bottom: 24px;
  `,

  BackButton: styled.button`
    height: 22px;
    text-decoration: underline;
    cursor: pointer;
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    background-color: ${Color.background};
    color: ${Color.gray300};
    border: none;
  `
}