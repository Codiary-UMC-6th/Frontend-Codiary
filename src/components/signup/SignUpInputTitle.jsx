import React from 'react'
import styled from 'styled-components'
import * as Color from '../../common/Color';

export const SignUpInputTitle = ({ title, essential }) => {
  return (
    <St.SignUpInputTitleWrapper>
      <St.StyledSignUpInputTitle>{title}</St.StyledSignUpInputTitle>
      {essential && <St.EssentialPoint />}
    </St.SignUpInputTitleWrapper>
  )
}

const St = {

  SignUpInputTitleWrapper: styled.div`
    display: flex;
  `,

  StyledSignUpInputTitle: styled.h1`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    color: ${Color.text1};
    margin-left: 0px;
  `,

  EssentialPoint: styled.div`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin-left: 2px;
    margin-top: 6px;
    background-color: ${Color.primary_red};
  `,
}