import React from 'react';
import styled from 'styled-components';
import * as Color from '../../common/Color';

const LoginSettingBox = () => (
  <StyledLoginSettingBox>
    <Checkbox />
    <StayLoginLabel>로그인 유지하기</StayLoginLabel>
    회원이 아니신가요?
    <LinkText href="/signup">회원가입</LinkText>
  </StyledLoginSettingBox>
);

export default LoginSettingBox;

const StyledLoginSettingBox = styled.div`
  display: flex;
  margin-top: 12px;
  padding-left: 90px;
  padding-right: 100px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  align-items: center;
  color: ${Color.gray500};
`;

const StayLoginLabel = styled.div`
  margin-right: 76px;
  cursor: pointer;
  font-family: Pretendard;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid ${Color.gray500};
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 16px;

  &:checked {
    background-color: ${Color.primary_blue};
    border-color: ${Color.primary_blue};
  }
`;

const LinkText = styled.a`
  margin-left: 4px;
  color: ${Color.gray500};
  font-size: 16px;
  font-family: 'Pretendard';
  text-decoration: none;
  cursor: pointer;
  text-decoration: underline;
`;
