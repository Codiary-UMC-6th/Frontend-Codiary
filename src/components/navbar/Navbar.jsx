import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import * as Color from '../../common/Color';

import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";
import WriteBtn from "./WriteBtn";
import { LoginModal } from "../login/LoginModal";

import { useLoginStore } from '../../store/LoginStore';

const Container = styled.div`
  display : flex;
  justify-content: space-between;
  flex-direction : row;
  align-items : center;
  height : 40px;
  padding : 35px 130px 35px 130px;
  background-color : ${Color.background};
`;

const Left = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
`

const Right = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
`

const LinkStyle = styled(Link)`
  text-decoration : none;
`;

const Codiary = styled.span`
  text-decoration : none;
  font-family: D2Coding;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  letter-spacing: 0.96px;
  color : ${Color.primary_yellow};
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
  font-size : 18px;
  margin : 0px 0px 0px 48px;
  text-decoration : none;
  color : ${Color.text1};
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
`

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
`

const Navbar = () => {
  const { isLogin, setLogin, setLogout } = useLoginStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  useEffect(() => {
    if(sessionStorage.getItem("accessToken") == null) {
      setLogout();
    } else {
      setLogin();
    }
  }, []);

  const handleLogout = () => {
    setLogout();
    sessionStorage.removeItem("accessToken");
    window.location.reload();
  }

  return (
    <>
    <Container>
      <Left>
        <LinkStyle to="/" >
          <Typography>{"/*"}</Typography>
          <Codiary>Codiary</Codiary>
          <Typography>*/</Typography>
        </LinkStyle>
        {
          isLogin ? 
          <>
          <NavStyle to="/">홈</NavStyle>
          <NavStyle to="/profile/1">내 다이어리</NavStyle>
          <Dropdown></Dropdown>          
          </>
          :
          <></>
        }
      </Left>
      <Right>
        <SearchBox />
        {
          isLogin ?
          <>
          <WriteBtn />
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>          
          </>
          :
          <LoginBtn onClick={openLoginModal}>로그인</LoginBtn>
        }
      </Right>
    </Container>
    {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
};

export default Navbar;