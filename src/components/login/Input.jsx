import React from 'react';
import styled, { css } from 'styled-components';
import * as Color from '../../common/Color';

const Input = ({ type, placeholder, value, onChange, hasError }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      hasError={hasError}
    />
  );
};

export default Input;

const StyledInput = styled.input`
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

  ${(props) =>
    props.hasError &&
    css`
      border: 2px solid ${Color.semantic_negative};
    `}
`;
