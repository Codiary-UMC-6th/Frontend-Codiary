import React from 'react';
import styled from 'styled-components';
import * as Color from '../../common/Color';

const HeaderTitle = ({ children }) => (
  <StyledHeaderTitle>{children}</StyledHeaderTitle>
);

export default HeaderTitle;

const StyledHeaderTitle = styled.h1`
  display: block;
  padding-top: 88px 0 0 38px;
  color: ${Color.text1};
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
`;
