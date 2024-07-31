import React from 'react';
import styled from 'styled-components';
import * as Color from '../../common/Color';

const Input = ({ type, placeholder }) => {
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <StyledInput
      type={type}
      onFocus={() => {
        setIsInputClicked(true);
      }}
      onBlur={() => {
        setIsInputClicked(false);
      }}
      placeholder={isInputClicked === true ? '' : placeholder}
    />
  );
};

export default Input;

const StyledInput = styled.input`
  background-color: ${Color.gray700};
  color: ${Color.gray300};
  margin-bottom: 24px;
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
`;
