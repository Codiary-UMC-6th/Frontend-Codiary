import React from 'react'
import styled from 'styled-components';
import * as Color from '../../common/Color';

import CloseBtn from '../../assets/login/closeBtn.svg';

export const AddModal = ({ title, placeholder, onClose }) => {
  return (
    <St.AddModalBackground>
      <St.ModalWrapper>
        <St.CloseButton onClick={onClose}><img src={CloseBtn} alt="Close" /></St.CloseButton>
        <St.HeaderTitle>{title}</St.HeaderTitle>
        <St.Input
          type="text"
          placeholder={placeholder}
        />
        <St.AddButton />
      </St.ModalWrapper>
    </St.AddModalBackground>
  )
}

const St = {

  AddModalBackground: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    background-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `,

  ModalWrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${Color.backgroundBlur};
    width: 600px;
    height: 471px;
  `,

  CloseButton: styled.button`
    display: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border none;
    cursor: pointer;
  `,

  HeaderTitle: styled.h1`
    display: block;
    padding-top: 96px 0 0 40px;
    color: ${Color.text1};
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
  `,

  InputWrapper: styled.div`
    background-color: ${Color.gray700};
    color: ${Color.gray300};
    width: 400px;
    height: 56px;
    font-family: 'D2Coding';
    border: none;
    border-radius: 10px;
    font-size: 18px;
    line-height: 22px;
    outline: none;
    padding-left: 17px;

    &::placeholder {
      color: ${Color.gray300};
    }
  `,

  AddButton: styled.button`
    width: 160px;
    height: 48px;
    border: none;
    border-radius: 15px;
    margin: 36px auto;
    background-color: ${Color.primary_blue};
    text-align: center;
    color: ${Color.text1};
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  `,
}