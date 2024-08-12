import React from 'react'
import styled from 'styled-components'
import * as Color from '../../common/Color';

export const CheckDuplicateBtn = ({ onClick }) => {
  return (
    <St.StyledCheckDuplicateBtn
      title='중복확인'
      onClick={onClick}
    >
      중복확인
    </St.StyledCheckDuplicateBtn>
  )
}

const St = {
  StyledCheckDuplicateBtn: styled.button`
    width: 123px;
    height: 56px;
    border: 2px solid;
    border-color: ${Color.primary_yellow};
    border-radius: 10px;
    background-color: ${Color.backgroundBlur};
    color: ${Color.primary_yellow};
    cursor: pointer;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
  `,
}

