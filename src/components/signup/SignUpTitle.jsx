import React from 'react'
import styled from 'styled-components';
import * as Color from '../../common/Color';

const SignUpTitle = ({ children }) => (
  <StyledSignUpTitle>{children}</StyledSignUpTitle>
);

export default SignUpTitle;

const StyledSignUpTitle = styled.h1`
  display: block;
  padding-top: 52px auto;
  color: ${Color.text1};
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
`;