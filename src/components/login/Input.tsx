import styled, { css } from 'styled-components';
import * as Color from '../../common/Color';

type InputProps = {
  props: {
    type?: string;
    placeholder?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    disable?: boolean;
  };
};

type StyledInputProps = {
  hasError?: boolean;
};

const Input = ({ props }: InputProps) => (
  <StyledInput
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    hasError={props.hasError}
    disabled={props.disable}
  />
);

export default Input;

const StyledInput = styled.input<StyledInputProps>`
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
