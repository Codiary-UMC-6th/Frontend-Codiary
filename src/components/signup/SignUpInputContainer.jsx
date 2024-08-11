import React, { useState } from 'react';
import styled from 'styled-components';
import * as Color from '../../common/Color';

import Input from '../login/Input';
import { SignUpInputTitle } from './SignUpInputTitle';
import { CheckDuplicateBtn } from './CheckDuplicateBtn';

import { get } from "../../common/api";

export const SignUpInputContainer = ({ title, essential, type, placeholder, isButtonHidden, onChange }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value) => {
    if (essential && !value) {
      return '필수 입력 항목입니다.';
    }

    switch (title) {
      case '이메일':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : '올바른 형식이 아닙니다';
      case '비밀번호':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(value) ? '' : '올바른 형식이 아닙니다';
      case '생년월일':
        const dateRegex = /^\d{4}\d{2}\d{2}$/;
        return dateRegex.test(value) ? '' : '올바른 형식이 아닙니다';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    const validationError = validateInput(value);
    setError(validationError);
    onChange(value, validationError);
  };

  const checkRedundancyAPI = async () => {
    console.log(value);
    try {
      const response = title === '이메일'
        ? await get(`/members/sign-up/check-email?email=${value}`)
        : await get(`/members/sign-up/check-nickname?nickname=${value}`);

      console.log(response);

      if (response.isSuccess) {
        alert(`사용 가능한 ${title}입니다.`);
      } else {
        setError(response.message);
      }
    } catch (error) {
      if (!error.isSuccess) {
        const errorMessage = title === '이메일'
          ? '이미 가입된 이메일입니다.'
          : '이미 존재하는 닉네임입니다.'
        setError(errorMessage);
      } else {
        console.log('중복확인 실패', error);
      }
    }
  }

  return (
    <St.SignUpInputContainerWrapper>
      <SignUpInputTitle title={title} essential={essential} />
      <St.InputAndButtonWrapper>
        <St.SignUpInputWrapper>
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            hasError={!!error}
          />
          {error && <St.ErrorText>{error}</St.ErrorText>}
        </St.SignUpInputWrapper>
        {!isButtonHidden && <CheckDuplicateBtn onClick={checkRedundancyAPI} />}
      </St.InputAndButtonWrapper>
    </St.SignUpInputContainerWrapper>
  );
};

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
    position: relative;
  `,

  InputAndButtonWrapper: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    padding-right: 0px;
  `,

  ErrorText: styled.p`
    color: ${Color.semantic_negative};
    font-size: 14px;
    position: absolute;
    left: 0;
    margin-left: 80px;
    margin-top: 8px;
  `,
};
