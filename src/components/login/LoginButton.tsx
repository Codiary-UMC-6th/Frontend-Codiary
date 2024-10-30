import styled from 'styled-components';
import * as Color from '../../common/Color';

type LoginButtonProps = {
  title?: string;
  children?: string;
};

const LoginButton = ({ title, children }: LoginButtonProps) => (
  <StyledLoginButton title={title}>{children}</StyledLoginButton>
);

export default LoginButton;

const StyledLoginButton = styled.button`
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
`;
