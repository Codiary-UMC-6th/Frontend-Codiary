import styled, { css } from 'styled-components';
import * as Color from '../../common/Color';
import { HTMLInputTypeAttribute } from 'react';

// Input 컴포넌트의 타입을 변경
type InputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  disable?: boolean;
};

const Input = ({ type, placeholder, value, onChange, hasError, disable }: InputProps) => (
  <StyledInput
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    hasError={hasError}
    disabled={disable}
  />
);

export default Input;


const StyledInput = styled.input<InputProps>`
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
