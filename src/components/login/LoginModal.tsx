import React, { useState } from 'react'
import styled from "styled-components";
import * as Color from '../../common/Color';
import { post } from '../../common/api';
import { useLoginStore } from '../../store/LoginStore';

import NaverIcon from '../../assets/login/naverIcon.svg';
import KakaorIcon from '../../assets/login/kakaoIcon.svg';
import GoogleIcon from '../../assets/login/googleIcon.svg';
import GithubIcon from '../../assets/login/githubIcon.svg';
import EmailIcon from '../../assets/login/mailIcon.svg';
import CloseBtn from '../../assets/login/closeBtn.svg';

type LoginModalProps = {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LoginModal = ({ onClose }: LoginModalProps) => {

  const { setLogin } = useLoginStore();
  const setEmail = useLoginStore((state) => state.setEmail);
  const setNickname = useLoginStore((state) => state.setNickname);
  const setMemberId = useLoginStore((state) => state.setMemberId);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const loginRequest = async () => {
    const data = {
      email: userId,
      password: password
    };

    console.log(data);
    try {
      const response = await post('/members/login', data);
      console.log('POST 요청 결과:', response);
      sessionStorage.setItem("accessToken", response.result.tokenInfo.accessToken);
      setLogin();
      setEmail(response.result.email);
      setNickname(response.result.nickname);
      setMemberId(response.result.memberId);

      window.location.reload();
      alert('로그인 되었습니다.');
    } catch (error) {
      console.error('POST 요청 실패:', error);
      // 여기서 error type을 어떻게 지정해야 할까?
      // alert(`${error.response}`);
    }
  }

  return (
    <St.LoginModalBackground>
      <St.LoginModalWrapper>
        <St.CloseButton onClick={onClose}><img src={CloseBtn} alt="Close" /></St.CloseButton>
        <St.HeaderTitle>CODIARY</St.HeaderTitle>
        <St.Input
          type="text"
          placeholder='input name = "userID"'
          value={userId}
          onChange={(event) => {
            setUserId(event.target.value);
          }}
        />
        <St.Input
          type="password"
          placeholder='input name = "Password"'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <St.LoginSettingBox>
          <St.Checkbox />
          <St.StayLoginLabel>
            로그인 유지하기
          </St.StayLoginLabel>
          회원이 아니신가요?
          <St.LinkText href="/sign-up">회원가입</St.LinkText>
        </St.LoginSettingBox>
        <St.LoginButton title='로그인' onClick={loginRequest}>로그인</St.LoginButton>
        <St.ButtonContainer>
          <St.IconButton><img src={NaverIcon} alt="Naver" /></St.IconButton>
          <St.IconButton><img src={KakaorIcon} alt="Naver" /></St.IconButton>
          <St.IconButton><img src={GoogleIcon} alt="Naver" /></St.IconButton>
          <St.IconButton><img src={GithubIcon} alt="Naver" /></St.IconButton>
          <St.IconButton><img src={EmailIcon} alt="Naver" /></St.IconButton>
        </St.ButtonContainer>
      </St.LoginModalWrapper>
    </St.LoginModalBackground>
  )
}

const St = {

  LoginModalBackground: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px); /* 배경 화면 블러 효과 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `,

  LoginModalWrapper: styled.div`
    position: relative; /* 기준 위치 설정 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Color.backgroundBlur};
    width: 600px;
    height: 600px;
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
    padding-top: 88px 0 0 38px;
    color: ${Color.text1};
    font-family: Pretendard;
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
  `,

  Input: styled.input`
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
  `,

  LoginSettingBox: styled.div`
    display: flex;
    margin-top: 12px;
    padding-left: 90px;
    padding-right: 100px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    align-items: center;
    color: ${Color.gray500};
  `,

  StayLoginLabel: styled.div`
    margin-right: 76px;
    cursor: pointer;
    font-family: Pretendard;
  `,

  Checkbox: styled.input.attrs({ type: 'checkbox' })`
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
`,

  LinkText: styled.a`
    margin-left: 4px;
    color: ${Color.gray500};
    font-size: 16px;
    font-family: 'Pretendard';
    text-decoration: none;
    cursor: pointer;
    text-decoration: underline;
  `,

  LoginButton: styled.button`
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
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
`,

  IconButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;

    &:hover {
      opacity: 0.8;
    }

    img {
      width: 32px;
      height: 32px;
    }
`,
}