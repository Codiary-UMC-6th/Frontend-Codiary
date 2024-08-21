import React, { useState } from "react";
import styled from "styled-components";
import * as Color from "../../common/Color";

import CloseBtn from "../../assets/login/closeBtn.svg";

export const AddModal = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력 값 업데이트
  };

  const handleAddClick = () => {
    props.onAdd(inputValue);
  };

  return (
    <St.AddModalBackground>
      <St.ModalWrapper>
        <St.CloseButton onClick={props.onClose}>
          <img src={CloseBtn} alt="Close" />
        </St.CloseButton>
        <St.HeaderTitle>{props.title}</St.HeaderTitle>
        <St.InputWrapper
          type="text"
          placeholder={props.placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <St.AddButton onClick={handleAddClick}>추가하기</St.AddButton>
      </St.ModalWrapper>
    </St.AddModalBackground>
  );
};

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
    align-items: center;
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
  `,

  HeaderTitle: styled.h1`
    display: block;
    color: ${Color.text1};
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
  `,

  InputWrapper: styled.input`
    margin-top: 19px;
    background-color: ${Color.gray700};
    color: ${Color.gray300};
    width: 400px;
    height: 56px;
    font-family: "D2Coding";
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
    margin-top: 103px;
    background-color: ${Color.primary_blue};
    text-align: center;
    color: ${Color.text1};
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  `,
};
