import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../common/Color";

import UserInfo from "../components/profile/UserInfo";
import MyDiary from "../components/profile/MyDiary";

const Container = styled.div`
  background-color: ${Color.background};
  display: flex;
  flex-direction: column;
  padding: 60px 130px;
`;

const Top = styled.div`
  display: flex;
`;

const Callendar = styled.div`
  background-color: #ffffff;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭 가능한 커서 */
`;

const Profile = () => {
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    navigate("/calendar");
  };

  return (
    <Container>
      <Top>
        <UserInfo />
        <Callendar onClick={handleCalendarClick}> 캘린더 </Callendar>
      </Top>
      <MyDiary />
    </Container>
  );
};

export default Profile;
