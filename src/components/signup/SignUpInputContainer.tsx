import React, { HTMLInputTypeAttribute, useState } from 'react';
import styled from 'styled-components';
import * as Color from '../../common/Color';

import Input from '../login/Input';
import { SignUpInputTitle } from './SignUpInputTitle';
import { CheckDuplicateBtn } from './CheckDuplicateBtn';

import { get } from "../../common/api";

type SignUpInputContainerType = {
  props: {
    title: string;
    essential?: boolean;
    placeholder: string;
    value?: any;
    onChange: (value: string, error?: string) => void;
    isButtonHidden?: boolean;
    inputType?: HTMLInputTypeAttribute;
    disable?: boolean;
    onCheckDuplicate?: any;
    type?: HTMLInputTypeAttribute;
  };
};

export const SignUpInputContainer = ({ props }: SignUpInputContainerType) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value: string) => {
    if (props.essential && !value) {
      return '필수 입력 항목입니다.';
    }

    switch (props.title) {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    const validationError = validateInput(value);
    setError(validationError);
    props.onChange(value, validationError);
  };

  const checkRedundancyAPI = async () => {
    console.log(value);
    try {
      const response = props.title === '이메일'
        ? await get(`/members/sign-up/check-email?email=${value}`)
        : await get(`/members/sign-up/check-nickname?nickname=${value}`);

      console.log(response);

      if (response.isSuccess) {
        alert(`사용 가능한 ${props.title}입니다.`);
        props.onCheckDuplicate();
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      if (!error.response.isSuccess) {
        setError(error.response.message);
      } else {
        console.log('중복확인 실패', error);
      }
    }
  }

  return (
    <St.SignUpInputContainerWrapper>
      <SignUpInputTitle title={props.title} essential={props.essential} />
      <St.InputAndButtonWrapper>
        <St.SignUpInputWrapper>
          <Input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={handleChange}
            hasError={!!error}
            disable={props.disable || false}
          />
          {error && <St.ErrorText>{error}</St.ErrorText>}
        </St.SignUpInputWrapper>
        {!props.isButtonHidden && <CheckDuplicateBtn onClick={checkRedundancyAPI} />}
      </St.InputAndButtonWrapper>
    </St.SignUpInputContainerWrapper>
  )
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
