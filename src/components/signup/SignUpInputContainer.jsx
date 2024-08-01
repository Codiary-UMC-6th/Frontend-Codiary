import React from 'react'
import styled from 'styled-components';
import Input from '../login/Input';
import { SignUpInputTitle } from './SignUpInputTitle';
import { CheckDuplicateBtn } from './CheckDuplicateBtn';

export const SignUpInputContainer = ({ title, essential, type, placeholder, isButtonHidden }) => {
  console.log(isButtonHidden);
  return (
    <St.SignUpInputContainerWrapper>
      <SignUpInputTitle title={title} essential={essential}></SignUpInputTitle>
      <St.SignUpInputWrapper>
        <Input
          type={type}
          placeholder={placeholder}
        />
      </St.SignUpInputWrapper>
      {!isButtonHidden && <CheckDuplicateBtn />}
    </St.SignUpInputContainerWrapper>
  )
}

const St = {
  SignUpInputContainerWrapper: styled.div`
    display: flex;
    justentify-content: center;
    width: 780px;
    align-items: center;
    height: 56px;
    margin-bottom: 48px;
  `,

  SignUpInputWrapper: styled.div`
    display: absolute;
    justentify-content: center;
    width: 400px;
    margin: 0 auto;
  `
}