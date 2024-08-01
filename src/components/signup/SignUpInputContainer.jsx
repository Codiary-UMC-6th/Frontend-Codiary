import React from 'react';
import styled from 'styled-components';
import Input from '../login/Input';
import { SignUpInputTitle } from './SignUpInputTitle';
import { CheckDuplicateBtn } from './CheckDuplicateBtn';

export const SignUpInputContainer = ({ title, essential, type, placeholder, isButtonHidden }) => {
  console.log(isButtonHidden);

  return (
    <St.SignUpInputContainerWrapper>
      <SignUpInputTitle title={title} essential={essential} />
      <St.InputAndButtonWrapper>
        <St.SignUpInputWrapper>
          <Input
            type={type}
            placeholder={placeholder}
          />
        </St.SignUpInputWrapper>
        {isButtonHidden && <CheckDuplicateBtn />}
      </St.InputAndButtonWrapper>
    </St.SignUpInputContainerWrapper>
  );
}

const St = {
  SignUpInputContainerWrapper: styled.div`
    display: flex;
    width: 780px;
    align-items: center;
    height: 56px;
    margin-bottom: 48px;
  `,

  SignUpInputWrapper: styled.div`
    width: 400px;
    padding-left: 80px;
    padding-right: 57px;
  `,

  InputAndButtonWrapper: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    padding-right: 0px;
  `,
};
