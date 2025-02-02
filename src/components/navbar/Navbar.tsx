import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";

import * as Color from "../../common/Color";

import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";
import WriteBtn from "./WriteBtn";
import { LoginModal } from "../login/LoginModal";

import { useEditorStore} from "../../store/EditorStore";
import { useLoginStore } from "../../store/LoginStore";
import {
  ACCESS_TOKEN_KEY,
  GRANT_TYPE,
  REFRESH_TOKEN_KEY,
} from "@/shared/constant/api";
import { postLogout } from "@/shared/api/logout";

const Navbar = () => {
  const { setRegister } = useEditorStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState<string>('/');
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname])

  const { isLogin, setLogin, setLogout, memberId } = useLoginStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const memberId = sessionStorage.getItem("memberId");
      const email = sessionStorage.getItem("email");
      const nickname = sessionStorage.getItem("nickname");
      setLogin(memberId, email, nickname);
    } else {
      setLogout();
    }
  }, [setLogin]);

  const handleLogout = async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    useLoginStore.getState().setLogout();

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken) {
      try {
        const logoutResponse = await postLogout({
          refresh_token: refreshToken,
        });
        if (logoutResponse.isSuccess) {
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(GRANT_TYPE);
          useLoginStore.getState().setLogout();
          window.location.replace("/");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Refresh token is null");
      alert("로그아웃할 수 없습니다.");
      return;
    }
  };

  return (
    (path !== '/diaryEditor')
    ?
    <>
      <Container>
        <Left>
          <Logo />
          {(isLogin) && (
            <>
              <NavStyle to="/">홈</NavStyle>
              <NavStyle to={`/profile/${memberId}`}>내 다이어리</NavStyle>
              <NavStyle to={"/bookmark"}>북마크</NavStyle>
              <NavStyle to={""}>통계</NavStyle>
              <Dropdown />
            </>
          )}
        </Left>
        <Right>
          <SearchBox />
          {(isLogin) ? (
            <>
              <WriteBtn />
              <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            </>
          ) : (
            <LoginBtn onClick={() => setIsLoginModalOpen(true)}>
              로그인
            </LoginBtn>
          )}
        </Right>
      </Container>
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
    :
    <Container>
      <Left>
        <Logo />
      </Left>
      <Right>
        <TempSaveBtn>임시저장</TempSaveBtn>
        <SaveBtn onClick={()=>{setRegister(true)}}>작성하기</SaveBtn>
      </Right>
    </Container>
  );
};

const Logo = () => {
  return (
    <LinkStyle to="/">
    <Typography>{"/*"}</Typography>
    <Codiary>Codiary</Codiary>
    <Typography>*/</Typography>
  </LinkStyle>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding: 35px 130px 35px 130px;
  background-color: ${Color.background};
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const Codiary = styled.span`
  text-decoration: none;
  font-family: D2Coding;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  letter-spacing: 0.96px;
  color: ${Color.primary_yellow};
`;

const Typography = styled.span`
  color: ${Color.primary_blue};
  font-family: D2Coding;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  letter-spacing: 0.96px;
`;

const NavStyle = styled(NavLink)`
  font-size: 18px;
  margin: 0px 0px 0px 48px;
  text-decoration: none;
  color: ${Color.text1};
`;

const LoginBtn = styled.button`
  margin: 0px 0px 0px 20px;
  cursor: pointer;
  border: 0;
  background-color: ${Color.primary_red};
  width: 102px;
  height: 40px;

  border-radius: 30px;
  color: ${Color.text1};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
`;

const LogoutBtn = styled.button`
  margin: 0px 0px 0px 20px;
  cursor: pointer;
  background-color: transparent;
  width: 102px;
  height: 40px;

  border: 1px solid ${Color.text5};
  border-radius: 30px;
  color: ${Color.text5};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
`;

const TempSaveBtn = styled.div`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 2px solid ${Color.primary_red};

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  color: ${Color.primary_red};

  margin-right: 16px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`

const SaveBtn = styled.div`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 2px solid ${Color.primary_red};
  background: ${Color.primary_red};

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  color: ${Color.text1};

  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`

export default Navbar;
