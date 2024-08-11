import React from 'react'
import styled from 'styled-components'
import * as Color from '../../common/Color'

export const SocialInputBox = ({ image, placeholder, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <St.SocialInputWrapper>
      <St.SocialInputIcon>{image}</St.SocialInputIcon>
      <St.SocialInput
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </St.SocialInputWrapper>
  )
}

const St = {

  SocialInputWrapper: styled.div`
    display: flex;
    width: 420px;
    margin-left: 80px;
  `,

  SocialInputIcon: styled.div`
    width: 56px;
    height: 56px;
    margin-right: 20px;
  `,

  SocialInput: styled.input`
    background-color: ${Color.gray700};
    color: ${Color.gray300};
    width: 344px;
    height: 56px;
    font-family: 'D2Coding';
    border: none;
    border-radius: 10px;
    font-size: 18px;
    line-height: 22px;
    outline: none;
    padding-left: 14px;

    &::placeholder {
      color: ${Color.gray300};
    }
  `,
}